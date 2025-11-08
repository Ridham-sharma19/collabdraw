"use client";

import { useEffect, useState } from "react";
import Canvas from "@/app/components/canvas";

export default function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>();

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8001?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZTczNTk3ZC01MjFmLTRkZDctOTdmZi0wYjNjYjcyMjJmNzciLCJpYXQiOjE3NjI1MzMyNTd9.DEvH7s9TVuH7O5nwq_QhxP0wC9eI7fATjoCwAEKG_0w`);

    ws.onopen = () => {
      setSocket(ws);
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId,
        })
      );
    };
  }, []);

  if (!socket) {
    return <div>connecting to server...</div>;
  }
  return <Canvas roomId={roomId} socket={socket} />;
}
