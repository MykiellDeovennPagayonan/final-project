import { FC } from "react"
import SideBar from "@/components/side-bar"
import Notes from "@/components/notes"

const StudyNotes : FC = () => {
  return (
    <div className="flex h-screen w-screen bg-gray-200 ">
      <SideBar />
      <Notes />
    </div>
  )
}

export default StudyNotes