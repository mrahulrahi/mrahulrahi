import { ReactNode } from 'react';
import * as motion from "motion/react-client"
import Image from 'next/image';
import './Hero.css'

interface HeroData {
  hey?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
}

interface Props {
  children: ReactNode;
  hero?: HeroData;
}

const Hero = ({ children, hero }: Props) => {
  const hey = hero?.hey || "Hey! ✌️ I'm";
  const firstName = hero?.firstName || "Rahul";
  const lastName = hero?.lastName || "Maurya";
  const role = hero?.role || "Frontend Developer";
  const location = hero?.location || "[ India ]";
  const description = hero?.description || "I craft beautiful and functional websites using HTML, CSS, JavaScript, and React — blending design precision with code clarity to build seamless user experiences.";

  const heyWords = hey.split(" ");
  const heyHighlight = heyWords[0];
  const heyRest = heyWords.slice(1).join(" ");

  return (
    <section className="hero-container position-relative">
      <div className="hero-icons">
        <div className="hero-icon hi-1"> <Image src="/html-5.png" alt="HTML5" width={48} height={48} /> </div>
        <div className="hero-icon hi-2"> <Image src="/css-3.png" alt="CSS3" width={48} height={48} /> </div>
        <div className="hero-icon hi-3"> <Image src="/java.png" alt="Java" width={48} height={48} /> </div>
        <div className="hero-icon hi-4"> <Image src="/react.png" alt="React" width={48} height={48} /> </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="hero-content d-flex flex-wrap align-items-center justify-content-center">
              <motion.div className="hero-inner text-center" initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}>
                <div className="hero-img">
                  <Image src={hero?.imageUrl || "/hero-img.jpg"} alt={`${firstName + " " + lastName || "Rahul Maurya"} - Hero Image`} width={1000} height={1000} />
                </div>

                <div className="hero-text">
                  <h3><span className="opacity-75">{heyHighlight}</span> {heyRest}</h3>
                  <h1>{firstName} <span className="opacity-75">{lastName}</span></h1>
                  <h4>{role} <span className="opacity-75">{location}</span></h4>
                  <p>{description}</p>
                  <div className="hero-cta d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3 mt-4">
                    {children}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-scroll-wrapper">
        <div className="text-scroll-list">
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3>HTML</h3>
            </div>
          </div>
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3>CSS</h3>
            </div>
          </div>
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3>JavaScript</h3>
            </div>
          </div>
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3>TypeScript</h3>
            </div>
          </div>
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3>Bootstrap</h3>
            </div>
          </div>
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3>Tailwind CSS</h3>
            </div>
          </div>
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3>React Js</h3>
            </div>
          </div>
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3>NEXT JS</h3>
            </div>
          </div>
        </div>
        <div className="text-scroll-list">
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3>HTML</h3>
            </div>
          </div>
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3>CSS</h3>
            </div>
          </div>
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3>JavaScript</h3>
            </div>
          </div>
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3>TypeScript</h3>
            </div>
          </div>
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3>Bootstrap</h3>
            </div>
          </div>
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3>Tailwind CSS</h3>
            </div>
          </div>
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3>React Js</h3>
            </div>
          </div>
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3>NEXT JS</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
