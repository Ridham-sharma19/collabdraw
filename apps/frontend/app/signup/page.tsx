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
    <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
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

  
      <Button variant="primary" onClick={handleSignup}>
        Sign Up
      </Button>
    </div>
  );
}
