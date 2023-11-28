'use client'

import { FC, useState } from "react"
import SideBar from "@/components/side-bar"
import Notes from "@/app/study-notes/_components/notes"
import Quizzes from "@/app/study-notes/_components/quizzes"
import { Separator } from "@/components/ui/separator"
import { OutputData } from "@editorjs/editorjs"

const StudyNotes : FC = () => {
  const [ notesData, setNotesData ] = useState<OutputData | null>()

  
  return (
    <div className="flex h-screen w-screen bg-white">
      <SideBar />
        <div className="flex flex-col h-screen w-full overflow-hidden overflow-y-scroll">
          <h1 className="text-center mt-20"> Notes </h1>
          <Notes />
          <Separator className="w-3/5 mx-auto h-[3px]"/>
          <h1 className="text-center mt-8"> Quizzes </h1>
          <Quizzes />
        </div>
    </div>
  )
}

export default StudyNotes