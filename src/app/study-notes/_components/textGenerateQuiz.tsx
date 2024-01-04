import { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import generateQuiz from "@/utils/generateQuiz"
import { toast } from "sonner"

interface TextGenerateQuizProps {
  xCursorPosition: number
  yCursorPosition: number
  selectedText: string
  quizItems: Array<QuizItem>
  setSelectedText: React.Dispatch<React.SetStateAction<string>>
  setQuizItems: React.Dispatch<React.SetStateAction<Array<QuizItem>>>
  studyNoteId: number
}

const TextGenerateQuiz: FC<TextGenerateQuizProps> = ({ xCursorPosition, yCursorPosition, setSelectedText, selectedText, quizItems, setQuizItems, studyNoteId }) => {

  async function CreateQuizItemFromText() {
    setSelectedText("")
    let newQuizItem = await generateQuiz(selectedText)
    console.log(newQuizItem)

    const token = localStorage.getItem("token")

    const response = await fetch(`http://localhost:3001/api/study-notes/quizzes/${studyNoteId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: newQuizItem.question, answer: newQuizItem.answer, studyNoteId })
    }).then(res => res.json())

    const id = response.body.id

    newQuizItem.id = id

    const quizItemsInitial = [...quizItems, newQuizItem]

    setQuizItems(quizItemsInitial)

    toast("Quiz Item has been Created!", {
      description: `Question: ${newQuizItem.question}`,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className=" bg-white border text-sm p-[10px] shadow-md fixed"
          style={{ top: `${yCursorPosition}px`, left: `${xCursorPosition}px`, zIndex: 5 }}
          id="generate-quiz"
        >
          Qenerate Quiz
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" style={{ zIndex: 99 }}>
        <DialogHeader>
          <DialogTitle className="text-center">Generate quiz from</DialogTitle>
        </DialogHeader>
        <h4>
          {selectedText}
        </h4>
        <DialogClose asChild>
          <Button type="button" onClick={() => CreateQuizItemFromText()}>
            Qenerate Quiz
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default TextGenerateQuiz