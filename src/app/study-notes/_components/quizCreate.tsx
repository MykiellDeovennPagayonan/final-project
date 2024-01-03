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
import { Textarea } from "../../../components/ui/textarea"
import React, { FC, useState } from "react"

interface QuizCreateProps {
  quizItems: Array<QuizItem>
  setQuizItems: React.Dispatch<React.SetStateAction<Array<QuizItem>>>;
  studyNoteId: number
}

export const QuizCreate: FC<QuizCreateProps> = ({quizItems, setQuizItems, studyNoteId}) => {
  const [answerInitial, setAnswerinitial] = useState<string>('')
  const [questionInitial, setQuestionInitial] = useState<string>('')

  async function createQuizItem() {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3001/api/study-notes/quizzes/${studyNoteId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({question: questionInitial, answer: answerInitial, studyNoteId})
    }).then(res => res.json())

    const id = response.body.id

    const quizItemInitial : QuizItem = {
      id: id,
      question: questionInitial,
      answer: answerInitial
    }

    setQuizItems([...quizItems, quizItemInitial])
    setAnswerinitial('')
    setQuestionInitial('')
  }

  return (
    <div className="mx-auto mt-8">
      <Dialog>
        <DialogTrigger asChild>
          <Button> Create New Quiz Item </Button>
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
            <Button type="button" onClick={() => createQuizItem()}>
              Create Quiz Item
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}
