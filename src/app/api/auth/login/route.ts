import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log(password)

    const response = await sql`
    SELECT * FROM users WHERE email = ${email}
  `
    const user = response.rows[0];

    if (response.rows.length === 0) {
      return NextResponse.json({ message: "email or password is incorrect"})
    }

    const correctPassword = await compare(password, user.password);

    if (!correctPassword) {
      return NextResponse.json({ message: "email or password is incorrect"})
    }

    const token = jwt.sign(
      {
        email,
        password,
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "1h" }
    );

    console.log(token);
    return NextResponse.json({ token: token });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ message: "failure", error: error });
  }
}
