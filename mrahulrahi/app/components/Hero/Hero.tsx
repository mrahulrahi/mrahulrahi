import { ReactNode } from 'react';
import * as motion from "motion/react-client"
import './Hero.css'

interface Props {
  children: ReactNode;
}

const Hero = ({ children }: Props) => {
  return (
    <section className="hero-container position-relative">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="hero-content d-flex flex-wrap align-items-center justify-content-between">
              <motion.div className="hero-left" initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}>
                <div className="hl-content">
                  <h3><span className="bg-clip-text bg-gradient-1">Hey!</span> ✌️ I'm</h3>
                  <h1>Rahul <span className="bg-clip-text bg-gradient-1">Maurya</span></h1>
                  <h4><span className="bg-clip-text bg-gradient-1">Frontend Developer</span> - India</h4>
                </div>

              </motion.div>

              <motion.div className="hero-center" initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}>
                <div className="hc-content d-flex align-items-center justify-content-center">
                  <div className="hero-img-box d-flex align-items-center justify-content-center position-relative">
                    <div className="hero-img"> <img src="/hero-img.jpg" alt="" /> </div>
                  </div>
                  <div className="hc-orbit-1">
                    <div className="hero-icon hi-1"> <img src="/html-5.png" alt="" /> </div>
                    <div className="hero-icon hi-2"> <img src="/css-3.png" alt="" /> </div>
                    <div className="hero-icon hi-3"> <img src="/java.png" alt="" /> </div>
                    <div className="hero-icon hi-4"> <img src="/react.png" alt="" /> </div>
                  </div>
                </div>
              </motion.div>

              <motion.div className="hero-right d-flex align-items-center justify-content-center" initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}>
                <div className="hr-content">
                  <p>I craft beautiful and functional websites using HTML, CSS, JavaScript, and React — blending design precision with code clarity to build seamless user experiences.</p>
                  <div className="hero-btn-box d-flex flex-wrap gap-3 mt-4">
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
              <h3> . CSS</h3>
            </div>
          </div>
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3> . JS</h3>
            </div>
          </div>
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3> . React</h3>
            </div>
          </div>
            <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3> .  NEXT JS</h3>
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
              <h3> . CSS</h3>
            </div>
          </div>
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3> . JS</h3>
            </div>
          </div>
          <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3> . React</h3>
            </div>
          </div>
            <div className="text-scroll-item">
            <div className="text-scroll-box">
              <h3> .  NEXT JS</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
