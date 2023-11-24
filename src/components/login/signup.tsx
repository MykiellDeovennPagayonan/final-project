import { FC } from "react";

const SignUpModal: FC = () => {
  return (
    <div className="flex flex-col max-w-lg bg-opacity-30 rounded-3xl  border-gray-500 border-2 px-7 py-5">
      <div className="text-left self-start text-3xl font-semibold my-7 text-[#6F7787]">
        Sign Up
      </div>
      <form className="grid grid-rows-3 gap-y-3 max-w-md text-black">
        <label className="flex flex-col">
          <span className="mb-1 font-semibold">Name:</span>
          <input
            type="text"
            placeholder="Full Name"
            className="text-black pl-3 h-11 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1 font-semibold">Email:</span>
          <input
            type="email"
            placeholder="Email"
            className="text-black pl-3 h-11 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1 font-semibold">Password:</span>
          <input
            type="password"
            placeholder="Password"
            className="text-black pl-3 h-11 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </label>
      </form>

      <div className="mt-5 mb-14 flex flex-col text-black gap-2">
        <p className="text-sm text-center">
          Already have an account?{" "}
          <button className="font-semibold hover:text-blue-500">Log in</button>
        </p>
        <button className="w-full py-3 bg-[#70DDC3] text-white font-semibold rounded-md hover:bg-green-700">
          Done
        </button>
      </div>
    </div>
  );
};

export default SignUpModal;
