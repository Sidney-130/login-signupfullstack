"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { axios } from "axios";

export default function Signup() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2">
      <h1>Login</h1>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600
        "
      />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600
        "
      />
      <Button onClick={onLogin}>Login</Button>
      <Link href="/signup">Signup</Link>
    </div>
  );
}
