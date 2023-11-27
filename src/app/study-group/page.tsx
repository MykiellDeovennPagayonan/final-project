import { FC } from "react"
import SideBar from "@/components/side-bar"
import { StudyGroups } from "./components/displayStudyGroup"

export const StudyNotes : FC = () => {
  return (
    <div className="flex h-screen w-screen bg-white">
      <SideBar />
        <div className="grid-flow-col grid">
        <StudyGroups />
        </div>
    </div>
  )
}

export default StudyNotes