/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import OpenEnded from "./OpenEnded";

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
      question: "Mount Everest is the highest peak in the Himalayan Mountains.",
      answer: "Himalayan",
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
    <div className="border-solid lg:p-64 border-black/25 border-2 shadow-xl rounded-lg">
      {currentQuestionIndex < mockQuizData.length ? (
        <OpenEnded
          question={mockQuizData[currentQuestionIndex].question}
          answer={mockQuizData[currentQuestionIndex].answer}
          onSubmit={handleQuizSubmit}
        />
      ) : (
        <p>Congratulations! You've completed the quiz.</p>
      )}
    </div>
  );
};

export default HandleQuiz;
