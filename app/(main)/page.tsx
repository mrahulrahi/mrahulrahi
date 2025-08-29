'use client';
import Hero from "../components/Hero/Hero";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import ContentContainer from "../components/ContentContainer";
import Heading from "../components/Heading";
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




// InterestCard Component


export default function Home() {

  return (
    <main>
      <Hero bgImage="/hero-bg.svg">
        <Button title="🔍 About Me" style="default" url="/about" icon={<IoIosArrowDroprightCircle />} />
        <Button title="💼 Portfolio" style="default" url="/portfolio" icon={<IoIosArrowDroprightCircle />} />
      </Hero>

      <ContentContainer background="dark bg-graphic" column="col-xl-10 mx-auto">
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

      <Banner bgImage='./banner-bg.jpg'>
        WHERE <span className='bg-clip-text bg-gradient-1'>IMAGINATION</span><br />MEETS <span className='bg-clip-text bg-gradient-1'>CREATIVITY</span>
      </Banner>

      <ContentContainer className="projects-card-container" background="gradient-1">
        <Heading heading="Crafted With Code">
          <div className="custom-arrow-container d-flex justify-content-between">
            <button className="custom-arrow-button custom-arrow-prev projects-arrow-prev bg-glass d-flex align-items-center justify-content-center rounded-circle">
              <FaArrowRight />
            </button>
            <button className="custom-arrow-button custom-arrow-next projects-arrow-next bg-glass d-flex align-items-center justify-content-center rounded-circle">
              <FaArrowRight />
            </button>
          </div>
        </Heading>

        <Swiper
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{ 320: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
          navigation={{ nextEl: ".projects-arrow-next", prevEl: ".projects-arrow-prev", disabledClass: "swiper-button-disabled" }}
          modules={[Autoplay, Navigation]}
          slidesPerView={1}
          spaceBetween={30}
          className="projects-card-list d-flex flex-wrap" data-aos="fade-up" suppressHydrationWarning
        >
          {projectsCards.map(card => (
            <SwiperSlide key={card.id} className="projects-card-item">
              <ProjectCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </ContentContainer>

      <Banner bgImage='./banner-bg.jpg'>
        <span className='bg-clip-text bg-gradient-1'>Design</span> the user's experience.<br /><span className='bg-clip-text bg-gradient-1'>Code</span> the beautiful, seamless reality.
      </Banner>

      <ContentContainer background="gradient-1">
        <Heading heading="Other Interests">
          <Button title="View All" style="default" url="/portfolio#gallery" />
        </Heading>
        <div className="photo-card-list d-flex flex-wrap" data-aos="fade-up" suppressHydrationWarning>
          {interest?.slice(0, 4).map(interest => <InterestCard key={interest.id} {...interest} />)}
        </div>
      </ContentContainer>

      <MouseFollower />
    </main>
  );
}
