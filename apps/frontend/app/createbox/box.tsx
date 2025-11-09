"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/btn";
import Input from "../components/input";
import { createRoom } from "./handler";

export default function Box() {
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRoomCreation = async () => {
    if (!roomName.trim()) {
      alert("Please enter a room name");
      return;
    }

    try {
      setLoading(true);

    
      const res = await createRoom({ name: roomName });
      console.log("Room created:", res);

    
      localStorage.setItem("roomId", res.roomId);

      
      router.push(`/canvas/${res.roomId}`);

    } catch (err: any) {
      console.error(" Error creating room:", err);
      alert("Failed to create room — maybe it already exists?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-800 text-white p-6 rounded-2xl shadow-md w-96 mx-auto mt-16 space-y-4">
      <h2 className="text-xl font-semibold text-center">Create Room</h2>

      <Input
        type="text"
        placeholder="Enter Room Name"
        
        onChange={(e) => setRoomName(e.target.value)}
      />

      <Button
        variant="primary"
        onClick={handleRoomCreation}
        
      >
        {loading ? "Joining..." : "Join"}
      </Button>
    </div>
  );
}
