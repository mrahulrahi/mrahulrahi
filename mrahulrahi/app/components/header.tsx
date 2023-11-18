import React from 'react'

const Header = () => {
    return (
        <header id="header">
        <nav className="navbar navbar-expand-xl">
            <div className="container">
                <div className="nav-inside d-flex align-items-center justify-content-between">
                    <a className="navbar-brand nav-logo" href="#!">mrahul<span>rahi</span></a>
                    <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="mainNav">
                        <div className="navbar-inside">
                            <ul className="navbar-nav">
                                <li className="nav-item"><a className="nav-link" href="index.html">Home</a></li>
                                <li className="nav-item"><a className="nav-link" href="about.html">About</a></li>
                                <li className="nav-item"><a className="nav-link" href="content-page.html">Rahi Creations</a>
                                </li>
                                <li className="nav-item"><a className="nav-link" href="content-page.html">FireLiquidator</a>
                                </li>
                                <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
                                <div className="nav-item header-btn d-xl-none">
                                    <a href="#!" className="btn btn-default green">Hire Me</a>
                                </div>
                            </ul>
                            <div className="navbar-bottom mt-auto d-xl-none">
                                <div className="social-links d-flex align-items-center justify-content-center">
                                    <a className="d-flex align-items-center justify-content-center"
                                        href="https://linkedin.com/in/mrahulrahi/"><i
                                            className="fab fa-linkedin-in"></i></a>
                                    <a className="d-flex align-items-center justify-content-center"
                                        href="https://github.com/mrahulrahi/"><i className="fab fa-github"></i></a>
                                    <a className="d-flex align-items-center justify-content-center"
                                        href="https://www.youtube.com/@fireliquidator"><i
                                            className="fab fa-youtube"></i></a>
                                    <a className="d-flex align-items-center justify-content-center"
                                        href="https://t.me/mrahulrahi"><i className="fab fa-telegram-plane"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header-btn d-none d-xl-block">
                        <a href="#!" className="btn btn-default green">Hire Me</a>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    )
}

export default Header