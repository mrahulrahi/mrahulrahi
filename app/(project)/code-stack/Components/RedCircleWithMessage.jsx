import { useEffect, useRef, useState } from "react";

const RedCircleWithMessage = () => {
  const canvasRef = useRef(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Canvas setup
    const width = 300;
    const height = 250;
    canvas.width = width;
    canvas.height = height;

    // Encouraging messages
    const encouragingMessages = [
      "Incorrect, keep trying",
      "Incorrect, defeat is nothing but a state of mind",
      "Incorrect, you are probably close",
      "Incorrect, DO NOT give up",
    ];

    // Pick a random message
    const selectedMessage =
      encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
    setMessage(selectedMessage); // for rendering or access later

    // Draw red circle in the center
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(centerX, centerY - 30, 50, 0, 2 * Math.PI);
    ctx.fill();

    // Draw message below the circle
    ctx.fillStyle = "red";
    ctx.font = "bold 16pt sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(selectedMessage, centerX, centerY + 60);
  }, []);

  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-lg font-semibold mb-2">Try Again</h2>
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

export default RedCircleWithMessage;
