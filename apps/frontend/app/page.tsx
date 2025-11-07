"use client"
import Button from "./components/btn"; 

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-300 text-center px-4">
      {/* Header */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
        Welcome to <span className="text-blue-600">Collabidraw</span>
      </h1>

      <p className="text-gray-600 max-w-xl mb-8">
        A simple and collaborative whiteboard where ideas come alive — 
        draw, share, and create together in real-time.
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-4">
        <Button variant="primary" onClick={() => alert("Start Drawing!")}>
          Start Drawing
        </Button>

        <Button variant="secondary" onClick={() => alert("Learn More")}>
          Learn More
        </Button>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm">
        © {new Date().getFullYear()} Collabidraw. All rights reserved.
      </footer>
    </div>
  );
}
