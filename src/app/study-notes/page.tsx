'use client'

import { FC, useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import { OutputData } from "@editorjs/editorjs"
import Navbar from "@/components/Navbar"
import NotesCard from "@/components/study-notes/notesCard"
import NotesCardNew from "@/components/study-notes/notesCardNew"

const StudyNotes: FC = () => {
  const [topics, setTopics] = useState<Array<Topic>>()
  const router = useRouter();

  async function getTopics(token) {
    console.log(token)
    const response = await fetch(`http://localhost:3001/api/study-notes`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => res.json())

    if (!response.authenticated) {
      router.push("/login")
    }

    console.log(response.body)

    const topicsInitial = response.body
    setTopics(topicsInitial)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    getTopics(token)
  }, [])

  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      <Navbar />
      <div className="flex flex-col h-full w-screen p-12 overflow-hidden overflow-y-scroll">
        <h2 className="my-4"> Recent Study Notes </h2>
        <div className="flex flex-wrap h-auto w-full mb-8">
          <NotesCard title="Hello" />
          <NotesCardNew topics={topics} />
        </div>
        <h2 className="my-4"> Your Study Groups </h2>
        <div className="flex flex-wrap h-auto w-full">
        </div>
      </div>
    </div>
  )
}

export default StudyNotes