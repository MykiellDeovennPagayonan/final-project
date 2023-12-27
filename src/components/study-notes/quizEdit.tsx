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

interface QuizEditProps {
  quizItems: Array<QuizItem>
  setQuizItems: React.Dispatch<React.SetStateAction<Array<QuizItem>>>;
  index: number
}

export const QuizEdit: FC<QuizEditProps> = ({ quizItems, setQuizItems, index }) => {
  const [answerInitial, setAnswerinitial] = useState<string>(quizItems[index].answer)
  const [questionInitial, setQuestionInitial] = useState<string>(quizItems[index].question)

  function saveQuizItem() {
    const quizItemInitial: QuizItem = {
      question: questionInitial,
      answer: answerInitial
    }

    let quizItemsInitial = [...quizItems]
    quizItemsInitial[index] = quizItemInitial
    setQuizItems(quizItemsInitial)
  }

  return (
    <div className="ml-auto">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Quiz Item</DialogTitle>
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
            <Button type="button" onClick={() => saveQuizItem()}>
              Save
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}
