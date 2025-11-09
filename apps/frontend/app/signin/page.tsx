"use client";

import { useState } from "react";
import Input from "../components/input";
import Button from "../components/btn";
import { signInHandler } from "./handler";
import { useRouter } from "next/navigation";

export default function SignUp() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

 
  const handleSignin = async () => {
    try {
      await signInHandler( email, password);
      router.push(`/dashboard`);
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-4 text-white">
      <div className="bg-neutral-800 rounded-2xl shadow-lg p-8 w-full max-w-md text-center border border-neutral-700">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
        <p className="text-gray-400 mb-8">
          Sign in to{" "}
          <span className="text-blue-500 font-semibold">Collabdraw</span> and
          continue creating together.
        </p>

        {/* Inputs */}
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-end">
          <Button onClick={handleSignin} variant="secondary" >
            Sign In
          </Button>
          </div>
        </div>

        {/* No account */}
        <p className="text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-blue-500 hover:underline font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
