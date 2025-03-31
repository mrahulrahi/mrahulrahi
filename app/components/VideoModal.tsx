import './VideoCard/VideoCard.css';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import 'plyr-react/plyr.css';
import { FaXmark } from 'react-icons/fa6';
const Plyr = dynamic(() => import('plyr-react'), {
    ssr: false,
    loading: () => <div className="video-placeholder">Loading player...</div>,
});

const VideoModal = ({ videoId, title, isOpen, onClose }: { videoId: string | null; title?: string; isOpen: boolean; onClose: () => void }) => {
    const playerRef = useRef<any>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isOpen && playerRef.current?.plyr) {
            playerRef.current.plyr.play();
        }
    }, [isOpen]);

    if (!isClient || !isOpen || !videoId) {
        return null;
    }

    return (
        <div className={`modal fade show`} style={{ display: 'block' }} tabIndex={-1} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content video-card-box">

                    <button type="button" className="btn-close-modal d-flex align-items-center justify-content-center" onClick={onClose} aria-label="Close">
                        <FaXmark />
                    </button>
                    <div className="video-card-media position-relative">
                        <Plyr
                            ref={playerRef}
                            source={{
                                type: 'video',
                                sources: [{ src: videoId, provider: 'youtube' }],
                            }}
                            options={{
                                controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
                                clickToPlay: true,
                                displayDuration: true,
                                resetOnEnd: true,
                            }}
                        />
                    </div>


                    {title && <div className="video-card-text"><h5 dangerouslySetInnerHTML={{ __html: title }}></h5></div>}

                </div>
            </div>
        </div>
    );
};

export default VideoModal;