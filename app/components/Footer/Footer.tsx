import Link from 'next/link'
import './Footer.css'
import { FaLinkedinIn, FaGithub, FaYoutube, FaTelegram } from "react-icons/fa";

const Footer = () => {

  const links = [
    { 'path': '/', 'label': 'Home' },
    { 'path': '/about', 'label': 'About' },
    { 'path': '/portfolio', 'label': 'Portfolio' },
    { 'path': '#contact', 'label': 'Contact' },
  ]

  return (
    <footer id="footer" className="footer bg-dark">
      <div className="footer-upper">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-upper-box d-flex flex-wrap align-items-center justify-content-between">
                <a className="footer-logo" href="#!"><img src="/logo.svg" alt="" /></a>

                <div className="footer-nav">
                  <div className="footer-nav-list d-flex flex-wrap align-items-center justify-content-between">
                    {links.map(link => <span key={link.path} className="footer-nav-item"><Link href={link.path}>{link.label}</Link></span>)}
                  </div>
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
                className="footer-lower-box d-flex flex-wrap-reverse align-items-center justify-content-sm-between">
                <div className="copyright">2023 mrahulrahi &copy; All rights reserved</div>
                <div className="made-by">Made with ❤️ by mrahulrahi.</div>
                <div className="social-links d-flex align-items-center justify-content-center">
                    <Link className="d-flex align-items-center justify-content-center"
                      href="https://linkedin.com/in/mrahulrahi/"><FaLinkedinIn /></Link>
                    <Link className="d-flex align-items-center justify-content-center"
                      href="https://github.com/mrahulrahi/"><FaGithub /></Link>
                    <Link className="d-flex align-items-center justify-content-center"
                      href="https://www.youtube.com/@fireliquidator"><FaYoutube /></Link>
                    <Link className="d-flex align-items-center justify-content-center"
                      href="https://t.me/mrahulrahi"><FaTelegram /></Link>
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