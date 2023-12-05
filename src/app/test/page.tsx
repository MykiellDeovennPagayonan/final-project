"use client"
import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Landing() {
  async function sayHello() {
    let message = await fetch("http://localhost:3001/api/burgers")
    let response = await message.json()
    console.log(response)
  }

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <div className="flex flex-col h-3/5 w-4/5 bg-green-200 m-auto bg-opacity-50 rounded-3xl border-2 border-gray-200 shadow-md">
        <Button className="m-auto border-3 bg-black text-white" onClick={() => sayHello()}>Register</Button>
      </div>
    </div>
  );
}