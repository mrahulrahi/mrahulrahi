'use client';
import './VideoCard.css';
import { FaPlay } from 'react-icons/fa6';
import Image from 'next/image';

interface Item {
  id: string;
  title: string;
  onVideoSelect: (videoId: string) => void;
  onVideoTitle: (title: string) => void;
  onModalOpen: (isOpen: boolean) => void;
}

const VideoCard = ({ id, title, onVideoSelect, onVideoTitle, onModalOpen }: Item) => {
  const handlePlay = (videoId: string) => {
    onVideoSelect(videoId);
    onVideoTitle(title);
    onModalOpen(true);
  };

  return (
    <div className="video-card-box">
      <div className="video-card-media position-relative">
        <div className="video-thumbnail">
          <Image src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={title} fill priority style={{ objectFit: 'cover' }} />
        </div>

        <button className="custom-play-button d-flex align-items-center justify-content-center" type="button" onClick={() => handlePlay(id)}>
          <FaPlay />
        </button>
      </div>
      <div className="video-card-text">
        <h5 dangerouslySetInnerHTML={{ __html: title }}></h5>
      </div>
    </div>
  );
};

export default VideoCard;