import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import ButtonSignIn from "./components/ButtonSignIn";

export default async function Home() {
  
  const session = await getServerSession(options);

  return (
    <div>
      {session ? (
        <main className="flex flex-col items-center justify-center min-h-screen p-24 text-center">
          <h1 className="text-3xl font-bold mb-8">
            Welcome, {session.user.name}{" "}
          </h1>

          <p className="text-lg mb-6">
            Thank you for being a valued member of our community. Explore our
            content and services to make the most of your visit.
          </p>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8">
            Continue Exploring
          </button>
        </main>
      ) : (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
          <h1 className="text-3xl font-bold mb-8">Welcome to Our Website</h1>

          <p className="text-lg mb-6">
            Welcome to our website. We're glad to have you here. Explore our
            content and services to discover something amazing.
          </p>

          <p className="text-lg mb-6">
            Feel free to reach out to us if you have any questions or need
            assistance. We're here to help you make the most of your visit.
          </p>

          <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
            <ButtonSignIn params={"Get Started"} />
          </div>
        </main>
      )}
    </div>
  );
}
