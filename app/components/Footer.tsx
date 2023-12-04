import Link from 'next/link'
import React from 'react'
import { FaLinkedinIn, FaGithub, FaYoutube, FaTelegram } from "react-icons/fa";

const Footer = () => {

  const links = [
    { 'path': '/', 'label': 'Home' },
    { 'path': '/about', 'label': 'About' },
    { 'path': '/portfolio', 'label': 'Portfolio' },
    { 'path': '/apps&cards', 'label': 'Apps & Cards' },
    { 'path': '#contact', 'label': 'Contact' },
]

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
                    {links.map(link => <li key={link.path} className="footer-nav-item"><Link href={link.path}>{link.label}</Link></li>)}
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
              <div className="footer-middle-box d-flex flex-wrap align-items-center justify-content-between">
                <div className="footer-contact-box d-flex align-items-center justify-content-between">
                  <div className="footer-heading">Connect with me :</div>
                  <div className="social-links d-flex">
                    <a className="d-flex align-items-center justify-content-center"
                      href="https://linkedin.com/in/mrahulrahi/"><FaLinkedinIn /></a>
                    <a className="d-flex align-items-center justify-content-center"
                      href="https://github.com/mrahulrahi/"><FaGithub /></a>
                    <a className="d-flex align-items-center justify-content-center"
                      href="https://www.youtube.com/@fireliquidator"><FaYoutube /></a>
                    <a className="d-flex align-items-center justify-content-center"
                      href="https://t.me/mrahulrahi"><FaTelegram /></a>
                  </div>

                </div>
                <div className="footer-contact-box">
                  <div className="footer-btn">
                    <a href="#!" className="btn btn-default">Hire Me</a>
                    <a href="#!" className="btn btn-default">Donate</a>
                  </div>
                </div>
              </div>
              <div className=" d-flex flex-column flex-sm-row align-items-center justify-content-between">


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