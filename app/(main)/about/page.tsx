import Image from 'next/image'
import Banner from '../../components/Banner/Banner';
import Button from '../../components/Button';
import Heading from '../../components/Heading';
import ContentContainer from '../../components/ContentContainer';
import CertificateCard from '../../components/CertificateCard/CertificateCard';
import SkillCard from '../../components/SkillCard/SkillCard';
import { timelineItems, certificates } from '../../data/staticData';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { TbBrandNextjs, TbBrandTailwind } from "react-icons/tb";
import { SiAdobexd } from "react-icons/si";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaBootstrap, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma } from "react-icons/fa";
import { BiLogoTypescript, BiLogoVisualStudio } from "react-icons/bi";
import { Metadata } from 'next';
import MouseFollower from '../../components/MouseFollower';

export const metadata: Metadata = {
  title: 'mrahulrahi - About',
  description: 'know more about me',
}

const HeroHeading = () => {
  return (<>
    About <span className="bg-clip-text bg-gradient-1">me</span>
  </>)
}

const BackgroundFixedElement = () => {
  return (<>
    <ul className="box-animated-bg">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </>)
}


const About = () => {

  const skills = [
    { id: 1, logo: <FaHtml5 />, title: 'HTML' },
    { id: 2, logo: <FaCss3Alt />, title: 'CSS' },
    { id: 3, logo: <FaJsSquare />, title: 'JavaScript' },
    { id: 4, logo: <BiLogoTypescript />, title: 'TypeScript' },
    { id: 5, logo: <FaBootstrap />, title: 'Bootstrap' },
    { id: 6, logo: <TbBrandTailwind />, title: 'Tailwind CSS' },
    { id: 7, logo: <FaReact />, title: 'ReactJS' },
    { id: 8, logo: <TbBrandNextjs />, title: 'Next Js' },
    { id: 9, logo: <FaNodeJs />, title: 'Node.js' },
    { id: 10, logo: <FaGitAlt />, title: 'Git' },
    { id: 11, logo: <FaGithub />, title: 'GitHub' },
    { id: 12, logo: <FaFigma />, title: 'Figma' },
    { id: 13, logo: <SiAdobexd />, title: 'Adobe Xd' },
    { id: 14, logo: <BiLogoVisualStudio />, title: 'VS Code' },
  ]

  return (
    <>
      <Banner heading={<HeroHeading />} bgImage='/inner-hero-img.jpg' >
        <Button title="What I do ?" style="default" url="#timelineSection" icon={<IoIosArrowDropdownCircle />} />
      </Banner>

      <ContentContainer className="image-text-block-container" background="gradient-2">
        <div className="itb-content-box d-flex flex-wrap bg-dark overflow-hidden" data-aos="fade-up" suppressHydrationWarning>
          <div className="itb-img-box d-flex align-items-center justify-content-center" data-aos="fade-right" suppressHydrationWarning>
            <div className="itb-img">
              <Image src="/hero-img.jpg" alt="" width={1000} height={1000} />
            </div>
          </div>
          <div className="itb-text" data-aos="fade-left" suppressHydrationWarning>
            <h4><span className="bg-clip-text bg-gradient-1">Hello,</span> I'm</h4>
            <h2>Rahul Maurya</h2>
            <h5>Web Developer</h5>

            <p>I am a front-end web developer whose life's passion is Technology and I also love to
              click photographs. I can provide clean code and pixel perfect design. I also make the
              website responsive & more interactive with web animations. I try to make videos that are
              to-the-point and as content-packed as possible, so if that sounds like your cup of tea,
              a sub would be massively appreciated! 🙏</p>
            <p>Stack - <span className="text-accent fw-bold">MERN</span> Stack</p>
            <Button title="Download Resume" style="gradient" url="https://flowcv.com/resume/29mh2gwpwu" icon={<IoIosArrowDropdownCircle />} />
          </div>

          <div className="text-scroll-wrapper mt-5">
            <div className="text-scroll-list">
              <div className="text-scroll-item">
                <div className="text-scroll-box">
                  <h5>🧠 Turning ideas into interactive interfaces.</h5>
                </div>
              </div>
              <div className="text-scroll-item">
                <div className="text-scroll-box">
                  <h5>🎯 Let’s create something amazing together.</h5>
                </div>
              </div>
            </div>
            <div className="text-scroll-list">
              <div className="text-scroll-item">
                <div className="text-scroll-box">
                  <h5>🧠 Turning ideas into interactive interfaces.</h5>
                </div>
              </div>
              <div className="text-scroll-item">
                <div className="text-scroll-box">
                  <h5>🎯 Let’s create something amazing together.</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="itb-skill-box d-flex flex-column bg-dark" data-aos="fade-up" suppressHydrationWarning>
          <Heading heading="Skills" />

          <div className="skill-card-list d-flex flex-wrap" data-aos="fade-up" suppressHydrationWarning>
            {skills.map(skill => <div key={skill.id} className="skill-card-item flex-grow-1">
              <SkillCard skill={skill} />
            </div>)}
          </div>
        </div>
      </ContentContainer>

      <ContentContainer background="dark bg-graphic position-relative oveflow-hidden" id="timelineSection" backgroundFixedElement={<BackgroundFixedElement />}>
        <div className="row" data-aos="fade-up" suppressHydrationWarning>
          <div className="col-md-6">
            <div className="sticky-sidebar-box" data-aos="fade-up" suppressHydrationWarning>
              <div className="timeline-img-box d-flex align-items-center justify-content-center" data-aos="fade-up" suppressHydrationWarning><img src="/rahi.webp" alt="" /></div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="sticky-content-box" data-aos="fade-up" suppressHydrationWarning>
              <div className="main-container d-flex flex-wrap">
                <Heading heading="What I do" />

                <div className="timeline-container" data-aos="fade-up" suppressHydrationWarning>
                  <div className="timeline" data-aos="fade-up" suppressHydrationWarning>
                    {timelineItems.map(item =>
                      <div key={item.id} className="timeline-item" data-aos="fade-up" suppressHydrationWarning>
                        <div className="timeline-content">
                          <h3 className="timeline-content-title">{item.title}</h3>
                          <ul className="timeline-content-desc">
                            {item.roles && item.roles.map((role) => <li key={role.role}><span>{role.role}</span>{role.duration}</li>)}
                          </ul>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>

      <ContentContainer background="gradient-1" heading="Certificates" >
        <div className="certificate-card-list d-flex flex-wrap" data-aos="fade-up" suppressHydrationWarning>
          {certificates.map(item => <div key={item.id} className="certificate-card-item">
            <CertificateCard item={item} />
          </div>)}
        </div>
      </ContentContainer>
      <MouseFollower />
    </ >
  )
}

export default About