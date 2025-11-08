
import axios from "axios"


export default async function InitDraw(canvas: HTMLCanvasElement,roomId:string,socket:WebSocket) {
 
 
 
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  socket.onmessage=(event)=>{

    const message = JSON.parse(event.data);

    if(message.type==="chat"){

        const parsedShape = JSON.parse(message.message)

      existingShapes.push(parsedShape.shape)
       clearCanvas(existingShapes,canvas,ctx)
    }

  }

  let existingShapes: Shape[] = await getExistingShapes(roomId);

  clearCanvas(existingShapes,canvas,ctx)
 
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let clicked = false;
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    startX = (e.clientX - rect.left) * scaleX;
    startY = (e.clientY - rect.top) * scaleY;
  });

  canvas.addEventListener("mouseup", (e) => {
    if (!clicked) return;
    clicked = false;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const width = (e.clientX - rect.left) * scaleX - startX;
    const height = (e.clientY - rect.top) * scaleY - startY;
    const shape:Shape = {
      type: "rect",
      x: startX,
      y: startY,
      height,
      width

    }

    existingShapes.push(shape);
    socket.send(JSON.stringify({
       type:"chat",
       message: JSON.stringify({
      shape
    }),
    roomId:roomId
    })
  )

  });

  canvas.addEventListener("mousemove", (e) => {
    if (!clicked) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const width = (e.clientX - rect.left) * scaleX - startX;
    const height = (e.clientY - rect.top) * scaleY - startY;

    clearCanvas(existingShapes, canvas, ctx);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(startX, startY, width, height);
  });
}

function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  
}

async function getExistingShapes(roomId:string){
   
  const res=await axios.get(`http://localhost:8000/chats/${roomId}`);
  const messages = res.data.messages;

  const shapes = messages.map((shape:{message:string})=>{
    const messageData = JSON.parse(shape.message);
    return messageData.shape;
  })

  return shapes;
}