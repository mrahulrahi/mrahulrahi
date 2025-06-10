'use client'
import { useState, useEffect } from 'react';
import Banner from '../../components/Banner/Banner'
import InnerHero from '../../components/InnerHero/InnerHero'
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Button from '../../components/Button';
import Heading from '../../components/Heading';
import ContentContainer from '../../components/ContentContainer';
import VideoCard from '../../components/VideoCard/VideoCard';
import PhotoCard from '../../components/PhotoCard/PhotoCard';
import WorkCard from '../../components/WorkCard/WorkCard';
import { projectsCards, photos } from "../../data/staticData";
import MouseFollower from '../../components/MouseFollower';
import VideoModal from '../../components/VideoModal';

type Video = {
  id: { videoId: string };
  snippet: { title: string; description: string; thumbnails: { medium: { url: string } } };
};

const fetchVideos = async (): Promise<Video[]> => {
  const res = await fetch('/api/youtube');

  if (!res.ok) {
    throw new Error("Failed to fetch YouTube videos");
  }

  return res.json();
};

const HeroHeading = () => {
  return (<>
    My <span className="bg-clip-text bg-gradient-1">Portfolio</span>
  </>)
}

const Portfolio = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [visibleVideos, setVisibleVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadedCount, setLoadedCount] = useState(5);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState<string | null>(null);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const fetchedVideos = await fetchVideos();
        setVideos(fetchedVideos);
        setVisibleVideos(fetchedVideos.slice(0, 5));
      } catch (err: any) {
        console.error("Error fetching videos", err.message);
        setError(err.message);
      }
    };
    getVideos();
  }, []);

  const loadMoreVideos = () => {
    const newCount = loadedCount + 5;
    setVisibleVideos(videos.slice(0, newCount));
    setLoadedCount(newCount);
  };

  return (
    <>
      <InnerHero heading={<HeroHeading />} bgImage='/inner-hero-img.jpg'>
        <Button title='FireLiquidator' style='default' url='#video' icon={<IoIosArrowDroprightCircle />} />
        <Button title='Rahi Creations' style='default' url='#gallery' icon={<IoIosArrowDroprightCircle />} />
      </InnerHero>

      <ContentContainer background='gradient-2' id='work'>
        <div className="itb-content-box bg-gradient-1" data-aos="fade-up" suppressHydrationWarning>
          <Heading heading='My Work' />

          <div className="work-list d-flex flex-wrap">
            {projectsCards.map(card => (
              <div key={card.id} className="work-item" data-aos="fade-up" suppressHydrationWarning>
                <WorkCard card={card} />
              </div>
            ))}
          </div>
        </div>
      </ContentContainer>

      <Banner logo='./rc-logo.png' bgImage='./banner-bg.jpg'>
        <span className='bg-clip-text bg-gradient-1'>RAHI</span>CREATIONS
      </Banner>

      <ContentContainer background='dark bg-graphic' id='gallery'>
        <Heading heading='Gallery' />

        <div className="gallery" data-aos="fade-up" suppressHydrationWarning>
          {photos.map(item => (
            <div key={item.id}>
              <PhotoCard item={item} />
            </div>
          ))}
        </div>
      </ContentContainer>

      <Banner bgImage='./banner-bg.jpg'>
        WHERE <span className='bg-clip-text bg-gradient-1'>IMAGINATION</span><br />MEETS <span className='bg-clip-text bg-gradient-1'>CREATIVITY</span>
      </Banner>

      <ContentContainer background='gradient-2' id='video'>
        <div className="row">
          <div className="col-md-5 col-xl-4">
            <div className="sticky-sidebar-box w-100 d-flex flex-column align-items-center justify-content-center" data-aos="fade-up" suppressHydrationWarning>
              <div className="video-logo" data-aos="fade-up" suppressHydrationWarning>
                <img src="/fl-logo.png" className="img-fluid" alt="Fire Liquidator Logo" />
              </div>
              <div className="video-title mt-5" data-aos="fade-up" suppressHydrationWarning>
                <span style={{ color: '#FAB205' }}>FIRE</span>LIQUIDATOR
              </div>
              <div className="video-btn" data-aos="fade-up" suppressHydrationWarning>
                <Button title='Open Youtube' style='default' url='https://www.youtube.com/@fireliquidator' />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-7 offset-md-1">
            <div className="sticky-content-box d-flex flex-column" data-aos="fade-up" suppressHydrationWarning>
              <Heading heading='Videos' />

              <div className="video-card-list" data-aos="fade-up" suppressHydrationWarning>
                {error ? <p>{error}</p> : visibleVideos.map(video => (
                  <div key={video.id.videoId} className="video-card-item">
                    <VideoCard
                      id={video.id.videoId}
                      title={video.snippet.title}
                      onVideoSelect={setSelectedVideo}
                      onVideoTitle={setSelectedVideoTitle} 
                      onModalOpen={setModalOpen}
                    />
                  </div>
                ))}
              </div>

              {loadedCount < videos.length && (
                <div className="load-more-btn mt-4 text-center">
                  <button className="btn btn-default" onClick={loadMoreVideos}>Load More</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </ContentContainer>

      {modalOpen && selectedVideo && (
        <VideoModal
          videoId={selectedVideo}
          title={selectedVideoTitle ?? ''}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}

      <MouseFollower />
    </>
  )
}

export default Portfolio;
