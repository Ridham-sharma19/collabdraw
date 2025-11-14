"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import JoinBox from "../joinbox/box";
import CreateRoom from "../createbox/box";

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
   <div className="min-h-screen w-full bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-800 text-white flex justify-center items-center px-6 py-12 relative overflow-hidden">
      
 
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[40rem] h-[40rem] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

    
     

    
      <main className="flex flex-col md:flex-row gap-10 z-10">
        <CreateRoom />
        <JoinBox />
      </main>

      
    </div>
  );
}
