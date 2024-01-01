'use client'

import { FC, useState, useEffect } from "react"
import Notes from "@/components/study-notes/notes"
import Quizzes from "@/components/study-notes/quizzes"
import { Separator } from "@/components/ui/separator"
import { OutputData } from "@editorjs/editorjs"
import toTableData from "@/utils/toTableData"
import toNotesData from "@/utils/toNotesData"
import useFetchData from "@/hooks/useFetchData"
import toSaveNotes from "@/utils/saveStudyNotes"
import toSaveQuiz from "@/utils/saveQuiz"
import getEmbeddings from "@/utils/getEmbeddings"
import cosineSimilarity from "@/utils/cosineSimilarity"

interface StudyNoteParameter {
  params: {
    id: string
  }
}

const StudyNote: FC<StudyNoteParameter> = ({ params }) => {
  const studyNoteId = Number(params.id)
  const { data: notesDataInitial, error } = useFetchData(`http://localhost:3001/api/study-notes/notes/${studyNoteId}`)
  const [notesData, setNotesData] = useState<OutputData>()
  const [quizItems, setQuizItems] = useState<Array<QuizItem>>([])
  const [notesTextMapped, setNotesTextMapped] = useState<Map<string, string>>()
  const [sentencesText, setSentencesText] = useState<Array<string>>([])

  useEffect(() => {
    if (notesData) {
      const sentences = toTableData(notesData, studyNoteId)
      let notesTextMappedInitial = new Map()
      let sentencesTextInitial = []
      for (let i = 0; i < sentences.length; i++) {
        notesTextMappedInitial.set(sentences[i].text, sentences[i].id)
        sentencesTextInitial.push(sentences[i].text)
      }

      setNotesTextMapped(notesTextMappedInitial)
      setSentencesText(sentencesTextInitial)
      console.log(notesTextMappedInitial)
      console.log(sentencesTextInitial)
    }
  }, [notesData])

  useEffect(() => {
    console.log(notesDataInitial)
    if (notesDataInitial) {
      const data = toNotesData(notesDataInitial)
      setNotesData(data)
    }
  }, [notesDataInitial])

  async function save() {
    toSaveNotes(studyNoteId, notesData)
    toSaveQuiz(studyNoteId, quizItems)
  }

  async function embed() {
    const sentencesEmbedding = await getEmbeddings(sentencesText)
    const questionEmbedding = await getEmbeddings(["What career path did Darwin's father expect him to pursue?"])
    let sentencesComplete = []

    console.log(questionEmbedding)
    
    for (let i = 0; i < sentencesEmbedding.length; i++) {
      const similarity = cosineSimilarity(sentencesEmbedding[i].embedding, questionEmbedding[0].embedding)

      const sentenceInitial = {
        text: sentencesText[i],
        embedding: sentencesEmbedding[i].embedding,
        similarity: similarity
      }

      sentencesComplete.push(sentenceInitial)
    }

    sentencesComplete.sort((a, b) => b.similarity - a.similarity)

    const bestText = sentencesComplete[0].text

    console.log(bestText)
  }

  if (!notesDataInitial) {
    return (
      <h1> loading bruh! </h1>
    )
  }

  return (
    <div className="flex h-screen w-screen bg-white">
      <div className="flex flex-col h-screen w-full overflow-hidden overflow-y-scroll">
        <button onClick={() => save()}> Save! </button>
        <button onClick={() => embed()}> Press Me </button>
        <h1 className="text-center mt-20"> {params.id} </h1>
        <Notes setNotesData={setNotesData} notesData={notesData} quizItems={quizItems} setQuizItems={setQuizItems}/>
        <Separator className="w-3/5 mx-auto h-[3px]" />
        <h1 className="text-center mt-8"> Quizzes </h1>
        <Quizzes quizItems={quizItems} setQuizItems={setQuizItems}/>
      </div>
    </div>
  )
}

export default StudyNote