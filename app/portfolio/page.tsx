'use client'
import Banner from '../components/Banner/Banner'
import InnerHero from '../components/InnerHero/InnerHero'
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Button from '../components/Button';
import Heading from '../components/Heading';
import ContentContainer from '../components/ContentContainer';
import VideoCard from '../components/VideoCard/VideoCard';
import PhotoCard from '../components/PhotoCard/PhotoCard';
import WorkCard from '../components/WorkCard/WorkCard';
import { Metadata } from 'next';
import { workCards, imageLinks } from "../data/staticData";
import { useState } from 'react';
import { useEffect } from 'react';

// export const metadata: Metadata = {
//   title: 'mrahulrahi - portfolio',
//   description: 'portfolio work',
// }

type Video = {
  id: { videoId: string };
  snippet: { title: string; description: string; thumbnails: { medium: { url: string } } };
};

const video = async (): Promise<Video[]> => {
  const { YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID } = process.env;

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet&type=video&maxResults=15`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch YouTube videos");
  }

  const data = await res.json();
  return data.items || [];
};

const HeroHeading = () => {
  return (<>
    My <span className="bg-clip-text bg-gradient-1">Portfolio</span>
  </>)
}

const Portfolio = () => {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const fetchedVideos = await video();
        setVideos(fetchedVideos);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchVideos();
  }, []);

  return (
    <>
      <InnerHero heading={<HeroHeading />} bgImage='/inner-hero-img.jpg' >
        <Button title='FireLiquidator' style='default' url='#video' icon={<IoIosArrowDroprightCircle />} />
        <Button title='Rahi Creations' style='default' url='#gallery' icon={<IoIosArrowDroprightCircle />} />
      </InnerHero>

      <ContentContainer background='gradient-2'>
        <div className="itb-content-box bg-gradient-1" data-aos="fade-up" suppressHydrationWarning>
          <Heading heading='My Project' />

          <div className="work-list d-flex flex-wrap">
            {workCards.map(card =>
              <div key={card.id} className="work-item" data-aos="fade-up" suppressHydrationWarning>
                <WorkCard card={card} />
              </div>
            )}
          </div>
        </div>
      </ContentContainer>

      <Banner logo='./rc-logo.png' bgImage='./banner-bg.jpg'>
        <span className='bg-clip-text bg-gradient-1'>RAHI</span>CREATIONS
      </Banner>


      <ContentContainer background='dark' id='gallery'>
        <Heading heading='Gallery' />

        <div className="gallery" data-aos="fade-up" suppressHydrationWarning>
          {imageLinks.map(item =>
            <div key={item.id}>
              <PhotoCard item={item} />
            </div>
          )}
        </div>
      </ContentContainer >

      <Banner bgImage='./banner-bg.jpg'>
        WHERE <span className='bg-clip-text bg-gradient-1'>IMAGINATION</span><br />MEETS <span className='bg-clip-text bg-gradient-1'>CREATIVITY</span>
      </Banner>

      <ContentContainer background='gradient-2' id='video'>
        <div className="row">
          <div className="col-md-5 col-xl-4">
            <div className="sticky-sidebar-box w-100 d-flex flex-column align-items-center justify-content-center" data-aos="fade-up" suppressHydrationWarning>
              <div className="video-logo" data-aos="fade-up" suppressHydrationWarning>
                <img src="/fl-logo.png" className="img-fluid" />
              </div>
              <div className="video-title mt-5" data-aos="fade-up" suppressHydrationWarning>
                <span style={{ color: '#FAB205' }}>FIRE</span>LIQUIDATOR
              </div>
              <div className="video-btn" data-aos="fade-up" suppressHydrationWarning>
                <Button title='Open Youtube' style='default' url='https://www.youtube.com/@fireliquidator' />
              </div>
            </div>
          </div>
          <div className="col-md-7 col-xl-8">
            <div className="sticky-content-box d-flex flex-column" data-aos="fade-up" suppressHydrationWarning>
              <Heading heading='Videos' />

              <div className="video-card-list" data-aos="fade-up" suppressHydrationWarning>
                {error ? <p>{error}</p> : videos?.map(video => (
                  <div key={video.id.videoId} className="video-card-item">
                    <VideoCard id={video.id.videoId} title={video.snippet.title} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </>
  )
}

export default Portfolio