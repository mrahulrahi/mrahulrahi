import './Hero.css'
import Button from '../Button/Button'
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Hero = () => {
  return (
    <div className="hero-container d-flex flex-wrap align-items-center position-relative">
        <div className="hero-bg"> <img src="/animated-shape.svg" alt="" /></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-12 mx-auto">
              <div className="hero-content d-flex flex-wrap justify-content-between glass-bg">
                <div className="hero-left">
                  <div className="hl-content">
                    <div className="hero-img"> <img src="/hero-img-1.jpg" alt="" /> </div>
                    <div className="hero-icon hi-1"> <img src="/html-5.png" alt="" />
                    </div>
                    <div className="hero-icon hi-2"> <img src="/css-3.png" alt="" />
                    </div>
                    <div className="hero-icon hi-3"> <img src="/java.png" alt="" /> </div>
                    <div className="hero-icon hi-4"> <img src="/react.png" alt="" /> </div>
                  </div>
                </div>
                <div className="hero-right">
                  <div className="hr-content">
                    <h4><span>Hello,</span> I'm</h4>
                    <h1>Rahul <span>Maurya</span></h1>
                    <h3>I'm a <span>Web Developer</span> <br /> From <span>India</span> .</h3>
                    <p>Tech Stack - MERN</p>
                    <div className="about-hero-btn">
                      <Button title='Featured Work' style='default' icon={<IoIosArrowDropdownCircle />}/>
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