"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900/10 px-6">
      <div className="flex flex-col items-center text-center bg-gray-800/90 p-10 rounded-2xl shadow-lg max-w-md w-full gap-6">
        <h1 className="text-2xl font-bold text-emerald-400 md:text-4xl">
          Welcome to Jane's test App!
        </h1>
        <p className="text-gray-300">
          Join us today! Create an account or log in to continue.
        </p>

        <div className="flex gap-4 w-full">
          <Link href="/signup" className="w-1/2">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 transition">
              Sign Up
            </Button>
          </Link>

          <Link href="/login" className="w-1/2">
            <Button
              variant="outline"
              className="w-full border-emerald-600 text-emerald-400 hover:bg-emerald-700/30"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
