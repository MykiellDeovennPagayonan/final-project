import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import React, { FC, useState } from "react"
import toDelete from "@/utils/toDelete"

interface DeleteQuizItemProps {
  quizItemId: number
  index: number
  quizItems: Array<QuizItem>
  setQuizItems: React.Dispatch<React.SetStateAction<Array<QuizItem>>>
}

export const DeleteQuizItem: FC<DeleteQuizItemProps> = ({ quizItemId, index, quizItems, setQuizItems }) => {

  async function handleDeleteQuizItem() {
    await toDelete("http://localhost:3001/api/study-notes/quizzes/delete", quizItemId)

    let quizItemsInitial = [...quizItems]

    quizItemsInitial.splice(index, 1)
    setQuizItems(quizItemsInitial)
  }

  return (
    <div className="ml-auto">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Delete</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure you want to Delete?</DialogTitle>
          </DialogHeader>
          <DialogClose asChild>
            <Button variant="destructive" onClick={() => handleDeleteQuizItem()}>
              Delete Study Note
            </Button>
          </DialogClose>

        </DialogContent>
      </Dialog>
    </div>
  )
}
