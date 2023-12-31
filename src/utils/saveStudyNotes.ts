import { OutputData } from "@editorjs/editorjs"
import toTableData from "./toTableData"

export default async function toSaveStudyNotes(studyNoteId: number, notesData : OutputData) {
  const token = localStorage.getItem("token")
  const sentences = toTableData(notesData, studyNoteId)

  const response = await fetch(`http://localhost:3001/api/study-notes/${studyNoteId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ sentences })
  }).then((res) => res.json())

  console.log(response)
}