import axios from "axios";
import { BACKEND_HTTP } from "../config/config";

export async function getExistingShapes(roomId: string) {
  const token = localStorage.getItem("token"); // ✅ get token from browser storage

  if (!token) {
    throw new Error("No token found. Please sign in again.");
  }

  const res = await axios.get(`${BACKEND_HTTP}/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });

  const messages = res.data.messages;

  const shapes = messages.map((shape: { message: string }) => {
    const messageData = JSON.parse(shape.message);
    return messageData.shape;
  });

  return shapes;
}
