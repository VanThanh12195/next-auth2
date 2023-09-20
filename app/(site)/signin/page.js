"use client";

import { signIn } from "next-auth/react";

import { useState } from "react";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  //check if the searchParam is not register pages, tomorrow fix multiple sign in click
  const handleSignInWithProvider = (providerId) => {
    signIn(providerId, { callbackUrl: searchParams.get("callbackUrl") });
  };

  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError();
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    formData["_id"] = formData.email;

    let response = await signIn("credentials", {
      callbackUrl: searchParams.get("callbackUrl"),
      email: formData.email,
      redirect: false,
      password: formData.password,
    });

    setLoading(false);

    if (response.url) {
      console.log('url is ' + response.url);
      // router.push(response.url);
      // window.location.href = response.url;
      window.location.replace(response.url)
    } else setError("Please check your email or password!");
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 text-indigo-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="flex justify-center items-center flex-grow flex-shrink-0 min-w-0 rounded-md bg-indigo-600 px-6 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
              <button
                type="button"
                className="flex justify-center items-center flex-grow flex-shrink-0 min-w-0 rounded-md bg-indigo-600 px-6 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-1"
                onClick={() => router.push("/register")}
              >
                Register
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center my-1.5">
            <div className="bg-gray-300 h-0.5 w-44"></div>
            <span className="mx-4 text-gray-600">
              <strong>OR</strong>
            </span>
            <div className="bg-gray-300 h-0.5 w-44"></div>
          </div>
          {/* Add GitHub Sign In */}
          <button
            type="button"
            onClick={() => handleSignInWithProvider("github")}
            className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
          >
            <Image
              src="/github.svg"
              alt="GitHub Logo"
              className="mr-2"
              width={30}
              height={30}
            />
            Sign In with GitHub
          </button>

          {/* Add Google Sign In */}
          <button
            type="button"
            onClick={() => handleSignInWithProvider("google")}
            className="flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
          >
            <Image
              src="/google.svg"
              alt="Google Logo"
              className="mr-2"
              width={28}
              height={28}
            />
            Sign In with Google
          </button>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
