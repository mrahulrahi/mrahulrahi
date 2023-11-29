



export default function Home() {


  return (
    <main >

      <div className="hero-container d-flex flex-wrap align-items-center position-relative">
        <div className="hero-bg"> <img src="/animated-shape.svg" alt="" /></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-12 mx-auto">
              <div className="hero-content d-flex flex-wrap justify-content-between glass-bg">
                <div className="hero-left">
                  <div className="hl-content">
                    <div className="hero-img"> <img src="/hero-img-1.jpg" alt="" /> </div>
                    <div className="hero-icon hi-1"> <img src="/html-5.png" alt="" />
                    </div>
                    <div className="hero-icon hi-2"> <img src="/css-3.png" alt="" />
                    </div>
                    <div className="hero-icon hi-3"> <img src="/java.png" alt="" /> </div>
                  </div>
                </div>
                <div className="hero-right">
                  <div className="hr-content">
                    <h4><span>Hello,</span> I'm</h4>
                    <h1>Rahul <span>Maurya</span></h1>
                    <h3>I'm a <span>Web Developer</span> <br /> From <span>India</span> .</h3>
                    <p>Tech Stack - MERN</p>
                      <div className="about-hero-btn">
                      <a href="#projects" className="btn btn-default">Featured Work
                        <i className="fas fa-arrow-down ms-2"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



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
                <div className="projects-card-list-outer">
                  <div className="swiper projects-card-list projects-card-list-slider">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide projects-card-item">
                        <div className="projects-card-box bg-yellow">
                          <div className="projects-card-img">
                            <img src="/project-img-1.png" alt="" />
                          </div>

                          <div className="projects-card-text-box">
                            <div
                              className="projects-card-text d-flex justify-content-between align-items-center">
                              <h4>Imagine Group</h4>
                              <div className="d-flex">
                                <a className="btn-icon d-flex align-items-center justify-content-center"
                                  href="https://imaginegrouptourandtravels.com/"><i
                                    className="fa-solid fa-globe"></i></a>
                                <a className="btn-icon d-flex align-items-center justify-content-center"
                                  href="https://github.com/mrahulrahi/Imagine-Group"><i
                                    className="fa-brands fa-github"></i></a>
                              </div>
                            </div>
                            <div className="tools d-flex justify-content-between align-items-center">
                              <h5>Tools used</h5>
                              <div className="badge-list d-flex">
                                <div className="badge-item">
                                  <i className="fa-brands fa-html5"></i>
                                </div>
                                <div className="badge-item">
                                  <i className="fa-brands fa-css3-alt"></i>
                                </div>
                                <div className="badge-item">
                                  <i className="fa-brands fa-square-js"></i>
                                </div>
                                <div className="badge-item">
                                  <i className="fa-brands fa-bootstrap"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide projects-card-item">
                        <div className="projects-card-box bg-yellow">
                          <div className="projects-card-img">
                            <img src="/project-img-2.png" alt="" />
                          </div>

                          <div className="projects-card-text-box">
                            <div
                              className="projects-card-text d-flex justify-content-between align-items-center">
                              <h4>Apps & Cards</h4>
                              <div className="d-flex">
                                <a className="btn-icon d-flex align-items-center justify-content-center"
                                  href="https://mrahulrahi.github.io/Apps-Cards/"><i
                                    className="fa-solid fa-globe"></i></a>
                                <a className="btn-icon d-flex align-items-center justify-content-center"
                                  href="https://github.com/mrahulrahi/Apps-Cards"><i
                                    className="fa-brands fa-github"></i></a>
                              </div>
                            </div>
                            <div className="tools d-flex justify-content-between align-items-center">
                              <h5>Tools used</h5>
                              <div className="badge-list d-flex">
                                <div className="badge-item">
                                  <i className="fa-brands fa-html5"></i>
                                </div>
                                <div className="badge-item">
                                  <i className="fa-brands fa-css3-alt"></i>
                                </div>
                                <div className="badge-item">
                                  <i className="fa-brands fa-square-js"></i>
                                </div>
                                <div className="badge-item">
                                  <i className="fa-brands fa-bootstrap"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-slide projects-card-item">
                        <div className="projects-card-box bg-yellow">
                          <div className="projects-card-img">
                            <img src="/project-img-3.png" alt="" />
                          </div>

                          <div className="projects-card-text-box">
                            <div
                              className="projects-card-text d-flex justify-content-between align-items-center">
                              <h4>Cafe Shafe</h4>
                              <div className="d-flex">
                                <a className="btn-icon d-flex align-items-center justify-content-center"
                                  href="https://mrahulrahi.github.io/Cafe-Shafe/"><i
                                    className="fa-solid fa-globe"></i></a>
                                <a className="btn-icon d-flex align-items-center justify-content-center"
                                  href="https://github.com/mrahulrahi/Cafe-Shafe"><i
                                    className="fa-brands fa-github"></i></a>
                              </div>
                            </div>
                            <div className="tools d-flex justify-content-between align-items-center">
                              <h5>Tools used</h5>
                              <div className="badge-list d-flex">
                                <div className="badge-item">
                                  <i className="fa-brands fa-html5"></i>
                                </div>
                                <div className="badge-item">
                                  <i className="fa-brands fa-css3-alt"></i>
                                </div>
                                <div className="badge-item">
                                  <i className="fa-brands fa-square-js"></i>
                                </div>
                                <div className="badge-item">
                                  <i className="fa-brands fa-bootstrap"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                  <div className="video-card-item">
                    <div className="video-card-box bg-yellow" data-aos="fade-up">
                      <div className="video-card-iframe">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/O3zRzznPFA4"
                          title="YouTube video player" frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowfullscreen></iframe>
                      </div>
                      <div className="video-card-text">
                        <h5>OnePlus 8 | B-roll | Cinematic Shots</h5>
                      </div>
                    </div>
                  </div>
                  <div className="video-card-item">
                    <div className="video-card-box bg-yellow" data-aos="fade-up">
                      <div className="video-card-iframe">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/KVPr-Q-cloY"
                          title="YouTube video player" frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowfullscreen></iframe>
                      </div>
                      <div className="video-card-text">
                        <h5>
                          OnePlus NORD | B-roll | Cinematic Shots
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="video-card-item">
                    <div className="video-card-box bg-yellow" data-aos="fade-up">
                      <div className="video-card-iframe">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/vNFb5rk77Pg"
                          title="YouTube video player" frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowfullscreen></iframe>
                      </div>
                      <div className="video-card-text">
                        <h5>
                          Xiaomi Mi 10i | B-roll | Cinematic Shots
                        </h5>
                      </div>
                    </div>
                  </div>
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
