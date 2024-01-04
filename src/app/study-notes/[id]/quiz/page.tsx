import { redirect } from "next/navigation";
import React from "react";
import QuizMeCard from "./_components/QuizMeCard";
import HistoryCard from "./_components/HistoryCard";

type Props = {}

export const metadata = {
  title: "Dashboard | Scriba",
}

async function Dashboard(props: Props) {
  const authenticate: boolean = true;
  if (!authenticate) {
    return redirect("/login");
  }

  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <QuizMeCard />
        <HistoryCard />
      </div>
    </main>
  );
}

export default Dashboard;
