'use client'

import { FC, useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import NotesCard from "@/components/study-notes/notesCard"
import NotesCardNew from "@/components/study-notes/notesCardNew"
import useFetchData from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton"
import toStudyNotes from "@/utils/studyNotesAdaptor"

const StudyNotes: FC = () => {
  const [studyNotes, setStudyNotes] = useState<Array<StudyNote>>(null)
  const { data: studyNotesTopics, error } = useFetchData("http://localhost:3001/api/study-notes", true)

  useEffect(()=> {
    if (studyNotesTopics) {
      setStudyNotes(toStudyNotes(studyNotesTopics))
    }
  }, [studyNotesTopics])

  if (!studyNotes) {
    return (
      <div className="flex flex-col h-screen w-screen bg-white">
        <Navbar />
        <div className="flex flex-col h-full w-screen p-12 overflow-hidden overflow-y-scroll">
          <Skeleton className="my-4 h-8 w-60" />
          <div className="flex flex-wrap h-auto w-full mb-8">
            <Skeleton className="w-80 h-48 p-4 m-4"/>
            <Skeleton className="w-80 h-48 p-4 m-4"/>
            <Skeleton className="w-80 h-48 p-4 m-4"/>
            <Skeleton className="w-44 h-12 p-4 m-4" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      <Navbar />
      <div className="flex flex-col h-full w-screen p-12 overflow-hidden overflow-y-scroll">
        <h2 className="my-4"> Recent Study Notes </h2>
        <div className="flex flex-wrap h-auto w-full mb-8">
          {studyNotes.map((studyNote, index) => {
          return(
            <NotesCard
              title={studyNote.title}
              topics={studyNote.topics}
              key={index}
              index={studyNote.id}/>
          )
          })}
          <NotesCardNew/>
        </div>
      </div>
    </div>
  )
}

export default StudyNotes