// components/FillInTheBlankQuiz.js
import React, { useState } from "react";

interface OpenEndedProps {
  question?: string;
  answer?: string;
  onSubmit: (userAnswer: string) => void;
}

const OpenEnded: React.FC<OpenEndedProps> = ({
  question,
  answer,
  onSubmit,
}) => {
  const [userAnswer, setUserAnswer] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(userAnswer);
  };

  return (
    <form onSubmit={handleSubmit}>
      {question && answer ? (
        <>
          {question.split(answer).map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index < question.split(answer).length - 1 && (
                <input
                  type="text"
                  value={userAnswer}
                  onChange={handleChange}
                  placeholder="Type your answer"
                />
              )}
            </React.Fragment>
          ))}
        </>
      ) : (
        <p>No quiz data available.</p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default OpenEnded;
