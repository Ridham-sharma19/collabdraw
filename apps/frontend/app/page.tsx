"use client";
import Link from "next/link";
import Button from "./components/btn";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-center px-4 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Welcome to{" "}
        <span className="text-blue-500 drop-shadow-[0_0_4px_rgba(59,130,246,0.5)]">
          Collabdraw
        </span>
      </h1>

      <p className="text-gray-400 max-w-xl mb-8">
        A simple and collaborative whiteboard where ideas come alive — draw,
        share, and create together in real time.
      </p>

      <div className="flex gap-4">
        <Link href={"/signup"}>
          <Button variant="primary">Register / Sign In</Button>
        </Link>

        <Link href={"/learn"}>
          <Button variant="secondary">Learn More</Button>
        </Link>
      </div>

      <footer className="fixed bottom-0 left-0 w-full text-center text-gray-500 text-sm py-4 bg-transparent">
        © {new Date().getFullYear()}{" "}
        <span className="text-gray-300 font-medium">Collabdraw</span>. All
        rights reserved.
      </footer>
    </div>
  );
}
