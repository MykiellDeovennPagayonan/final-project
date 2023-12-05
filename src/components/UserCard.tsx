import Image from "next/image";

type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

type Props = {
  pagetype: string;
};

export default function Card({ pagetype }: Props) {
  //console.log(user)

  // const emailDisplay = user?.email ? (
  //     <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
  //         {user?.email}
  //     </div>
  // ) : null


  return (
    <section className="flex flex-col gap-4">
      <p className="text-2xl text-center">{pagetype} Page! with auth</p>
    </section>
  );
}
