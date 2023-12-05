import React from "react";
import QuizCreation from "./_components/quizCreation";

type Props = {};

export const metadata = {
  title: "Quiz Scirba",
};

const QuizPage = async (props: Props) => {
  // Add an authenticate here to know if user is owner, user
  return (
    <>
      <QuizCreation />
    </>
  );
};

export default QuizPage;
