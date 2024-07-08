import './Hero.css'
import Button from '../Button'
import { IoIosArrowDroprightCircle } from "react-icons/io";

const Hero = () => {
  return (
    <div className="hero-container d-flex flex-wrap align-items-center position-relative bg-violet overflow-hidden">
      <div className="hero-bg"> <img src="/hero-bg.svg" alt="" /></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="hero-content d-flex flex-wrap align-items-center justify-content-between">
              <div className="hero-left" data-aos="fade-right">
                <div className="hl-content d-flex align-items-center justify-content-center">
                  <div className="hero-img-box d-flex align-items-center justify-content-center position-relative">
                    <div className="hero-img"> <img src="/hero-img-1.jpg" alt="" /> </div>
                  </div>
                  <div className="hl-orbit-1">
                    <div className="hero-icon hi-1"> <img src="/html-5.png" alt="" /> </div>
                    <div className="hero-icon hi-2"> <img src="/css-3.png" alt="" /> </div>
                    <div className="hero-icon hi-3"> <img src="/java.png" alt="" /> </div>
                    <div className="hero-icon hi-4"> <img src="/react.png" alt="" /> </div>
                  </div>
                </div>
              </div>

              <div className="hero-right d-flex align-items-center justify-content-center" data-aos="fade-left">
                <div className="hr-content">
                  <h4><span>Hey!</span> ✌️ I'm</h4>
                  <h1>Rahul <span>Maurya</span></h1>
                  <h3><span>Front-end Developer</span> From India ❣️</h3>
                  <div className="about-hero-btn mt-4">
                    <Button title='About me' style='default' url='/about' icon={<IoIosArrowDroprightCircle />} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero