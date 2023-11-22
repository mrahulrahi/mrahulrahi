import Image from 'next/image'



export default function Home() {
  const skills = [{
    id: 1,
    logo: 'fa-brands fa-html5',
    title: 'HTML'
  },
  {
    id: 2,
    logo: 'fa-brands fa-css3-alt',
    title: 'CSS'
  }, {
    id: 3,
    logo: 'fa-brands fa-square-js',
    title: 'JavaScript'
  }, {
    id: 4,
    logo: 'fa-brands fa-bootstrap',
    title: 'Bootstrap'
  }, {
    id: 5,
    logo: 'fa-brands fa-react',
    title: 'ReactJS'
  }, {
    id: 6,
    logo: 'fa-brands fa-node-js',
    title: 'Node.js'
  }, {
    id: 7,
    logo: 'fa-brands fa-git-alt',
    title: 'Git'
  }, {
    id: 8,
    logo: 'fa-brands fa-github',
    title: 'GitHub'
  }, {
    id: 9,
    logo: 'fa-brands fa-figma',
    title: 'Figma'
  }]

  return (
    <main >

      <div className="hero-container d-flex align-items-start position-relative">
        <div className="hero-bg"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hero-box d-flex align-items-center justify-content-center">
                <div className="hero-text text-center">
                  <h4><span>Hello,</span> I'm</h4>
                  <h1>Rahul <span>Maurya</span></h1>
                  <h3>I'm a <span>Web Developer</span>.</h3>
                  <div className="hero-btn">
                    <a href="#projects" className="btn btn-default">Featured Work
                      <i className="fas fa-arrow-down ms-2"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="content-container image-text-block-container bg-yellow">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="itb-content-box d-flex flex-wrap bg-violet">
                <div className="itb-img-box d-flex align-items-center justify-content-center">
                  <div className="itb-img">
                    <Image src="/main-img.jpg" alt="" width={1000} height={1000} />
                  </div>
                </div>
                <div className="itb-text">
                  <div className="heading d-flex">
                    <h3>About Me</h3>
                  </div>
                  <h2>Rahul <span>Maurya</span></h2>
                  <h5>Web <span>Developer</span></h5>
                  <p>I am a front-end web developer whose life's passion is Technology and I also love to
                    click photographs. I can provide clean code and pixel perfect design. I also make the
                    website responsive & more interactive with web animations. I try to make videos that are
                    to-the-point and as content-packed as possible, so if that sounds like your cup of tea,
                    a sub would be massively appreciated! 🙏</p>
                  <p>Stack - MERN Stack</p>

                  <a href="https://drive.google.com/file/d/1-4vdQtKGmM2ixaMvL2Wav6KY9ncrglcT/view?usp=sharing"
                    className="btn btn-default white">Download Resume</a>
                </div>

              </div>

              <div className="itb-skill-box d-flex flex-column bg-violet">
                <div className="heading d-flex">
                  <h3>Skills</h3>
                </div>

                <div className="skill-card-list d-flex flex-wrap">
                  {skills.map(skill => <div key={skill.id} className="skill-card-item">
                    <div className="skill-card-box">
                      <div className="skill-card-icon mx-auto">
                        <i className={skill.logo}></i>
                      </div>
                      <p>{skill.title}</p>
                    </div>
                  </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="content-container card-container bg-violet">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card-content-box d-flex flex-column">
                <div className="heading d-flex">
                  <h3>Certificates</h3>
                </div>
                <div className="card-list d-flex flex-wrap">
                  <div className="card-item">
                    <a className="card-box d-flex" href="https://www.hackerrank.com/certificates/62ee41b69fc2">
                      <div className="card-text mt-auto">
                        <h4>SQL (Basic)</h4>
                        <p>Hacker Rank</p>
                      </div>
                    </a>
                  </div>
                  <div className="card-item">
                    <a className="card-box d-flex" href="https://codedamn.com/user/mrahulrahi">
                      <div className="card-text mt-auto">
                        <h4>Codedamn Certificates</h4>
                        <p>Codedamn</p>
                      </div>
                    </a>
                  </div>
                  <div className="card-item">
                    <a className="card-box d-flex"
                      href="https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Accenture%20Nordics/PxenP4rHNE6Bh4nQz_Accenture%20Nordics_f635M87hfdNWoDbzC_1666336729816_completion_certificate.pdf">
                      <div className="card-text mt-auto">
                        <h4>Dev Virtual Exp Program</h4>
                        <p>Forage</p>
                      </div>
                    </a>
                  </div>
                  <div className="card-item">
                    <a className="card-box d-flex" href="https://profiles.topcoder.com/mrahulrahi">
                      <div className="card-text mt-auto">
                        <h4>Top coder</h4>
                        <p>Topcoder</p>
                      </div>
                    </a>
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
