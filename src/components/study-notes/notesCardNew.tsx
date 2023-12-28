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

interface NotesCardNewProps {
  topics: Array<{
    value: string,
    label: string
  }>
}

const NotesCardNew: FC<NotesCardNewProps> = ({ topics }) => {
  const [titleInitial, setTitleInitial] = useState<string>('')
  const [topicSelected, setTopicSelected] = useState<string>("")
  const [topicsList, setTopicsList] = useState<Array<string>>([])

  function addTopic() {
    const topicListInitial = [...topicsList, topicSelected]
    setTopicSelected("")
    setTopicsList(topicListInitial)
  }

  function removeTopic(index) {
    let topicListInitial = [...topicsList]
    topicListInitial.splice(index, 1)
    setTopicsList(topicListInitial)
  }

  return (
    <div className="mt-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button> Create New Study Note </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
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
                  return(
                  <button className="flex text-xs bg-black h-4 rounded-md text-white items-center justify-center"
                    onClick={() => removeTopic(index)}
                    key={index}>
                    {topic}
                  </button>
                  )
                })}

              </div>

            </div>
            <div className="flex w-full h-auto">
              <TopicSelector topics={topics} setTopicSelected={setTopicSelected} topicSelected={topicSelected} topicsList={topicsList}/>
              <Button className="mr-auto ml-5" onClick={() => addTopic()}> Add topic </Button>
            </div>
          </div>
          <DialogClose asChild>
            <Button type="button">
              Create Study Note
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NotesCardNew