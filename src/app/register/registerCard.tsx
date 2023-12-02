"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function RegisterCard() {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit() {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        email: email,
        password: password,
      }),
    });
  }

  return (
    <Card className="w-[350px] h-auto m-auto">
      <CardHeader>
        <CardTitle>Make a New Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                placeholder="Your username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <div className="flex justify-center mb-2">
        <p className="text-xs mr-1">Already have an account? </p>
        <Link
          className="text-xs hover:underline-offset-1 hover:underline hover:decoration-blue-900"
          href={"../login"}
        >
          Login
        </Link>
      </div>
      <CardFooter className="flex justify-between">
        <Button className="w-full" onClick={() => handleSubmit()}>
          Create New Account
        </Button>
      </CardFooter>
    </Card>
  );
}
