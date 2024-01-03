/* eslint-disable react/no-unescaped-entities */

import HandleQuiz from "./_components/QuizHandler";
import QuizNavbar from "./_components/QuizNavbar";

export const metadata = {
  title: "Quiz | Scriba",
};

const IdentificationQuiz = () => {
  return (
    <>
      <div className="flex flex-row justify-center px-10 h-screen w-screen bg-gray-200">
        <HandleQuiz />
      </div>
    </>
  );
};

export default IdentificationQuiz;
