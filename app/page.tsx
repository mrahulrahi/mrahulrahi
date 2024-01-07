import React from "react"
import Hero from "./components/Hero/Hero";
import ProjectCard from "./components/ProjectCard/ProjectCard";
import ContentContainer from "./components/ContentContainer/ContentContainer";
import Heading from "./components/Heading/Heading";


export default function Home() {
  const videoCards = [{ id: 1, title: 'OnePlus 8 | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/O3zRzznPFA4' },
  { id: 2, title: 'OnePlus NORD | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/KVPr-Q-cloY' },
  { id: 3, title: 'Xiaomi Mi 10i | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/vNFb5rk77Pg' }]


  return (
    <main >

      <Hero />

      <ContentContainer className="projects-card-container" background="green">
        <Heading heading="Projects">
          <div className="projects-list-arrow-container d-flex justify-content-between">
            <button type="button"
              className="swiper-arrow-prev projects-arrow-prev arrow-button-box d-flex align-items-center justify-content-center rounded-circle">
              <img src="chevron-arrow-icon.svg" alt="chevron arrow right" />
            </button>
            <button type="button"
              className="swiper-arrow-next projects-arrow-next arrow-button-box d-flex align-items-center justify-content-center rounded-circle">
              <img src="chevron-arrow-icon.svg" alt="chevron arrow right" />
            </button>
          </div>
        </Heading>
        <ProjectCard />
      </ContentContainer>


      <ContentContainer className="home-video-card-container" background="violet">
        <div className="skill-card-card-content-box d-flex flex-column h-100">
          <Heading heading="Videos"></Heading>
          <div className="video-card-list d-flex flex-wrap">
            {videoCards.map(card => <div key={card.id} className="video-card-item">
              <div className="video-card-box bg-yellow" data-aos="fade-up">
                <div className="video-card-iframe">
                  <iframe width="560" height="315" src={card.url}
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen></iframe>
                </div>
                <div className="video-card-text">
                  <h5>{card.title}</h5>
                </div>
              </div>
            </div>)}
          </div>
        </div>

      </ContentContainer>

      <ContentContainer background="green">
        <Heading heading="Photos"></Heading>

      </ContentContainer>

    </main >
  )
}
