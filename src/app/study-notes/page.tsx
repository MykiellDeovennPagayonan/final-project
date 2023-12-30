'use client'

import { FC, useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import NotesCard from "@/components/study-notes/notesCard"
import NotesCardNew from "@/components/study-notes/notesCardNew"
import useFetchData from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton"

const StudyNotes: FC = () => {
  const { data: studyNotes, error } = useFetchData("http://localhost:3001/api/study-notes", true)

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
          <Skeleton className="my-4 h-8 w-60" />
          <div className="flex flex-wrap h-auto w-full">
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
          {studyNotes.map((studyNote) => {
          console.log(studyNote)
          return(
            <NotesCard title={studyNote.title} key={0}/>
          )
          })}
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