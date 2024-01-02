'use client'

import NotesEditor from "./notesEditor";

import { FC, useState, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import TextGenerateQuiz from "./textGenerateQuiz";

interface NotesProps {
  setNotesData: React.Dispatch<React.SetStateAction<OutputData>>
  notesData: OutputData
  quizItems: Array<QuizItem>
  setQuizItems: React.Dispatch<React.SetStateAction<Array<QuizItem>>>
  studyNoteId: number
}

const Notes: FC<NotesProps> = ({ setNotesData, notesData, quizItems, setQuizItems, studyNoteId }) => {
  const [editorInstance, setEditorInstance] = useState<EditorJS>()
  const [xCursorPosition, setXCursorPosition] = useState<number>(0)
  const [yCursorPosition, setYCursorPosition] = useState<number>(0)
  const [selectedText, setSelectedText] = useState<string>()

  useEffect(() => {
    if (editorInstance) {
      const holder = document.getElementById("editorjs");

      holder.addEventListener("mouseup", function (event) {
        const text = window.getSelection().toString()

        setXCursorPosition(event.clientX)
        setYCursorPosition(event.clientY)

        setSelectedText(text)
      });
    }

  }, [editorInstance])


  return (
    <div className="flex h-auto mt-4 mb-8 w-full bg-white">
      {selectedText?.length > 0 && <TextGenerateQuiz setSelectedText={setSelectedText} studyNoteId={studyNoteId} quizItems={quizItems} setQuizItems={setQuizItems} selectedText={selectedText} xCursorPosition={xCursorPosition} yCursorPosition={yCursorPosition}/>}
      <div
        className="h-[700px] w-5/6 bg-gray-50 m-auto rounded-lg shadow-lg border border-gray-200 p-8 overflow-hidden overflow-y-scroll"
        style={{ minHeight: 200 }}
      >
        <NotesEditor notesData={notesData} setNotesData={setNotesData} setEditorInstance={setEditorInstance} />
      </div>
    </div>
  );
};

export default Notes;
