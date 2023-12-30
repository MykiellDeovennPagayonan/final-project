/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import OpenEnded from "./OpenEnded";
import { Button } from "@/components/ui/button";

const HandleQuiz = () => {
  const mockQuizData = [
    {
      quizID: "109382019u921",
      question: "The largest ocean on Earth.",
      answer: "Pacific",
    },
    {
      quizID: "123125",
      question: "The Declaration of Independence was signed in 1776.",
      answer: "1776",
    },
    {
      quizID: "2131235",
      question: "Mount Everest is the highest peak in the HIMALAYAN Mountains.",
      answer: "himalayan",
    },
    {
      quizID: "123252",
      question: "The currency of Japan is the Yen.",
      answer: "Yen",
    },
    {
      quizID: "aousdbsa",
      question: "The Great Wall of China is over 21,000 kilometers long.",
      answer: "21,000",
    },
    {
      quizID: "10214912",
      question: "The capital of France is Paris.",
      answer: "Paris",
    },
    {
      quizID: "IWILLBECOMERICH",
      question: "The largest mammal on Earth is the blue whale.",
      answer: "blue whale",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleQuizSubmit = (userAnswer: string) => {
    const currentQuestion = mockQuizData[currentQuestionIndex];

    if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      alert("Correct!");
    } else {
      alert("Incorrect. Try again!");
    }

    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="flex flex-col border-solid border-black/30 border-2 rounded-lg h-1/2 w-1/2">
      {/* Quiz Title */}
      <div className="flex justify-between items-center border-solid border-b border-black/25 h-12">
        <div className="pl-10 font-medium">
          {currentQuestionIndex <= mockQuizData.length - 1 ? (
            <p>Quiz Number {currentQuestionIndex + 1}</p>
          ) : (
            <p>Quiz Done</p>
          )}
        </div>
        <div className="pr-10 font-medium">Quiz TOPIC HERE</div>
      </div>
      <div className=" h-full">
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
      </div>
    </div>
  );
};

export default HandleQuiz;
