import { OutputData } from "@editorjs/editorjs";

// for editor.js version 2.28.2
export default function toNotesData(sentences : Array<Sentence>) : OutputData {
  const time = getCurrentTime()

  console.log(time)

  const blockData = sentences.map((sentence) => {
    const id = sentence.id
    const text = sentence.text
    const type = sentence.type
    
    const blockDataInitial = toBlockData(id, text, type)

    return blockDataInitial
  })

  const NotesData = {
    time: time,
    blocks: blockData,
    version: '2.28.2'
  }

  return NotesData
}

function toBlockData(id: string, text : string, type: "header" | "paragraph", level? : number) : TextBlock {
  if (type === "header") {
    const headerBlock : HeaderBlock = {
      data: {
        level: level | 2,
        text: text
      },
      id: id,
      type: 'header'
    }

    return headerBlock
  }

  if (type === "paragraph") {
    const paragraphBlock : ParagraphBlock = {
      data: {
        text: text
      },
      id: id,
      type: 'paragraph'
    }

    return paragraphBlock
  }

  const emptyBlock : ParagraphBlock = {
    data: {
      text: ""
    },
    id: "",
    type: 'paragraph'
  }

  return emptyBlock
}

function getCurrentTime() : number {
  return new Date().getTime()
}