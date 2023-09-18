"use client";
import { useSession } from "next-auth/react";
import ButtonSignIn from "@/app/components/ButtonSignIn";

export default function ClientSidePage() {
  const { data: session } = useSession();
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <p className="text-xl mb-4 font-bold">Welcome to our website!</p>
      <p className="text-lg mb-4">
        Explore our content and services to discover something amazing.
      </p>
      {session ? (
        <p className="text-lg mb-4">
          You have access to special client content.
          <br />
          You are signed in as <strong>{session.user.name}</strong>.
        </p>
      ) : (
        <div>
          <p className="text-lg mb-4">
            To access special client content, please sign in.
          </p>
          <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded w-32 mx-auto">
            <ButtonSignIn params={"Get Started"} />
          </div>
        </div>
      )}
    </div>
  );
}
