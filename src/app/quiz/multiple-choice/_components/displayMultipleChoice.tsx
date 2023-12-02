import { Button } from "@/components/ui/button";
import { FC, useState, useEffect, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from "react";

interface AnswerKeyItem {
  answers: {
    choices?: any[] ; correctAnswer: string; wrongAnswers: string[] 
};
  question: string;
}

interface AnswerKey extends Array<AnswerKeyItem> {}

const initialAnswerKey: AnswerKey = [
  {
    question: 'What is the Capital of the Philippines',
    answers: {
      correctAnswer: 'Manila',
      wrongAnswers: ['wrong answer', 'Nope', 'Wrong again'],
    },
  },
  {
    question: 'Thing starts with the letter "W"',
    answers: {
      correctAnswer: 'World',
      wrongAnswers: ['wrong answer', 'Nope', 'Wrong again'],
    },
  },
  {
    question: 'Iloilo is known for',
    answers: {
      correctAnswer: 'City of Love',
      wrongAnswers: ['wrong answer', 'Nope', 'Wrong again'],
    },
  },
  {
    question: 'What is Boracay known for',
    answers: {
      correctAnswer: 'Beautiful white beach',
      wrongAnswers: ['wrong answer', 'Nope', 'Wrong again'],
    },
  },
];

export const MultipleChoiceQuiz: FC = () => {
  const [shuffledAnswerKey, setShuffledAnswerKey] = useState<AnswerKey>([]);

  useEffect(() => {
    const shuffleArray = (array: AnswerKey) => {
      return array.map((item) => ({
        ...item,
        answers: {
          correctAnswer: item.answers.correctAnswer,
          wrongAnswers: item.answers.wrongAnswers,
          choices: [...item.answers.wrongAnswers, item.answers.correctAnswer].sort(() => Math.random() - 0.5),
        },
      })).sort(() => Math.random() - 0.5);
    };

    setShuffledAnswerKey(shuffleArray(initialAnswerKey));
  }, []);

  return (
    <>
      <div>
        {shuffledAnswerKey.map((answer, index) => (
          <div key={index}>
            <div>{answer.question}</div>
            {answer.answers.choices.map((ans: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode, subIndex: Key) => (
              <div key={subIndex}>
                <Button>{ans}</Button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default MultipleChoiceQuiz