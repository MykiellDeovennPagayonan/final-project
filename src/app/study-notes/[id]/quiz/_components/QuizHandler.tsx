/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { FC, useEffect, useState } from "react";
import OpenEnded from "./OpenEnded";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import QuizNavbar from "./QuizNavbar";
import useFetchData from "@/hooks/useFetchData";

interface StudyNoteProps {
  studyNoteId: number
}

const HandleQuiz : FC<StudyNoteProps> = ( {studyNoteId} ) => {
  const { data: quizItems, error} = useFetchData(`http://localhost:3001/api/study-notes/quizzes/${studyNoteId}`)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [correctScore, setCorrectScore] = useState<number>(0);
  const [incorrectScore, setIncorrectScore] = useState<number>(0);
  const [progressValue, setProgressValue] = useState<number>(100);

  useEffect(() => {
    if (quizItems) {
      setProgressValue(100 - (currentQuestionIndex / quizItems.length) * 100);
    }
  }, [currentQuestionIndex, quizItems]);

  const handleQuizSubmit = (userAnswer: string) => {
    const currentQuestion = quizItems[currentQuestionIndex];

    if (userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim()) {
      setCorrectScore((prevScore) => prevScore + 1);
      alert("Correct!");
    } else {
      setIncorrectScore((prevIncorrectScore) => prevIncorrectScore + 1);
      alert("Incorrect");
    }

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  if (!quizItems) {
    return <div> I am waiting </div>
  }

  return (
    <div className="flex w-full h-full ">
      <QuizNavbar
        correctScore={correctScore}
        incorrectScore={incorrectScore}
        initialDataLength={quizItems.length}
        progressValue={progressValue}
        currentQuestionIndex={currentQuestionIndex}
      />

      <Card className="mt-7 h-fit bg-slate-400 w-full rounded-none">
        {currentQuestionIndex < quizItems.length ? (
          <OpenEnded
            question={quizItems[currentQuestionIndex].question}
            answer={quizItems[currentQuestionIndex].answer}
            onSubmit={handleQuizSubmit}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            currentQuestionIndex={currentQuestionIndex}
            mockQuizData={quizItems}
          />
        ) : (
          <>
            <p>Congratulations! You've completed the quiz.</p>
            <Button>Try again?</Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default HandleQuiz;
