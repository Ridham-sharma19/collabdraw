"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "./canvas";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // ✅ Access localStorage only on client side
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      alert("Error while joining room");
      return;
    }
    setToken(storedToken);
  }, []);

  // ✅ Create socket only after token is available
  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(`ws://localhost:8001?token=${token}`);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      setSocket(ws);
      const data = JSON.stringify({
        type: "join_room",
        roomId,
      });
      console.log("Joining room:", data);
      ws.send(data);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      ws.close();
    };
  }, [token, roomId]);

  if (!socket) {
    return <div>Connecting to server....</div>;
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
}
