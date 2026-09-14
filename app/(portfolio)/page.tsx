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
  user: { name: string; profile_image: string;[key: string]: any };
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

  return (
    <>
      <div className="bg-dark bg-graphic position-relative overflow-hidden">
        <BackgroundFixedElement />

        <Hero hero={hero}>
          <Button title='Creative Showcase' style='default' url='#portfolio' icon={<TiArrowDownOutline />} />
          <Button title={about?.resumeTitle || "Download Resume"} style="gradient" url={about?.resumeUrl || "https://flowcv.com/resume/29mh2gwpwu"} icon={<TiArrowDownOutline />} />
        </Hero>

        <Banner heading={<BannerHeadingOne />} className="bg-dark bg-mask" id="portfolio">
          <Button title="🔍 About Me" style="default" url="#about" icon={<TiArrowDownOutline />} />
        </Banner>

        <ContentContainer className="portfolio-container pt-0">
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

        <ContentContainer className="pt-0">
          <motion.div className="ai-skill-box d-flex flex-column bg-gradient mb-4" initial={{ opacity: 0, y: 50 }}
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

        <Banner heading={<HeroHeading />} className="bg-dark bg-mask" id="about" >
          <Button title="Continuous Learning" style="default" url="#continuousLearning" icon={<TiArrowDownOutline />} />
        </Banner>

        <ContentContainer className="about-intro-container pt-0" heading="The Journey & Craft">
          <motion.div className="bento-grid" initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.15 }}>

            {/* Bento Card 1: Persona & Developer DNA */}
            <motion.div className="bento-card bento-persona" initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}>
              <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-4 mb-4">
                <div className="bento-avatar-wrapper">
                  <Image src="/rahi.webp" alt="Rahul Maurya Profile" width={110} height={110} className="bento-avatar-img" />
                </div>
                <div>
                  <div className="bento-status-pill mb-2">
                    <span className="status-dot-pulse"></span>
                    Available for Work
                  </div>
                  <h3 className="text-white fw-bold mb-1" style={{ fontSize: '26px' }}>
                    {hero?.firstName || "Rahul"} {hero?.lastName || "Maurya"}
                  </h3>
                  <p className="text-accent fw-semibold mb-0" style={{ fontSize: '15px' }}>
                    {hero?.role || "Frontend Architect & UI Developer"}
                  </p>
                </div>
              </div>

              <p className="text-white-50 mb-4" style={{ fontSize: '14.5px', lineHeight: '1.6' }}>
                {about?.description || "I craft high-performance, pixel-perfect web interfaces with modern frameworks, blending design precision and clean code."}
              </p>

              <div className="mt-auto">
                <span className="d-block text-xs font-mono text-muted mb-2 text-uppercase tracking-wider">Core Tech Stack</span>
                <div className="bento-stack-tags">
                  <span className="bento-tag">⚛️ React</span>
                  <span className="bento-tag">▲ Next.js</span>
                  <span className="bento-tag">📘 TypeScript</span>
                  <span className="bento-tag">🎨 Tailwind CSS</span>
                  <span className="bento-tag">⚡ JavaScript</span>
                  <span className="bento-tag">🟢 Node.js</span>
                </div>
              </div>
            </motion.div>

            {/* Bento Card 2: Impact & Reach Stats */}
            <motion.div className="bento-card bento-stats" initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h4 className="text-white fw-bold mb-0" style={{ fontSize: '18px' }}>📈 Impact & Reach</h4>
                <span className="badge bg-glass text-accent px-2 py-1" style={{ fontSize: '11px' }}>Live Metrics</span>
              </div>
              
              <div className="bento-stats-grid">
                {stats && stats.slice(0, 4).map((stat: any) => (
                  <div key={stat.id} className="bento-stat-item">
                    <div className="bento-stat-num">
                      {stat.countEnd}{stat.suffix || "+"}
                    </div>
                    <div className="bento-stat-label">{stat.description}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento Card 3: Interactive Terminal Widget */}
            <motion.div className="bento-card bento-terminal-card" initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              viewport={{ once: true }}>
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="terminal-dot red"></span>
                  <span className="terminal-dot yellow"></span>
                  <span className="terminal-dot green"></span>
                </div>
                <span className="terminal-title">rahul.config.ts</span>
                <span className="text-xs text-secondary font-mono">UTF-8</span>
              </div>
              <div className="terminal-body">
                <div><span className="code-keyword">const</span> <span className="code-variable">developer</span> = &#123;</div>
                <div className="ps-3"><span className="code-property">name:</span> <span className="code-string">&quot;{hero?.firstName || "Rahul"} {hero?.lastName || "Maurya"}&quot;</span>,</div>
                <div className="ps-3"><span className="code-property">role:</span> <span className="code-string">&quot;Frontend Developer &amp; UI Specialist&quot;</span>,</div>
                <div className="ps-3"><span className="code-property">craft:</span> [<span className="code-string">&quot;Clean Architecture&quot;</span>, <span className="code-string">&quot;Pixel Perfection&quot;</span>, <span className="code-string">&quot;Fluid Animations&quot;</span>],</div>
                <div className="ps-3"><span className="code-property">mindset:</span> <span className="code-string">&quot;Turning ideas into responsive, interactive digital products.&quot;</span>,</div>
                <div className="ps-3"><span className="code-property">openForHiring:</span> <span className="code-keyword">true</span></div>
                <div>&#125;;</div>
                <div className="mt-2" style={{ color: '#00DC82' }}><span className="code-comment">// $ rahul.buildMasterpiece() 🚀</span></div>
              </div>
            </motion.div>

            {/* Bento Card 4: Academic Journey */}
            <motion.div className="bento-card bento-timeline-edu" initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}>
              <div className="d-flex align-items-center gap-2 pb-2 mb-2 border-bottom border-secondary border-opacity-25">
                <span style={{ fontSize: '18px' }}>🎓</span>
                <h4 className="text-white fw-bold mb-0" style={{ fontSize: '17px' }}>Academics</h4>
              </div>
              <div className="bento-timeline-list">
                {timelineItems.filter(item => item.type === "education" || (!item.type && (item.id ?? 0) <= 4)).map(item => (
                  <div key={item.id} className="bento-timeline-item">
                    <div className="bento-timeline-title">{item.title}</div>
                    {item.roles && item.roles.map(r => (
                      <div key={r.role}>
                        <div className="bento-timeline-sub">{r.role}</div>
                        <div className="bento-timeline-date">{r.duration}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento Card 5: Career Milestones */}
            <motion.div className="bento-card bento-timeline-exp" initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
              viewport={{ once: true }}>
              <div className="d-flex align-items-center gap-2 pb-2 mb-2 border-bottom border-secondary border-opacity-25">
                <span style={{ fontSize: '18px' }}>💼</span>
                <h4 className="text-white fw-bold mb-0" style={{ fontSize: '17px' }}>Career</h4>
              </div>
              <div className="bento-timeline-list">
                {timelineItems.filter(item => item.type === "experience" || (!item.type && (item.id ?? 0) > 4)).map(item => (
                  <div key={item.id} className="bento-timeline-item">
                    <div className="bento-timeline-title">{item.title}</div>
                    {item.roles && item.roles.map(r => (
                      <div key={r.role}>
                        <div className="bento-timeline-sub">{r.role}</div>
                        <div className="bento-timeline-date">{r.duration}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bento Card 6: Philosophy Ticker Marquee */}
            <motion.div className="bento-card bento-ticker-card p-3" initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}>
              <div className="text-scroll-wrapper m-0">
                <div className="text-scroll-list">
                  <div className="text-scroll-item">
                    <div className="text-scroll-box">
                      <h5 className="mb-0 text-white-50">🧠 Turning complex logic into effortless interfaces.</h5>
                    </div>
                  </div>
                  <div className="text-scroll-item">
                    <div className="text-scroll-box">
                      <h5 className="mb-0 text-accent">🎯 Clean code. Pixel perfection. High performance.</h5>
                    </div>
                  </div>
                </div>
                <div className="text-scroll-list">
                  <div className="text-scroll-item">
                    <div className="text-scroll-box">
                      <h5 className="mb-0 text-white-50">🧠 Turning complex logic into effortless interfaces.</h5>
                    </div>
                  </div>
                  <div className="text-scroll-item">
                    <div className="text-scroll-box">
                      <h5 className="mb-0 text-accent">🎯 Clean code. Pixel perfection. High performance.</h5>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </ContentContainer>

        <ContentContainer heading="Continuous Learning" id="continuousLearning" className="pt-0 pb-0"
          rightHeading={
            <Button title='Side Hustle' style='default' url='#sideHustle' icon={<TiArrowDownOutline />} />
          }>
          <motion.div className="certificate-card-list d-flex flex-wrap" initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}>
            {certificates.map(item => <div key={item.id} className="certificate-card-item">
              <CertificateCard item={item} />
            </div>)}
          </motion.div>
        </ContentContainer>

        <ContentContainer column="col-lg-10 mx-auto" heading="Beyond the Code" id="sideHustle"
          rightHeading={
            <Button title="Articles & Insights" style="default" url="#articles" icon={<TiArrowDownOutline />} />
          }
        >
          <motion.div className="interest-card-list d-flex flex-wrap" initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}>
            {interest.map(interest => <InterestCard key={interest.id} {...interest} />)}
          </motion.div>
        </ContentContainer>

        <ContentContainer className="pt-0 overflow-hidden" heading="Articles & Insights" id="articles"
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
          {!loading && !error && articles.length === 0 && (
            <p className="text-slate-400 font-mono text-xs">No articles published yet. Check back soon!</p>
          )}
          {!loading && !error && articles.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}>
              <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={24}
                breakpoints={{ 320: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1200: { slidesPerView: 4 } }}
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
