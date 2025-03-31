import { ReactNode } from 'react';
import './Hero.css'

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
              <div className="hero-left" data-aos="fade-right" suppressHydrationWarning>
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

              <div className="hero-right d-flex align-items-center justify-content-center" data-aos="fade-left" suppressHydrationWarning>
                <div className="hr-content">
                  <h4><span className="bg-clip-text bg-gradient-1">Hey!</span> ✌️ I'm</h4>
                  <h1>Rahul <span className="bg-clip-text bg-gradient-1">Maurya</span></h1>
                  <h3><span className="bg-clip-text bg-gradient-1">Front-end Developer</span> From India ❣️</h3>
                  <div className="hero-btn-box mt-4">
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