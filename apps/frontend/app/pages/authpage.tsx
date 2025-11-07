"use client";

import Button from "../components/btn";
import Input from "../components/input";

interface AuthPageProps {
  isSignin: boolean;
}

export default function AuthPage({ isSignin }: AuthPageProps) {
  return (
    <div className="flex flex-col gap-4 p-6 max-w-sm mx-auto mt-10 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-center mb-2">
        {isSignin ? "Sign In" : "Create an Account"}
      </h2>

      {!isSignin && <Input type="text" placeholder="Username" />}
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
         
         <div className="flex justify-end items-center ">
              <Button
        variant="primary"
        onClick={() =>
          alert(isSignin ? "Signing In..." : "Creating Account...")
        }
      >
        {isSignin ? "Sign In" : "Sign Up"}
      </Button>
         </div>
    

      <p className="text-center text-sm text-gray-600">
        {isSignin ? (
          <>
            Don’t have an account?{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Sign Up
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Sign In
            </span>
          </>
        )}
      </p>
    </div>
  );
}
