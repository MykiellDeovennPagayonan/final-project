'use client'

import { FC, useState } from "react";
import { Separator } from "../ui/separator";
import { QuizEdit } from "./quizEdit";
import { QuizCreate } from "./quizCreate";
import toTableData from "@/utils/toTableData";
import cosineSimilarity from "@/utils/cosineSimilarity";
import getEmbeddings from "@/utils/getEmbeddings";
import { OutputData } from "@editorjs/editorjs";
import ReferenceTextCard from "./referenceTextCard";
import { DeleteQuizItem } from "./deleteQuizItem";

interface QuizzesProps {
  quizItems: Array<QuizItem>
  setQuizItems: React.Dispatch<React.SetStateAction<Array<QuizItem>>>
  studyNoteId: number
  notesData: OutputData
}

const Quizzes: FC<QuizzesProps> = ({quizItems, setQuizItems, studyNoteId, notesData}) => {
  const [referenceText, setReferenceText] = useState<string>("")

  async function embed(question : string) {
    setReferenceText("")
    const sentences = toTableData(notesData, studyNoteId)
    const sentencesText = sentences.map((sentence) => {
      return sentence.text
    })

    const sentencesEmbedding = await getEmbeddings(sentencesText)
    const questionEmbedding = await getEmbeddings([question])
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

    setReferenceText(bestText)
  }

  return (
    <div className="flex flex-col h-auto mb-8 w-full">
      {quizItems.map((quizItem, index) => {
        return (
          <div key={index} className="flex w-5/6 h-auto mt-8 bg-gray-50 mx-auto rounded-lg shadow-lg borderborderborder p-8">
            <ReferenceTextCard embed={embed} quizItem={quizItem} referenceText={referenceText}/>
            <p className="w-2/6 h-auto"> {quizItem.answer} </p>
            <Separator orientation="vertical" className="mx-4 w-[2px]" />
            <p className="w-3/6 h-auto"> {quizItem.question} </p>
            <QuizEdit quizItems={quizItems} setQuizItems={setQuizItems} index={index} studyNoteId={studyNoteId}/>
            <DeleteQuizItem quizItemId={quizItem.id} index={index} quizItems={quizItems} setQuizItems={setQuizItems}/>
          </div>
        )
      })}
      <QuizCreate quizItems={quizItems} setQuizItems={setQuizItems} studyNoteId={studyNoteId}/>
    </div>
  );
};

export default Quizzes
