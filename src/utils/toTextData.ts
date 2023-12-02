import { OutputData } from "@editorjs/editorjs";

// for editor.js version 2.28.2
function toTextData(time : number, blockdata : Array<TextBlock>) : OutputData {
  const textData = {
    time: time,
    blocks: blockdata,
    version: '2.28.2'
  }
  return textData
}

function toBlockData(id: string, text : string, type: "header" | "paragraph", level? : number) : TextBlock {
  if (type === "header") {
    const headerBlock : HeaderBlock = {
      data: {
        level: level,
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