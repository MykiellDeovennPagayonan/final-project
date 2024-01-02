import { FC } from "react";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";

interface NotesCardProps {
  title: string,
  topics: Array<string>
  index: number
}

const NotesCard: FC<NotesCardProps> = ({ title, topics, index }) => {
  const router = useRouter()

  return (
    <button onClick={() => router.push(`/study-notes/${index}`)} className="flex flex-col w-80 h-48 bg-gray-50 border-2 rounded-xl border-gray-300 p-4 m-4">
      <h4 className="font-medium"> {title} </h4>
      <div className="flex flex-row w-full">
        {topics.map((topic, index) => {
          return (
            <Badge className="flex mx-[4px] bg-black hover:bg-black px-[8px] py-[2px] text-white items-center justify-center"
              key={index}>
              {topic}
            </Badge>
          )
        })}
      </div>
    </button>
  );
};

export default NotesCard;
