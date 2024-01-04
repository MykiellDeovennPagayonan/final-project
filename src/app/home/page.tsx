"use client"
import { FC, useState } from "react";
import UserCard from "../../components/UserCard"
import Navbar from "../../components/Navbar";
import * as React from "react"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [joinCode, setJoinCode] = useState<string>("")

  async function handleJoinStudyGroup() {
    const openTo = joinCode.split("/")[0] || null
    let id = Number(joinCode.split("/")[1] || null)

    if ((openTo === "study-notes" || openTo === "study-groups") && id) {
      const token = localStorage.getItem("token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/${openTo}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
        });
      
      if (response.body.length === 0) {
        alert("does not exist")
      } else {
        router.push(`../${joinCode}`)
      }
      
    } else {
      alert("Code is invalid")
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-200">
      <Navbar />
      <div className="flex flex-col items-center justify-center">

        <div className="grid grid-cols-3 space-x-4 mt-4" style={{ width: '85%' }}>
          <div className="flex-col col-span-2 h-40 flex items-center justify-center bg-white rounded-lg shadow-md p-4">
            <div className="ml-[20%] mb-1.5 text-gray-400 mr-auto">Join a Study Group:</div>
            <div className="flex flex-row w-3/5 border-2 border-gray-500 p-1 rounded-lg">
              <input
                id="name"
                type="text"
                placeholder="Enter a join code"
                className="border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-emerald-400 flex-grow p-2"
                onChange={(e) => setJoinCode(e.target.value)}
              />
              <button className="bg-emerald-400 border border-gray-300 text-white  rounded-r-lg px-10 h-10 hover:bg-emerald-500 focus:ring-2 focus:ring-green-400 focus:outline-none"
                onClick={() => handleJoinStudyGroup()}
              >
                JOIN!
              </button>
            </div>
          </div>

          <div className="flex items-center bg-white rounded-lg shadow-md border p-4 w-full">
            <button className="bg-emerald-400 border border-spacing-2 border-green-700 mx-auto text-white rounded-lg px-10 py-7 hover:bg-emerald-500 focus:ring-2 focus:ring-green-400 focus:outline-none text-lg">
              Create Study Notes
            </button>
          </div>

        </div>
      </div>
    </div>
  );

}
