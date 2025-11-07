"use client"
import InitDraw from "@/app/draw";
import { useEffect, useRef } from "react";

export default function Canvas() {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;
      InitDraw(canvasRef.current)
      
    }
  }, [canvasRef]);

  return (
    <div className="h-screen w-full">
      <canvas ref={canvasRef} className="h-[750px] w-[1550px] border"></canvas>
    </div>
  );
}
