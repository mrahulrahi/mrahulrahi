'use client';
import { useEffect, useState } from "react";
import * as motion from "motion/react-client"
import Hero from "../components/Hero/Hero";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import ContentContainer from "../components/ContentContainer";
import Button from "../components/Button";
import { TiArrowRightOutline, TiArrowDownOutline } from "react-icons/ti";
import { MdWeb } from "react-icons/md";
import { FaUserGraduate, FaLayerGroup, FaGitAlt, FaClock } from "react-icons/fa6";
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import StatCard from '../components/StatCard/StatCard';
import { projectsCards, interest } from "../data/staticData"; // Moved static data here
import MouseFollower from '../components/MouseFollower';
import Banner from '../components/Banner/Banner'
import InterestCard from "../components/InterestCard/InterestCard";
import BlogCard from "../components/BlogCard/BlogCard";
import Heading from '../components/Heading';


const BannerHeadingOne = () => {
  return (<>
    My <span className="bg-clip-text bg-gradient-1">Portfolio</span>
  </>)
}

const BannerHeadingTwo = () => {
  return (<>
    WHERE <span className='bg-clip-text bg-gradient-1'>IMAGINATION</span><br />MEETS <span className='bg-clip-text bg-gradient-1'>CREATIVITY</span>
  </>)
}

export default function Home() {

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
    <main>
      <div className="bg-dark bg-graphic position-relative overflow-hidden">
        <ul className="box-animated-bg">
          {Array.from({ length: 22 }).map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>

        <Hero>
          <Button title="🔍 About Me" style="default" url="/about" icon={<TiArrowRightOutline />} />
          <Button title="💼 Portfolio" style="default" url="#portfolio" icon={<TiArrowDownOutline />} />
        </Hero>

        <ContentContainer className="pt-0" column="col-xl-10 mx-auto">
          <motion.div className="stats-content-box bg-gradient-1 position-relative z-3" initial={{ opacity: 0, y: 50 }}
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
      </div>

      <div id='portfolio'>
        <Banner heading={<BannerHeadingOne />} bgImage='/inner-hero-img.jpg'>
          <Button title='Side Hustle' style='default' url='#sideHustle' icon={<TiArrowDownOutline />} />
        </Banner>


        <ContentContainer className="portfolio-container" background='gradient-2'>
          <motion.div className="ai-content-box bg-gradient-1" initial={{ opacity: 0, y: 50 }}
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
      </div>

      <Banner heading={<BannerHeadingTwo />} bgImage='./banner-bg.jpg'></Banner>

      <ContentContainer column="col-lg-10 mx-auto" background="dark bg-graphic" heading="Side Hustle" id="sideHustle" >
        <motion.div className="interest-card-list d-flex flex-wrap" initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}>
          {interest.map(interest => <InterestCard key={interest.id} {...interest} />)}
        </motion.div>
      </ContentContainer>

      <ContentContainer background="gradient-1 overflow-hidden" heading="Dev.to's latest articles"
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

      <MouseFollower />
    </main>
  );
}
