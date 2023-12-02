import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Landing() {

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <div className="flex flex-col h-3/5 w-4/5 bg-green-200 m-auto bg-opacity-50 rounded-3xl border-2 border-gray-200 shadow-md">
        <Link href="/login" className="m-auto">
          <Button className="boarder-3 bg-black text-white">Login</Button>
        </Link>
        <Link href="/register" className="m-auto">
          <Button className="boarder-3 bg-black text-white">Register</Button>
        </Link>
      </div>
    </div>
  );
}