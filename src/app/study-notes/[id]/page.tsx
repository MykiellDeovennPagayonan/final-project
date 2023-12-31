/* eslint-disable react/no-unescaped-entities */
"use client";

import { FC, useState, useEffect } from "react";
import Notes from "@/app/study-notes/_components/notes";
import Quizzes from "@/app/study-notes/_components/quizzes";
import { Separator } from "@/components/ui/separator";
import { OutputData } from "@editorjs/editorjs";
import toNotesData from "@/utils/toNotesData";
import useFetchData from "@/hooks/useFetchData";
import toSaveNotes from "@/utils/saveStudyNotes";
import DeleteStudyNoteButton from "@/app/study-notes/_components/deleteStudyNoteButton";
import Navbar from "@/components/Navbar";
import compareStudyNoteDataChanges from "@/utils/compareStudyNoteDataChanges";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface StudyNotePageProps {
  params: {
    id: string;
  };
}

const StudyNotePage: FC<StudyNotePageProps> = ({ params }) => {
  const studyNoteId = Number(params.id);
  const router = useRouter()

  const { data: notesDataInitial, error: notesDataError } = useFetchData(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-notes/notes/${studyNoteId}`
  );
  const { data: studyNote, error: titleError } = useFetchData(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-notes/${studyNoteId}`)
  const { data: quizzesDataInitial, error: quizzesDataError } = useFetchData(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-notes/quizzes/${studyNoteId}`
  );
  const [notesData, setNotesData] = useState<OutputData>();
  const [lastSavedNotesData, setLastSavedNotesData] = useState<OutputData>()
  const [quizItems, setQuizItems] = useState<Array<QuizItem>>([]);
  const [isFocused, setFocused] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const [title, setTitle] = useState<string>("")
  const [titleInitial, setTitleInitial] = useState<string>("")

  useEffect(() => {
    if (quizzesDataInitial) {
      const quizItemsInitial: Array<QuizItem> = quizzesDataInitial.map(
        (quizzesDataInitial) => {
          return {
            id: quizzesDataInitial.id as number,
            question: quizzesDataInitial.question as string,
            answer: quizzesDataInitial.answer as string,
          };
        }
      );
      setQuizItems(quizItemsInitial);
    }
  }, [quizzesDataInitial]);

  useEffect(() => {
    if (studyNote) {
      setTitle(studyNote[0].title)
    }
  }, [studyNote])

  useEffect(() => {
    if (notesDataInitial) {
      const data = toNotesData(notesDataInitial)
      setLastSavedNotesData(data)
      setNotesData(data)
    }
  }, [notesDataInitial]);

  async function save() {
    const changes: StudyNoteChanges = compareStudyNoteDataChanges(lastSavedNotesData, notesData)
    console.log(changes)
    setLastSavedNotesData(notesData)
    toSaveNotes(studyNoteId, changes)
  }

  useEffect(() => {
    const handleVariableChange = () => {

      if (timer) {
        clearTimeout(timer);
      }

      const newTimer = setTimeout(() => {
        save()
        console.log("save!")
      }, 3000);

      setTimer(newTimer);
    }

    if (notesData) {
      handleVariableChange()
    }

  }, [notesData])

  function saveNewTitle() {
    setTitle(titleInitial)
  }

  if (!notesDataInitial || !studyNote || !quizzesDataInitial) {
    return (
      <div className="flex flex-col h-screen w-screen bg-gray-200">
        <div className="flex flex-col h-screen w-full overflow-hidden overflow-y-scroll">
          <Navbar />
          <div className="w-full mt-12 px-8 md:px-20 lg:px-40 ">
            <Skeleton className="w-80 mx-auto h-8 mt-20"/>
        </div>
          <Skeleton className="w-5/6 mx-auto h-[1200px] mt-20"/>
        </div>
      </div>
    )
  }


  return (
    <div className="flex flex-col h-screen w-screen bg-gray-200">
      <div className="flex flex-col h-screen w-full overflow-hidden overflow-y-scroll">
        <Navbar />
        <div className="w-full mt-12 px-8 md:px-20 lg:px-40">
          <div>
            <h1 className="text-center mt-20"> {title} </h1>
          </div>
        </div>

        <Notes
          studyNoteId={studyNoteId}
          setNotesData={setNotesData}
          notesData={notesData}
          quizItems={quizItems}
          setQuizItems={setQuizItems}
        />
        <Separator className="w-3/5 mx-auto h-[3px]" />
        <div className="flex justify-end mr-40 gap-2">
          <button className="border-2 border-[#d9dde8] rounded-md" onClick={() => router.push(`./${studyNoteId}/quiz`)}>
            <div className="py-1.5 px-3 text-[#586380]">
              Answer Quiz
            </div>
          </button>
          <div className="border-2 border-[#d9dde8] rounded-md ">
            <Dialog>
              <DialogTrigger className="py-1.5 px-3 text-[#586380]">
                Share
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Share Study Note</DialogTitle>
                <DialogHeader>
                  <DialogDescription className="h-28">
                    <p className="text-black">Invitation Code: </p>
                    <Input
                      className={`p-2 border-0 ${isFocused
                        ? "focus-visible:border-b-2 focus-visible:border-black focus-visible:ring-0 rounded-none focus-visible:ring-transparent"
                        : ""
                        }`}
                      type="text"
                      value={`study-notes/${studyNoteId}`}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                    />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="border-2 border-[#d9dde8] rounded-md">
            <Dialog>
              <DialogTrigger className="py-1.5 px-3 text-[#586380]">
                Edit
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Title</DialogTitle>
                  <DialogDescription>
                    Change the study note title here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="name"
                      className="col-span-3 border-green-500 border-2 focus-visible:border-none "
                      onChange={(e) => setTitleInitial(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => saveNewTitle()}>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <h1 className="text-center mt-8"> Quizzes </h1>
        <Quizzes
          notesData={notesData}
          quizItems={quizItems}
          setQuizItems={setQuizItems}
          studyNoteId={studyNoteId}
        />
        <DeleteStudyNoteButton studyNoteId={studyNoteId} />
      </div>
    </div>
  );
};

export default StudyNotePage;
