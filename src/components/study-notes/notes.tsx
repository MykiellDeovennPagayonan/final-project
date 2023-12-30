'use client'

import { FC, useState, useEffect, useRef } from "react";
import EditorJS, {OutputData} from "@editorjs/editorjs";

interface NotesProps {
  setNotesData: React.Dispatch<React.SetStateAction<OutputData>>
}

const Notes: FC<NotesProps> = ({setNotesData}) => {
  const [data, setData] = useState<OutputData>(undefined)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const ref = useRef<EditorJS>()

  async function initializeEditor() {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editorjs", // Specify the holder id
        tools: {
          header: Header,
        },
        onChange: () => {
          editor.save().then((outputData) => {
            setNotesData(outputData)
            setData((prevData) => {
              console.log(outputData);
              return outputData;
            })
          });
        }
      })

      const holder = document.getElementById("editorjs");

      holder.addEventListener("mouseup", function() {
        console.log(data)
        // // Get the selected text
        // const selectedText = window.getSelection().toString()
        // // Get the number of rendered blocks
        // const blocksCount = editor.blocks.getBlocksCount();
      
        // // Initialize an array to store the selected blocks
        // const selectedBlocks = [];
      
        // // Loop through the blocks
        // for (let i = 0; i < blocksCount; i++) {
        //   // Get the block API for the current block
        //   const currentBlock = editor.blocks.getBlockByIndex(i);
      
        //   // Get the block content as a string
        //   const blockContent = JSON.stringify(currentBlock.data);
      
        //   // Check if the selected text contains the block content
        //   if (selectedText.includes(blockContent)) {
        //     // Push the block API to the selected blocks array
        //     selectedBlocks.push(currentBlock);
        //   }
        // }
      
        // // Check if the selected blocks array is not empty
        // if (selectedBlocks.length > 0) {
        //   // Display the selected blocks in an alert box
        //   console.log(`You selected ${selectedBlocks.length} blocks: ${JSON.stringify(selectedBlocks)}`);
        // }
      });
      

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
    <div className="flex h-auto mt-4 mb-8 w-full bg-white">
      <div
        className="h-[700px] w-5/6 bg-gray-50 m-auto rounded-lg shadow-lg border border-gray-200 p-8 overflow-hidden overflow-y-scroll"
        style={{ minHeight: 200 }}
      >
        <div id="editorjs" className="h-full w-full"></div>
      </div>
    </div>
  );
};

export default Notes;
