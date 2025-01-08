import Image from 'next/image'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { TbBrandNextjs, TbBrandTailwind } from "react-icons/tb";
import { SiAdobexd } from "react-icons/si";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaBootstrap, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import InnerHero from '../components/InnerHero/InnerHero';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Button from '../components/Button';
import ContentContainer from '../components/ContentContainer';
import Heading from '../components/Heading';
import CertificateCard from '../components/CertificateCard/CertificateCard';
import SkillCard from '../components/SkillCard/SkillCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'mrahulrahi - About',
  description: 'know more about me',
}

const HeroHeading = () => {
  return (<>
    About <span className="bg-clip-text bg-gradient-1">me</span>
  </>)
}


const About = () => {

  const skills = [
    { id: 1, logo: <FaHtml5 />, title: 'HTML' },
    { id: 2, logo: <FaCss3Alt />, title: 'CSS' },
    { id: 3, logo: <FaJsSquare />, title: 'JavaScript' },
    { id: 4, logo: <BiLogoTypescript  />, title: 'TypeScript' },
    { id: 5, logo: <FaBootstrap />, title: 'Bootstrap' },
    { id: 6, logo: <TbBrandTailwind />, title: 'Tailwind CSS' },
    { id: 7, logo: <FaReact />, title: 'ReactJS' },
    { id: 8, logo: <TbBrandNextjs />, title: 'Next Js' },
    { id: 9, logo: <FaNodeJs />, title: 'Node.js' },
    { id: 10, logo: <FaGitAlt />, title: 'Git' },
    { id: 11, logo: <FaGithub />, title: 'GitHub' },
    { id: 12, logo: <FaFigma />, title: 'Figma' },
    { id: 13, logo: <SiAdobexd />, title: 'Adobe Xd' },
  ]

  const timelineItems = [
    { id: 1, title: 'Diploma', role: 'AIMT', duration: 'July 2017 - Nov 2020' },
    { id: 2, title: 'Fireliquidtaor', role: 'Youtuber', duration: 'Oct 2018 - Sep 2022' },
    { id: 3, title: 'BCA', role: 'IGNOU', duration: 'July 2021 - Jun 2024' },
    { id: 4, title: 'CodeClause', role: 'Web Dev Intern', duration: 'Nov 2022' },
    { id: 5, title: 'Imagine Group', role: 'Freelancer', duration: 'Dec 2022 - Jun 2023' },
    { id: 6, title: 'SlicemyPage', role: 'Front End Developer', duration: 'Jun 2023 - Now' },
  ]

  const certificates = [
    { id: 1, url: 'https://www.udemy.com/certificate/UC-4e377dc1-f535-4589-b877-ba5257976fa9/', title: 'Web Development Bootcamp', organization: 'Udemy' },
    { id: 2, url: 'https://profiles.topcoder.com/mrahulrahi', title: 'Full stack Development', organization: 'Topcoder' },
    { id: 3, url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Accenture%20Nordics/PxenP4rHNE6Bh4nQz_Accenture%20Nordics_f635M87hfdNWoDbzC_1666336729816_completion_certificate.pdf', title: 'Dev Virtual Exp Program', organization: 'Forage' },
    { id: 4, url: 'https://codedamn.com/user/mrahulrahi', title: 'Codedamn Certificates', organization: 'Codedamn' },
    { id: 5, url: 'https://www.hackerrank.com/certificates/62ee41b69fc2', title: 'SQL (Basic)', organization: 'Hacker Rank' },
  ]

  return (
    <>

      <InnerHero heading={<HeroHeading />} bgImage='/inner-hero-img.jpg' >
        <Button title="Featured Work" style="default" url="/portfolio" icon={<IoIosArrowDroprightCircle />} />
      </InnerHero>

      <ContentContainer className="image-text-block-container" background="gradient-2">
        <div className="itb-content-box d-flex flex-wrap bg-dark overflow-hidden" data-aos="fade-up" suppressHydrationWarning>
          <div className="itb-img-box d-flex align-items-center justify-content-center" data-aos="fade-right" suppressHydrationWarning>
            <div className="itb-img">
              <Image src="/hero-img-1.jpg" alt="" width={1000} height={1000} />
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

      <ContentContainer background="dark">
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
                          <p className="timeline-content-desc"><span>{item.role}</span>{item.duration}</p>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </ContentContainer>


      <ContentContainer background="gradient-1">
        <Heading heading="Certificates" />
        <div className="card-list d-flex flex-wrap" data-aos="fade-up" suppressHydrationWarning>
          {certificates.map(item => <div key={item.id} className="card-item">
            <CertificateCard item={item} />
          </div>)}
        </div>
      </ContentContainer>

    </ >
  )
}

export default About