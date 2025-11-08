import { useEffect, useRef, useState } from "react";
import InitDraw from "../draw";
import { IconButton } from "./btnIcons";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";


export type Tool = "circle" | "rect" | "pencil";

export default function Canvas({roomId,socket}:{roomId:string,socket:WebSocket}) {


    const canvasRef = useRef<HTMLCanvasElement>(null);

     const [selectedTool, setSelectedTool] = useState<Tool>("circle")


    useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;
      InitDraw(canvasRef.current,roomId,socket)
      
    }
  }, [canvasRef]);
  return (
    <div className="h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
      <div className="fixed top-10 left-10">
       <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
      </div>
    </div>
  )
}

function Topbar({selectedTool, setSelectedTool}: {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}) {
    return <div style={{
            position: "fixed",
            top: 10,
            left: 10
        }}>
            <div className="flex gap-t">
                <IconButton 
                    onClick={() => {
                        setSelectedTool("pencil")
                    }}
                    activated={selectedTool === "pencil"}
                    icon={<Pencil />}
                />
                <IconButton onClick={() => {
                    setSelectedTool("rect")
                }} activated={selectedTool === "rect"} icon={<RectangleHorizontalIcon />} ></IconButton>
                <IconButton onClick={() => {
                    setSelectedTool("circle")
                }} activated={selectedTool === "circle"} icon={<Circle />}></IconButton>
            </div>
        </div>
}