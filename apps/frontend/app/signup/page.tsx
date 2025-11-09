"use client";

import { useState } from "react";
import Input from "../components/input";
import Button from "../components/btn";
import { signUpHandler } from "./handler";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

 
  const handleSignup = async () => {
    try {
      await signUpHandler(username, email, password);
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
        <h1 className="text-3xl font-bold mb-4">Create Your Account</h1>
        <p className="text-gray-400 mb-8">
          Join <span className="text-blue-500 font-semibold">Collabdraw</span>{" "}
          and let the fun begin.
        </p>

        {/* Inputs */}
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
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
              <div className="flex justify-end items-center pr-2">
          <Button onClick={handleSignup} variant="secondary" >
            Sign Up
          </Button>
          </div>
        </div>

        {/* Already signed in */}
        <p className="text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/signin")}
            className="text-blue-500 hover:underline font-medium"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
