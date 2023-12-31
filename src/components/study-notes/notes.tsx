'use client'

import NotesEditor from "./notesEditor";

import { FC, useState, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

interface NotesProps {
  setNotesData: React.Dispatch<React.SetStateAction<OutputData>>
  notesData: OutputData
}

const Notes: FC<NotesProps> = ({ setNotesData, notesData }) => {
  const [editorInstance, setEditorInstance] = useState<EditorJS>()

  useEffect(() => {
    if (editorInstance) {
      const holder = document.getElementById("editorjs");

      holder.addEventListener("mouseup", function () {
        document.execCommand('copy')

        navigator.clipboard.readText()
          .then(text => {
            console.log(text);
          })
          .catch(err => {
            console.error(err);
          });

        navigator.clipboard.writeText("")
          .then(() => {
            console.log("Clipboard cleared");
          })
          .catch(err => {
            console.error("Failed to clear clipboard: ", err);
          });

      });
    }

  }, [editorInstance])


  return (
    <div className="flex h-auto mt-4 mb-8 w-full bg-white">
      <div
        className="h-[700px] w-5/6 bg-gray-50 m-auto rounded-lg shadow-lg border border-gray-200 p-8 overflow-hidden overflow-y-scroll"
        style={{ minHeight: 200 }}
      >
        <NotesEditor setNotesData={setNotesData} setEditorInstance={setEditorInstance} />
      </div>
    </div>
  );
};

export default Notes;
