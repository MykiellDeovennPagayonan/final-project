"use client";

import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const QuizHomePage: FC = () => {
  return (
    <>
      <div className="max-w-full flex flex-col">
        <h2 className="mx-3 text-center">This is the Quiz Home Page</h2>
        <div className="self-center">
          <p>Multiple Choice Quiz</p>
          <Button>
            <Link href={"./quiz/multiple-choice"}>Go to Multiple Quiz</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuizHomePage;
