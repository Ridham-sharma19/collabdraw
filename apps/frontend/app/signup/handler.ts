

import axios from "axios";


export async function signUpHandler(username: string, email: string, password: string) {
  try {
    const res = await axios.post("http://localhost:8000/signup", {
      name: username,
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

