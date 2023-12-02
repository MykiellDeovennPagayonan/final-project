import { NextResponse } from "next/server"
import { hash } from 'bcrypt'
import { sql } from "@vercel/postgres"
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const token = jwt.sign({
      email,
      password
    }, process.env.JWT_SECRET)

    console.log(token)
    return NextResponse.json({token: token})
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({message: "failure", error: error})
  }

}