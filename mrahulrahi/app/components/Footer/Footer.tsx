import Link from 'next/link'
import './Footer.css'
import { FaLinkedinIn, FaGithub, FaYoutube, FaTelegram } from "react-icons/fa";
import * as motion from "motion/react-client"
import Button from '../Button'
import ContentContainer from '../ContentContainer'
import MessageForm from './MessageForm'



const Contact = () => {
  return (
    <ContentContainer background="" id="contact" className="contact-container" heading="Contact Me" rightHeading={<Button title="Hire Me" style="default" target='_blank' url="https://t.me/mrahulrahi" />} mobileRightHeading={false}>
      <motion.div className="d-flex flex-wrap justify-content-between" initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}>
        <div className="contact-box">
          <h4 className="bg-clip-text bg-gradient-1">Get in Touch</h4>
          <p>Let me get you a beautiful website.</p>
          <div className="social-links d-flex align-items-center position-static" style={{ transform: 'translate(0)' }}>
            <Link className="d-flex align-items-center justify-content-center"
              href="https://linkedin.com/in/mrahulrahi/"><FaLinkedinIn /></Link>
            <Link className="d-flex align-items-center justify-content-center"
              href="https://github.com/mrahulrahi/"><FaGithub /></Link>
            <Link className="d-flex align-items-center justify-content-center"
              href="https://www.youtube.com/@fireliquidator"><FaYoutube /></Link>
            <Link className="d-flex align-items-center justify-content-center"
              href="https://t.me/mrahulrahi"><FaTelegram /></Link>
          </div>
          <div className="d-md-none"><Button title="Hire Me" style="default" target='_blank' url="https://t.me/mrahulrahi" /></div>
        </div>
        <div className="contact-subscribe-box d-flex flex-column justify-self-end">
          <div className="form-label">Have a Project in Mind? Let's Build It.</div>
          <MessageForm />
        </div>
      </motion.div>
    </ContentContainer>
  );
};

const Footer = () => {

  const links = [
    { path: '/', label: 'Home' },
    { path: '/#about', label: 'About' },
    { path: '/#portfolio', label: 'Portfolio' },
    { path: '#contact', label: 'Contact' },
  ];

  return (
    <div className="bg-glow" >
      <Contact />
      <footer id="footer" className="footer">
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
                  <div className="copyright">2024 mrahulrahi &copy; All rights reserved</div>
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
    </div>

  )
}

export default Footer