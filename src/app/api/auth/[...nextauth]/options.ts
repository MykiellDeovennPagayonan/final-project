import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
    name: "Credentials",
    credentials: {
      username: {
        label: "Username:",
        type: "text",
        placeholder: "your-cool-username",
      },
      password: {
        label: "Password:",
        type: "password",
        placeholder: "your-awesome-password",
      },
    },
    async authorize(credentials) {
      // This is where you need to retrieve user data
      // to verify with credentials
      // Docs: https://next-auth.js.org/configuration/providers/credentials

      //! Important! change this to query from database
      const user = { id: "42", name: "Scriba", password: "scribaadmin" };

      if (
        credentials?.username === user.name &&
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
