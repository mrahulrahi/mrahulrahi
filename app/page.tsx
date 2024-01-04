import React from "react"
import Hero from "./components/Hero/Hero";
import ProjectCard from "./components/ProjectCard/ProjectCard";


export default function Home() {
  const videoCards = [{ id: 1, title: 'OnePlus 8 | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/O3zRzznPFA4' },
  { id: 2, title: 'OnePlus NORD | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/KVPr-Q-cloY' },
  { id: 3, title: 'Xiaomi Mi 10i | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/vNFb5rk77Pg' }]


  return (
    <main >

      <Hero />

      <div className="content-container projects-card-container bg-green" id="projects">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="projects-card-content-box d-flex flex-wrap h-100">
                <div className="heading d-flex justify-content-between align-items-end">
                  <h3>Projects</h3>
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
                </div>

                <ProjectCard />
               
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="content-container home-video-card-container bg-violet">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="skill-card-card-content-box d-flex flex-column h-100">
                <div className="heading d-flex">
                  <h3>Videos</h3>
                </div>

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
            </div>
          </div>
        </div>
      </div>


      <div className="content-container skill-card-container bg-green">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="skill-card-card-content-box d-flex flex-wrap h-100">
                <div className="heading d-flex">
                  <h3>Photos</h3>
                </div>
                <div className="skill-card-list-outer">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main >
  )
}
