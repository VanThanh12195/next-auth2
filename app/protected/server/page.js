import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function ServerSidePage() {
  
  const session = await getServerSession(options);

  // if (!session) redirect("/api/auth/signin?callbackUrl=/protected/server");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center text-xl mb-8">
        <p>
          Welcome to our website! You have access to special content provided by
          the server.
        </p>
        {session && (
          <p>
            You are signed in as <strong>{session.user.name}</strong>.
          </p>
        )}
      </div>
    </main>
  );
}
