"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
   

    if (!token) {
    
      router.push("/signin");
      return;
    }

    const verifyToken = async () => {
      try {
        
        const res = await axios.get("http://localhost:8000/validate-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        if (!res.data.valid) {
          console.warn("Token invalid removing from storage");
          localStorage.removeItem("token");
          router.push("/signin");
        } else {
          console.log("Token verified successfully!");
          setLoading(false);
        }
      } catch (err) {
        console.error(" Error verifying token:", err);
        localStorage.removeItem("token");
        router.push("/signin");
      }
    };

    verifyToken();
  }, [router]);

  if (loading) return <p className="text-white">Validating session...</p>;

  return (
    <div className="bg-black h-screen w-screen text-amber-100">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}
