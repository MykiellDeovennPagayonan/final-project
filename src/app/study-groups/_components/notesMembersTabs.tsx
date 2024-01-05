"use client"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FC } from "react"
import Link from "next/link"

interface NotesMembersTabsProps {
  studyNotes: Array<StudyNote>
  members: Array<Members>
  admins: Array<Members>
  setMembers: React.Dispatch<React.SetStateAction<Array<Members>>>
}

export const NotesMembersTabs: FC<NotesMembersTabsProps> = ({ studyNotes, members, admins, setMembers, }) => {

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Shared Study Notes</TabsTrigger>
        <TabsTrigger value="password">Members</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="flex flex-col">
          {studyNotes.map((studyNote, index) => {
            return (
              <Link key={index} href={`/study-notes/${studyNote.id}`} className="hover:bg-gray-200 min-h-24 hover:shadow-lg hover:border hover:text-black flex my-2 bg-gray-50 rounded-lg shadow-lg border border-gray-200 p-4 flex-col">
                <div className="flex">
                  <div className="flex flex-wrap">
                    {studyNote.topics.map((topic, index) => {
                      return (
                        <Badge key={index} className="flex mx-[4px] m-1 bg-blue-200 hover:bg-blue-200 px-[8px] py-[2px] text-black items-center justify-center">
                          {topic}
                        </Badge>
                      )
                    })}
                  </div>
                  <p className="ml-auto font-semibold text-md"> {studyNote.userName} </p>
                </div>
                <h3 className="mt-2"> {studyNote.title} </h3>
              </Link>
            )
          })}
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="flex flex-row flex-wrap">
          {admins.map((admin, index) => {
            return (
              <div key={index} className="text-center font-semibold min-h-24 w-[31%] mx-[1%] flex my-2 bg-gray-50 rounded-lg shadow-lg border border-gray-200 p-4 flex-col">
                {admin.username}
              </div>
            )
          })}
          {members.map((member, index) => {
            return (
              <div key={index} className="text-center min-h-24 w-[31%] mx-[1%] flex my-2 bg-gray-50 rounded-lg shadow-lg border border-gray-200 p-4 flex-col">
                {member.username}
              </div>
            )
          })}

        </div>
      </TabsContent>
    </Tabs>
  )
}
