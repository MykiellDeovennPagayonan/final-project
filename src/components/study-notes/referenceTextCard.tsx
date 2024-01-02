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

interface ReferenceTextCardProps {
  embed(question: string): Promise<void>
  quizItem: QuizItem
  referenceText: string
  setReferenceText: React.Dispatch<React.SetStateAction<string>>
}

const ReferenceTextCard: FC<ReferenceTextCardProps> = ({ embed, quizItem, referenceText, setReferenceText }) => {

  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-white h-8 w-8 my-auto mr-8 bg-black rounded-full" onClick={() => embed(quizItem.question)}>
            <i className="fas fa-search"></i>
          </button>
        </DialogTrigger>
        <DialogContent className="fixed h-4/5 w-4/5">
          <DialogTitle>Create New Study Note</DialogTitle>
          <div className="flex p-4">
            {referenceText}
          </div>
          <DialogClose asChild>
            <Button onClick={() => setReferenceText("")}>
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ReferenceTextCard