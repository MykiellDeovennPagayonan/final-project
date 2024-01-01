'use client'

import { FC, useState, useEffect } from "react"
import Notes from "@/components/study-notes/notes"
import Quizzes from "@/components/study-notes/quizzes"
import { Separator } from "@/components/ui/separator"
import { OutputData } from "@editorjs/editorjs"
import toTableData from "@/utils/toTableData"
import toNotesData from "@/utils/toNotesData"
import useFetchData from "@/hooks/useFetchData"
import toSaveNotes from "@/utils/saveStudyNotes"
import toSaveQuiz from "@/utils/saveQuiz"

interface StudyNoteParameter {
  params: {
    id: string
  }
}

const StudyNote: FC<StudyNoteParameter> = ({ params }) => {
  const studyNoteId = Number(params.id)
  const { data: notesDataInitial, error } = useFetchData(`http://localhost:3001/api/study-notes/notes/${studyNoteId}`)
  const [notesData, setNotesData] = useState<OutputData>()
  const [quizItems, setQuizItems] = useState<Array<QuizItem>>([])

  useEffect(() => {
    console.log(notesData)
    if (notesData) {
      const data = toTableData(notesData, studyNoteId)
      console.log(data)
    }
  }, [notesData])

  useEffect(() => {
    console.log(notesDataInitial)
    if (notesDataInitial) {
      const moreData = toNotesData(notesDataInitial)
      setNotesData(moreData)
    }
  }, [notesDataInitial])

  async function buttonPress() {
    toSaveNotes(studyNoteId, notesData)
    toSaveQuiz(studyNoteId, quizItems)
  }

  if (!notesDataInitial) {
    return (
      <h1> loading bruh! </h1>
    )
  }

  return (
    <div className="flex h-screen w-screen bg-white">
      <div className="flex flex-col h-screen w-full overflow-hidden overflow-y-scroll">
        <button onClick={() => buttonPress()}> Press Me </button>
        <h1 className="text-center mt-20"> {params.id} </h1>
        <Notes setNotesData={setNotesData} notesData={notesData} quizItems={quizItems} setQuizItems={setQuizItems}/>
        <Separator className="w-3/5 mx-auto h-[3px]" />
        <h1 className="text-center mt-8"> Quizzes </h1>
        <Quizzes quizItems={quizItems} setQuizItems={setQuizItems}/>
      </div>
    </div>
  )
}

export default StudyNote