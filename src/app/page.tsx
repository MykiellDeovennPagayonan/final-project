import { FC } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Landing: FC = () => {
  return (
    <>
      <div className="h-screen justify-center items-center flex">
        <div className="h-[80%] w-[90%] m-auto bg-opacity-50 rounded-2xl bg-green-200 border-2 border-gray-200 shadow-md flex justify-center items-center flex-col">
          <h3 className="font-semibold text-gray-500 text-5xl">Welcome to</h3>
          <Image
            src="/scriba-landing-img-png.png"
            alt="Enterprise Logo"
            width={400}
            height={400}
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={true}
          />
          <p className="font-semibold text-gray-500 text-5xl mt-3 mb-7">
            Scriba
          </p>
          <Button>
            <Link href={"./register"}>Get Started</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Landing;
