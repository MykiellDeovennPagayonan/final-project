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
}

export const NotesMembersTabs: FC<NotesMembersTabsProps> = ({ studyNotes }) => {
  
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Shared Study Notes</TabsTrigger>
        <TabsTrigger value="password">Members</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="flex flex-col">
          <div className="hover:bg-gray-200 min-h-24 min hover:shadow-lg hover:border hover:border-gray-300 hover:text-black flex my-2 bg-gray-50 rounded-lg shadow-lg border border-gray-200 p-4 flex-col">
            <div className="flex">
              <div className="flex flex-wrap">
                <Badge className="flex mx-[4px] m-1 bg-gray-400 hover:bg-gray-400 px-[8px] py-[2px] text-black items-center justify-center">
                  science!
                </Badge>

              </div>
              <p className="ml-auto font-semibold text-md"> Sibato </p>
            </div>
            <h3 className="mt-2"> Study Note Title </h3>
          </div>

          {studyNotes.map((studyNote, index) => {
            return (
              <Link key={index} href={`/study-notes/${studyNote.id}`} className="hover:bg-gray-200 min-h-24 hover:shadow-lg hover:border hover:text-black flex my-2 bg-gray-50 rounded-lg shadow-lg border border-gray-200 p-4 flex-col">
                <div className="flex">
                  <div className="flex flex-wrap">
                    {studyNote.topics.map((topic, index) => {
                      return (
                        <Badge key={index} className="flex mx-[4px] m-1 bg-gray-400 hover:bg-gray-400 px-[8px] py-[2px] text-black items-center justify-center">
                          {topic}
                        </Badge>
                      )
                    })}
                  </div>
                  <p className="ml-auto font-semibold text-md"> Sibato </p>
                </div>
                <h3 className="mt-2"> {studyNote.title} </h3>
              </Link>
            )
          })}


        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="flex flex-row flex-wrap">
          <div className="text-center min-h-24 w-[30%] mx-auto flex my-2 bg-gray-50 rounded-lg shadow-lg border border-gray-200 p-4 flex-col">
            Sibato
          </div>
          <div className="text-center min-h-24 w-[30%] mx-auto flex my-2 bg-gray-50 rounded-lg shadow-lg border border-gray-200 p-4 flex-col">
            Sibato
          </div>
          <div className="text-center min-h-24 w-[30%] mx-auto flex my-2 bg-gray-50 rounded-lg shadow-lg border border-gray-200 p-4 flex-col">
            Sibato
          </div>

        </div>
      </TabsContent>
    </Tabs>
  )
}
