import { ReactNode } from 'react';
import * as motion from "motion/react-client"
import './Hero.css'

interface Props {
  children: ReactNode;
}

const Hero = ({ children }: Props) => {
  return (
    <section className="hero-container position-relative">
      <div className="hero-icons">
        <div className="hero-icon hi-1"> <img src="/html-5.png" alt="" /> </div>
        <div className="hero-icon hi-2"> <img src="/css-3.png" alt="" /> </div>
        <div className="hero-icon hi-3"> <img src="/java.png" alt="" /> </div>
        <div className="hero-icon hi-4"> <img src="/react.png" alt="" /> </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="hero-content d-flex flex-wrap align-items-center justify-content-center">
              <motion.div className="hero-inner text-center" initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}>
                <div className="hero-text">
                  <h3><span className="bg-clip-text bg-gradient">Hey!</span> ✌️ I'm</h3>
                  <h1>Rahul <span className="bg-clip-text bg-gradient">Maurya</span></h1>
                  <h4>Frontend Developer <span className="bg-clip-text bg-gradient">[ India ]</span></h4>
                  <p>I craft beautiful and functional websites using HTML, CSS, JavaScript, and React — blending design precision with code clarity to build seamless user experiences.</p>
                  <div className="hero-cta d-flex justify-content-center mt-4">
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
