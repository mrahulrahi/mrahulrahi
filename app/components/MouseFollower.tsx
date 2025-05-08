"use client";
import { useState, useEffect } from "react";

interface shape {
  id: number;
  x: number;
  y: number;
}

export default function MouseFollower() {
  const [shapes, setShapes] = useState<shape[]>([]);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement: update cursor and create falling shapes
  const handleMouseMove = (e: MouseEvent) => {
    // Update custom cursor position
    setCursorPosition({ x: e.clientX, y: e.clientY });

    // Create new falling shape
    const newShape = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setShapes((prevShapes) => [...prevShapes, newShape]);

    // Remove shapes after animation ends (3 seconds)
    setTimeout(() => {
      setShapes((prevShapes) =>
        prevShapes.filter((shape) => shape.id !== newShape.id)
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

      {/* Falling shapes */}
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="falling-shape"
          style={{
            left: `${shape.x}px`,
            top: `${shape.y}px`,
          }}
        ></div>
      ))}
    </>
  );
}
