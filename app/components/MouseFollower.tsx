"use client";
import { useState, useEffect } from "react";

export default function MouseDrop() {
  const [circles, setCircles] = useState([]);

  // Handle mouse movement and create circles
  const handleMouseMove = (e) => {
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
    <div className="container-fluid position-relative vh-100 bg-dark overflow-hidden">
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
      <h1 className="text-white text-center pt-5">Mouse Drop Animation</h1>
    </div>
  );
}
