/* eslint-disable react/no-unescaped-entities */

import HandleQuiz from "./_components/QuizHandler";
import { FC } from "react";

export const metadata = {
  title: "Quiz | Scriba",
};

interface StudyNoteProps {
  params: {
    id: string;
  };
}

const IdentificationQuiz: FC<StudyNoteProps> = ({ params }) => {
  const studyNoteId = Number(params.id);
  return (
    <>
      <div className="flex flex-row justify-center h-screen max-w-screen-xl mx-auto">
        <HandleQuiz studyNoteId={studyNoteId} />
      </div>
      <div className="max-h"></div>
    </>
    
  );
};

export default IdentificationQuiz;
