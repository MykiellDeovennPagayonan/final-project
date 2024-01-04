import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import React, { FC, useState } from "react"
import TopicSelector from "./topicSelector"
import getUserInfo from "@/utils/getUserInfo"
import useFetchData from "@/hooks/useFetchData"

interface NotesCardNewProps {
  setStudyNotes: React.Dispatch<React.SetStateAction<Array<StudyNote>>>
  studyNotes: Array<StudyNote>
}

const NotesCardNew: FC<NotesCardNewProps> = ({ setStudyNotes, studyNotes }) => {
  const { data: topics, error } = useFetchData("http://localhost:3001/api/topics")
  const [isPublic, setIsPublic] = useState<boolean>(false)
  const [titleInitial, setTitleInitial] = useState<string>('')
  const [topicSelected, setTopicSelected] = useState<Topic>(null)
  const [topicsList, setTopicsList] = useState<Array<Topic>>([])

  function addTopic() {
    const topicListInitial = [...topicsList, topicSelected]
    setTopicSelected(null)
    setTopicsList(topicListInitial)
  }

  function removeTopic(index) {
    let topicListInitial = [...topicsList]
    topicListInitial.splice(index, 1)
    setTopicsList(topicListInitial)
  }

  async function createStudyNote() {
    const userInfo = getUserInfo()

    console.log(userInfo)

    const information = {
      userId: userInfo.id,
      title: titleInitial,
      topics: topicsList,
      isPublic: isPublic
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-notes/new`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(information)
      }).then((res) => res.json())
      
      const studyNoteId = response.body

      const studyNoteInitial: StudyNote = {
        id: studyNoteId,
        title: titleInitial,
        topics: topicsList.map((topic) => {
          return topic.name
        })
      }

      const studyNotesInitial = [...studyNotes, studyNoteInitial]

      console.log(studyNotesInitial)

      setStudyNotes(studyNotesInitial)

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="m-4 bg-emerald-400 hover:bg-emerald-600"> Create New Study Note </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {topics ?
            <>
              <DialogHeader>
                <DialogTitle>Create New Study Note</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-3 pr-8">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Title of Study Note"
                    className="col-span-3 focus-visible:ring-emerald-400"
                    value={titleInitial}
                    onChange={(e) => setTitleInitial(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4 pl-3">
                  <Label htmlFor="topics" className="text-right self-start mt-1">
                    Topics
                  </Label>
                  <div className="col-span-3 grid grid-cols-3 gap-4">
                    {topicsList.map((topic, index) => {
                      return (
                        <Badge className="flex items-center justify-center bg-black hover:bg-red-600 hover:cursor-pointer"
                          onClick={() => removeTopic(index)}
                          key={index}>
                          {topic.name}
                        </Badge>
                      )
                    })}

                  </div>

                </div>
                <div className="flex w-full h-auto">
                  <TopicSelector topics={topics} setTopicSelected={setTopicSelected} topicSelected={topicSelected} topicsList={topicsList} />
                  <Button className="mr-auto ml-5 bg-emerald-400 hover:bg-emerald-600" onClick={() => addTopic()}> Add topic </Button>
                </div>
                <div className="flex mx-auto">
                  <Label htmlFor="topics" className="text-right my-auto mr-4">
                    Public?
                  </Label>

                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-500"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                  />

                </div>
              </div>
              <DialogClose asChild>
                <Button className="bg-emerald-400 hover:bg-emerald-600" type="button" onClick={() => createStudyNote()}>
                  Create Study Note
                </Button>
              </DialogClose>
            </>
            :
            <h1> nothing here </h1>
          }
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NotesCardNew