import { Button } from "@/components/ui/button";

import { FC, useState, useEffect } from "react";

interface AnswerKeyItem {
  answers: {
    choices?: any[];
    correctAnswer: string;
    wrongAnswers: string[];
  };
  question: string;
}

interface AnswerKey extends Array<AnswerKeyItem> {}

const initialAnswerKey: AnswerKey = [
  {
    question: "What is the Capital of the Philippines",
    answers: {
      correctAnswer: "Manila",
      wrongAnswers: ["wrong answer", "Nope", "Wrong again"],
    },
  },
  {
    question: 'Thing starts with the letter "W"',
    answers: {
      correctAnswer: "World",
      wrongAnswers: ["wrong answer", "Nope", "Wrong again"],
    },
  },
  {
    question: "Iloilo is known for",
    answers: {
      correctAnswer: "City of Love",
      wrongAnswers: ["wrong answer", "Nope", "Wrong again"],
    },
  },
  {
    question: "What is Boracay known for",
    answers: {
      correctAnswer: "Beautiful white beach",
      wrongAnswers: ["wrong answer", "Nope", "Wrong again"],
    },
  },
];

export const MultipleChoiceQuiz: FC = () => {
  const [shuffledAnswerKey, setShuffledAnswerKey] = useState(initialAnswerKey);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const shuffleArray = (array: AnswerKey) => {
    return array
      .map((item) => ({
        ...item,
        answers: {
          correctAnswer: item.answers.correctAnswer,
          wrongAnswers: item.answers.wrongAnswers,
          choices: [
            ...item.answers.wrongAnswers,
            item.answers.correctAnswer,
          ].sort(() => Math.random() - 0.5),
        },
      }))
      .sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setShuffledAnswerKey(shuffleArray(initialAnswerKey));
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const shuffledAnswers = await shuffleArray(initialAnswerKey);
  //     setShuffledAnswerKey(shuffledAnswers);
  //     console.log('fetch')
  //   };

  //   fetchData();
  // }, []);

  const handleShuffleQuiz = () => {
    setShuffledAnswerKey(shuffleArray(initialAnswerKey));
  };

  const handleAnswerClick = (questionIndex, choiceIndex) => {
    const isCorrect =
      shuffledAnswerKey[questionIndex].answers.correctAnswer ===
      shuffledAnswerKey[questionIndex].answers.choices[choiceIndex];

    setSelectedAnswers((prevSelectedAnswers) => [
      ...prevSelectedAnswers,
      { questionIndex, choiceIndex, isCorrect },
    ]);
  };

  return (
    <>
      <div className="flex justify-between mt-5 mx-10 max-w-full">
        <h3 className="">Multiple Choice Quiz</h3>
        <Button onClick={handleShuffleQuiz} className="bg-cyan-700">
          Shuffle Quiz
        </Button>
      </div>

      <div>
        {shuffledAnswerKey.map((answer, questionIndex) => (
          <div key={questionIndex} className="mb-3">
            {answer.question && answer.answers && answer.answers.choices && (
              <>
                <div>{answer.question}</div>
                <div>
                  {answer.answers.choices.map((choice, choiceIndex) => (
                    <div key={choiceIndex}>
                      <Button
                        className={`mt-1 ${
                          selectedAnswers.find(
                            (a) =>
                              a.questionIndex === questionIndex &&
                              a.choiceIndex === choiceIndex &&
                              !a.isCorrect
                          )
                            ? "bg-red-500"
                            : ""
                        }`}
                        onClick={() =>
                          handleAnswerClick(questionIndex, choiceIndex)
                        }
                      >
                        {choice}
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
