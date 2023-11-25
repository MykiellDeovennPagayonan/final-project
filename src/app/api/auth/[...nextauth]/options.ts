import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: {
        label: "Email:",
        type: "text",
        placeholder: "your-cemail",
      },
      password: {
        label: "Password:",
        type: "password",
        placeholder: "your-awesome-password",
      },
    },
    async authorize(credentials) {

      const user = { id: "42", email: "Scriba@gmail.com", password: "scribaadmin" };

      if (
        credentials?.email === user.email &&
        credentials?.password === user.password
      ) {
        return user;
      } else {
        return null;
      }
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
