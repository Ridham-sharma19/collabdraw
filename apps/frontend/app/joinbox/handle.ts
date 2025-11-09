
import axios from "axios";

export async function joinRoom({ name }: { name: string }) {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(`http://localhost:8000/room/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const room = res.data.room;

    if (!room) {
      throw new Error("Room not found");
    }

  
    return room.id;
  } catch (error: any) {
    console.error("Join room error:", error);
    throw new Error(
      error.response?.data?.message || "Failed to join existing room"
    );
  }
}
