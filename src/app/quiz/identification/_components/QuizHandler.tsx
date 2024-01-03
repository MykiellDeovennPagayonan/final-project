/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import OpenEnded from "./OpenEnded";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import QuizNavbar from "./QuizNavbar";

const HandleQuiz = () => {
  const mockQuizData: Array<QuizItem> = [
    {
      id: 109382019921,
      question: "The largest continent on Earth. ",
      answer: "Asia",
    },
    {
      id: 123125,
      question: "The Declaration of Independence was signed in 1776.",
      answer: "1776",
    },
    {
      id: 2131235,
      question: "Mount Everest is the highest peak in the HIMALAYAN Mountains.",
      answer: "himalayan",
    },
    {
      id: 123252,
      question: "The currency of Japan is the Yen.",
      answer: "Yen",
    },
    {
      id: 123,
      question: "The Great Wall of China is over 21,000 kilometers long.",
      answer: "21,000",
    },
    {
      id: 10214912,
      question: "The capital of France is Paris.",
      answer: "Paris",
    },
    {
      id: 17,
      question: "The largest mammal on Earth is the blue whale.",
      answer: "blue whale",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [correctScore, setCorrectScore] = useState<number>(0);
  const [incorrectScore, setIncorrectScore] = useState<number>(0);
  const [initialDataLength, setInitialDataLength] = useState<number>(0);
  const [progressValue, setProgressValue] = useState<number>(100);

  useEffect(() => {
    setProgressValue(100 - (currentQuestionIndex / mockQuizData.length) * 100);
  }, [currentQuestionIndex, mockQuizData.length]);

  useEffect(() => {
    setInitialDataLength(mockQuizData.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleQuizSubmit = (userAnswer: string) => {
    const currentQuestion = mockQuizData[currentQuestionIndex];

    if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setCorrectScore((prevScore) => prevScore + 1);
      alert("Correct!");
    } else {
      setIncorrectScore((prevIncorrectScore) => prevIncorrectScore + 1);
      alert("Incorrect");
    }

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="flex w-full h-full ">
      <QuizNavbar
        correctScore={correctScore}
        incorrectScore={incorrectScore}
        initialDataLength={initialDataLength}
        progressValue={progressValue}
        currentQuestionIndex={currentQuestionIndex}
      />

      <Card className="mt-7 h-fit bg-slate-400 w-full rounded-none">
        {currentQuestionIndex < mockQuizData.length ? (
          <OpenEnded
            question={mockQuizData[currentQuestionIndex].question}
            answer={mockQuizData[currentQuestionIndex].answer}
            onSubmit={handleQuizSubmit}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            currentQuestionIndex={currentQuestionIndex}
            mockQuizData={mockQuizData}
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
