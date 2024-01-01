import { FC } from "react"
import generateQuiz from "@/utils/generateQuiz"

interface TextGenerateQuizProps {
  xCursorPosition: number
  yCursorPosition: number
  selectedText: string
}

const TextGenerateQuiz : FC<TextGenerateQuizProps> = ( {xCursorPosition, yCursorPosition, selectedText} ) => {

  return (
    <button className="highlighted-popup bg-white border p-[20px] shadow-md fixed" 
      style={{ top: `${yCursorPosition}px`, left: `${xCursorPosition}px`, zIndex: 9999 }}
      onClick={() => generateQuiz(selectedText)}
    >
      Qenerate Quiz from Selected Text
    </button>
  )
}

export default TextGenerateQuiz