"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
function Page() {
  const router = useRouter();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/sentiment");
      }
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">
          Login
        </h2>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            type="text"
            ref={emailRef}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            ref={passwordRef}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all"
        >
          Login
        </button>
        
      </form>
    
    </div>
  );
}

export default Page;
