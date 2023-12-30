import { Button } from "@/components/ui/button";
import React, { SetStateAction, useState } from "react";
import { Dispatch } from "react";
import { Input } from "@/components/ui/input";

interface OpenEndedProps {
  question: string;
  answer: string;
  onSubmit: (userAnswer: string) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
  mockQuizData: Object[];
}

const OpenEnded: React.FC<OpenEndedProps> = ({
  question,
  answer,
  onSubmit,
  setCurrentQuestionIndex,
  currentQuestionIndex,
  mockQuizData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(userAnswer);
    resetToDefaultAnswer();
  };

  function resetToDefaultAnswer() {
    setUserAnswer("");
  }

  const quizLength: number = mockQuizData.length;
  console.log(quizLength);

  function prevQuestion() {
    if (currentQuestionIndex < 1) {
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  }

  function nextQuestion() {
    // if (currentQuestionIndex >= quizLength - 1) return;
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  const answerIndex = question.toLowerCase().indexOf(answer.toLowerCase());
  console.log(answerIndex);

  return (
    <div className="grid grid-rows-2 w-full h-full ">
      <form className="text-lg" onSubmit={handleSubmit}>
        <div className=" flex items-end justify-center w-full h-full">
          {question && answer ? (
            <>
              {answerIndex !== -1 ? (
                <>
                  <div className="flex items-center">
                    {question.substring(0, answerIndex)}{" "}
                    <label htmlFor="answerInput" className="sr-only">
                      Enter your answer:
                    </label>
                    <Input
                      id="answerInput"
                      className="border border-black/70 rounded-sm text-base px-2 mx-1 h-8"
                      type="text"
                      value={userAnswer}
                      onChange={handleChange}
                      placeholder="Answer"
                      style={{ width: "110px" }}
                    />{" "}
                    {question.substring(answerIndex + answer.length)}
                  </div>
                </>
              ) : (
                <p className="flex items-center">
                  <label htmlFor="answerInput" className="sr-only">
                    Enter your answer:
                  </label>
                  <Input
                    id="answerInput"
                    className="border border-black/70 rounded-sm text-base pl-2 pr-2 mx-1 h-8"
                    type="text"
                    value={userAnswer}
                    onChange={handleChange}
                    placeholder="Answer"
                    style={{ width: "110px" }}
                  />{" "}
                  {question}
                </p>
              )}
            </>
          ) : (
            <p>No quiz data available.</p>
          )}
        </div>
        <div className="flex items-end justify-between h-full pb-3">
          <div className="pl-10 gap-2 grid grid-flow-col">
            <Button
              type="button"
              className="rounded-full"
              onClick={() => prevQuestion()}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
            <Button
              type="button"
              className="rounded-full"
              onClick={() => nextQuestion()}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
          </div>
          <div className="flex items-end justify-end pr-10">
            <button
              className="py-1 px-5 hover:bg-blue-300/30 bg-blue-300 rounded-xl"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OpenEnded;
