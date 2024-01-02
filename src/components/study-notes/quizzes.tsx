'use client'

import { FC, useState } from "react";
import { Separator } from "../ui/separator";
import { QuizEdit } from "./quizEdit";
import { QuizCreate } from "./quizCreate";

interface QuizzzesProps {
  quizItems: Array<QuizItem>
  setQuizItems: React.Dispatch<React.SetStateAction<Array<QuizItem>>>
  embed: (question: string) => Promise<void>
  studyNoteId: number
}

const Quizzes: FC<QuizzzesProps> = ({quizItems, setQuizItems, embed, studyNoteId}) => {

  return (
    <div className="flex flex-col h-auto mb-8 w-full">
      {quizItems.map((quizItem, index) => {
        return (
          <div key={index} className="flex w-5/6 h-auto mt-8 bg-gray-50 mx-auto rounded-lg shadow-lg borderborderborder p-8">
            <button className="text-white h-8 w-8 my-auto mr-8 bg-black rounded-full" onClick={() => embed(quizItem.question)}>
              <i className="fas fa-search"></i>
            </button>
            <p className="w-2/6 h-auto"> {quizItem.answer} </p>
            <Separator orientation="vertical" className="mx-4 w-[2px]" />
            <p className="w-3/6 h-auto"> {quizItem.question} </p>
            <QuizEdit quizItems={quizItems} setQuizItems={setQuizItems} index={index} studyNoteId={studyNoteId}/>
          </div>
        )
      })}
      <QuizCreate quizItems={quizItems} setQuizItems={setQuizItems} studyNoteId={studyNoteId}/>
    </div>
  );
};

export default Quizzes;
