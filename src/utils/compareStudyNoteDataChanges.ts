import { OutputData } from "@editorjs/editorjs";

export default function compareStudyNoteDataChanges(oldData : OutputData, newData : OutputData) {
  const oldBlocks = oldData.blocks || [];
  const newBlocks = newData.blocks || [];

  const addedBlocks : Array<TextBlock> = [];
  const editedBlocks : Array<TextBlock> = [];
  const deletedBlocks : Array<TextBlock> = [];

  newBlocks.forEach((newBlock : TextBlock) => {
    const sameBlockId = oldBlocks.find(oldBlock => oldBlock.id === newBlock.id)
    if (sameBlockId) {
      const isNotEdited = areBlocksEqual(newBlock, sameBlockId)
      if (!isNotEdited) {
        console.log(sameBlockId, sameBlockId)
        editedBlocks.push(newBlock)
      }
    } else {
      addedBlocks.push(newBlock)
    }
  })

  oldBlocks.forEach((oldBlock : TextBlock) => {
    const isDeleted = !newBlocks.some(newBlock => newBlock.id === oldBlock.id)
    if (isDeleted) {
      deletedBlocks.push(oldBlock)
    }
  })

  return { addedBlocks, editedBlocks, deletedBlocks };
}

function areBlocksEqual(block1, block2): boolean {
  return JSON.stringify(block1.data.text) === JSON.stringify(block2.data.text);
}