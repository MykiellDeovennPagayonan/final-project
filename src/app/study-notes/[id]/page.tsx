'use client'

import { FC, useState, useEffect } from "react"
import Notes from "@/components/study-notes/notes"
import Quizzes from "@/components/study-notes/quizzes"
import { Separator } from "@/components/ui/separator"
import { OutputData } from "@editorjs/editorjs"
import toNotesData from "@/utils/toNotesData"
import useFetchData from "@/hooks/useFetchData"
import toSaveNotes from "@/utils/saveStudyNotes"

interface StudyNoteParameter {
  params: {
    id: string
  }
}

const StudyNote: FC<StudyNoteParameter> = ({ params }) => {
  const studyNoteId = Number(params.id)
  const { data: notesDataInitial, error: notesDataError } = useFetchData(`http://localhost:3001/api/study-notes/notes/${studyNoteId}`)
  const { data: title, error: titleError } = useFetchData(`http://localhost:3001/api/study-notes/${studyNoteId}`)
  const { data: quizzesDataInitial, error: quizzesDataError } = useFetchData(`http://localhost:3001/api/study-notes/quizzes/${studyNoteId}`)
  const [notesData, setNotesData] = useState<OutputData>()
  const [quizItems, setQuizItems] = useState<Array<QuizItem>>([])

  useEffect(() => {
    if (quizzesDataInitial) {
      const quizItemsInitial : Array<QuizItem> = quizzesDataInitial.map(quizzesDataInitial => {
        return({
          id: quizzesDataInitial.id as number,
          question: quizzesDataInitial.question as string,
          answer: quizzesDataInitial.answer as string
        })
      })
      setQuizItems(quizItemsInitial)
    }

  }, [quizzesDataInitial])

  useEffect(() => {
    if (notesDataInitial) {
      const data = toNotesData(notesDataInitial)
      setNotesData(data)
    }
  }, [notesDataInitial])

  async function save() {
    toSaveNotes(studyNoteId, notesData)
  }

  if (!notesDataInitial) {
    return (
      <h1> loading bruh! </h1>
    )
  }

  return (
    <div className="flex h-screen w-screen bg-white">
      <div className="flex flex-col h-screen w-full overflow-hidden overflow-y-scroll">
        <button onClick={() => save()}> Save! </button>
        <h1 className="text-center mt-20"> {title} </h1>
        <Notes studyNoteId={studyNoteId} setNotesData={setNotesData} notesData={notesData} quizItems={quizItems} setQuizItems={setQuizItems}/>
        <Separator className="w-3/5 mx-auto h-[3px]" />
        <h1 className="text-center mt-8"> Quizzes </h1>
        <Quizzes notesData={notesData} quizItems={quizItems} setQuizItems={setQuizItems} studyNoteId={studyNoteId}/>
      </div>
    </div>
  )
}

export default StudyNote