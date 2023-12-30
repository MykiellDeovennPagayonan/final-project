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
import React, { FC, useState } from "react"
import TopicSelector from "./topicSelector"
import getUserInfo from "@/utils/getUserInfo"
import useFetchData from "@/hooks/useFetchData"

const NotesCardNew: FC = () => {
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
      const response: any = await fetch('http://localhost:3001/api/study-notes/new', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(information)
      }).then((res) => res.json())
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="mt-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="m-4"> Create New Study Note </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {topics ?
            <>
              <DialogHeader>
                <DialogTitle>Create New Study Note</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Title of Study Note"
                    className="col-span-3"
                    value={titleInitial}
                    onChange={(e) => setTitleInitial(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="topics" className="text-right self-start">
                    Topics
                  </Label>
                  <div className="col-span-3 grid grid-cols-3 gap-4">
                    {topicsList.map((topic, index) => {
                      return (
                        <button className="flex text-xs bg-black h-4 rounded-md text-white items-center justify-center"
                          onClick={() => removeTopic(index)}
                          key={index}>
                          {topic.name}
                        </button>
                      )
                    })}

                  </div>

                </div>
                <div className="flex w-full h-auto">
                  <TopicSelector topics={topics} setTopicSelected={setTopicSelected} topicSelected={topicSelected} topicsList={topicsList} />
                  <Button className="mr-auto ml-5" onClick={() => addTopic()}> Add topic </Button>
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
                <Button type="button" onClick={() => createStudyNote()}>
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