import { Tool } from "../components/canvas";
import { getExistingShapes } from "./http";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "pencil";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    };

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private roomId: string;
  private clicked: boolean;
  private startX=0;
  private startY=0;
  private selectedTool:Tool = "circle";
  private socket: WebSocket;

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.init();
    this.roomId = roomId;
    this.initHandlers();
    this.clicked = false;
    this.socket = socket;

  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    this.clearCanvas()
  }
  initHandlers() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type == "chat") {
        const parsedShape = JSON.parse(message.message);
        this.existingShapes.push(parsedShape.shape);
        this.clearCanvas();
      }
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.existingShapes.forEach((shape) => {
      if (shape.type === "rect") {
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      }
    });
  }


  setTool(tool:"circle"|"pencil"|"rect"){
    this.selectedTool = tool
  }

  initMouseHandlers(){
    this.canvas.addEventListener("mousedown",(e)=>{
      
    this.clicked = true;

    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    this.startX = (e.clientX - rect.left) * scaleX;
    this.startY = (e.clientY - rect.top) * scaleY;
  });

  this.canvas.addEventListener("mouseup", (e) => {
    if (!this.clicked) return;
    this.clicked = false;

    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    const width = (e.clientX - rect.left) * scaleX - this.startX;
    const height = (e.clientY - rect.top) * scaleY - this.startY;
    const shape:Shape = {
      type: "rect",
      x: this.startX,
      y: this.startY,
      height,
      width

    }
    this.existingShapes.push(shape);
    this.socket.send(JSON.stringify({
       type:"chat",
       message: JSON.stringify({
      shape
    }),
    roomId:this.roomId
    })
  )

  })

  this.canvas.addEventListener("mousemove", (e) => {
    if (!this.clicked) return;

    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    const width = (e.clientX - rect.left) * scaleX - this.startX;
    const height = (e.clientY - rect.top) * scaleY - this.startY;

    this.clearCanvas();

    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 1.5;
    this.ctx.strokeRect(this.startX, this.startY, width, height);
  });




}
}
