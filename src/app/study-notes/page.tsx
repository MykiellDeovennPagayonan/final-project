'use client'

import { FC, useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import NotesCard from "@/app/study-notes/_components/notesCard"
import NotesCardNew from "@/app/study-notes/_components/notesCardNew"
import useFetchData from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton"
import toStudyNotes from "@/utils/studyNotesAdaptor"

const StudyNotesPage: FC = () => {
  const [studyNotes, setStudyNotes] = useState<Array<StudyNote>>(null)
  const { data: studyNotesInitial, error } = useFetchData("http://localhost:3001/api/study-notes", true)

  useEffect(()=> {
    if (studyNotesInitial) {
      console.log(studyNotesInitial)
      setStudyNotes(toStudyNotes(studyNotesInitial))
    }
  }, [studyNotesInitial])

  if (!studyNotes) {
    return (
      <div className="flex flex-col h-screen w-screen bg-gray-200">
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
    <div className="flex flex-col h-screen w-screen bg-gray-200">
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
              id={studyNote.id}/>
          )
          })}
          <NotesCardNew studyNotes={studyNotes} setStudyNotes={setStudyNotes}/>
        </div>
      </div>
    </div>
  )
}

export default StudyNotesPage