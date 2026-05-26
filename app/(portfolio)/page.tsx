'use client';
import { useEffect, useState } from "react";
import Image from 'next/image'
import * as motion from "motion/react-client";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Hero from "@/app/components/portfolio/Hero/Hero";
import ProjectCard from "@/app/components/portfolio/ProjectCard/ProjectCard";
import ContentContainer from "@/app/components/ui/ContentContainer";
import Button from "@/app/components/ui/Button";
import StatCard from '@/app/components/portfolio/StatCard/StatCard';
import MouseFollower from '@/app/components/layout/MouseFollower';
import Banner from '@/app/components/portfolio/Banner/Banner'
import InterestCard from "@/app/components/portfolio/InterestCard/InterestCard";
import BlogCard from "@/app/components/portfolio/BlogCard/BlogCard";
import Heading from '@/app/components/ui/Heading';
import CertificateCard from '@/app/components/portfolio/CertificateCard/CertificateCard';
import SkillCard from '@/app/components/portfolio/SkillCard/SkillCard';
import { 
  projectsCards as staticProjects, 
  interest as staticInterest, 
  timelineItems as staticTimeline, 
  certificates as staticCertificates,
  hero as staticHero,
  stats as staticStats,
  about as staticAbout,
  skills as staticSkills
} from '@/app/data/staticData';
import { getPublicPortfolioData } from '@/app/(admin)/admin/dataActions';
import { TiArrowRightOutline, TiArrowDownOutline } from "react-icons/ti";
import { MdWeb } from "react-icons/md";
import { FaUserGraduate, FaLayerGroup, FaClock } from "react-icons/fa6";
import { TbBrandNextjs, TbBrandTailwind } from "react-icons/tb";
import { SiAdobexd } from "react-icons/si";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaBootstrap, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma } from "react-icons/fa";
import { BiLogoTypescript, BiLogoVisualStudio } from "react-icons/bi";

const HeroHeading = () => {
  return (<>
    Behind <span className="bg-clip-text bg-gradient">The Code</span>
  </>)
}

