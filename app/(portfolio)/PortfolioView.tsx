'use client';

import { useEffect, useState } from "react";
import Image from 'next/image';
import * as motion from "motion/react-client";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Hero from "@/app/components/portfolio/Hero/Hero";
import ProjectCard from "@/app/components/portfolio/ProjectCard/ProjectCard";
import ProjectFilterSection from "@/app/components/portfolio/ProjectFilterSection/ProjectFilterSection";
import ContentContainer from "@/app/components/ui/ContentContainer";
import Button from "@/app/components/ui/Button";
import StatCard from '@/app/components/portfolio/StatCard/StatCard';
import MouseFollower from '@/app/components/layout/MouseFollower';
import Banner from '@/app/components/portfolio/Banner/Banner';
import InterestCard from "@/app/components/portfolio/InterestCard/InterestCard";
import BlogCard from "@/app/components/portfolio/BlogCard/BlogCard";
import BlogCardSkeleton from "@/app/components/portfolio/BlogCard/BlogCardSkeleton";
import Heading from '@/app/components/ui/Heading';
import CertificateCard from '@/app/components/portfolio/CertificateCard/CertificateCard';
import SkillCard from '@/app/components/portfolio/SkillCard/SkillCard';
import { DevArticle } from '@/app/utils/getArticles';
import { TiArrowRightOutline, TiArrowDownOutline } from "react-icons/ti";

const HeroHeading = () => {
  return (
    <>
      Behind <span className="bg-clip-text bg-gradient">The Code</span>
    </>
  );
};

const BannerHeadingOne = () => {
  return (
    <>
      Creative <span className="bg-clip-text bg-gradient">Showcase</span>
    </>
  );
};

const BackgroundFixedElement = () => {
  return (
    <>
      <ul className="box-animated-bg">
        {Array.from({ length: 22 }).map((_, index) => (
          <li key={index}></li>
        ))}
      </ul>
    </>
  );
};

interface PortfolioViewProps {
  initialPortfolioData: any;
  initialArticles: DevArticle[];
}

export default function PortfolioView({ initialPortfolioData, initialArticles }: PortfolioViewProps) {
  const [articles, setArticles] = useState<DevArticle[]>(initialArticles || []);
  const [loading, setLoading] = useState(initialArticles.length === 0);
  const [error, setError] = useState<string | null>(null);

  const [portfolioData, setPortfolioData] = useState(initialPortfolioData);

  // Client-side fallback if server didn't get articles
  useEffect(() => {
    if (initialArticles && initialArticles.length > 0) {
      setArticles(initialArticles);
      setLoading(false);
      return;
    }

    async function fetchArticlesClient() {
      try {
        const res = await fetch("https://dev.to/api/articles?per_page=10");
        if (!res.ok) throw new Error("Failed to fetch articles");
        const data = await res.json();
        setArticles(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArticlesClient();
  }, [initialArticles]);

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
          <motion.div className="ai-content-box bg-gradient" initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}>
            <ProjectFilterSection projects={projectsCards} />
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

        <ContentContainer className="about-intro-container pt-0" heading="The Journey So Far">
          <motion.div className="row g-4" initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}>
            <div className="col-lg-8">
              <div className="row g-4">
                <div className="col-lg-6">
                  <motion.div className="timeline-container" initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}>
                    <div className="timeline">
                      <div className="timeline-section-header d-flex align-items-center gap-2 mb-3">
                        <span className="timeline-badge-icon">🎓</span>
                        <h4 className="timeline-section-title mb-0">Education</h4>
                      </div>
                      {timelineItems.filter((item: any) => item.type === "education" || (!item.type && (item.id ?? 0) <= 4)).map((item: any) =>
                        <div key={item.id} className="timeline-item" >
                          <div className="timeline-content">
                            <h3 className="timeline-content-title">{item.title}</h3>
                            <ul className="timeline-content-desc">
                              {item.roles && item.roles.map((role: any) => <li key={role.role}><span>{role.role}</span>{role.duration}</li>)}
                            </ul>
                          </div>
                        </div>)}
                    </div>
                  </motion.div>
                </div>
                <div className="col-lg-6">
                  <motion.div className="timeline-container" initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}>
                    <div className="timeline">
                      <div className="timeline-section-header d-flex align-items-center gap-2 mb-3">
                        <span className="timeline-badge-icon">💼</span>
                        <h4 className="timeline-section-title mb-0">Experience</h4>
                      </div>
                      {timelineItems.filter((item: any) => item.type === "experience" || (!item.type && (item.id ?? 0) > 4)).map((item: any) =>
                        <div key={item.id} className="timeline-item" >
                          <div className="timeline-content">
                            <h3 className="timeline-content-title">{item.title}</h3>
                            <ul className="timeline-content-desc">
                              {item.roles && item.roles.map((role: any) => <li key={role.role}><span>{role.role}</span>{role.duration}</li>)}
                            </ul>
                          </div>
                        </div>)}
                    </div>
                  </motion.div>
                </div>
                <div className="col-lg-8">
                  <motion.div className="ai-content-box d-flex flex-wrap bg-gradient overflow-hidden" initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}>
                    <motion.div className="ai-text" initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      viewport={{ once: true, amount: 0.2 }}>
                      <p>{about?.description || "I am a front-end web developer..."}</p>
                      <p>{about?.stackPrefix || "Stack - "}<span className="text-accent fw-bold">{about?.stack || "MERN Stack"}</span></p>
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
                </div>
                <div className="col-lg-4">
                  <motion.div className="timeline-img-box d-flex align-items-center justify-content-center" initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}>
                    <div className="timeline-img">
                      <Image src="/rahi.webp" alt="Rahul Maurya Profile Picture" width={500} height={500} />
                    </div>
                  </motion.div >
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <motion.div className="stats-content-box bg-gradient position-relative z-3 mb-4 flex-grow-1" initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}>
                <div className="stats-title mb-4">
                  <h4>The Edge I Bring</h4>
                  <h3>Stats</h3>
                </div>
                <ul className="stats-list d-flex flex-wrap">
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
            </div>
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
            {certificates && certificates.map((item: any) => <div key={item.id} className="certificate-card-item">
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
            {interest && interest.map((item: any) => <InterestCard key={item.id} {...item} />)}
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

          {loading ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={24}
                breakpoints={{ 320: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1200: { slidesPerView: 4 } }}
                navigation={{ nextEl: ".blog-arrow-next", prevEl: ".blog-arrow-prev", disabledClass: "swiper-button-disabled" }}
                className="blog-card-list d-flex flex-wrap overflow-visible">
                {[1, 2, 3, 4].map((skeletonId) => (
                  <SwiperSlide className="blog-card-item h-auto" key={skeletonId}>
                    <BlogCardSkeleton />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          ) : error && articles.length === 0 ? (
            <p className="text-danger">Failed to load articles. Please check back later.</p>
          ) : articles.length === 0 ? (
            <p className="text-slate-400 font-mono text-xs">No articles published yet. Check back soon!</p>
          ) : (
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
