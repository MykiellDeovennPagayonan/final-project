import SignUpModal from "@/components/login/signup";
import { FC } from "react";

const LoginPage: FC = () => {
  return (
    <div className="bg-white h-screen w-screen">
      <SignUpModal />
    </div>
  );
};

export default LoginPage;
