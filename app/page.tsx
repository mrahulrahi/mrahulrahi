'use client'
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
import CountUp from 'react-countup';

export default function Home() {
  const videoCards = [
    { id: 1, title: 'OnePlus 8 | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/O3zRzznPFA4' },
    { id: 2, title: 'OnePlus NORD | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/KVPr-Q-cloY' },
    { id: 3, title: 'Xiaomi Mi 10i | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/vNFb5rk77Pg' }]

  const projectsCards = [
    { id: 1, title: 'Imagine Group', imgUrl: '/project-img-2.png', gitHubUrl: 'https://github.com/mrahulrahi/ig-app', liveUrl: 'http://imaginegindia.com' },
    { id: 2, title: 'Soul Sync', imgUrl: '/project-img-3.png', gitHubUrl: 'https://github.com/mrahulrahi/soulsync', liveUrl: 'https://soulsyncapp.vercel.app' },
    { id: 3, title: 'Weather App', imgUrl: '/project-img-4.png', gitHubUrl: 'https://github.com/mrahulrahi/mrahulrahi', liveUrl: 'https://mrahulrahi.vercel.app/tools/weather-app' },
    { id: 4, title: 'Notes App', imgUrl: '/project-img-5.png', gitHubUrl: 'https://github.com/mrahulrahi/mrahulrahi', liveUrl: 'https://mrahulrahi.vercel.app/tools/notes-app' },
    { id: 5, title: 'Quiz Game', imgUrl: '/project-img-6.png', gitHubUrl: 'https://github.com/mrahulrahi/mrahulrahi', liveUrl: 'https://mrahulrahi.vercel.app/tools/quiz-game' },
    { id: 6, title: 'Calculator', imgUrl: '/project-img-7.png', gitHubUrl: 'https://github.com/mrahulrahi/mrahulrahi', liveUrl: 'https://mrahulrahi.vercel.app/tools/calculator' }
  ]

  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/youtube');
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        setVideos(data.items);
      } catch (error : any) {
        console.error('Error fetching videos:', error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideos();
  }, []);

  return (
    <main >

      <Hero bgImage='/hero-bg.svg'>
        <Button title='About me' style='default' url='/about' icon={<IoIosArrowDroprightCircle />} />
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
            <li className="stats-item">
              <div className="stats-box d-flex gap-4 align-items-center">
                <div className="stats-icon d-flex align-items-center justify-content-center"><FaUserGraduate /></div>
                <div className="stats-content">
                  <div className="stats-count d-flex align-items-center">
                          <CountUp start={0} end={1.5} duration={4} decimal="1" suffix=" +" enableScrollSpy />
                  </div>
                  <div className="stats-description">Years of experience</div>
                </div>
              </div>
            </li>

            <li className="stats-item">
              <div className="stats-box d-flex gap-4 align-items-center">
                <div className="stats-icon d-flex align-items-center justify-content-center"><FaBriefcase /></div>
                <div className="stats-content">
                  <div className="stats-count d-flex align-items-center">
                    <CountUp start={0} end={50} duration={4} suffix=" +" enableScrollSpy />
                  </div>
                  <div className="stats-description">Projects Completed</div>
                </div>
              </div>
            </li>

            <li className="stats-item">
              <div className="stats-box d-flex gap-4 align-items-center">
                <div className="stats-icon d-flex align-items-center justify-content-center"><FaLayerGroup /></div>
                <div className="stats-content">
                  <div className="stats-count d-flex align-items-center">
                    <CountUp start={0} end={10} duration={4} suffix=" +" enableScrollSpy />
                  </div>
                  <div className="stats-description">Skills in my stack</div>
                </div>
              </div>
            </li>

            <li className="stats-item">
              <div className="stats-box d-flex gap-4 align-items-center">
                <div className="stats-icon d-flex align-items-center justify-content-center"><FaClock /></div>
                <div className="stats-content">
                  <div className="stats-count d-flex align-items-center">
                    <CountUp start={0} end={1000} duration={4} suffix=" +" enableScrollSpy />
                  </div>
                  <div className="stats-description">Hours of code</div>
                </div>
              </div>
            </li>

            <li className="stats-item">
              <div className="stats-box d-flex gap-4 align-items-center">
                <div className="stats-icon d-flex align-items-center justify-content-center"><FaUsers /></div>
                <div className="stats-content">
                  <div className="stats-count d-flex align-items-center">
                    <CountUp start={0} end={96} duration={4} suffix=" %" enableScrollSpy />
                  </div>
                  <div className="stats-description">Clients
                    Satisfaction Rate</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </ContentContainer>

      <ContentContainer className="projects-card-container" background="gradient-1" >
        <Heading heading="Projects">
          <div className="custom-arrow-container d-flex justify-content-between">
            <button
              className="custom-arrow-button custom-arrow-prev projects-arrow-prev bg-glass d-flex align-items-center justify-content-center rounded-circle">
              <FaArrowRight />
            </button>
            <button
              className="custom-arrow-button custom-arrow-next projects-arrow-next bg-glass d-flex align-items-center justify-content-center rounded-circle">
              <FaArrowRight />
            </button>
          </div>
        </Heading>

        <div className="projects-card-list-outer" data-aos="fade-up" suppressHydrationWarning>
          <Swiper
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              992: {
                slidesPerView: 3,
              },
            }}
            navigation={{
              nextEl: ".projects-arrow-next",
              prevEl: ".projects-arrow-prev",
              disabledClass: "swiper-button-disabled"
            }}
            modules={[Autoplay, Navigation]}
            slidesPerView={1}
            spaceBetween={30}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            className="projects-card-list d-flex flex-wrap"
          >

            {projectsCards.map(card => <SwiperSlide key={card.id} className="projects-card-item">
              <ProjectCard card={card} />
            </SwiperSlide>)}
          </Swiper>
        </div>
      </ContentContainer>

      <ContentContainer className="home-video-card-container" background="dark">
        <div className="skill-card-card-content-box d-flex flex-column h-100">
          <Heading heading="Videos">
            <Button title='View All' style='default' url="/portfolio" />
          </Heading>

          <div className="video-card-list d-flex flex-wrap" data-aos="fade-up" suppressHydrationWarning>
            {videoCards.map(card => <div key={card.id} className="video-card-item">
              <VideoCard item={card} />
            </div>)}
          </div>
        </div>

      </ContentContainer>

      <ContentContainer background="gradient-1">
        <Heading heading="Photos">
          <Button title='View All' style='default' url="/portfolio" />
        </Heading>

        <div className="photo-card-list d-flex flex-wrap" data-aos="fade-up" suppressHydrationWarning>
          <div className="photo-card-item">
            <div className="photo-card-box d-flex flex-column">
              <div className="photo-card-image">
                <img src="https://lh3.googleusercontent.com/pw/ABLVV86BkvPqD8HnZ2Ls3ud3Yi3r4E_bgkjrYW3s_qnv-RnOxZALZN4Qppup819MtYW54zqqJWw-BwA5Jgnsgf7EtzXZGhoBd3xJOdTvVasnlMzQiKRib1sSIMaKz-6nREmpLlyES1ovk_QhIFJ9vfsUxIs4=w1196-h898-s-no-gm?authuser=0" alt="" />
              </div>
              <div className="photo-card-text">
                <h4>Diya</h4>
              </div>
              <div className="photo-card-cta mt-auto">
                <ul className="photo-card-cta-list d-flex align-items-center justify-content-between">
                  <li className="photo-card-cta-item d-flex gap-2 align-items-center">
                    <RiCameraLensLine />
                    Xiaomi Mi A1</li>
                  <li className="photo-card-avatar d-flex align-items-center">
                    <img src="/image-avatar.jpg" alt="" />
                    <p>Shot by <span>Rahi</span></p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="photo-card-item">
            <div className="photo-card-box d-flex flex-column">
              <div className="photo-card-image">
                <img
                  src="https://lh3.googleusercontent.com/pw/ABLVV86TumQujzkj4fJ8-38Nu5lxnoLi1ot3gWetNGHNNKdbpk71cyBO4RNiy9-EtgT2YkTPU0rDKaXuDl0u3szuGlZdkLTBFRvodkLt-XOKxoskeqpxz068Adz0HN3BS7lhflDu4IDXw2r9HN68p461ndnx=w1196-h898-s-no-gm?authuser=0"
                  alt="" />
              </div>
              <div className="photo-card-text">
                <h4>Camellia Flower</h4>
              </div>
              <div className="photo-card-cta mt-auto">
                <ul className="photo-card-cta-list d-flex align-items-center justify-content-between">
                  <li className="photo-card-cta-item d-flex gap-2 align-items-center">
                    <RiCameraLensLine />
                    Xiaomi Mi A1</li>
                  <li className="photo-card-avatar d-flex align-items-center">
                    <img src="/image-avatar.jpg" alt="" />
                    <p>Shot by <span>Rahi</span></p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="photo-card-item">
            <div className="photo-card-box d-flex flex-column">
              <div className="photo-card-image">
                <img
                  src="https://lh3.googleusercontent.com/pw/ABLVV85p6KiTwrSlTnEpsc_rN8JVlmaRhL5JQiqtBmt_fxrUe3QZl1dSLZOMrTvqnzp90SAgQmQF5JcSt1vsP2O_djREVxyIctl0z-nFkWgf7QllhX0OH-EA5hOZS8P9sc73os_3p3cNO2ZUBJhDhdcFHRtD=w674-h898-s-no-gm?authuser=0"
                  alt="" />
              </div>
              <div className="photo-card-text">
                <h4>Nerium Oleander Flower</h4>
              </div>
              <div className="photo-card-cta mt-auto">
                <ul className="photo-card-cta-list d-flex align-items-center justify-content-between">
                  <li className="photo-card-cta-item d-flex gap-2 align-items-center">
                    <RiCameraLensLine />
                    Xiaomi Mi A1</li>
                  <li className="photo-card-avatar d-flex align-items-center">
                    <img src="/image-avatar.jpg" alt="" />
                    <p>Shot by <span>Rahi</span></p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
      <ContentContainer background="dark">
        <Heading heading="Videos">
          <Button title='View All' style='default' url="/portfolio" />
        </Heading>

        {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && videos.length === 0 && <p>No videos found.</p>}
      {!isLoading && !error && (
        <ul>
          {videos.map((video : any) => (
            <li key={video.id.videoId}>
              <h2>{video.snippet.title}</h2>
              <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            </li>
          ))}
        </ul>
      )}
      </ContentContainer>

    </main >
  )
}
