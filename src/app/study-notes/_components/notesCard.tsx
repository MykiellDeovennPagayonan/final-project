import { FC } from "react";
import { Badge } from "../../../components/ui/badge";
import { useRouter } from "next/navigation";

interface NotesCardProps {
  title: string,
  topics: Array<string>
  id: number
}

const NotesCard: FC<NotesCardProps> = ({ title, topics, id }) => {
  const router = useRouter()

  return (
    <button onClick={() => router.push(`/study-notes/${id}`)} className="flex flex-col w-80 h-48 bg-gray-50 border-2 rounded-xl border-gray-300 p-4 m-4">
      <h4 className="font-medium"> {title} </h4>
      <div className="flex flex-row w-full">
        {topics.map((topic, index) => {
          return (
            <Badge className="flex mx-[4px] bg-blue-100 hover:bg-gray-300 px-[8px] py-[2px] text-black items-center justify-center"
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
