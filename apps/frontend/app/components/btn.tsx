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
  const base = "px-4 py-2 max-w-30 rounded-md font-medium transition-all duration-200";

  const styles =
    variant === "primary"
      ? "bg-blue-500 text-white hover:bg-blue-800"
      : "bg-red-200 text-white hover:bg-red-300";

  return (
    <button className={`${base} ${styles}`} onClick={onClick}>
      {children}
    </button>
  );
}
