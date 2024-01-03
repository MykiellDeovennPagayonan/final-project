import { Button } from "@/components/ui/button";
import React, { FC, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface QuizNavbarProps {
  correctScore: number;
  incorrectScore: number;
  initialDataLength: number;
  progressValue: number;
  currentQuestionIndex: number;
}

const QuizNavbar: FC<QuizNavbarProps> = ({
  correctScore,
  incorrectScore,
  initialDataLength,
  progressValue,
  currentQuestionIndex,
}) => {
  const [correctProgressValue, setCorrectProgressValue] = useState<number>(0);
  const [incorrectProgressValue, setIncorrectProgressValue] =
    useState<number>(0);

  useEffect(() => {
    const totalQuestions = initialDataLength;

    setCorrectProgressValue((correctScore / totalQuestions) * 100);
    setIncorrectProgressValue((incorrectScore / totalQuestions) * 100);
  }, [correctScore, incorrectScore, initialDataLength, currentQuestionIndex]);

  return (
    <div className="grid grid-rows-2 h-screen w-48 bg-blue-300">
      <div className="grid grid-rows-2">
        <div className="grid grid-rows-2 items-center">
          <div className="">
            <Button>
              <svg
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.81809 4.18179C8.99383 4.35753 8.99383 4.64245 8.81809 4.81819L6.13629 7.49999L8.81809 10.1818C8.99383 10.3575 8.99383 10.6424 8.81809 10.8182C8.64236 10.9939 8.35743 10.9939 8.1817 10.8182L5.1817 7.81819C5.09731 7.73379 5.0499 7.61933 5.0499 7.49999C5.0499 7.38064 5.09731 7.26618 5.1817 7.18179L8.1817 4.18179C8.35743 4.00605 8.64236 4.00605 8.81809 4.18179Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              Back
            </Button>
          </div>
          <div>
            <h2>Quiz</h2>
          </div>
        </div>
        <div className="grid grid-rows-3">
          <div className="grid grid-rows-2">
            <div className="flex items-end">
              <Progress value={progressValue} />
            </div>
            <div className="flex justify-between">
              <div>Remaining</div>
              <div>{initialDataLength - currentQuestionIndex}</div>
            </div>
          </div>
          <div className="grid grid-rows-2">
            <div className="flex items-end">
              <Progress value={incorrectProgressValue} />
            </div>
            <div className="flex justify-between">
              <div>Incorrect</div>
              <div>{incorrectScore}</div>
            </div>
          </div>
          <div className="grid grid-rows-2">
            <div className="flex items-end">
              <Progress value={correctProgressValue} />
            </div>
            <div className="flex justify-between">
              <div>Correct</div>
              <div>{correctScore}</div>
            </div>
          </div>
        </div>
      </div>

      <div>3</div>
    </div>
  );
};

export default QuizNavbar;
