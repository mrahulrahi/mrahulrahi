'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Point {
    x: number;
    y: number;
    id: number;
}

const CursorTrail: React.FC = () => {
    const [points, setPoints] = useState<Point[]>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() };
            setPoints(prev => [...prev.slice(-15), newPoint]); // Keep last 15 points
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Cleanup old points
    useEffect(() => {
        const interval = setInterval(() => {
            setPoints(prev => prev.filter(p => Date.now() - p.id < 500));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
            <AnimatePresence>
                {points.map((point) => (
                    <motion.div
                        key={point.id}
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 0, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: 'absolute',
                            left: point.x,
                            top: point.y,
                            fontSize: '1.2rem',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        💖
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default CursorTrail;
