"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface UserProfile {
  username: string;
  email: string;
}

export default function Page() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users/user");
        setUser(res.data);
      } catch (error: any) {
        console.error("Failed to fetch profile", error.message);
        toast.error("Please log in first.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const onLogout = async () => {
    try {
      await axios.post("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.error("Logout failed", error.message);
      toast.error("Failed to logout");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900/10">
        <p className="text-gray-400">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900/10 px-6">
      <div className="w-full max-w-md bg-gray-800/90 p-8 rounded-2xl shadow-lg flex flex-col items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">
          <User className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-2xl font-bold text-gray-100">{user.username}</h1>
        <p className="text-sm text-gray-400">{user.email}</p>

        <div className="w-full border-t border-gray-700 my-4"></div>

        <div className="w-full flex flex-col gap-3 text-gray-200">
          <div className="flex justify-between">
            <span className="font-medium text-gray-400">Username:</span>
            <span className="text-emerald-400">{user.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-400">Email:</span>
            <span className="text-emerald-400">{user.email}</span>
          </div>
        </div>

        <Button
          onClick={onLogout}
          className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 transition"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
