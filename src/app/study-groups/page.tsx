import { FC } from "react";
import { StudyGroups } from "./_components/displayStudyGroup";

const StudyGroupsPage: FC = () => {
  return (
    <div className="flex h-screen w-screen bg-white">
      <div className="flex flex-col h-screen w-full overflow-hidden overflow-y-scroll ">
        <StudyGroups />
      </div>
    </div>
  );
};

export default StudyGroupsPage;
