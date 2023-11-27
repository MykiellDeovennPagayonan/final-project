"use client"

import StudyGroupItem from "@/utils/classes/studyGroupItems"
import { FC, useState } from "react"
import { StudyGroupCreate } from "./createStudyGroup"

export const StudyGroups: FC = () => {
  const [studyGroupItems, setStudyGroupItems] = useState<Array<StudyGroupItem>>([])

return (
  <div>
    <StudyGroupCreate studyGroupItems={studyGroupItems} setStudyGroupItems={setStudyGroupItems} />
    {studyGroupItems.map((studyGroupItem, index) => {
      return ( 
      <div key={index} className="flex w-5/6 h-auto mt-8 bg-gray-50 mx-auto rounded-lg shadow-lg border border-gray-200 p-8">
        <h3>{studyGroupItem.topic}</h3>
        <p>{studyGroupItem.name}</p>
        <p> {studyGroupItem.description}</p>
      </div> 
      )
    })}
  </div>
)}
