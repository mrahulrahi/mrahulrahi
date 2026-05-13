import Link from 'next/link'
import Image from 'next/image'
import './Footer.css'
import { FaLinkedinIn, FaGithub, FaYoutube, FaTelegram } from "react-icons/fa";
import * as motion from "motion/react-client"
import Button from '../Button'
import ContentContainer from '../ContentContainer'
import MessageForm from './MessageForm'

const SocialLinks = ({ className = "", style }: { className?: string, style?: React.CSSProperties }) => (
  <div className={`social-links d-flex align-items-center ${className}`} style={style}>
    <Link className="d-flex align-items-center justify-content-center"
      href="https://linkedin.com/in/mrahulrahi/" aria-label="LinkedIn"><FaLinkedinIn /></Link>
    <Link className="d-flex align-items-center justify-content-center"
      href="https://github.com/mrahulrahi/" aria-label="GitHub"><FaGithub /></Link>
    <Link className="d-flex align-items-center justify-content-center"
      href="https://www.youtube.com/@fireliquidator" aria-label="YouTube"><FaYoutube /></Link>
    <Link className="d-flex align-items-center justify-content-center"
      href="https://t.me/mrahulrahi" aria-label="Telegram"><FaTelegram /></Link>
  </div>
);

const Contact = () => {
  return (
    <ContentContainer background="" id="contact" className="contact-container" heading="Let's Collaborate" rightHeading={<Button title="Hire Me" style="default" target='_blank' url="https://t.me/mrahulrahi" />} mobileRightHeading={false}>
      <motion.div className="d-flex flex-wrap justify-content-between" initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}>
        <div className="contact-box">
          <h4 className="bg-clip-text bg-gradient-text">Get in Touch</h4>
          <p>Let me get you a beautiful website.</p>
          <SocialLinks className="position-static mb-4 mb-md-0" style={{ transform: 'translate(0)' }} />
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
                  <Link className="footer-logo" href="/"><Image src="/logo.svg" alt="Rahul Maurya Logo" width={500} height={500} /></Link>

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
                  <div className="copyright">{new Date().getFullYear()} mrahulrahi &copy; All rights reserved</div>
                  <div className="made-by">Made with ❤️ by mrahulrahi.</div>
                  <SocialLinks className="justify-content-center" />
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