import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import React, { FC, useState, useEffect } from "react"
import useFetchData from "@/hooks/useFetchData"
import toDelete from "@/utils/toDelete"
import getUserInfo from "@/utils/getUserInfo"

interface AddStudyNoteProps {
  studyGroupId: number
}

export const AddStudyNote: FC<AddStudyNoteProps> = ({ studyGroupId }) => {
  const [sharedNotesByUser, setSharedNotesByUser] = useState<Array<SharedNote>>([])
  const { data: studyNotesByUser, error: studyNotesByUserError } = useFetchData(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-groups/study-notes`, true)
  const { data: sharedNotesByUserInitial, error: sharedNotesByUserInitialError } = useFetchData(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-groups/shared-notes/${studyGroupId}`, true)

  async function toggleSharedNotes(id: number, isSharedNote: boolean) {
    if (isSharedNote) {
      await toDelete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-groups/shared-notes/delete`, id)

      const index = sharedNotesByUser.findIndex((sharedNoteByUser) => {sharedNoteByUser.id = id})
      console.log(index, id)
      console.log(sharedNotesByUser)
      let sharedNotesByUserIni = [...sharedNotesByUser]
      sharedNotesByUserIni.splice(index, 1)
      setSharedNotesByUser(sharedNotesByUserIni)
    } else {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-groups/shared-notes/new`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ studyGroupId, studyNoteId: id })
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
        });

      const userInfo = getUserInfo()
      const userId = userInfo.id

      const sharedNoteId = response.body

      const sharedNoteByUser: SharedNote = {
        id: sharedNoteId,
        studyNoteId: id,
        userId: userId
      }

      const sharedNotesByUserIni = [...sharedNotesByUser, sharedNoteByUser]
      setSharedNotesByUser(sharedNotesByUserIni)
    }
  }

  useEffect(() => {
    if (sharedNotesByUserInitial) {
      setSharedNotesByUser(sharedNotesByUserInitial)
    }
  }, [sharedNotesByUserInitial])

  useEffect(() => {
    if (studyNotesByUser) {
      console.log(studyNotesByUser)
    }
  }, [studyNotesByUser])

  if (!studyNotesByUser) {
    return <div> Loading! </div>
  }

  return (
    <div className="mx-auto">
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-green-400 font-semibold border border-spacing-2 border-green-700 mx-auto text-white rounded-lg px-2 py-2 md:px-10 md:py-7 hover:bg-green-500 focus:ring-2 focus:ring-green-400 focus:outline-none text-md md:text-lg">
            Add Study Note
          </button>
        </DialogTrigger>
        <DialogContent className="w-4/5 max-h-[700px] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Select Study Notes</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col">
            {studyNotesByUser.map((studyNote, index) => {
              const sharedNote = sharedNotesByUser.find(sharedNoteByUser => sharedNoteByUser.studyNoteId === studyNote.id)

              if (sharedNote) {
                return (
                  <button
                    key={index}
                    className="text-center min-h-24 w-full mx-auto flex my-2 bg-green-200 rounded-lg shadow-lg border border-gray-200 p-4 flex-col"
                    onClick={() => toggleSharedNotes(sharedNote.id, true)}>
                    {studyNote.title}
                  </button>
                )
              }
              return (
                <button
                  key={index}
                  className="text-center min-h-24 w-full mx-auto flex my-2 bg-gray-50 rounded-lg shadow-lg border border-gray-200 p-4 flex-col"
                  onClick={() => toggleSharedNotes(studyNote.id, false)}>
                  {studyNote.title}
                </button>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
