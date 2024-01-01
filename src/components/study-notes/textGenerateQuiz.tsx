import { FC } from "react"
import generateQuiz from "@/utils/generateQuiz"

interface TextGenerateQuizProps {
  xCursorPosition: number
  yCursorPosition: number
  selectedText: string
  quizItems: Array<QuizItem>
  setQuizItems: React.Dispatch<React.SetStateAction<Array<QuizItem>>>
}

const TextGenerateQuiz : FC<TextGenerateQuizProps> = ( {xCursorPosition, yCursorPosition, selectedText, quizItems, setQuizItems} ) => {
  async function CreateQuizItemFromText() {
    const newQuizItem = await generateQuiz(selectedText)
    const quizItemsInitial = [...quizItems, newQuizItem]
    setQuizItems(quizItemsInitial)
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