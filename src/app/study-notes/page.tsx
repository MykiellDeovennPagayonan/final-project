'use client'

import { FC, useState } from "react"
import { OutputData } from "@editorjs/editorjs"
import Navbar from "@/components/Navbar"
import NotesCard from "@/components/study-notes/notesCard"
import NotesCardNew from "@/components/study-notes/notesCardNew"

const StudyNotes: FC = () => {
  const [notesData, setNotesData] = useState<OutputData | null>()

  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      <Navbar />
      <div className="flex flex-col h-full w-screen p-12 overflow-hidden overflow-y-scroll">
        <h2 className="my-4"> Recent Study Notes </h2>
        <div className="flex flex-wrap h-auto w-full mb-8">
          <NotesCard title="Hello"/>
          <NotesCardNew />
        </div>
        <h2 className="my-4"> Your Study Groups </h2>
        <div className="flex flex-wrap h-auto w-full">
        </div>
      </div>
    </div>
  )
}

export default StudyNotes