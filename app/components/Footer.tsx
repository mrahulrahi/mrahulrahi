import React from 'react'

const Footer = () => {
  return (
    <footer id="footer" className="footer bg-violet">
    <div className="footer-upper">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="footer-upper-list d-flex flex-wrap align-items-center justify-content-between">
                        <a className="footer-logo" href="#!">mrahul<span>rahi</span></a>

                        <div className="footer-nav">
                            <ul className="footer-nav-list d-flex flex-wrap align-items-center justify-content-between">
                                <li className="footer-nav-item"><a href="#!">Home</a></li>
                                <li className="footer-nav-item"><a href="#!">About</a></li>
                                <li className="footer-nav-item"><a href="#!">Projects</a></li>
                                <li className="footer-nav-item"><a href="rahi-creations.html">Rahi Creations</a></li>
                                <li className="footer-nav-item"><a href="fireliquidator.html">FireLiquidator</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="footer-middle">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className=" d-flex flex-column flex-sm-row align-items-center justify-content-between">
                        <div className="footer-heading">Connect with me :</div>
                        <div className="social-links d-flex">
                            <a className="d-flex align-items-center justify-content-center"
                                href="https://linkedin.com/in/mrahulrahi/"><i className="fab fa-linkedin-in"></i></a>
                            <a className="d-flex align-items-center justify-content-center"
                                href="https://github.com/mrahulrahi/"><i className="fab fa-github"></i></a>
                            <a className="d-flex align-items-center justify-content-center"
                                href="https://www.youtube.com/@fireliquidator"><i className="fab fa-youtube"></i></a>
                            <a className="d-flex align-items-center justify-content-center"
                                href="https://t.me/mrahulrahi"><i className="fab fa-telegram-plane"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="footer-lower">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div
                        className="footer-lower-box d-flex flex-column-reverse flex-sm-row flex-wrap align-items-center justify-content-between">
                        <div className="copyright">2023 mrahulrahi &copy; All rights reserved</div>
                        <div className="">Proudly coded ❤️ by mrahulrahi.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
  )
}

export default Footer