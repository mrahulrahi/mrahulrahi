'use client'
import Hero from "./components/Hero/Hero";
import ProjectCard from "./components/ProjectCard/ProjectCard";
import ContentContainer from "./components/ContentContainer";
import Heading from "./components/Heading/Heading";
import VideoCard from "./components/VideoCard/VideoCard";
import Button from "./components/Button";
import { FaClock, FaCheck } from "react-icons/fa6";
import { IoDiamondOutline } from "react-icons/io5";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import NftCard from "./components/NftCard/NftCard";


export default function Home() {
  const videoCards = [{ id: 1, title: 'OnePlus 8 | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/O3zRzznPFA4' },
  { id: 2, title: 'OnePlus NORD | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/KVPr-Q-cloY' },
  { id: 3, title: 'Xiaomi Mi 10i | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/vNFb5rk77Pg' }]

  const projectsCards = [
    { id: 1, title: 'Imagine Group', imgUrl: '/project-img-1.png', gitHubUrl: 'https://github.com/mrahulrahi/Imagine-Group', liveUrl: 'http://imaginegrouptourandtravels.com' },
    { id: 2, title: 'mrahulrahi', imgUrl: '/project-img-2.png', gitHubUrl: 'https://github.com/mrahulrahi/mrahulrahi', liveUrl: 'https://mrahulrahi.github.io/mrahulrahi' },
    { id: 3, title: 'Cafe Shafe', imgUrl: '/project-img-3.png', gitHubUrl: 'https://github.com/mrahulrahi/Cafe-Shafe', liveUrl: 'https://mrahulrahi.github.io/Cafe-Shafe' },
    { id: 4, title: 'Imagine Group', imgUrl: '/project-img-1.png', gitHubUrl: 'https://github.com/mrahulrahi/Imagine-Group', liveUrl: 'http://imaginegrouptourandtravels.com' },
    { id: 5, title: 'mrahulrahi', imgUrl: '/project-img-2.png', gitHubUrl: 'https://github.com/mrahulrahi/mrahulrahi', liveUrl: 'https://mrahulrahi.github.io/mrahulrahi' },
    { id: 6, title: 'Cafe Shafe', imgUrl: '/project-img-3.png', gitHubUrl: 'https://github.com/mrahulrahi/Cafe-Shafe', liveUrl: 'https://mrahulrahi.github.io/Cafe-Shafe' }
  ]


  return (
    <main >

      <Hero />

      <ContentContainer background="violet">

        <div id="key-features" className="bg-green">
          <h4 className="section-title text-center">Why choose me ?</h4>
          <ul className="key-feature-list d-flex flex-wrap">
            <li className="key-feature-item">
              <div className="key-feature-box d-flex flex-column align-items-center justify-content-center">
                <div className="key-feature-icon d-flex align-items-center justify-content-center">
                  <FaClock />
                </div>
                <div className="key-feature-description">Receive on time</div>
              </div>
            </li>

            <li className="key-feature-item">
              <div className="key-feature-box d-flex flex-column align-items-center justify-content-center">
                <div className="key-feature-icon">
                  <FaCheck />
                </div>
                <div className="key-feature-description">Fixed Price Projects</div>
              </div>
            </li>

            <li className="key-feature-item">
              <div className="key-feature-box d-flex flex-column align-items-center justify-content-center">
                <div className="key-feature-icon">
                  <IoDiamondOutline />
                </div>
                <div className="key-feature-description">Highly Skilled</div>
              </div>
            </li>
          </ul>
        </div>
      </ContentContainer>

      <ContentContainer className="projects-card-container" background="green">
        <Heading heading="Projects">
          <div className="projects-list-arrow-container d-flex justify-content-between">
            <button
              className="swiper-arrow-prev arrow-button-box d-flex align-items-center justify-content-center rounded-circle">
              <img src="chevron-arrow-icon.svg" alt="chevron arrow right" />
            </button>
            <button
              className="swiper-arrow-next arrow-button-box d-flex align-items-center justify-content-center rounded-circle">
              <img src="chevron-arrow-icon.svg" alt="chevron arrow right" />
            </button>
          </div>
        </Heading>
        <div className="projects-card-list-outer">
          <Swiper modules={[Autoplay]}
            loop={true}
            centeredSlides={true}
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
              nextEl: ".swiper-arrow-next",
              prevEl: ".swiper-arrow-prev",
              disabledClass: "swiper-button-disabled"
            }}
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


      <ContentContainer className="home-video-card-container" background="violet">
        <div className="skill-card-card-content-box d-flex flex-column h-100">
          <Heading heading="Videos">
            <Button title='View All' style='default' />
          </Heading>

          <div className="video-card-list d-flex flex-wrap">
            {videoCards.map(card => <div key={card.id} className="video-card-item">
              <VideoCard item={card} />
            </div>)}
          </div>
        </div>

      </ContentContainer>

      <ContentContainer background="green">
        <Heading heading="Photos">
          <Button title='View All' style='default' />
        </Heading>

        <NftCard />

      </ContentContainer>
    </main >
  )
}
