import axios from "axios";

export async function createRoom({ name }: { name: string }) {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    "http://localhost:8000/room",
    { name }, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
