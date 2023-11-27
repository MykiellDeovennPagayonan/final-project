import { FC } from "react";
import { options } from "../api/auth/[...nextauth]/options";
import UserCard from "../components/UserCard"
import { getServerSession } from "next-auth";
import Navbar from "../components/Navbar";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-200">
      <Navbar />
      {session ? (
        <UserCard user={session?.user} pagetype={"Home"} />
      ) : (
        <h1 className="text-5xl">You Shall Not Pass!</h1>
      )}
    </div>
  );
}