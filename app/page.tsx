'use client';
import { useEffect, useState } from "react";
import Hero from "./components/Hero/Hero";
import ProjectCard from "./components/ProjectCard/ProjectCard";
import ContentContainer from "./components/ContentContainer";
import Heading from "./components/Heading";
import VideoCard from "./components/VideoCard/VideoCard";
import Button from "./components/Button";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { FaUserGraduate, FaBriefcase, FaLayerGroup, FaUsers, FaClock, FaArrowRight } from "react-icons/fa6";
import { RiCameraLensLine } from "react-icons/ri";
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import StatCard from './components/StatCard/StatCard';
import { projectsCards, photos } from "./data/staticData"; // Moved static data here

type Video = {
  id: { videoId: string };
  snippet: { title: string; description: string; thumbnails: { medium: { url: string } } };
};

const video = async (): Promise<Video[]> => {
  const res = await fetch('/api/youtube');

  if (!res.ok) {
    throw new Error("Failed to fetch YouTube videos");
  }

  const data = await res.json();
  return data;
};


// PhotoCard Component
const PhotoCard = ({ photo }: { photo: { title: string; url: string; camera: string; shotBy: string } }) => (
  <div className="photo-card-item">
    <div className="photo-card-box d-flex flex-column">
      <div className="photo-card-image">
        <img src={photo.url} alt={photo.title} loading="lazy" />
      </div>
      <div className="photo-card-text">
        <h4>{photo.title}</h4>
      </div>
      <div className="photo-card-cta mt-auto">
        <ul className="photo-card-cta-list d-flex align-items-center justify-content-between">
          <li className="photo-card-cta-item d-flex gap-2 align-items-center">
            <RiCameraLensLine />
            {photo.camera}
          </li>
          <li className="photo-card-avatar d-flex align-items-center">
            <img src="/image-avatar.jpg" alt="Avatar" loading="lazy" />
            <p>Shot by <span>{photo.shotBy}</span></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const fetchedVideos = await video();
        setVideos(fetchedVideos);
      } catch (err: any) {
        console.error("Error fetching videos", err.message);
        setError(err.message);
      }
    };
    fetchVideos();
  }, []);

  return (
    <main>
      <Hero bgImage="/hero-bg.svg">
        <Button title="About me" style="default" url="/about" icon={<IoIosArrowDroprightCircle />} />
      </Hero>

      <ContentContainer background="dark" column="col-xl-10 mx-auto">
        <div className="stats-content-box bg-gradient-1" data-aos="fade-up" suppressHydrationWarning>
          <ul className="stats-list d-flex flex-wrap">
            <li className="stats-item">
              <div className="stats-title text-center">
                <h4>Why choose me ?</h4>
                <h3>Stats</h3>
              </div>
            </li>
            <StatCard icon={<FaUserGraduate />} countEnd={1.5} suffix=" +" description="Years of experience" />
            <StatCard icon={<FaBriefcase />} countEnd={50} suffix=" +" description="Projects Completed" />
            <StatCard icon={<FaLayerGroup />} countEnd={10} suffix=" +" description="Skills in my stack" />
            <StatCard icon={<FaClock />} countEnd={1000} suffix=" +" description="Hours of code" />
            <StatCard icon={<FaUsers />} countEnd={96} suffix=" %" description="Client Satisfaction Rate" />
          </ul>
        </div>
      </ContentContainer>

      <ContentContainer className="projects-card-container" background="gradient-1">
        <Heading heading="Projects">
          <div className="custom-arrow-container d-flex justify-content-between">
            <button className="custom-arrow-button custom-arrow-prev projects-arrow-prev bg-glass d-flex align-items-center justify-content-center rounded-circle">
              <FaArrowRight />
            </button>
            <button className="custom-arrow-button custom-arrow-next projects-arrow-next bg-glass d-flex align-items-center justify-content-center rounded-circle">
              <FaArrowRight />
            </button>
          </div>
        </Heading>

        <Swiper
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{ 320: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
          navigation={{ nextEl: ".projects-arrow-next", prevEl: ".projects-arrow-prev", disabledClass: "swiper-button-disabled" }}
          modules={[Autoplay, Navigation]}
          slidesPerView={1}
          spaceBetween={30}
          className="projects-card-list d-flex flex-wrap" data-aos="fade-up" suppressHydrationWarning
        >
          {projectsCards.map(card => (
            <SwiperSlide key={card.id} className="projects-card-item">
              <ProjectCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </ContentContainer>

      <ContentContainer className="home-video-card-container" background="dark">
        <Heading heading="Videos">
          <Button title="View All" style="default" url="/portfolio" />
        </Heading>
        <div className="video-card-list d-flex flex-wrap" data-aos="fade-up" suppressHydrationWarning>
          {error ? <p>{error}</p> : videos?.slice(0, 3).map(video => (
            <div key={video.id.videoId} className="video-card-item">
              <VideoCard id={video.id.videoId} title={video.snippet.title} />
            </div>
          ))}
        </div>
      </ContentContainer>

      <ContentContainer background="gradient-1">
        <Heading heading="Photos">
          <Button title="View All" style="default" url="/portfolio" />
        </Heading>
        <div className="photo-card-list d-flex flex-wrap" data-aos="fade-up" suppressHydrationWarning>
          {photos?.slice(0,3).map(photo => <PhotoCard key={photo.id} photo={photo} />)}
        </div>
      </ContentContainer>
    </main>
  );
}
