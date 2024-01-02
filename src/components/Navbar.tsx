"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  function logout() {
    localStorage.clear()
    router.push("/")
  }

  return (
    <nav className="bg-gray-300 w-screen h-20 p-4">
      <Button onClick={() => logout()}> Log out </Button>
    </nav>
  );
}
