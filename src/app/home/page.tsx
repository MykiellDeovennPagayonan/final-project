import { FC } from "react";
import UserCard from "../../components/UserCard"
import Navbar from "../../components/Navbar";
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function Home() {
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
                placeholder="Enter code"
                className="border border-gray-300 rounded-l-lg flex-grow p-2"
              />
              <button className="bg-green-500 border border-gray-300 text-white  rounded-r-lg px-10 h-10 hover:bg-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none">
                JOIN
              </button>
            </div>
          </div>
  

          <div className="flex items-center bg-white rounded-lg shadow-md border p-4 w-full"> 
  <button className="bg-green-400 border border-spacing-2 border-green-700 mx-auto text-white rounded-lg px-10 py-7 hover:bg-green-500 focus:ring-2 focus:ring-green-400 focus:outline-none text-lg">
    Create A Study Notes
  </button>
</div>

        </div>
      </div>
    </div>
  );
  
}
