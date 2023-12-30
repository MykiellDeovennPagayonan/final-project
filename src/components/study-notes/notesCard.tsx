import { FC } from "react";

interface NotesCardProps {
  title: string,
  topics: Array<string>
}

const NotesCard: FC<NotesCardProps> = ({ title, topics }) => {

  return (
    <div className="flex flex-col w-80 h-48 bg-gray-50 border-2 rounded-xl border-gray-300 p-4 m-4">
      <h4 className="font-medium"> {title} </h4>
      <div className="flex flex-row w-full">
        {topics.map((topic, index) => {
          return (
            <div className="flex text-sm mx-[4px] bg-black px-[8px] py-[2px] rounded-full text-white items-center justify-center"
              key={index}>
              {topic}
            </div>
          )
        })}

      </div>
    </div>
  );
};

export default NotesCard;
