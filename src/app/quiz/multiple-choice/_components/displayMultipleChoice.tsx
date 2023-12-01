"use client";

let answerKey: Array<Object> = [
  {
    question: 'What is the Capital of the Philippines',
    correctAnswer: 'Manila',
    wrongAnswers: ['wrong answer', 'Nope', 'Wrong again']
  },
  {
    question: 'Thing starts with letter "W"',
    correctAnswer: 'World',
    wrongAnswers: ['wrong answer', 'Nope', 'Wrong again']
  },
  {
    question: 'Iloilo is know for',
    correctAnswer: 'City of Love',
    wrongAnswers: ['wrong answer', 'Nope', 'Wrong again']
  },
  {
    question: 'What is Boracay known for',
    correctAnswer: 'Beautiful white beach',
    wrongAnswers: ['wrong answer', 'Nope', 'Wrong again']
  },
]

export default function MultipleChoiceQuiz() {
  

  return (
    <>
      <div>
        {answerKey.map((quiz, index) => {
          return (
            <div>
              <div>
                {answerKey.question}
              </div>
              <button>{answerKey.correctAnswe}r</button>
            </div>
          )
        })}
      </div>
    </>
  );
}
