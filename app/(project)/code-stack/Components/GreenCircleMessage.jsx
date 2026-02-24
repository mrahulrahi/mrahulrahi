'use client'
import { useRef, useEffect } from "react";

const GreenCircleMessage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const width = 300;
    const height = 250;
    canvas.width = width;
    canvas.height = height;

    // Set background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    // Draw green circle at center (0, 0 → canvas center)
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();

    // Draw message below the circle
    ctx.fillStyle = "green";
    ctx.font = "bold 16pt sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Correct, great job!", centerX, centerY + 80);
  }, []);

  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-lg font-semibold mb-2">Turtle Circle Drawing</h2>
      <canvas
        ref={canvasRef}
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          background: "#fff",
        }}
      />
    </div>
  );
};

export default GreenCircleMessage;
