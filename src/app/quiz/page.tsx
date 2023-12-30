import React from "react";
import { redirect } from "next/navigation";

type Props = {};

export const metadata = {
  title: "Quiz | Scriba",
};

const QuizPage = async (props: Props) => {
  //! Add authentication here
  const authenticate: boolean = true;
  if (!authenticate) {
    return redirect("/login");
  }

  return <></>;
};

export default QuizPage;
