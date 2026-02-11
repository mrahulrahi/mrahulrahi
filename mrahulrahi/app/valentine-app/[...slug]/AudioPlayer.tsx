'use client';
import React, { useState, useRef } from 'react';
import styles from './Valentine.module.css';

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (!audioRef.current) return;
        
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className={styles.audioPlayer}>
            <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
            <button onClick={togglePlay} className={styles.audioButton} aria-label={isPlaying ? "Pause Music" : "Play Music"}>
                {isPlaying ? "🔇" : "🎵"}
            </button>
        </div>
    );
};

export default AudioPlayer;
