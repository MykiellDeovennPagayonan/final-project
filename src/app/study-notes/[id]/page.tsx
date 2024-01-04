'use client'

import { FC, useState, useEffect } from "react"
import Notes from "@/app/study-notes/_components/notes"
import Quizzes from "@/app/study-notes/_components/quizzes"
import { Separator } from "@/components/ui/separator"
import { OutputData } from "@editorjs/editorjs"
import toNotesData from "@/utils/toNotesData"
import useFetchData from "@/hooks/useFetchData"
import toSaveNotes from "@/utils/saveStudyNotes"
import DeleteStudyNoteButton from "@/app/study-notes/_components/deleteStudyNoteButton"
import Navbar from "@/components/Navbar"

interface StudyNotePageProps {
  params: {
    id: string
  }
}

const StudyNotePage: FC<StudyNotePageProps> = ({ params }) => {
  const studyNoteId = Number(params.id)
  const { data: notesDataInitial, error: notesDataError } = useFetchData(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-notes/notes/${studyNoteId}`)
  const { data: studyNote, error: titleError } = useFetchData(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-notes/${studyNoteId}`)
  const { data: quizzesDataInitial, error: quizzesDataError } = useFetchData(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-notes/quizzes/${studyNoteId}`)
  const [notesData, setNotesData] = useState<OutputData>()
  const [quizItems, setQuizItems] = useState<Array<QuizItem>>([])

  useEffect(() => {
    if (quizzesDataInitial) {
      const quizItemsInitial: Array<QuizItem> = quizzesDataInitial.map(quizzesDataInitial => {
        return ({
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

  if (!notesDataInitial || !studyNote) {
    return (
      <h1> loading bruh! </h1>
    )
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-200">
      <div className="flex flex-col h-screen w-full overflow-hidden overflow-y-scroll">
        <Navbar />
        <button onClick={() => save()}> Save! </button>
        <h1 className="text-center mt-20"> {studyNote[0].title} </h1>
        <Notes studyNoteId={studyNoteId} setNotesData={setNotesData} notesData={notesData} quizItems={quizItems} setQuizItems={setQuizItems} />
        <Separator className="w-3/5 mx-auto h-[3px]" />
        <h1 className="text-center mt-8"> Quizzes </h1>
        <Quizzes notesData={notesData} quizItems={quizItems} setQuizItems={setQuizItems} studyNoteId={studyNoteId} />
        <DeleteStudyNoteButton studyNoteId={studyNoteId} />
      </div>
    </div>
  )
}

export default StudyNotePage