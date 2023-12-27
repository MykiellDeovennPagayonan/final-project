'use client'

import { FC, useState, useEffect } from "react"
import { OutputData } from "@editorjs/editorjs"
import Navbar from "@/components/Navbar"
import NotesCard from "@/components/study-notes/notesCard"
import NotesCardNew from "@/components/study-notes/notesCardNew"
import topicsAdaptor from "@/utils/topicsAdaptor"

const StudyNotes: FC = () => {
  const [topics, setTopics] = useState<Array<AdaptedTopic>>()

  async function getTopics() {
    const response = await fetch(`http://localhost:3001/api/study-notes`);
    const message : Array<Topic> = await response.json();
    const topicsInitial = topicsAdaptor(message)
    setTopics(topicsInitial)
  }

  useEffect(() => {
    getTopics()
  }, [])

  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      <Navbar />
      <div className="flex flex-col h-full w-screen p-12 overflow-hidden overflow-y-scroll">
        <h2 className="my-4"> Recent Study Notes </h2>
        <div className="flex flex-wrap h-auto w-full mb-8">
          <NotesCard title="Hello"/>
          <NotesCardNew topics={topics}/>
        </div>
        <h2 className="my-4"> Your Study Groups </h2>
        <div className="flex flex-wrap h-auto w-full">
        </div>
      </div>
    </div>
  )
}

export default StudyNotes