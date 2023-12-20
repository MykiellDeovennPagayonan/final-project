"use client";

import StudyGroupItem from "@/utils/classes/studyGroupItems";
import { FC, useState } from "react";
import { StudyGroupCreate } from "./createStudyGroup";
import { Separator } from "../../../components/ui/separator";

const mockData = [
  {
    name: "Attack On Titans",
    description: "Defend the homeland",
    topic: "Anime",
  },
  {
    name: "Attack On Titans",
    description: "Defend the homeland",
    topic: "Anime",
  },
  {
    name: "Attack On Titans",
    description:
      "Defend the homeland adsadsa:'asdasd' Defend the homeland adsadsa:'asdasd'Defend the homeland adsadsa:'asdasd'Defend the homeland adsadsa:'asdasd'Defend the homeland adsadsa:'asdasd'Defend the homeland adsadsa:'asdasd' Defend the homeland adsadsa:'asdasd'Defend the homeland adsadsa:'asdasd'Defend the homeland adsadsa:'asdasd'Defend the homeland adsadsa:'asdasd'",
    topic: "Anime",
  },
  {
    name: "Attack On Titans",
    description: "Defend the homeland",
    topic: "Anime",
  },
  {
    name: "Attack On Titans",
    description: "Defend the homeland",
    topic: "Anime",
  },
  {
    name: "Attack On Titans",
    description: "Defend the homeland",
    topic: "Anime",
  },
  {
    name: "Attack On Titans",
    description: "Defend the homeland",
    topic: "Anime",
  },
];

export const StudyGroups: FC = () => {
  const [studyGroupItems, setStudyGroupItems] = useState<Array<StudyGroupItem>>(
    []
  );

  return (
    <div className="flex mr-3 flex-col">
      <div className="flex justify-end mr-7">
        <StudyGroupCreate
          studyGroupItems={studyGroupItems}
          setStudyGroupItems={setStudyGroupItems}
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {studyGroupItems.map((studyGroupItem, index) => {
          return (
            <div
              key={index}
              className="h-56 md:h-72 flex my-4 bg-gray-50 rounded-lg shadow-lg border border-gray-200 p-8 flex-col"
            >
              <p className="mt-1">{studyGroupItem.name}</p>
              <Separator orientation="horizontal" className=" w-full" />
              <p className="mt-3 overflow-y-auto">
                {" "}
                {studyGroupItem.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
