import React from 'react'
import Image from 'next/image'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { TbBrandNextjs, TbBrandTailwind } from "react-icons/tb";
import { SiAdobexd } from "react-icons/si";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaBootstrap, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma } from "react-icons/fa";
import InnerHero from '../components/InnerHero/InnerHero';

const HeroHeading = () => {
  return (<>
    About <span>me</span>
  </>)
}

const HeroSubHeading = () => {
  return (<>
         I'm a <span>Web Developer</span>.
  </>)
}

const About = () => {

  const skills = [
    { id: 1, logo: <FaHtml5 />, title: 'HTML' },
    { id: 2, logo: <FaCss3Alt />, title: 'CSS' },
    { id: 3, logo: <FaJsSquare />, title: 'JavaScript' },
    { id: 4, logo: <FaBootstrap />, title: 'Bootstrap' },
    { id: 5, logo: <TbBrandTailwind />, title: 'Tailwind CSS' },
    { id: 6, logo: <FaReact />, title: 'ReactJS' },
    { id: 7, logo: <TbBrandNextjs />, title: 'Next Js' },
    { id: 8, logo: <FaNodeJs />, title: 'Node.js' },
    { id: 9, logo: <FaGitAlt />, title: 'Git' },
    { id: 10, logo: <FaGithub />, title: 'GitHub' },
    { id: 11, logo: <FaFigma />, title: 'Figma' },
    { id: 12, logo: <SiAdobexd />, title: 'Adobe Xd' },
  ]

  return (
    <div >

      <InnerHero heading={<HeroHeading />}  subHeading={<HeroSubHeading />}>


   
      </InnerHero>


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
                  <h4><span>Hello,</span> I'm</h4>
                  <h2>Rahul <span>Maurya</span></h2>
                  <h5>Web <span>Developer</span></h5>
                  <p>I am a front-end web developer whose life's passion is Technology and I also love to
                    click photographs. I can provide clean code and pixel perfect design. I also make the
                    website responsive & more interactive with web animations. I try to make videos that are
                    to-the-point and as content-packed as possible, so if that sounds like your cup of tea,
                    a sub would be massively appreciated! 🙏</p>
                  <p>Stack - MERN Stack</p>

                  <a href="https://drive.google.com/file/d/1-4vdQtKGmM2ixaMvL2Wav6KY9ncrglcT/view?usp=sharing"
                    className="btn btn-default white">Download Resume<IoIosArrowDropdownCircle /></a>
                </div>

              </div>

              <div className="itb-skill-box d-flex flex-column bg-violet">
                <div className="heading d-flex">
                  <h3>Skills</h3>
                </div>

                <div className="skill-card-list d-flex flex-wrap">
                  {skills.map(skill => <div key={skill.id} className="skill-card-item flex-grow-1">
                    <div className="skill-card-box">
                      <div className="skill-card-icon mx-auto">
                        {skill.logo}
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
                  <div className="card-item">
                    <a className="card-box d-flex" href="https://www.udemy.com/certificate/UC-4e377dc1-f535-4589-b877-ba5257976fa9/">
                      <div className="card-text mt-auto">
                        <h4>MERN Dev</h4>
                        <p>Udemy</p>
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
                  <div><img src="/rahi.webp" alt="" /></div>

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
                            <h3 className="timeline-content-title">Diploma</h3>
                            <p className="timeline-content-desc"><span>AIMT</span>July 2017 - Nov 2020</p>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-content" data-aos="fade-up">
                            <h3 className="timeline-content-title">BCA</h3>
                            <p className="timeline-content-desc"><span>IGNOU</span>July 2021 - Jun 2024</p>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-content" data-aos="fade-up">
                            <h3 className="timeline-content-title">Fireliquidtaor</h3>
                            <p className="timeline-content-desc"><span>Youtuber</span>Oct 2018 - Sep 2022 </p>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-content" data-aos="fade-up">
                            <h3 className="timeline-content-title">CodeClause</h3>
                            <p className="timeline-content-desc"><span>Web Dev Intern</span>Nov 2022</p>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-content" data-aos="fade-up">
                            <h3 className="timeline-content-title">Imagine Group</h3>
                            <p className="timeline-content-desc"><span>Freelancer</span>Dec 2022 - Jun 2023</p>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-content" data-aos="fade-up">
                            <h3 className="timeline-content-title">SlicemyPage</h3>
                            <p className="timeline-content-desc"><span>Front End Developer</span>Jun 2023 - Now</p>
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