import './InnerHero.css'
import { IoIosArrowDroprightCircle } from "react-icons/io";

const InnerHero = () => {
    return (
        <div>
            <div className="inner-hero-container d-flex align-items-start position-relative">
                <div className="inner-hero-bg"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-hero-box d-flex align-items-center justify-content-center">
                                <div className="inner-hero-text text-center">
                                    <h1>About <span>me</span></h1>
                                    <h3>I'm a <span>Web Developer</span>.</h3>
                                    <div className="hero-btn-box">
                                        <a href="#projects" className="btn btn-default">Featured Work
                                        <IoIosArrowDroprightCircle /></a>
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

export default InnerHero