'use client'

import { FC, useState } from "react"
import SideBar from "@/components/side-bar"
import Notes from "@/components/study-notes/notes"
import Quizzes from "@/components/study-notes/quizzes"
import { Separator } from "@/components/ui/separator"
import { OutputData } from "@editorjs/editorjs"

interface StudyNoteParameter {
  params: {
    id: string
  }
}

const StudyNote: FC<StudyNoteParameter> = ({ params }) => {
  const [notesData, setNotesData] = useState<OutputData | null>()
  
  async function buttonPress() {
    const response = await fetch(`http://localhost:3001/api/study-notes/${params.id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({message: "hola hola!"})
    }).then((res => res.json()))

    console.log(response)
  }

  return (
    <div className="flex h-screen w-screen bg-white">
      <div className="flex flex-col h-screen w-full overflow-hidden overflow-y-scroll">
        <button onClick={() => buttonPress()}> Press Me </button>
        <h1 className="text-center mt-20"> {params.id} </h1>
        <Notes />
        <Separator className="w-3/5 mx-auto h-[3px]" />
        <h1 className="text-center mt-8"> Quizzes </h1>
        <Quizzes />
      </div>
    </div>
  )
}

export default StudyNote