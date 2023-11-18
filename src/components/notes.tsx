'use client'

import { FC, useState, useEffect, useRef } from "react";
import EditorJS, {OutputData} from "@editorjs/editorjs";

const Notes: FC = () => {
  const [data, setData] = useState<OutputData>(undefined)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const ref = useRef<EditorJS>()

  async function initializeEditor() {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const List = (await import("@editorjs/list")).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          list: List
        },
        onChange: () => {
          ref.current.save().then((outputData) => {
            setData(outputData)

            console.log(outputData)
          });
        }
      })

      ref.current = editor
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
    <div className="flex h-screen w-full bg-white">
      <div
        className="h-auto w-5/6 bg-gray-50 mt-24 m-auto rounded-lg shadow-lg border border-gray-200 p-8"
        style={{ minHeight: 200 }}
      >
        <div id="editorjs" className="h-full w-full"></div>
      </div>
    </div>
  );
};

export default Notes;
