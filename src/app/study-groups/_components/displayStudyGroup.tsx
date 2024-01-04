"use client";

import { FC, useState, useEffect } from "react";
import { StudyGroupCreate } from "./createStudyGroup";
import { Separator } from "../../../components/ui/separator";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import useFetchData from "@/hooks/useFetchData";

export const StudyGroups: FC = () => {
  const { data: studyGroupsInitial, error } = useFetchData(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/study-groups`, true)
  const [studyGroups, setStudyGroups] = useState<Array<StudyGroup>>([]);

  useEffect(() => {
    if (studyGroupsInitial) {
      setStudyGroups(studyGroupsInitial)
    }
  }, [studyGroupsInitial]);

  return (
    <div className="flex flex-col h-full w-full bg-gray-200">
      <Navbar />
      <div className="flex justify-center ">
        <div className="flex flex-col w-full max-w-screen-xl">
          <div className="flex justify-end mr-3 mb-5">
            <StudyGroupCreate />
          </div>

          <div className="grid gap-5 md:grid-cols-5 xl:grid-cols-4 ">
            {studyGroups.map((studyGroupItem) => {
              return (
                <Link href={`/study-groups/${studyGroupItem.id}`} key={studyGroupItem.id}>
                  <div
                    key={studyGroupItem.id}
                    className=" hover:bg-gray-200 hover:shadow-lg hover:border hover:border-gray-300 hover:text-black md:h-36 flex my-2 bg-gray-50 rounded-lg shadow-lg border border-gray-200 p-8 flex-col"
                  >
                    <p className="font-bold text-xl mt-1">{studyGroupItem.name}</p>
                    <Separator orientation="horizontal" className="w-full bg-gray-300" />
                    <p className="mt-3 overflow-y-auto">
                      {studyGroupItem.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

    </div>

  );
};
