import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import React, { FC, useState } from "react"

const NotesCardNew: FC = () => {
  const [answerInitial, setAnswerinitial] = useState<string>('')
  const [questionInitial, setQuestionInitial] = useState<string>('')

  function createQuizItem() {
    const quizItemInitial : QuizItem = {
      question: questionInitial,
      answer: answerInitial
    }

    setAnswerinitial('')
    setQuestionInitial('')
  }

  return (
    <div className="mt-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button> Create New Study Note </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Quiz Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="answer" className="text-right">
                Answer
              </Label>
              <Input
                id="answer"
                placeholder="Set Answer to the Question"
                className="col-span-3"
                value={answerInitial}
                onChange={(e) => setAnswerinitial(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="question" className="text-right">
                Question
              </Label>
              <Textarea
                id="question"
                placeholder="Set your Quiz Question Here"
                className="col-span-3"
                value={questionInitial}
                onChange={(e) => setQuestionInitial(e.target.value)}
              />
            </div>
          </div>
          <DialogClose asChild>
            <Button type="button">
              Create Quiz Item
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NotesCardNew