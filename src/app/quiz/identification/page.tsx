/* eslint-disable react/no-unescaped-entities */

import HandleQuiz from "./_components/QuizHandler";

export const metadata = {
  title: "Quiz | Scriba",
};

const IdentificationQuiz = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="absolute top-0 mt-10 md:text-3xl text-xl">
        Test your knowledge!
      </h1>
      <HandleQuiz />
    </div>
  );
};

export default IdentificationQuiz;
