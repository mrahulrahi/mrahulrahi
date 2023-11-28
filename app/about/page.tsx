import React from 'react'
import Image from 'next/image'

const About = () => {

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
        <div>
            
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


            <div className="content-container bg-violet">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="d-flex">
                                <div className="content-left">
                                    <div><img src="/rahi.webp" alt=""/></div>

                                </div>
                                <div className="content-right">
                                    <div className="main-container d-flex flex-wrap">
                                        <div
                                            className="heading d-flex flex-wrap justify-content-between align-items-start position-relative">
                                            <div className="heading-text">
                                                <h3> What I do </h3>
                                            </div>
                                        </div>
                                        <div className="timeline-container">
                                            <div className="timeline">
                                                <div className="timeline-item">
                                                    <div className="timeline-content" data-aos="fade-up">
                                                        <div className="timeline-img">
                                                            <img
                                                                src="https://www.slicemypage.com/wp-content/themes/smp/include/images/smp-icon.png" />
                                                        </div>
                                                        <h2 className="timeline-content-title">Childhood
                                                        </h2>
                                                        <p className="timeline-content-desc">Birth and Early
                                                            Years School Days
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="timeline-item">
                                                    <div className="timeline-content" data-aos="fade-up">
                                                        <div className="timeline-img">
                                                            <img
                                                                src="https://www.slicemypage.com/wp-content/themes/smp/include/images/smp-icon.png" />
                                                        </div>
                                                        <h2 className="timeline-content-title">Teenage Years
                                                        </h2>
                                                        <p className="timeline-content-desc">Adolescence
                                                            Milestone Moments</p>
                                                    </div>
                                                </div>
                                                <div className="timeline-item">
                                                    <div className="timeline-content" data-aos="fade-up">
                                                        <div className="timeline-img">
                                                            <img
                                                                src="https://www.slicemypage.com/wp-content/themes/smp/include/images/smp-icon.png" />
                                                        </div>
                                                        <h2 className="timeline-content-title">Adulthood
                                                        </h2>
                                                        <p className="timeline-content-desc">Education and
                                                            Career Love and
                                                            Family.</p>
                                                    </div>
                                                </div>
                                                <div className="timeline-item">
                                                    <div className="timeline-content" data-aos="fade-up">
                                                        <div className="timeline-img">
                                                            <img
                                                                src="http://imaginegrouptourandtravels.com/assets/imgs/logo.png" />
                                                        </div>
                                                        <h2 className="timeline-content-title">Imagine Group
                                                        </h2>
                                                        <p className="timeline-content-desc">Dec,2022 - Jun,2023</p>
                                                    </div>
                                                </div>
                                                <div className="timeline-item">
                                                    <div className="timeline-content" data-aos="fade-up">
                                                        <div className="timeline-img">
                                                            <img
                                                                src="https://www.slicemypage.com/wp-content/themes/smp/include/images/smp-icon.png" />
                                                        </div>
                                                        <h2 className="timeline-content-title">SlicemyPage
                                                        </h2>
                                                        <p className="timeline-content-desc">Jun,2023 - Now</p>
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


       

        </div >
    )
}

export default About