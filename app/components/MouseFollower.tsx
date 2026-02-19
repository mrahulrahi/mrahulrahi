'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MouseFollower() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  const handleMouseMove = (e:any) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    // Check if device has mouse/pointer capability
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    setIsDesktop(hasPointer && !isTouch);

    if (hasPointer && !isTouch) {
      document.body.style.cursor = 'none';
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Ring 1 - Outermost (slowest) */}
      <motion.div
        className="cursor-element ring-outer"
        animate={{
          x: cursorPosition.x - 40,
          y: cursorPosition.y - 40,
        }}
        transition={{
          type: "spring",
          damping: 35,
          stiffness: 150,
          mass: 1.2,
        }}
      />

      {/* Ring 2 - Middle */}
      <motion.div
        className="cursor-element ring-middle"
        animate={{
          x: cursorPosition.x - 28,
          y: cursorPosition.y - 28,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.9,
        }}
      />

      {/* Ring 3 - Innermost (fastest) */}
      <motion.div
        className="cursor-element ring-inner"
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 250,
          mass: 0.6,
        }}
      />

      {/* Center Dot - Instant follow */}
      <motion.div
        className="cursor-element cursor-dot"
        animate={{
          x: cursorPosition.x - 8,
          y: cursorPosition.y - 8,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 400,
          mass: 0.3,
        }}
      />
    </>
  );
}