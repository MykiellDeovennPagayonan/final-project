/* eslint-disable react/no-unescaped-entities */

import HandleQuiz from "./_components/QuizHandler";

export const metadata = {
  title: "Quiz | Scriba",
};

const IdentificationQuiz = () => {
  return (
    <>
      <div className="flex flex-row justify-center h-screen max-w-screen-xl bg-gray-200 mx-auto">
        <HandleQuiz />
      </div>
    </>
  );
};

export default IdentificationQuiz;
