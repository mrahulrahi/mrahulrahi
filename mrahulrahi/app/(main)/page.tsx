'use client';
import { useEffect, useState } from "react";
import Image from 'next/image'
import * as motion from "motion/react-client";
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Hero from "../components/Hero/Hero";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import ContentContainer from "../components/ContentContainer";
import Button from "../components/Button";
import StatCard from '../components/StatCard/StatCard';
import MouseFollower from '../components/MouseFollower';
import Banner from '../components/Banner/Banner'
import InterestCard from "../components/InterestCard/InterestCard";
import BlogCard from "../components/BlogCard/BlogCard";
import Heading from '../components/Heading';
import CertificateCard from '../components/CertificateCard/CertificateCard';
import SkillCard from '../components/SkillCard/SkillCard';
import { projectsCards, interest, timelineItems, certificates } from '../data/staticData';
import { TiArrowRightOutline, TiArrowDownOutline } from "react-icons/ti";
import { MdWeb } from "react-icons/md";
import { FaUserGraduate, FaLayerGroup, FaClock } from "react-icons/fa6";
import { TbBrandNextjs, TbBrandTailwind } from "react-icons/tb";
import { SiAdobexd } from "react-icons/si";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaBootstrap, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma } from "react-icons/fa";
import { BiLogoTypescript, BiLogoVisualStudio } from "react-icons/bi";


const BannerHeadingOne = () => {
  return (<>
    My <span className="bg-clip-text bg-gradient">Portfolio</span>
  </>)
}

const HeroHeading = () => {
  return (<>
    About <span className="bg-clip-text bg-gradient">me</span>
  </>)
}

const BackgroundFixedElement = () => {
  return (<>
    <ul className="box-animated-bg">
      {Array.from({ length: 22 }).map((_, index) => (
        <li key={index}></li>
      ))}
    </ul>
  </>)
}

