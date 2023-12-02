"use client"
import RegisterCard from "./registerCard";
import { useRouter } from 'next/navigation'
import { FC } from "react";

const RegisterPage: FC = () => {
  const router = useRouter()

  return (
    <div className="flex bg-white h-screen w-screen">
      <RegisterCard router={router}/>
    </div>
  );
};

export default RegisterPage;
