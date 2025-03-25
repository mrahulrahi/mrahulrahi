import './VideoCard.css';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';

interface Item {
  id: string;
  title: string;
  controls?: boolean;
  loop?: boolean;
  playing?: boolean;
}

const VideoCard = ({ id, title, controls = true, loop = false, playing = false }: Item) => {
  const videoOptions = {
    type: 'video',
    sources: [
      {
        src: id,
        provider: 'youtube',
      },
    ],
    autoplay: playing,
    loop: { active: loop },
  };

  return (
    <div className="video-card-box">
      <div className="video-card-iframe">
        <Plyr source={videoOptions} options={{ controls: controls ? undefined : [] }} />
      </div>
      <div className="video-card-text">
        <h5>{title}</h5>
      </div>
    </div>
  );
};

export default VideoCard;
