"use client";
import { useState, useEffect } from "react";

interface Circle {
  id: number;
  x: number;
  y: number;
}

export default function MouseFollower() {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement: update cursor and create falling circles
  const handleMouseMove = (e: MouseEvent) => {
    // Update custom cursor position
    setCursorPosition({ x: e.clientX, y: e.clientY });

    // Create new falling circle
    const newCircle = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setCircles((prevCircles) => [...prevCircles, newCircle]);

    // Remove circles after animation ends (3 seconds)
    setTimeout(() => {
      setCircles((prevCircles) =>
        prevCircles.filter((circle) => circle.id !== newCircle.id)
      );
    }, 3000);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div
        className="custom-cursor"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      ></div>

      {/* Falling Circles */}
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="falling-circle"
          style={{
            left: `${circle.x}px`,
            top: `${circle.y}px`,
          }}
        ></div>
      ))}
    </>
  );
}
