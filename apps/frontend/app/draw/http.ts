import axios from "axios";

export async function getExistingShapes(roomId:string){
   
  const res=await axios.get(`http://localhost:8000/chats/${roomId}`);
  const messages = res.data.messages;

  const shapes = messages.map((shape:{message:string})=>{
    const messageData = JSON.parse(shape.message);
    return messageData.shape;
  })

  return shapes;
}