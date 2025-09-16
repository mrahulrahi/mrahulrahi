'use client';
import { useEffect, useState } from "react";
import Hero from "../components/Hero/Hero";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import ContentContainer from "../components/ContentContainer";
import Button from "../components/Button";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdWeb } from "react-icons/md";
import { FaUserGraduate, FaLayerGroup, FaGitAlt, FaClock, FaArrowRight } from "react-icons/fa6";
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

        <Hero>
          <Button title="🔍 About Me" style="default" url="/about" icon={<IoIosArrowDroprightCircle />} />
          <Button title="💼 Portfolio" style="default" url="/portfolio" icon={<IoIosArrowDroprightCircle />} />
        </Hero>

        <ContentContainer className="pt-0" column="col-xl-10 mx-auto">
          <div className="stats-content-box bg-gradient-1" data-aos="fade-up" suppressHydrationWarning>
            <ul className="stats-list d-flex flex-wrap">
              <li className="stats-item">
                <div className="stats-title text-center">
                  <h4>Why choose me ?</h4>
                  <h3>Stats</h3>
                </div>
              </li>
              <StatCard icon={<FaUserGraduate />} countEnd={2} suffix=" +" description="Years of experience" />
              <StatCard icon={<MdWeb />} countEnd={80} suffix=" +" description="Projects Completed" />
              <StatCard icon={<FaLayerGroup />} countEnd={12} suffix=" +" description="Skills in my stack" />
              <StatCard icon={<FaClock />} countEnd={1500} suffix=" +" description="Hours of code" />
              <StatCard icon={<FaGitAlt />} countEnd={1900} suffix=" +" description="Total Github Contributions" />
            </ul>
          </div>
        </ContentContainer>
      </div>


      <Banner bgImage='./banner-bg.jpg'>
        WHERE <span className='bg-clip-text bg-gradient-1'>IMAGINATION</span><br />MEETS <span className='bg-clip-text bg-gradient-1'>CREATIVITY</span>
      </Banner>

      <ContentContainer className="projects-card-container" background="gradient-1" heading="Crafted With Code" rightHeading={<a href="/portfolio" className="btn btn-default">View All</a>} mobileRightHeading={true} >
        <div className="projects-card-list d-flex flex-wrap" data-aos="fade-up" suppressHydrationWarning >
          {projectsCards.slice(1, 4).map(card => (
            <div key={card.id} className="projects-card-item">
              <ProjectCard card={card} />
            </div>
          ))}
        </div>
      </ContentContainer>

      <ContentContainer column="col-lg-10 mx-auto" background="dark bg-graphic" heading="Side Hustle" >
        <div className="interest-card-list d-flex flex-wrap" data-aos="fade-up" suppressHydrationWarning>
          {interest.map(interest => <InterestCard key={interest.id} {...interest} />)}
        </div>
      </ContentContainer>

      <ContentContainer background="gradient-1 bg-graphic overflow-hidden" heading="Articles from Dev.to"
        rightHeading={
          <div className="custom-arrow-container d-flex justify-content-between">
            <button className="custom-arrow-button custom-arrow-prev blog-arrow-prev bg-glass d-flex align-items-center justify-content-center rounded-circle">
              <FaArrowRight />
            </button>
            <button className="custom-arrow-button custom-arrow-next blog-arrow-next bg-glass d-flex align-items-center justify-content-center rounded-circle">
              <FaArrowRight />
            </button>
          </div>
        } 
        mobileRightHeading={true} >

        {loading && <p>Loading articles...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (

          <Swiper
            breakpoints={{ 320: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
            navigation={{ nextEl: ".blog-arrow-next", prevEl: ".blog-arrow-prev", disabledClass: "swiper-button-disabled" }}
            modules={[Autoplay, Navigation]}
            slidesPerView={1}
            spaceBetween={30}
            className="blog-card-list d-flex flex-wrap overflow-visible" data-aos="fade-up" suppressHydrationWarning>
            {articles.slice(0, 10).map((article: any) => (
              <SwiperSlide className="blog-card-item h-auto" key={article.id}>
                <BlogCard {...article} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </ContentContainer>

      <MouseFollower />
    </main>
  );
}
