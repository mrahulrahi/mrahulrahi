import React from 'react'

const AboutHero = () => {
    return (
        <div>
            <div className="about-hero-container d-flex align-items-start position-relative">
                <div className="about-hero-bg"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="about-hero-box d-flex align-items-center justify-content-center">
                                <div className="about-hero-text text-center">
                                    <h1>About <span>me</span></h1>
                                    <h3>I'm a <span>Web Developer</span>.</h3>
                                    <div className="hero-btn-box">
                                        <a href="#projects" className="btn btn-default">Featured Work
                                            <i className="fas fa-arrow-down ms-2"></i></a>
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

export default AboutHero