'use client'

import { FC, useState } from "react";
import { Separator } from "./ui/separator";
import { QuizEdit } from "./quizzes/quizEdit";

const Quizzes: FC = () => {

  return (
    <div className="flex flex-col h-auto mb-8 w-full">
      <div className="flex w-5/6 h-auto mt-8 bg-gray-50 mx-auto rounded-lg shadow-lg border border-gray-200 p-8">
        <p className="w-2/6 h-auto"> Hello hi I am mykiell deovenn E. Pagayonan sssss </p>
        <Separator orientation="vertical" className="mx-4 w-[2px]"/>
        <p className="w-3/6 h-auto"> hey hey !</p>
        <QuizEdit />
      </div>
    </div>
  );
};

export default Quizzes;
