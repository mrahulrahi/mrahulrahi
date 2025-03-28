'use client';
import './VideoCard.css';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';
import { useEffect, useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa6';

interface Item {
  id: string;
  title: string;
  controls?: boolean;
  loop?: boolean;
  playing?: boolean;
  onPlay?: (id: string) => void;
}

const VideoCard = ({ id, title, controls = true, loop = false, playing = false, onPlay }: Item) => {
  const [isPlaying, setIsPlaying] = useState(playing);
  const playerRef = useRef<any>(null);

  const videoOptions = {
    type: 'video' as const,
    sources: [
      {
        src: id,
        provider: 'youtube' as const,
      },
    ],
    autoplay: playing,
    loop: { active: loop },
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.on('play', () => {
        setIsPlaying(true);
        onPlay?.(id);
      });
      playerRef.current.on('pause', () => setIsPlaying(false));
    }
  }, [id, onPlay]);

  return (
    <div className="video-card-box">
      <div className="video-card-iframe position-relative">
        {!isPlaying && (
          <button className="custom-play-button" onClick={() => playerRef.current?.play()}>
            <FaPlay />
          </button>
        )}
        <Plyr ref={playerRef} source={videoOptions} options={{ controls: controls ? undefined : [] }} />
      </div>
      <div className="video-card-text">
        <h5>{title}</h5>
      </div>
    </div>
  );
};

export default VideoCard; 