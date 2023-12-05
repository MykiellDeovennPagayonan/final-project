"use client"
import LoginCard from "./loginCard";
import { useRouter } from 'next/navigation'
import { FC } from "react";
import Link from "next/link";

const LoginPage: FC = () => {
  const router = useRouter()

  return (
    <div className="flex bg-white h-screen w-screen">
      <LoginCard router={router}/>
    </div>
  );
};

export default LoginPage;
