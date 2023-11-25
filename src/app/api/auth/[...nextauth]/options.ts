import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

export const options: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: {
        label: "Email:",
        type: "text",
        placeholder: "your-email",
      },
      password: {
        label: "Password:",
        type: "password",
        placeholder: "your-awesome-password",
      },
    },
    async authorize(credentials) {

      const response = await sql`
        SELECT * FROM users WHERE email = ${credentials.email}
      `
      const user = response.rows[0]

      const correctPassword = await compare(credentials.password, user.password)

      if (correctPassword) {
        return {
          id: user.id,
          email: user.email
        }
      }

      return null
    },
  }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    
  ],
};
