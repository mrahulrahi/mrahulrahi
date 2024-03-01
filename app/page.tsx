import React from "react"
import Hero from "./components/Hero/Hero";
import ProjectCard from "./components/ProjectCard/ProjectCard";
import ContentContainer from "./components/ContentContainer";
import Heading from "./components/Heading/Heading";
import VideoCard from "./components/VideoCard/VideoCard";
import Button from "./components/Button";


export default function Home() {
  const videoCards = [{ id: 1, title: 'OnePlus 8 | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/O3zRzznPFA4' },
  { id: 2, title: 'OnePlus NORD | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/KVPr-Q-cloY' },
  { id: 3, title: 'Xiaomi Mi 10i | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/vNFb5rk77Pg' }]


  return (
    <main >

      <Hero />

      <ContentContainer background="violet">

        <div id="key-features" className="bg-green">
          <h1 className="section-title text-center">Why choose me ?</h1>
          <ul className="key-feature-list d-flex flex-wrap">
            <li className="key-feature-item">
              <div className="key-feature-box d-flex flex-column align-items-center justify-content-center">
                <div className="key-feature-image">
                  <img src="feature-img-1.png" alt="" />
                </div>
                <div className="key-feature-description">Receive on time</div>
              </div>
            </li>

            <li className="key-feature-item">
              <div className="key-feature-box d-flex flex-column align-items-center justify-content-center">
                <div className="key-feature-image">
                  <img src="feature-img-2.png" alt="" />
                </div>
                <div className="key-feature-description">Fixed Price Projects</div>
              </div>
            </li>

            <li className="key-feature-item">
              <div className="key-feature-box d-flex flex-column align-items-center justify-content-center">
                <div className="key-feature-image">
                  <img src="feature-img-1.png" alt="" />
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

      </ContentContainer>
    </main >
  )
}
