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
            <audio ref={audioRef} loop src="/Perfect by Ed Sheeran.mp3" />
            <div className={`${styles.vinylRecord} ${isPlaying ? styles.spinning : ''}`} onClick={togglePlay}>
                <div className={styles.vinylGrooves}></div>
                <div className={styles.vinylLabel}>
                    <span className={styles.musicNote}>{isPlaying ? "🎵" : "🔇"}</span>
                </div>
            </div>
            {isPlaying && (
                <div className={styles.musicNotesFloating}>
                    <span style={{ animationDelay: '0s' }}>♩</span>
                    <span style={{ animationDelay: '1s' }}>♪</span>
                    <span style={{ animationDelay: '2s' }}>♫</span>
                </div>
            )}
        </div>
    );
};

export default AudioPlayer;
