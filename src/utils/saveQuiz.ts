
export default async function toSaveQuiz(studyNoteId: number, quizItems : Array<QuizItem>) {
  const token = localStorage.getItem("token")

  const response = await fetch(`http://localhost:3001/api/study-notes/quizzes/${studyNoteId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ quizItems })
  }).then((res) => res.json())

  console.log(response)
}