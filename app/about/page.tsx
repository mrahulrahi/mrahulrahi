import React from 'react'
import Image from 'next/image'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { TbBrandNextjs, TbBrandTailwind } from "react-icons/tb";
import { SiAdobexd } from "react-icons/si";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaBootstrap, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma } from "react-icons/fa";
import InnerHero from '../components/InnerHero/InnerHero';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Button from '../components/Button/Button';
import ContentContainer from '../components/ContentContainer/ContentContainer';
import Heading from '../components/Heading/Heading';
import Link from 'next/link';
import CertificateCard from '../components/CertificateCard/CertificateCard';

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

  const certificates = [
    { id: 1, url: 'https://www.udemy.com/certificate/UC-4e377dc1-f535-4589-b877-ba5257976fa9/', title: 'Web Development Bootcamp', organization: 'Udemy' },
    { id: 1, url: 'https://profiles.topcoder.com/mrahulrahi', title: 'Full stack Development', organization: 'Topcoder' },
    { id: 1, url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Accenture%20Nordics/PxenP4rHNE6Bh4nQz_Accenture%20Nordics_f635M87hfdNWoDbzC_1666336729816_completion_certificate.pdf', title: 'Dev Virtual Exp Program', organization: 'Forage' },
    { id: 1, url: 'https://codedamn.com/user/mrahulrahi', title: 'Codedamn Certificates', organization: 'Codedamn' },
    { id: 1, url: 'https://www.hackerrank.com/certificates/62ee41b69fc2', title: 'SQL (Basic)', organization: 'Hacker Rank' },
  ]

  return (
    <>

      <InnerHero heading={<HeroHeading />} subHeading={<HeroSubHeading />}>
        <Button title='Featured Work' style='default' url='/portfolio' icon={<IoIosArrowDroprightCircle />} />
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

                  <Button title='Download Resume' style='green' url='https://drive.google.com/file/d/1-4vdQtKGmM2ixaMvL2Wav6KY9ncrglcT/view?usp=sharing' icon={<IoIosArrowDropdownCircle />} />

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

      <ContentContainer background='violet'>
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
      </ContentContainer>


      <ContentContainer background='green'>
        <Heading heading='Certificates' />
        <div className="card-list d-flex flex-wrap">
          {certificates.map(item => <div key={item.id} className="card-item">
          <CertificateCard item={item} />
          </div>)}
        </div>
      </ContentContainer>





    </ >
  )
}

export default About