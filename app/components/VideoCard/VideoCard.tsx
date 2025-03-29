'use client';
import './VideoCard.css';
import { useEffect, useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa6';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Plyr = dynamic(() => import('plyr-react'), {
  ssr: false,
  loading: () => <div className="video-placeholder">Loading player...</div>,
});

import 'plyr-react/plyr.css';

interface Item {
  id: string;
  title: string;
  controls?: boolean;
  loop?: boolean;
  playing?: boolean;
  onPlay?: (id: string) => void;
  thumbnail?: string;
}

const VideoCard = ({ id, title, controls = true, loop = false, playing = false, onPlay }: Item) => {
  const [isPlaying, setIsPlaying] = useState(playing);
  const [isClient, setIsClient] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const playerRef = useRef<any>(null);
  const thumbnailUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (playerRef.current?.plyr) {
      const player = playerRef.current.plyr;
      
      const handlePlay = () => {
        setIsPlaying(true);
        onPlay?.(id);
      };

      const handlePause = () => {
        setIsPlaying(false);
      };

      player.on('playing', handlePlay);
      player.on('pause', handlePause);

      return () => {
        player.off('playing', handlePlay);
        player.off('pause', handlePause);
      };
    }
  }, [id, onPlay]);

  const videoOptions = {
    type: 'video' as const,
    sources: [
      {
        src: id,
        provider: 'youtube' as const,
      },
    ],
    autoplay: false,
    loop: { active: loop },
  };

  if (!isClient) {
    return <div className="video-placeholder">Loading...</div>;
  }

  return (
    <div className="video-card-box">
      <div className="video-card-iframe position-relative">
        {!isLoaded && (
          <div className="video-thumbnail">
            <Image 
              src={thumbnailUrl}
              alt={title}
              fill
              priority
              onLoad={() => setIsLoaded(true)}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        {!isPlaying && (
          <button 
            className="custom-play-button" 
            onClick={() => {
              try {
                if (playerRef.current?.plyr) {
                  setIsLoaded(true);
                  playerRef.current.plyr.play();
                }
              } catch (error) {
                console.error('Error playing video:', error);
              }
            }}
          >
            <FaPlay />
          </button>
        )}
        {isClient && (
          <Plyr 
            ref={playerRef} 
            source={videoOptions} 
            options={{ 
              controls: controls ? ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'] : [],
            }}
          />
        )}
      </div>
      <div className="video-card-text">
        <h5 dangerouslySetInnerHTML={{ __html: title }}></h5>
      </div>
    </div>
  );
};

export default VideoCard;