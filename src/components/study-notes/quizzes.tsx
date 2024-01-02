'use client'

import { FC, useState } from "react";
import { Separator } from "../ui/separator";
import { QuizEdit } from "./quizEdit";
import { QuizCreate } from "./quizCreate";

const Quizzes: FC = () => {
  const [quizItems, setQuizItems] = useState<Array<QuizItem>>([])

  return (
    <div className="flex flex-col h-auto mb-8 w-full">
      {quizItems.map((quizItem, index) => {
        return(
          <div key={index} className="flex w-5/6 h-auto mt-8 bg-gray-50 mx-auto rounded-lg shadow-lg borderborderborder p-8">
            <p className="w-2/6 h-auto"> {quizItem.answer} </p>
            <Separator orientation="vertical" className="mx-4 w-[2px]"/>
            <p className="w-3/6 h-auto"> {quizItem.question} </p>
            <QuizEdit quizItems={quizItems} setQuizItems={setQuizItems} index={index}/>
          </div>
        )
      })}
      <QuizCreate quizItems={quizItems} setQuizItems={setQuizItems}/>
    </div>
  );
};

export default Quizzes;
