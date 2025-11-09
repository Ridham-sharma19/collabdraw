"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/btn";
import Input from "../components/input";
import { joinRoom } from "./handle";
import RoomBox from "../components/box";


export default function JoinBox() {
  const [roomName, setRoomName] = useState("");

  const router = useRouter();

  const handleJoinRoom = async () => {
    if (!roomName.trim()) {
      alert("Please enter a room name");
      return;
    }

    try {


     
      const roomId = await joinRoom({ name: roomName });
      console.log("Joined existing room with ID:", roomId);

      
      localStorage.setItem("roomId", roomId);

      router.push(`/canvas/${roomId}`);
    } catch (err: any) {
      console.error("Error joining room:", err);
      alert("Failed to join room — make sure it exists!");
    } finally {
    }
  };

  return (
   <RoomBox title="Join Room" placeholder="Enter the Room name" buttonText="join" onChange={(e)=>setRoomName(e.target.value)} onSubmit={handleJoinRoom}/>
  );
}
