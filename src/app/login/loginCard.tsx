"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { signIn } from "next-auth/react"

export default function LoginCard() {
  const [ email, setEmail ] = useState<string>("")
  const [ password, setPassword ] = useState<string>("")

  async function handleSubmit() {
    console.log("success")
    const response = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    })
    console.log(response)
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
              <Label htmlFor="name">Email</Label>
              <Input id="name" placeholder="your email" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input id="name" placeholder="Your password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="w-full" onClick={() => handleSubmit()}>Log In</Button>
      </CardFooter>
    </Card>
  )
}
