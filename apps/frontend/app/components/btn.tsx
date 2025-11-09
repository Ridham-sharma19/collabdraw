"use client";

import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  variant = "primary",
  children,
  onClick,
}: ButtonProps) {
  const base = "  px-8 py-2 rounded-md font-light transition duration-200 ease-linear"
 

  const styles =
    variant === "primary"
      ? "bg-blue-500 shadow-[0_4px_14px_0_rgb(0,118,255,39%)] text-white hover:bg-blue-800 hover:shadow-[0_6px_20px_rgba(0,118,255,23%)]  bg-[#0070f3]  hover:bg-[rgba(0,118,255,0.9)]"
      : "bg-[#ffff] text-black hover:bg-neutral-200 shadow-[0_4px_14px_0_rgb(255,255,255,39%)] hover:shadow-[0_6px_20px_rgba(255,255,255,23%)]  bg-[#ffff]  hover:bg-[rgba(250,250,250,0.9)]";

  return (
    <button className={`${base} ${styles}`} onClick={onClick}>
      {children}
    </button>
  );
}
