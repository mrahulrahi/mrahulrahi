'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ValentineLanding() {
    const [name, setName] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            router.push(`/valentine-app/${encodeURIComponent(name.trim())}`);
        }
    };

    React.useEffect(() => {
        const savedName = localStorage.getItem('valentineName');
        if (savedName) {
            router.push(`/valentine-app/${savedName}`);
        }
    }, [router]);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fffafa',
            fontFamily: "'Quicksand', sans-serif"
        }}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                    padding: '3rem',
                    background: 'white',
                    borderRadius: '30px',
                    boxShadow: '0 20px 60px rgba(255, 117, 143, 0.1)',
                    textAlign: 'center',
                    maxWidth: '400px',
                    width: '90%'
                }}
            >
                <h1 style={{ color: '#ff758f', marginBottom: '1rem' }}>Welcome! 🌹</h1>
                <p style={{ color: '#5d4a4d', marginBottom: '2rem' }}>Please enter your name to see your special Valentine's message.</p>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name..."
                        style={{
                            padding: '1rem',
                            borderRadius: '15px',
                            border: '2px solid #ffe3e8',
                            fontSize: '1rem',
                            outlineColor: '#ff758f'
                        }}
                    />
                    <button
                        type="submit"
                        disabled={!name.trim()}
                        style={{
                            padding: '1rem',
                            background: '#ff758f',
                            color: 'white',
                            border: 'none',
                            borderRadius: '15px',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            opacity: name.trim() ? 1 : 0.6,
                            transition: 'transform 0.2s'
                        }}
                    >
                        See Surprise ✨
                    </button>
                    <button
                         type="button"
                         onClick={() => router.push('/valentine-app/MyLove')}
                         style={{
                             background: 'transparent',
                             border: 'none',
                             color: '#ff8fa3',
                             textDecoration: 'underline',
                             cursor: 'pointer',
                             fontSize: '0.9rem'
                         }}
                    >
                        Skip for now
                    </button>
                </form>
            </motion.div>
        </div>
    );
}