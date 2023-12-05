import { FC } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Landing: FC = () => {
  return (
    <>
      <div className="h-screen w-screen relative overflow-hidden">
        <div className="xl:h-[80%] xl:w-[88%] h-[80%] w-[88%] md:h-[89%] md:w-[88%] m-auto bg-opacity-50 rounded-2xl bg-green-200 border-2 border-gray-200 shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          <div className="flex w-full h-full justify-center flex-col items-center">
            <h3 className="font-semibold text-gray-500 text-3xl sm:text-3xl md:text-5xl lg:text-6xl md:my-3">
              Welcome to
            </h3>
            <Image
              src="/scriba-landing-img-png.png"
              alt="Enterprise Logo"
              width={400}
              height={400}
              priority={true}
              className=" md:w-60 md:h-60 xl:h-72 xl:w-72 h-32 w-32 md:my-5"
            />
            <p className="font-semibold text-gray-500 text-3xl md:text-5xl lg:text-6xl mt-3 mb-7 ">
              Scriba
            </p>
            <Button className="transform hover:scale-110 transition-transform duration-300 hover:p-5 ease-out">
              <Link href={"./register"}>Get Started</Link>
            </Button>
          </div>
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 -z-10 xl:w-[550px] xl:h-[550px] bg-emerald-400 rounded-full"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 -z-10 xl:w-[550px] xl:h-[550px] bg-emerald-400 rounded-full"></div>
        </div>
        {/* Circle in the top-left corner */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 -z-10 md:w-[700px] md:h-[700px] bg-emerald-300  rounded-full"></div>
        {/* Circle in the bottom-right corner */}
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 -z-10 md:w-[700px] md:h-[700px] bg-emerald-300  rounded-full"></div>
      </div>
    </>
  );
};

export default Landing;
