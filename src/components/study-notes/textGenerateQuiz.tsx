import { FC } from "react"
import generateQuiz from "@/utils/generateQuiz"

interface TextGenerateQuizProps {
  xCursorPosition: number
  yCursorPosition: number
  selectedText: string
  quizItems: Array<QuizItem>
  setSelectedText: React.Dispatch<React.SetStateAction<string>>
  setQuizItems: React.Dispatch<React.SetStateAction<Array<QuizItem>>>
  studyNoteId: number
}

const TextGenerateQuiz : FC<TextGenerateQuizProps> = ( {xCursorPosition, yCursorPosition, setSelectedText, selectedText, quizItems, setQuizItems, studyNoteId} ) => {
  async function CreateQuizItemFromText() {
    let newQuizItem = await generateQuiz(selectedText)
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3001/api/study-notes/quizzes/${studyNoteId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({question: newQuizItem.question, answer: newQuizItem.answer, studyNoteId})
    }).then(res => res.json())

    const id = response.body.id

    newQuizItem.id = id

    const quizItemsInitial = [...quizItems, newQuizItem]
    setQuizItems(quizItemsInitial)
    setSelectedText("")
  }

  return (
    <button className="highlighted-popup bg-white border p-[20px] shadow-md fixed" 
      style={{ top: `${yCursorPosition}px`, left: `${xCursorPosition}px`, zIndex: 9999 }}
      onClick={() => CreateQuizItemFromText()}
    >
      Qenerate Quiz from Selected Text
    </button>
  )
}

export default TextGenerateQuiz