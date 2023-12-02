import { NextResponse } from "next/server"
import { hash } from 'bcrypt'
import { sql } from "@vercel/postgres"

export async function POST(request: Request) {
  try {
    const { userName, email, password } = await request.json()

    const hashedPassword = await hash(password, 10)

    const response = await sql`
      INSERT INTO users (username, email, password)
      VALUES (${userName}, ${email}, ${hashedPassword})
    `
    console.log("yes?")
    return NextResponse.json({message: "success"})
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({message: "failure", error: error})
  }

}