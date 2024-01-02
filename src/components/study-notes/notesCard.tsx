import { FC} from "react";

interface NotesCardProps {
  title: string
}

const NotesCard: FC<NotesCardProps> = ({ title }) => {

  return (
    <div className="w-80 h-48 bg-gray-50 border-2 rounded-xl border-gray-300 p-4 m-4">
      <h4 className="font-medium"> {title} </h4>
    </div>
  );
};

export default NotesCard;
