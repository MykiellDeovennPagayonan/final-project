"use client"

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
import { FC, useState } from "react"
import StudyGroupItem from "@/utils/classes/studyGroupItems"

interface CreateStudyGroupProps {
  studyGroupItems: Array<StudyGroupItem>
  setStudyGroupItems: React.Dispatch<React.SetStateAction<Array<StudyGroupItem>>>;
}

export const StudyGroupCreate: FC<CreateStudyGroupProps> = ({
  studyGroupItems, setStudyGroupItems
}) => {
  const [studyGroupTopic, setStudyGroupTopic] = useState<string>('')
  const [studyGroupName, setStudyGroupName] = useState<string>('')
  const [studyGroupDescription, setStudyGroupDescription] = useState<string>('')


  function createStudyGroupItem() {
    const createStudyGroupItemInitial = {
      name: studyGroupName,
      description: studyGroupDescription,
      topic: studyGroupTopic
    }

    setStudyGroupItems([...studyGroupItems, createStudyGroupItemInitial])
    setStudyGroupName('')
    setStudyGroupDescription('')
  }

  return (
    <div className="mt-8">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create New Study Group</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Create Study Group
            </DialogTitle>
            <div>
              <div>
                <Label htmlFor="group-topic" className="text-right">
                  Topic
                </Label>
                <Input 
                  id="group-topic"
                  placeholder="Study Topic"
                  value={studyGroupTopic}
                  onChange={(e) => setStudyGroupTopic(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="group-name" className="text-right">
                  Group Name
                </Label>
                <Input 
                  id="group-name"
                  placeholder="Group Name"
                  value={studyGroupName}
                  onChange={(e) => setStudyGroupName(e.target.value)}
                />
              </div>
              <div>
              <Label htmlFor="group-description" className="text-right">
                  Group Description
                </Label>
                <Input 
                  id="group-description"
                  placeholder="Group Description"
                  value={studyGroupDescription}
                  onChange={(e) => setStudyGroupDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogClose asChild>
              <Button type="button" onClick={() => createStudyGroupItem()} >
                Create Study Group
              </Button>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}