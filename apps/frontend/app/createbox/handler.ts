import axios from "axios";
import { BACKEND_HTTP } from "../config/config";

export async function createRoom({ name }: { name: string }) {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    `${BACKEND_HTTP}/room`,
    { name }, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
