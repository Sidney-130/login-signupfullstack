"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtondisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      console.log("Signup succesfull", res.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtondisabled(false);
    } else {
      setButtondisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900/10 px-6">
      <div className="flex flex-col w-full max-w-md bg-gray-800/90 p-8 rounded-2xl shadow-lg gap-4">
        <h1 className="text-3xl font-bold tracking-wide text-left text-emerald-400 mb-4">
          Signup
        </h1>

        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
          className="p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-800"
        />

        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          className="p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-800"
        />

        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
          className="p-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-800"
        />

        <Button
          className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 transition"
          onClick={onSignup}
        >
          {buttonDisabled ? "No signup" : "Signup"}
          {loading ? "..." : ""}
        </Button>

        <Link
          href="/login"
          className="text-xs text-gray-400 hover:text-emerald-400 text-center mt-2"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
