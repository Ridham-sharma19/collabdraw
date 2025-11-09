"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/btn";
import Input from "../components/input";
import { createRoom } from "./handler";
import RoomBox from "../components/box";

export default function CreateRoom() {
  const [roomName, setRoomName] = useState("");
 
  const router = useRouter();

  const handleRoomCreation = async () => {
    if (!roomName.trim()) {
      alert("Please enter a room name");
      return;
    }

    try {
     

    
      const res = await createRoom({ name: roomName });
      console.log("Room created:", res);

    
      localStorage.setItem("roomId", res.roomId);

      
      router.push(`/canvas/${res.roomId}`);

    } catch (err: any) {
      console.error(" Error creating room:", err);
      alert("Failed to create room — maybe it already exists?");
    } finally {
     
    }
  };

  return (
    <RoomBox title="Create New Room" placeholder="create new Room" buttonText="create" onSubmit={handleRoomCreation} onChange={e=>setRoomName(e.target.value)}/>
  );
}
