"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ButtonSignIn({ params }) {
  const { data: session } = useSession();

  const pathname = usePathname();

  return (
    <div className="flex flex-1 justify-end space-x-4">
      {session ? (
        <button
          // href={`/api/auth/signout?callbackUrl=${pathname}`}
          onClick={() => signOut()}
          className="text-white flex-1 px-4 py-2 hover:bg-gray-700 active:bg-gray-900 rounded"
        >
          {params ? params : "Sign Out"}
        </button>
      ) : (
        <button
          // href={`/api/auth/signin?callbackUrl=${pathname}`}
          onClick={() => signIn()}
          className="text-white flex-1 px-4 py-2 hover:bg-gray-700 active:bg-gray-900 rounded"
        >
          {params ? params : "Sign In"}
        </button>
      )}
    </div>
  );
}
