"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/btn";
import Input from "../components/input";
import { joinRoom } from "./handle";

export default function JoinBox() {
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleJoinRoom = async () => {
    if (!roomName.trim()) {
      alert("Please enter a room name");
      return;
    }

    try {
      setLoading(true);

     
      const roomId = await joinRoom({ name: roomName });
      console.log("Joined existing room with ID:", roomId);

      
      localStorage.setItem("roomId", roomId);

      router.push(`/canvas/${roomId}`);
    } catch (err: any) {
      console.error("Error joining room:", err);
      alert("Failed to join room — make sure it exists!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-800 text-white p-6 rounded-2xl shadow-md w-96 mx-auto mt-16 space-y-4">
      <h2 className="text-xl font-semibold text-center">Join an Existing Room</h2>

      <Input
        type="text"
        placeholder="Enter Room Name"
       
        onChange={(e) => setRoomName(e.target.value)}
      />

      <Button variant="primary" onClick={handleJoinRoom}>
        {loading ? "Joining..." : "Join Room"}
      </Button>
    </div>
  );
}
