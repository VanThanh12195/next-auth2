import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const axios = require("axios");

        let user;

        await axios
          .get("http://localhost:3000/api/register", {
            params: {
              email: email,
              password: password,
            },
          })
          .then(function (response) {

            if (response?.data === null){
            }
            user = response?.data 
          })
          .catch(function (error) {
            // console.log(error);
          })
          .finally(function () {
            // always executed
          });


          // tomorrow write again , using let response = await axios or fetch(on server should use fetch). no .then or. catch
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  // callbacks: {
  //   async session({ session, token }) {
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         id: token.id,
  //         randomKey: token.randomKey,
  //       },
  //     };
  //   },
  //   async jwt({ token, user }) {
  //     if (user) {
  //       return {
  //         ...token,
  //         id: user.id,
  //         name: user.name,
  //       };
  //     }
  //     return token;
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
