import Link from "next/link";
// import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import ButtonSignIn from "./ButtonSignIn";

const Navbar = async () => {
  // const session = await getServerSession(options);
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">{/* Removed the title */}</div>
        <div className="flex flex-1 justify-end space-x-4">
          <Link
            href="/"
            className="text-white flex-1 px-4 py-2 hover:bg-gray-700 active:bg-gray-900"
          >
            Home
          </Link>
          <Link
            href="/protected/server"
            className="text-white flex-1 px-4 py-2 hover:bg-gray-700 active:bg-gray-900"
          >
            Protected (Server)
          </Link>
          <Link
            href="/protected/client"
            className="text-white flex-1 px-4 py-2 hover:bg-gray-700 active:bg-gray-900"
          >
            Protected (Client)
          </Link>
          <Link
            href="/protected/extra"
            className="text-white flex-1 px-4 py-2 hover:bg-gray-700 active:bg-gray-900"
          >
            Extra
          </Link>
          <ButtonSignIn />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
