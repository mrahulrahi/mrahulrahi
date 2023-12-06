import React from 'react'
import { RiHtml5Fill, RiJavascriptFill, RiBootstrapFill } from "react-icons/ri";
import { FaCss3Alt, FaGlobe, FaGithub } from "react-icons/fa";

const ProjectCard = () => {
    
  const projectsCards = [{ id: 1, title: 'Imagine Group', imgUrl: '/project-img-1.png', gitHubUrl: 'https://github.com/mrahulrahi/Imagine-Group', liveUrl: 'http://imaginegrouptourandtravels.com' },
  { id: 2, title: 'mrahulrahi', imgUrl: '/project-img-2.png', gitHubUrl: 'https://github.com/mrahulrahi/mrahulrahi', liveUrl: 'https://mrahulrahi.github.io/mrahulrahi' },
  { id: 3, title: 'Cafe Shafe', imgUrl: '/project-img-3.png', gitHubUrl: 'https://github.com/mrahulrahi/Cafe-Shafe', liveUrl: 'https://mrahulrahi.github.io/Cafe-Shafe' }]

    return (
        <div className="projects-card-list-outer">
            <div className="swiper projects-card-list projects-card-list-slider">
                <div className="swiper-wrapper d-flex">
                    {projectsCards.map(card => <div key={card.id} className="swiper-slide projects-card-item">
                        <div className="projects-card-box bg-yellow w-100 h-100">
                            <div className="projects-card-img">
                                <img src={card.imgUrl} alt="" />
                            </div>

                            <div className="projects-card-text-box">
                                <div
                                    className="projects-card-text d-flex justify-content-between align-items-center">
                                    <h4>{card.title}</h4>
                                    <div className="d-flex">
                                        <a className="btn-icon d-flex align-items-center justify-content-center"
                                            href={card.liveUrl}><FaGlobe /></a>
                                        <a className="btn-icon d-flex align-items-center justify-content-center"
                                            href={card.gitHubUrl}><FaGithub /></a>
                                    </div>
                                </div>
                                <div className="tools d-flex justify-content-between align-items-center">
                                    <h5>Tools used</h5>
                                    <div className="badge-list d-flex">
                                        <div className="badge-item">
                                            <RiHtml5Fill />
                                        </div>
                                        <div className="badge-item">
                                            <FaCss3Alt />
                                        </div>
                                        <div className="badge-item">
                                            <RiJavascriptFill />
                                        </div>
                                        <div className="badge-item">
                                            <RiBootstrapFill />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard