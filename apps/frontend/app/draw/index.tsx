

export default function InitDraw(canvas:HTMLCanvasElement) {
  
   const ctx = canvas.getContext("2d");
    if(!ctx){
      return;
    }

      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let clicked = false;
      let startX = 0;
      let startY = 0;

      canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.offsetX;
        startY = e.offsetY;
      });

      canvas.addEventListener("mouseup", () => {
        clicked = false;
      });

      canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
          const width = e.offsetX - startX;
          const height = e.offsetY - startY;

          ctx.fillStyle = "black";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // ✅ White stroke
          ctx.strokeStyle = "white";
          ctx.lineWidth = 2;

          ctx.beginPath();
          ctx.rect(startX, startY, width, height);
          ctx.stroke();
        }
      });
  return (
    <div>

    </div>
  )
}
