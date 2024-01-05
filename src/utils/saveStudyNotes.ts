

export default async function toSaveNotes(studyNoteId: number, notesData : StudyNoteChanges) {

  function extractToSentences(blocks : Array<TextBlock>) {
    const sentences : Array<Sentence> = blocks.map((block) => {
      return {
        id: block.id,
        text: block.data.text,
        type: block.type,
        studyNoteId: studyNoteId
      }
    })

    return sentences
  }

  const deleteSentences = extractToSentences(notesData.deletedBlocks)
  const addSentences = extractToSentences(notesData.addedBlocks)
  const editSentences = extractToSentences(notesData.editedBlocks)


  const token = localStorage.getItem("token")

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-notes/notes/${studyNoteId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ deleteSentences, addSentences, editSentences })
  }).then((res) => res.json())

  console.log(response)
}