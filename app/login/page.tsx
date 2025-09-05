"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "/api/users/login",
        user,
        { withCredentials: true } // 👈 VERY IMPORTANT
      );
      console.log("Login successful", res.data);
      toast.success("Login successful!");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900/10 px-6">
      <div className="flex flex-col w-full max-w-md bg-gray-800/90 p-8 rounded-2xl shadow-lg gap-4">
        <h1 className="text-3xl font-bold tracking-wide text-left text-emerald-400 mb-4">
          Login
        </h1>

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
          onClick={onLogin}
          disabled={buttonDisabled || loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <Link
          href="/signup"
          className="text-xs text-gray-400 hover:text-emerald-400 text-center mt-2"
        >
          Don&apos;t have an account? Signup
        </Link>
      </div>
    </div>
  );
}
