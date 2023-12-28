import React, { useState } from "react";

interface OpenEndedProps {
  question: string;
  answer: string;
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
    resetToDefaultAnswer();
  };

  function resetToDefaultAnswer() {
    setUserAnswer("");
  }

  const answerIndex = question.toLowerCase().indexOf(answer.toLowerCase());
  console.log(answerIndex);

  return (
    <div className="grid grid-row-2">
      <form className="text-xl" onSubmit={handleSubmit}>
        <div>
          {question && answer ? (
            <>
              {answerIndex !== -1 ? (
                <>
                  {question.substring(0, answerIndex)}
                  <input
                    className="border border-black/70 rounded-sm text-base pl-2 pr-2"
                    type="text"
                    value={userAnswer}
                    onChange={handleChange}
                    placeholder="Answer"
                    style={{ width: "110px" }}
                  />
                  {question.substring(answerIndex + answer.length)}
                </>
              ) : (
                <p>
                  <input
                    className="border border-black/70 rounded-sm text-base pl-2 pr-2"
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
        <div className="flex items-center justify-end mt-3">
          <button
            className="py-1 px-5 hover:bg-blue-300/30 bg-blue-300 rounded-xl"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default OpenEnded;