export default function Home() {

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

  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("https://dev.to/api/articles", {
          cache: "no-store", // avoid caching
        });

        if (!res.ok) {
          throw new Error("Failed to fetch articles");
        }

        const data = await res.json();
        setArticles(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);




  return (
    <>
      <div className="bg-dark bg-graphic position-relative overflow-hidden">
        <ul className="box-animated-bg">
          {Array.from({ length: 22 }).map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>

        <Hero>
          <Button title="🔍 About Me" style="default" url="#about" icon={<TiArrowDownOutline />} />
        </Hero>

        <ContentContainer column="col-xl-10 mx-auto">
          <motion.div className="stats-content-box bg-gradient position-relative z-3" initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}>
            <ul className="stats-list d-flex flex-wrap">
              <li className="stats-item">
                <div className="stats-title">
                  <h4>Why choose me ?</h4>
                  <h3>Stats</h3>
                </div>
              </li>
              <StatCard icon={<FaUserGraduate />} countEnd={2} suffix=" +" description="Years of experience" />
              <StatCard icon={<MdWeb />} countEnd={80} suffix=" +" description="Projects Completed" />
              <StatCard icon={<FaLayerGroup />} countEnd={12} suffix=" +" description="Skills in my stack" />
              <StatCard icon={<FaClock />} countEnd={1500} suffix=" +" description="Hours of code" />
              <StatCard icon={<FaGitAlt />} countEnd={2000} suffix=" +" description="Total Github Contributions" />
            </ul>
          </motion.div>
        </ContentContainer>

        <Banner heading={<HeroHeading />} className="bg-dark bg-mask" id="about" >
          <Button title="What I do ?" style="default" url="#timelineSection" icon={<TiArrowDownOutline />} />
        </Banner>

        <ContentContainer className="about-intro-container">
          <motion.div className="ai-content-box d-flex flex-wrap bg-gradient overflow-hidden" initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}>
            <motion.div className="ai-img-box d-flex align-items-center justify-content-center position-relative" initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}>
              <div className="ai-img">
                <Image src="/hero-img.jpg" alt="" width={1000} height={1000} />
              </div>
            </motion.div>
            <motion.div className="ai-text" initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}>
              <h4><span className="bg-clip-text bg-gradient-reverse">Hello,</span> I'm</h4>
              <h2>Rahul Maurya</h2>
              <h5>Web Developer</h5>
              <p>I am a front-end web developer whose life's passion is Technology and I also love to
                click photographs. I can provide clean code and pixel perfect design. I also make the
                website responsive & more interactive with web animations. I try to make videos that are
                to-the-point and as content-packed as possible, so if that sounds like your cup of tea,
                a sub would be massively appreciated! 🙏</p>
              <p>Stack - <span className="text-accent fw-bold">MERN</span> Stack</p>
              <Button title="Download Resume" style="gradient" url="https://flowcv.com/resume/29mh2gwpwu" icon={<TiArrowDownOutline />} />
            </motion.div>

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
          </motion.div>

          <motion.div className="ai-skill-box d-flex flex-column bg-gradient" initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}>
            <Heading heading="Skills" />

            <motion.div className="skill-card-list d-flex flex-wrap" initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}>
              {skills.map(skill => <div key={skill.id} className="skill-card-item flex-grow-1">
                <SkillCard skill={skill} />
              </div>)}
            </motion.div>
          </motion.div>
        </ContentContainer>

        <ContentContainer className="position-relative oveflow-hidden pt-0" id="timelineSection">
          <motion.div className="row align-items-center" initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}>
            <div className="col-md-3">
              <Heading heading="What I do" />
              <motion.div className="timeline-img-box d-flex align-items-center justify-content-center" initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}><img src="/rahi.webp" alt="" /></motion.div >
            </div>

            <div className="col-md-9">
              <div className="main-container d-flex flex-wrap">
                <motion.div className="timeline-container" initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.2 }}>
                  <Swiper 
                    navigation={{ nextEl: ".blog-arrow-next", prevEl: ".blog-arrow-prev", disabledClass: "swiper-button-disabled" }}
                    modules={[Autoplay, Navigation]}
                    slidesPerView={"auto"}
                    spaceBetween={80}
                    className="timeline overflow-visible">
                    {timelineItems.map(item =>
                      <SwiperSlide key={item.id} className="timeline-item" >
                        <div className="timeline-content">
                          <h3 className="timeline-content-title">{item.title}</h3>
                          <ul className="timeline-content-desc">
                            {item.roles && item.roles.map((role) => <li key={role.role}><span>{role.role}</span>{role.duration}</li>)}
                          </ul>
                        </div>
                      </SwiperSlide>)}
                  </Swiper>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </ContentContainer>

        <ContentContainer heading="Certificates" className="pt-0" >
          <motion.div className="certificate-card-list d-flex flex-wrap" initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}>
            {certificates.map(item => <div key={item.id} className="certificate-card-item">
              <CertificateCard item={item} />
            </div>)}
          </motion.div>
        </ContentContainer>

        <Banner heading={<BannerHeadingOne />} className="bg-dark bg-mask" id="portfolio">
          <Button title='Side Hustle' style='default' url='#sideHustle' icon={<TiArrowDownOutline />} />
        </Banner>


        <ContentContainer className="portfolio-container">
          <motion.div className="ai-content-box bg-gradient" initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}>
            <Heading heading='Crafted With Code' />

            <div className="project-card-list d-flex flex-wrap">
              {projectsCards.map(card => (
                <motion.div key={card.id} className="project-card-item" initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.2 }}>
                  <ProjectCard card={card} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ContentContainer>


        <div className="text-scroll-wrapper mt-5">
          <div className="text-scroll-list">
            <div className="text-scroll-item">
              <div className="text-scroll-box">
                <h2>WHERE <span className='bg-clip-text bg-gradient'>IMAGINATION</span></h2>
              </div>
            </div>
            <div className="text-scroll-item">
              <div className="text-scroll-box">
                <h2>MEETS <span className='bg-clip-text bg-gradient'>CREATIVITY</span></h2>
              </div>
            </div>
            <div className="text-scroll-item">
              <div className="text-scroll-box">
                <h2>WHERE <span className='bg-clip-text bg-gradient'>IMAGINATION</span></h2>
              </div>
            </div>
            <div className="text-scroll-item">
              <div className="text-scroll-box">
                <h2>MEETS <span className='bg-clip-text bg-gradient'>CREATIVITY</span></h2>
              </div>
            </div>
          </div>
          <div className="text-scroll-list">
            <div className="text-scroll-item">
              <div className="text-scroll-box">
                <h2>WHERE <span className='bg-clip-text bg-gradient'>IMAGINATION</span></h2>
              </div>
            </div>
            <div className="text-scroll-item">
              <div className="text-scroll-box">
                <h2>MEETS <span className='bg-clip-text bg-gradient'>CREATIVITY</span></h2>
              </div>
            </div>
            <div className="text-scroll-item">
              <div className="text-scroll-box">
                <h2>WHERE <span className='bg-clip-text bg-gradient'>IMAGINATION</span></h2>
              </div>
            </div>
            <div className="text-scroll-item">
              <div className="text-scroll-box">
                <h2>MEETS <span className='bg-clip-text bg-gradient'>CREATIVITY</span></h2>
              </div>
            </div>
          </div>
        </div>

        <ContentContainer column="col-lg-10 mx-auto" heading="Side Hustle" id="sideHustle" >
          <motion.div className="interest-card-list d-flex flex-wrap" initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}>
            {interest.map(interest => <InterestCard key={interest.id} {...interest} />)}
          </motion.div>
        </ContentContainer>

        <ContentContainer className="pt-0 overflow-hidden" heading="Dev.to's latest articles"
          rightHeading={
            <div className="custom-arrow-container d-flex justify-content-between">
              <button className="custom-arrow-button custom-arrow-prev blog-arrow-prev bg-glass d-flex align-items-center justify-content-center rounded-circle">
                <TiArrowRightOutline />
              </button>
              <button className="custom-arrow-button custom-arrow-next blog-arrow-next bg-glass d-flex align-items-center justify-content-center rounded-circle">
                <TiArrowRightOutline />
              </button>
            </div>
          }
          mobileRightHeading={true} >

          {loading && <p>Loading articles...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading && !error && (
            <motion.div initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}>
              <Swiper
                breakpoints={{ 320: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
                navigation={{ nextEl: ".blog-arrow-next", prevEl: ".blog-arrow-prev", disabledClass: "swiper-button-disabled" }}
                modules={[Autoplay, Navigation]}
                slidesPerView={1}
                spaceBetween={30}
                className="blog-card-list d-flex flex-wrap overflow-visible">
                {articles.slice(0, 10).map((article: any) => (
                  <SwiperSlide className="blog-card-item h-auto" key={article.id}>
                    <BlogCard {...article} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>

          )}
        </ContentContainer>
      </div>

      <MouseFollower />
    </>
  );
}
