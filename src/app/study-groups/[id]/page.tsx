"use client";


import { FC, useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import { NotesMembersTabs } from "../_components/notesMembersTabs"
import { Separator } from "@/components/ui/separator"
import { AddStudyNote } from "../_components/addStudyNote"
import useFetchData from "@/hooks/useFetchData"
import toStudyNotes from "@/utils/studyNotesAdaptor"
import getUserInfo from "@/utils/getUserInfo"
import { Skeleton } from "@/components/ui/skeleton";

interface StudyGroupPageProps {
  params: {
    id: string;
  };
}

const StudyNotePage: FC<StudyGroupPageProps> = ({ params }) => {

  const userInfo = getUserInfo()
  const userId = userInfo.id
  const studyGroupId = Number(params.id)
  const [isMember, setIsMember] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [studyNotes, setStudyNotes] = useState<Array<StudyNote>>([])
  const [members, setMembers] = useState<Array<Members>>([])
  const { data: studyNotesInitial, error: studyNotesInitialError } = useFetchData(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-groups/study-notes/${studyGroupId}`)
  const { data: studyGroup, error: titleError } = useFetchData(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-groups/${studyGroupId}`)
  const { data: membersInitial, error: membersError } = useFetchData(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-groups/members/${studyGroupId}`)
  const { data: admins, error: adminsError } = useFetchData(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-groups/admins/${studyGroupId}`)

  useEffect(() => {
    if (studyNotesInitial) {
      const studyNotesAdapted = toStudyNotes(studyNotesInitial)
      setStudyNotes(studyNotesAdapted)
    }
  }, [studyNotesInitial]);


  useEffect(() => {
    if (membersInitial) {
      setMembers(membersInitial)
    }
  }, [membersInitial])

  useEffect(() => {

    if (admins) {
      const isAdminInitial = admins.some(admin => admin.userID === userId)
      setIsAdmin(isAdminInitial)
    }
  }, [admins])

  useEffect(() => {

    if (members) {
      const isMemberInitial = members.some(member => member.userID === userId)
      console.log(userId)
      console.log(members)
      setIsMember(isMemberInitial)
    }
  }, [members])


  async function toggleJoinStudyGroup() {
    if (isMember) {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-groups/leave`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ studyGroupId, userId })
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
        });

      setIsMember(false)
    } else {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-groups/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ studyGroupId, userId })
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
        });

      setIsMember(true)
    }
  }

  if (!studyGroup || !studyNotesInitial || !members || !admins) {
    return (
      <div className="flex flex-col h-screen w-screen bg-gray-200">
      <div className="flex flex-col h-screen w-full overflow-hidden overflow-y-scroll">
        <Navbar />
        <div className="w-full h-48 mt-12 px-8 md:px-20 lg:px-40">
          <Skeleton className="w-80 h-28 my-4"/>
          <Skeleton className="w-full h-12"/>
          <Separator className="mt-8 h-[2px] bg-gray-400" />
          <div className="flex flex-col sm:flex-row w-full h-48 mt-8">
            <div className="w-full sm:w-4/6 px-4 md:px-8">
              <Skeleton className="w-full h-80"/>
            </div>
            <div className="w-full sm:w-2/6 sm:mt-2 px-4 md:px-8">
              <Skeleton className="w-full h-80"/>

            </div>
          </div>
        </div>
      </div>
    </div>
    )

  }

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-200">
      <div className="flex flex-col h-screen w-full overflow-hidden overflow-y-scroll">
        <Navbar />
        <div className="w-full h-48 mt-12 px-8 md:px-20 lg:px-40">

          <h1 className="text-4xl lg:text-5xl"> {studyGroup[0].name} </h1>
          <p className="mt-4"> {studyGroup[0].description} </p>
          <Separator className="mt-8 h-[2px] bg-gray-400" />
          <div className="flex flex-col sm:flex-row w-full h-48 mt-8">
            <div className="w-full sm:w-4/6 px-4 md:px-8">
              <NotesMembersTabs studyNotes={studyNotes} members={members} admins={admins} setMembers={setMembers}/>
            </div>
            <div className="w-full mt-8 sm:w-2/6 sm:mt-2 px-4 md:px-8">
              <h3> Invitation Code: </h3>
              <div className="border-2 rounded-md p-2 shadow-md my-4 border-solid border-black">
                {`study-groups/${studyGroupId}`}
              </div>
              <div className="flex items-center bg-white rounded-lg shadow-md border p-4 w-full">
                <AddStudyNote studyGroupId={studyGroupId} />
              </div>
              {!isAdmin &&
                (isMember ?
                <button className="flex justify-center bg-red-400 text-white rounded-lg shadow-md border mt-4 p-4 w-full"
                  onClick={() => toggleJoinStudyGroup()}
                >
                  Leave Study Group
                </button>
                :
                <button className="flex justify-center bg-white rounded-lg shadow-md border mt-4 p-4 w-full"
                  onClick={() => toggleJoinStudyGroup()}
                >
                  Join Study Group
                </button>
                )
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyNotePage;
