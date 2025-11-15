

import axios from "axios";
import { BACKEND_HTTP } from "../config/config";


export async function signInHandler(email: string, password: string) {
  try {
    const res = await axios.post(`${BACKEND_HTTP}/signin`, {
      
      email,
      password,
    });
    const token = res.data?.token||res.data;
    if(!token){
      alert("Signin failed:");
    }
    localStorage.setItem("token", token);
    
  } catch (error) {
    console.error("Signin failed:", error);
    throw error;
  }
}

