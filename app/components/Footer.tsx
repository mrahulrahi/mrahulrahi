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


    <div className="footer-upper">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="footer-upper-box d-flex flex-wrap">
        
          <div className="footer-bottom">
            <div className="footer-nav d-flex flex-wrap">
              <ul className="footer-nav-list">
                <li className="footer-heading"><a href="terms-conditions.html">Apps</a></li>
                <li className="footer-nav-item"><a href="privacy-policy.html">Staff + Board</a></li>
                <li className="footer-nav-item"><a href="terms-conditions.html">Collaborators</a>
                </li>
                <li className="footer-nav-item"><a href="terms-conditions.html">Contact Us</a></li>
              </ul>

              <ul className="footer-nav-list">
                <li className="footer-heading"><a href="terms-conditions.html">Cards</a></li>
                <li className="footer-nav-item"><a href="privacy-policy.html">Eligibility</a></li>
                <li className="footer-nav-item"><a href="terms-conditions.html">Selection
                    Process</a></li>
                <li className="footer-nav-item"><a href="terms-conditions.html">Application
                    Information</a></li>
              </ul>

              <ul className="footer-nav-list">
                <li className="footer-heading"><a href="terms-conditions.html">Components</a></li>
                <li className="footer-nav-item"><a href="privacy-policy.html">Stories</a></li>
                <li className="footer-nav-item"><a href="terms-conditions.html">Data</a></li>
                <li className="footer-nav-item"><a href="terms-conditions.html">Reports</a></li>
              </ul>
            </div>
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
        <div className="footer-middle-box d-flex flex-wrap align-items-center justify-content-between">
          <div className="footer-contact-box">
            <div className="footer-contact-heading">Email</div>
            <a href="mailto:contact@a&c.com">contact@a&c.com</a>
          </div>
          <div className="footer-contact-box">
            <div className="footer-contact-heading">Phone</div>
            <a href="tel:+91XXXXXXXXXX">+91XXXXXXXXXX</a>
          </div>
          <div className="footer-contact-box">
            <div className="footer-contact-heading">Connect with A&C</div>
            <ul className="social-links d-flex flex-wrap">
              <li><a href="#" target="_blank">FACEBOOK</a></li>
              <li><a href="#" target="_blank">TWITTER</a></li>
              <li><a href="#" target="_blank">INSTAGRAM</a></li>
              <li><a href="#" target="_blank">YOUTUBE</a></li>
              <li><a href="#" target="_blank">LINKEDIN</a></li>
            </ul>
          </div>
          <div className="footer-contact-box">
            <div className="footer-btn">
              <a href="#!" className="btn btn-default">Donate</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</footer>
  )
}

export default Footer