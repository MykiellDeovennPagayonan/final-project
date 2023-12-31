// This converts the text data back to acceptable form for the database

import { OutputData } from "@editorjs/editorjs";

export default function toTableData(notesData : OutputData, studyNoteId : number) : Array<Sentence> {
  const blocks : Array<TextBlock> = notesData.blocks as Array<TextBlock> 

  const sentences = blocks.map((block) => {
    return ({
      id: block.id,
      text: block.data.text,
      type: block.type,
      studyNoteId: studyNoteId
    })
  })

  return sentences
}