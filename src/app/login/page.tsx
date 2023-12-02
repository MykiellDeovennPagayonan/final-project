import LoginCard from "./loginCard";
import { FC } from "react";
import Link from "next/link";

const LoginPage: FC = () => {
  return (
    <div className="flex bg-white h-screen w-screen">
      <LoginCard />
    </div>
  );
};

export default LoginPage;
