"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ButtonSignIn({ params }) {
  const { data: session } = useSession();

  const pathname = usePathname();

  // return (
  //   <div className="flex flex-1 justify-end space-x-4">
  //     {session ? (
  //       <Link
  //         href={`/api/auth/signout?callbackUrl=${pathname}`}
  //         // onClick={() => signOut()}
  //         className="text-white flex-1 px-4 py-2 hover:bg-gray-700 active:bg-gray-900 rounded"
  //       >
  //         {params ? params : "Sign Out"}
  //       </Link>
  //     ) : (
  //       <Link
  //         href={`/api/auth/signin?callbackUrl=${pathname}`}
  //         // onClick={() => signIn()}
  //         className="text-white flex-1 px-4 py-2 hover:bg-gray-700 active:bg-gray-900 rounded"
  //       >
  //         {params ? params : "Sign In"}
  //       </Link>
  //     )}
  //   </div>
  // );

  function handleSignIn() {
    console.log(pathname);
    if (pathname != "/signin") signIn();
    if (pathname === "/register") signIn(undefined, { callbackUrl: "/" });
  }

  function handleSignOut() {
    signOut();
  }

  return (
    <div className="flex flex-1 justify-end space-x-4">
      {session ? (
        <button
          onClick={handleSignOut}
          className="text-white flex-1 px-4 py-2 hover:bg-gray-700 active:bg-gray-900 rounded"
        >
          {params ? params : "Sign Out"}
        </button>
      ) : (
        <button
          onClick={handleSignIn}
          className="text-white flex-1 px-4 py-2 hover:bg-gray-700 active:bg-gray-900 rounded"
        >
          {params ? params : "Sign In"}
        </button>
      )}
    </div>
  );
}
