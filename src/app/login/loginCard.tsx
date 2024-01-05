/* eslint-disable react/no-unescaped-entities */
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

export default function LoginCard({ router }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      if (!response.ok || response.status === 401) {
        alert("email or password is incorrect")
      } else {
        const responseBody = await response.json()
        localStorage.setItem('token', responseBody.body.token)
        router.push("/home")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="w-[350px] h-auto m-auto">
      <CardHeader>
        <CardTitle>Log In Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Your email"
                autoComplete="current-password"
                className="focus-visible:ring-emerald-400"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                className="focus-visible:ring-emerald-400"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <div className="flex justify-center mb-2">
        <p className="text-xs mr-1">Don't have an account? </p>
        <Link
          className="text-blue-700 text-xs hover:underline hover:underline-offset-1 hover:decoration-blue-700"
          href={"../register"}
        >
          Register
        </Link>
      </div>
      <CardFooter className="flex justify-between">
        <Button className="w-full bg-emerald-400 hover:bg-emerald-600" onClick={() => handleSubmit()}>
          Log In
        </Button>
      </CardFooter>
    </Card>
  );
}
