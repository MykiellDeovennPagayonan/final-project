'use client'

import { FC, useState, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

interface NotesProps {
  setNotesData: React.Dispatch<React.SetStateAction<OutputData>>
  setEditorInstance: React.Dispatch<React.SetStateAction<EditorJS>>
}

const NotesEditor: FC<NotesProps> = ({ setNotesData, setEditorInstance }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const ref = useRef<EditorJS>()

  async function initializeEditor() {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
        },
        onChange: () => {
          editor.save().then((outputData) => {
            setNotesData(outputData)
            console.log(outputData)
          });
        }
      })

      ref.current = editor
      setEditorInstance(editor)
    }
  }

  useEffect(() => {
    if (typeof window != "undefined") {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    async function initialize() {
      await initializeEditor()
    }

    if (isMounted) {
      initialize()

      return () => {
        if (ref.current) {
          ref.current.destroy()
        }
      }
    }

  }, [isMounted])

  return (
    <div id="editorjs" className="h-full w-full bg-green-50"></div>
  );
};

export default NotesEditor;