import { Button } from "@/components/ui/button";
import React, { FC, SetStateAction, useState } from "react";
import { Dispatch } from "react";
import { Separator } from "@/components/ui/separator";

import { CardContent } from "@/components/ui/card";

interface OpenEndedProps {
  question: string;
  answer: string;
  onSubmit: (userAnswer: string) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
  mockQuizData: Object[];
}

const OpenEnded: FC<OpenEndedProps> = ({
  question,
  answer,
  onSubmit,
  setCurrentQuestionIndex,
  currentQuestionIndex,
  mockQuizData,
}) => {
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [checkedAnswer, setCheckedAnswer] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(userAnswer);
    resetToDefaultAnswer();
    setIsSubmit(false);
  };

  function resetToDefaultAnswer() {
    setUserAnswer("");
  }

  const DisplayCorrectAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmit(true);
  };

  const quizLength: number = mockQuizData.length;
  console.log(quizLength);

  return (
    <>
      {!isSubmit ? (
        <CardContent className="px-10 py-8 h-full">
          <form className="text-base" onSubmit={DisplayCorrectAnswer}>
            {question && answer ? (
              <>
                <div className="flex flex-col">
                  <p className=" break-words">{question}</p>
                  <div>
                    <Separator className="bg-black my-8 h-0.5" />
                    <div className="flex w-full">
                      <div className="flex flex-col w-full pr-4">
                        <input
                          id="answerInput"
                          className="border-b-2 border-black/30 bg-inherit active:border-none focus:border-green-500 focus:border-b-4 focus:ease-in-out direction-reverse focus:duration-75 focus:ring-0 focus:outline-none rounded-none text-base pl-2 h-8 w-full focus:shadow-md mb-1"
                          type="text"
                          value={userAnswer}
                          onChange={handleChange}
                          placeholder="Answer"
                        />

                        <p className="text-sm">Type The Answer</p>
                      </div>
                      <div>
                        <Button
                          className="py-1 px-5 bg-gray-500 hover:bg-gray-700 rounded-xl"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </>
            ) : (
              <p>No quiz data available.</p>
            )}
          </form>
        </CardContent>
      ) : (
        <>
          <CardContent className="px-10 py-8 w-full h-auto ">
            <h2>Is your answer correct?</h2>
            <div className="flex flex-col py-5">
              <p className="text-base">Question:</p>
              <p className="text-xl">{question}</p>
            </div>
            <div className="w-full pb-8 pt-5">
              <p className="text-base">Correct Answer:</p>
              <p className="text-xl">{answer}</p>
            </div>
            <Button className="mb-3" onClick={() => handleSubmit()}>
              Next Question
            </Button>
          </CardContent>
        </>
      )}
    </>
  );
};

export default OpenEnded;
