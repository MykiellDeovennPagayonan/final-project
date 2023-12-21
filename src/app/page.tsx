"use client"
import { FC } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from 'next/navigation'

const Landing: FC = () => {
  const router = useRouter()

  function enter() {
    const token = localStorage.getItem('token') || null
    console.log(token)

    if (token) {
      router.push("/home")
    } else {
      router.push("/register")
    }
  }

  return (
    <>
      <div className="h-screen w-screen relative z-10 overflow-hidden">
        <div className="shadow:lg shadow-black xl:h-[77%] xl:w-[88%] h-[60%] w-[80%] sm:h-[77%] sm:w-[88%] m-auto bg-opacity-50 rounded-xl bg-green-200 drop-shadow-md border-[#173137] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          <div className=" flex w-full h-full justify-center flex-col items-center">
            <h3 className="font-extrabold text-gray-500 text-3xl sm:text-3xl md:text-5xl lg:text-6xl md:my-3 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              Welcome to
            </h3>
            <Image
              src="/scriba-landing-img-png.png"
              alt="Enterprise Logo"
              width={400}
              height={400}
              priority={true}
              className=" md:w-60 md:h-60 xl:h-72 xl:w-72 h-32 w-32 md:mt-0 lg:my-0 mt-3"
            />
            <p className="font-semibold text-gray-500 text-3xl md:text-5xl lg:text-6xl mt-3 mb-5 ">
              Scriba
            </p>
            <Button className="transform hover:scale-110 transition-transform duration-300 hover:p-5 ease-out"
              onClick={() => enter()}>
              <p className="tracking-wide">Get Started</p>
            </Button>
          </div>
          <div className="bg-gradient-to-br from-cyan-500 to-green-300 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 xl:w-[550px] xl:h-[550px] bg-[#87ebd0] rounded-full"></div>
          <div className="bg-gradient-to-br from-green-300 to-cyan-500 absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 xl:w-[550px] xl:h-[550px] bg-[#87ebd0] rounded-full"></div>
        </div>
        {/* Circle in the top-left corner */}
        <div className="blur absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 -z-10 md:w-[700px] md:h-[700px] bg-[#4cc2a2] rounded-full"></div>
        {/* Circle in the bottom-right corner */}
        <div className="blur absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 -z-10 md:w-[700px] md:h-[700px] bg-[#4cc2a2]  rounded-full"></div>
      </div>
    </>
  );
};

export default Landing;
