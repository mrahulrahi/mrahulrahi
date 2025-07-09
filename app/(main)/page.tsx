'use client';
import { useEffect, useState } from "react";
import Hero from "../components/Hero/Hero";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import ContentContainer from "../components/ContentContainer";
import Heading from "../components/Heading";
import VideoCard from "../components/VideoCard/VideoCard";
import Button from "../components/Button";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdWeb } from "react-icons/md";
import { FaUserGraduate, FaLayerGroup, FaGitAlt, FaClock, FaArrowRight } from "react-icons/fa6";
import { RiCameraLensLine } from "react-icons/ri";
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import StatCard from '../components/StatCard/StatCard';
import { projectsCards, photos } from "../data/staticData"; // Moved static data here
import MouseFollower from '../components/MouseFollower';
import VideoModal from '../components/VideoModal';
import { motion } from "framer-motion"

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
        <li className="photo-card-cta-item d-flex gap-2 align-items-center justify-content-between">
          <RiCameraLensLine />
          {photo.camera}
        </li>
        <ul className="photo-card-cta-list">
          <li className="photo-card-avatar d-flex align-items-center justify-content-between">
            <img src="/hero-img.png" alt="Avatar" loading="lazy" />
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

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState<string | null>(null);

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
        <Button title="🔍 About Me" style="default" url="/about" icon={<IoIosArrowDroprightCircle />} />
        <Button title="💼 Portfolio" style="default" url="/portfolio" icon={<IoIosArrowDroprightCircle />} />
      </Hero>

      <ContentContainer background="dark bg-graphic" column="col-xl-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
          className="stats-content-box bg-gradient-1">
          <ul className="stats-list d-flex flex-wrap">
            <li className="stats-item">
              <div className="stats-title text-center">
                <h4>Why choose me ?</h4>
                <h3>Stats</h3>
              </div>
            </li>
            <StatCard icon={<FaUserGraduate />} countEnd={2} suffix=" +" description="Years of experience" />
            <StatCard icon={<MdWeb />} countEnd={80} suffix=" +" description="Projects Completed" />
            <StatCard icon={<FaLayerGroup />} countEnd={12} suffix=" +" description="Skills in my stack" />
            <StatCard icon={<FaClock />} countEnd={1500} suffix=" +" description="Hours of code" />
            <StatCard icon={<FaGitAlt />} countEnd={1900} suffix=" +" description="Total Github Contributions" />
          </ul>
        </motion.div>
      </ContentContainer>

      <ContentContainer className="projects-card-container" background="gradient-1">
        <Heading heading="Crafted With Code">
          <div className="custom-arrow-container d-flex justify-content-between">
            <button className="custom-arrow-button custom-arrow-prev projects-arrow-prev bg-glass d-flex align-items-center justify-content-center rounded-circle">
              <FaArrowRight />
            </button>
            <button className="custom-arrow-button custom-arrow-next projects-arrow-next bg-glass d-flex align-items-center justify-content-center rounded-circle">
              <FaArrowRight />
            </button>
          </div>
        </Heading>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}>


          <Swiper
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{ 320: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
            navigation={{ nextEl: ".projects-arrow-next", prevEl: ".projects-arrow-prev", disabledClass: "swiper-button-disabled" }}
            modules={[Autoplay, Navigation]}
            slidesPerView={1}
            spaceBetween={30}
            className="projects-card-list d-flex flex-wrap"
          >
            {projectsCards.map(card => (
              <SwiperSlide key={card.id} className="projects-card-item">
                <ProjectCard card={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </ContentContainer>

      <ContentContainer className="home-video-card-container" background="dark">
        <Heading heading="Visual Bytes ">
          <Button title="View All" style="default" url="/portfolio#video" />
        </Heading>
        <div className="video-card-list d-flex flex-wrap" data-aos="fade-up" suppressHydrationWarning>
          {error ? <p>{error}</p> : videos?.slice(0, 3).map(video => (
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
      </ContentContainer>

      <ContentContainer background="gradient-1">
        <Heading heading="Captured Essence">
          <Button title="View All" style="default" url="/portfolio#gallery" />
        </Heading>
        <div className="photo-card-list d-flex flex-wrap" data-aos="fade-up" suppressHydrationWarning>
          {photos?.slice(0, 4).map(photo => <PhotoCard key={photo.id} photo={photo} />)}
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
    </main>
  );
}