const BannerHeadingOne = () => {
  return (<>
    Creative <span className="bg-clip-text bg-gradient">Showcase</span>
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

export interface DevArticle {
  id: number;
  title: string;
  url: string;
  description: string;
  cover_image: string;
  readable_publish_date: string;
  public_reactions_count: number;
  published_at: string;
  user: { name: string; profile_image: string; [key: string]: any };
  [key: string]: any;
}

export default function Home() {

  const [articles, setArticles] = useState<DevArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [portfolioData, setPortfolioData] = useState({
    projectsCards: staticProjects,
    interest: staticInterest,
    timelineItems: staticTimeline,
    certificates: staticCertificates,
    hero: staticHero,
    stats: staticStats,
    about: staticAbout,
    skills: staticSkills
  });

  useEffect(() => {
    async function loadPortfolioData() {
      try {
        const liveData = await getPublicPortfolioData();
        setPortfolioData({
          projectsCards: liveData.projectsCards || staticProjects,
          interest: liveData.interest || staticInterest,
          timelineItems: liveData.timelineItems || staticTimeline,
          certificates: liveData.certificates || staticCertificates,
          hero: liveData.hero || staticHero,
          stats: liveData.stats || staticStats,
          about: liveData.about || staticAbout,
          skills: liveData.skills || staticSkills
        });
      } catch (err) {
        console.error("Failed to load dynamic portfolio data", err);
      }
    }
    loadPortfolioData();
  }, []);

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

  const { projectsCards, interest, timelineItems, certificates, hero, stats, about, skills } = portfolioData;

  const aboutSubheading = about?.subheading || "Hello, I'm";
  const aboutSubWords = aboutSubheading.split(" ");
  const aboutHighlight = aboutSubWords[0];
  const aboutRest = aboutSubWords.slice(1).join(" ");

  return (
    <>
      <div className="bg-dark bg-graphic position-relative overflow-hidden">
        <BackgroundFixedElement />

        <Hero hero={hero}>
          <Button title="🔍 About Me" style="default" url="#about" icon={<TiArrowDownOutline />} />
        </Hero>

        <ContentContainer className="pb-0" column="col-xl-10 mx-auto">
          <motion.div className="stats-content-box bg-gradient position-relative z-3" initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}>
            <ul className="stats-list d-flex flex-wrap">
              <li className="stats-item">
                <div className="stats-title">
                  <h4>The Edge I Bring</h4>
                  <h3>Stats</h3>
                </div>
              </li>
              {stats && stats.map((stat: any) => (
                <StatCard 
                  key={stat.id} 
                  icon={stat.icon} 
                  countEnd={stat.countEnd} 
                  suffix={stat.suffix} 
                  description={stat.description} 
                />
              ))}
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
                <Image src={about?.imageUrl || "/hero-img.jpg"} alt={`${about?.name || "Rahul Maurya"} - Hero Image`} width={1000} height={1000} />
              </div>
            </motion.div>
            <motion.div className="ai-text" initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}>
              <h4><span className="bg-clip-text">{aboutHighlight}</span> {aboutRest}</h4>
              <h2>{about?.name || "Rahul Maurya"}</h2>
              <h5>{about?.role || "Web Developer"}</h5>
              <p>{about?.description || "I am a front-end web developer..."}</p>
              <p>{about?.stackPrefix || "Stack - "}<span className="text-accent fw-bold">{about?.stack || "MERN Stack"}</span></p>
              <Button title={about?.resumeTitle || "Download Resume"} style="gradient" url={about?.resumeUrl || "https://flowcv.com/resume/29mh2gwpwu"} icon={<TiArrowDownOutline />} />
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
            <Heading heading="The Toolkit" />

            <motion.div className="skill-card-list d-flex flex-wrap" initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}>
              {skills && skills.map((skill: any) => <div key={skill.id} className="skill-card-item flex-grow-1">
                <SkillCard skill={skill} />
              </div>)}
            </motion.div>
          </motion.div>
        </ContentContainer>

        <ContentContainer className="position-relative oveflow-hidden pt-0" heading="The Journey So Far" id="timelineSection"
          rightHeading={
            <div className="custom-arrow-container d-flex justify-content-between">
              <button aria-label="Previous timeline event" className="custom-arrow-button custom-arrow-prev timeline-arrow-prev bg-glass d-flex align-items-center justify-content-center rounded-circle">
                <TiArrowRightOutline />
              </button>
              <button aria-label="Next timeline event" className="custom-arrow-button custom-arrow-next timeline-arrow-next bg-glass d-flex align-items-center justify-content-center rounded-circle">
                <TiArrowRightOutline />
              </button>
            </div>
          }
          mobileRightHeading={true}>
          <motion.div className="row align-items-center" initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}>
            <div className="col-md-2">
              <motion.div className="timeline-img-box d-flex align-items-center justify-content-center" initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}><Image src="/rahi.webp" alt="Rahul Maurya Profile Picture" width={500} height={500} /></motion.div >
            </div>

            <div className="col-md-10">
              <motion.div className="timeline-container" initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}>
                <Swiper
                  modules={[Navigation]}
                  slidesPerView={1}
                  spaceBetween={80}
                  breakpoints={{ 320: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1200: { slidesPerView: 'auto' } }}
                  navigation={{ nextEl: ".timeline-arrow-next", prevEl: ".timeline-arrow-prev", disabledClass: "swiper-button-disabled" }}
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
          </motion.div>
        </ContentContainer>

        <ContentContainer heading="Continuous Learning" className="pt-0 pb-0" >
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
          <motion.div className="ai-content-box bg-gradient">
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


        <div className="text-scroll-wrapper m-0">
          {[1, 2].map((listIdx) => (
            <div className="text-scroll-list" key={listIdx}>
              {[1, 2, 3, 4].map((itemIdx) => (
                <div className="text-scroll-item" key={itemIdx}>
                  <div className="text-scroll-box">
                    <h2 className="mb-0">
                      {itemIdx % 2 !== 0 ? "WHERE " : "MEETS "}
                      <span className='bg-clip-text bg-gradient'>
                        {itemIdx % 2 !== 0 ? "IMAGINATION" : "CREATIVITY"}
                      </span>
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <ContentContainer column="col-lg-10 mx-auto" heading="Beyond the Code" id="sideHustle" >
          <motion.div className="interest-card-list d-flex flex-wrap" initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}>
            {interest.map(interest => <InterestCard key={interest.id} {...interest} />)}
          </motion.div>
        </ContentContainer>

        <ContentContainer className="pt-0 overflow-hidden" heading="Articles & Insights"
          rightHeading={
            <div className="custom-arrow-container d-flex justify-content-between">
              <button aria-label="Previous article" className="custom-arrow-button custom-arrow-prev blog-arrow-prev bg-glass d-flex align-items-center justify-content-center rounded-circle">
                <TiArrowRightOutline />
              </button>
              <button aria-label="Next article" className="custom-arrow-button custom-arrow-next blog-arrow-next bg-glass d-flex align-items-center justify-content-center rounded-circle">
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
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={30}
                breakpoints={{ 320: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
                navigation={{ nextEl: ".blog-arrow-next", prevEl: ".blog-arrow-prev", disabledClass: "swiper-button-disabled" }}
                className="blog-card-list d-flex flex-wrap overflow-visible">
                {articles.slice(0, 10).map((article: DevArticle) => (
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
