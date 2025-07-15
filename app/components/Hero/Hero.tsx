'use client';
import { ReactNode } from 'react';
import './Hero.css'
<<<<<<< HEAD
import { motion } from "framer-motion"
=======
>>>>>>> parent of 4bc2b93 (`Added motion library and used it for animations in Header and Hero components`)

interface Props {
  children: ReactNode;
  bgImage: string;
}

const Hero = ({ children, bgImage }: Props) => {
  return (
    <section className="hero-container d-flex flex-wrap align-items-center position-relative bg-dark overflow-hidden">
      <div className="hero-bg" style={{ backgroundImage: `url(${bgImage})` }}></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="hero-content d-flex flex-wrap align-items-center justify-content-between">
<<<<<<< HEAD
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                className="hero-left" >
=======
              <div className="hero-left" data-aos="fade-right" suppressHydrationWarning>
>>>>>>> parent of 4bc2b93 (`Added motion library and used it for animations in Header and Hero components`)
                <div className="hl-content d-flex align-items-center justify-content-center">
                  <div className="hero-img-box d-flex align-items-center justify-content-center position-relative">
                    <div className="hero-img"> <img src="/hero-img.png" alt="" /> </div>
                  </div>
                  <div className="hl-orbit-1">
                    <div className="hero-icon hi-1"> <img src="/html-5.png" alt="" /> </div>
                    <div className="hero-icon hi-2"> <img src="/css-3.png" alt="" /> </div>
                    <div className="hero-icon hi-3"> <img src="/java.png" alt="" /> </div>
                    <div className="hero-icon hi-4"> <img src="/react.png" alt="" /> </div>
                  </div>
                </div>
              </div>

<<<<<<< HEAD
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                className="hero-right d-flex align-items-center justify-content-center">
=======
              <div className="hero-right d-flex align-items-center justify-content-center" data-aos="fade-left" suppressHydrationWarning>
>>>>>>> parent of 4bc2b93 (`Added motion library and used it for animations in Header and Hero components`)
                <div className="hr-content">
                  <h3><span className="bg-clip-text bg-gradient-1">Hey!</span> ✌️ I'm</h3>
                  <h1>❣️ Rahul <span className="bg-clip-text bg-gradient-1">Maurya</span></h1>
                  <h4>💻 <span className="bg-clip-text bg-gradient-1">Front-end Developer</span> from India</h4>
                  <p>I craft beautiful and functional websites using HTML, CSS, JavaScript, and React — blending design precision with code clarity to build seamless user experiences.</p>
                  <div className="hero-btn-box d-flex flex-wrap gap-3 mt-4">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
