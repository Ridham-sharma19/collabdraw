"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "./canvas";
import { BACKEND_WS } from "../config/config";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [token, setToken] = useState<string | null>(null);


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      alert("Error while joining room");
      return;
    }
    setToken(storedToken);
  }, []);

  
  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(`${BACKEND_WS}?token=${token}`);

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
