import { FC } from "react";
import UserCard from "../components/UserCard"
import Navbar from "../components/Navbar";

export default async function Home() {

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-200">
      <Navbar />
      <UserCard pagetype={"Home"} />
    </div>
  );
}