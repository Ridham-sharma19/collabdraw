import axios from "axios";

export async function getExistingShapes(roomId: string) {
  const token = localStorage.getItem("token"); // ✅ get token from browser storage

  if (!token) {
    throw new Error("No token found. Please sign in again.");
  }

  const res = await axios.get(`http://localhost:8000/chats/${roomId}`, {
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
