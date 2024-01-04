'use client'

import { FC, useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import { NotesMembersTabs } from "../_components/notesMembersTabs"
import { Separator } from "@/components/ui/separator"
import { AddStudyNote } from "../_components/addStudyNote"
import useFetchData from "@/hooks/useFetchData"
import toStudyNotes from "@/utils/studyNotesAdaptor"

interface StudyGroupPageProps {
  params: {
    id: string
  }
}

const StudyNotePage: FC<StudyGroupPageProps> = ({ params }) => {
  const studyGroupId = Number(params.id)
  const [studyNotes, setStudyNotes] = useState<Array<StudyNote>>([])
  const {data : studyNotesInitial, error : studyNotesInitialError} = useFetchData(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-groups/study-notes/${studyGroupId}`)
  const { data: title, error: titleError } = useFetchData(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-groups/${studyGroupId}`)
  // const {data : members, error : membersError} = useFetchData(`http://localhost:3001/api/study-groups/members/${studyGroupId}`)

  useEffect(() => {
    if (studyNotesInitial) {
      const studyNotesAdapted = toStudyNotes(studyNotesInitial)
      console.log(studyNotesAdapted)
      setStudyNotes(studyNotesAdapted)
    }
  }, [studyNotesInitial])

  if (!title || !studyNotesInitial) {
    return <div> laoding </div>
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-200">
      <div className="flex flex-col h-screen w-full overflow-hidden overflow-y-scroll">
        <Navbar />
        <div className="w-full h-48 mt-12 px-8 md:px-20 lg:px-40">
          <h1 className="text-4xl lg:text-5xl"> {title} </h1>
          <Separator className="mt-8 h-[2px] bg-gray-400" />
          <div className="flex flex-col sm:flex-row w-full h-48 mt-8">
            <div className="w-full sm:w-4/6 px-4 md:px-8">
              <NotesMembersTabs studyNotes={studyNotes}/>
            </div>
            <div className="w-full mt-8 sm:w-2/6 sm:mt-2 px-4 md:px-8">
              <h3> Invitation Code: </h3>
              <div className="border-2 rounded-md p-2 shadow-md my-4 border-solid border-black">
                {`study-groups/${studyGroupId}`}
              </div>
              <div className="flex items-center bg-white rounded-lg shadow-md border p-4 w-full">
                <AddStudyNote studyGroupId={studyGroupId}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyNotePage