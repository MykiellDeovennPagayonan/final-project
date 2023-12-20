import { FC } from "react";
import SideBar from "@/components/side-bar";
import { StudyGroups } from "./_components/displayStudyGroup";

const StudyNotes: FC = () => {
  return (
    <div className="flex h-screen w-screen bg-white">
      <SideBar />
      <div className="flex flex-col h-screen w-full overflow-hidden overflow-y-scroll ">
        <StudyGroups />
      </div>
    </div>
  );
};

export default StudyNotes;
