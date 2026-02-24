'use client'
import { useRef, useEffect } from "react";

const RotatingSquares = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Setup canvas
    const width = 500;
    const height = 500;
    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2); // center origin

    // Draw a square with given length and rotation
    const drawSquare = (length, angleDeg, color) => {
      const angle = (angleDeg * Math.PI) / 180;
      ctx.save();
      ctx.rotate(angle);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(-length / 2, -length / 2, length, length);
      ctx.stroke();
      ctx.restore();
    };

    // Draw multiple squares with rotation and color changes
    const colors = ["blue", "green", "red", "yellow"];
    const rotations = 32;
    const rotationStep = 11;
    const squareLength = 100;

    colors.forEach((color) => {
      for (let i = 0; i < rotations; i++) {
        drawSquare(squareLength, i * rotationStep, color);
      }
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-2">Rotating Squares Pattern</h2>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: 'auto',
          background: "black",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

export default RotatingSquares;
