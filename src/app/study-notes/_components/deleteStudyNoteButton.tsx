import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import React, { FC } from "react"
import { Button } from "../../../components/ui/button"
import { useRouter } from "next/navigation"
import toDelete from "@/utils/toDelete"

interface DeleteStudyNoteButtonProps {
  studyNoteId: number
}

const DeleteStudyNoteButton: FC<DeleteStudyNoteButtonProps> = ({studyNoteId}) => {
  const router = useRouter()

  async function deleteStudyNote() {
    await toDelete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-notes/delete`, studyNoteId)

    router.push("/study-notes")
  }

  return (
    <div className="w-full flex">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="mx-auto mb-8">
            Delete Study Note
          </Button>
        </DialogTrigger>
        <DialogContent className="w-4/5">
          <h2 className="text-center"> Are you sure you want to delete this study note? </h2>
          <Button variant="destructive" onClick={() => deleteStudyNote()}>
            Delete Study Note
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DeleteStudyNoteButton