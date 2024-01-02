import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import React, { FC } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface ReferenceTextCardProps {
  embed(question: string): Promise<void>
  quizItem: QuizItem
  referenceText: string

}

const ReferenceTextCard: FC<ReferenceTextCardProps> = ({ embed, quizItem, referenceText }) => {

  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-white h-8 w-8 my-auto mr-8 bg-black rounded-full" onClick={() => embed(quizItem.question)}>
            <i className="fas fa-search"></i>
          </button>
        </DialogTrigger>
        <DialogContent className="w-4/5">
          <div className="flex flex-col p-4">
            {referenceText.length > 0 ?
              <p>{ referenceText }</p>
              :
              <>
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-4/6 h-8 mt-4" />
                <Skeleton className="w-5/6 h-8 mt-4" />
              </>
            }
          </div>

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ReferenceTextCard