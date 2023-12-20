"use client";

import { FC, useState, useEffect } from "react";
import { StudyGroupCreate } from "./createStudyGroup";
import { Separator } from "../../../components/ui/separator";
import Link from "next/link";

export const StudyGroups: FC = () => {
  const [studyGroups, setStudyGroups] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/studygroup/");
      const data = await response.json();
      console.log(data);
      setStudyGroups(data);
    }
    fetchData();
  }, []);

  return (
    <div className="flex mr-3 flex-col">
      <div className="flex justify-end mr-7">
        <StudyGroupCreate />
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {studyGroups.map((studyGroupItem) => {
          return (
            <Link href={`/home${studyGroupItem.id}`} key={studyGroupItem.id}>
              <div
                key={studyGroupItem.id}
                className="h-56 md:h-72 flex my-4 bg-gray-50 rounded-lg shadow-lg border border-gray-200 p-8 flex-col"
              >
                <p className="mt-1">{studyGroupItem.name}</p>
                <Separator orientation="horizontal" className=" w-full" />
                <p className="mt-3 overflow-y-auto">
                  {" "}
                  {studyGroupItem.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
