import Button from '../Button'
import './Contact.css'
import ContentContainer from '../ContentContainer'
import MessageForm from './MessageForm' // 👈 import the new component
import Link from 'next/link'
import { FaLinkedinIn, FaGithub, FaYoutube, FaTelegram } from "react-icons/fa";
import { BiMobile } from 'react-icons/bi'

const Contact = () => {
  return (
    <ContentContainer background="dark" id="contact" className="contact-container" heading="Contact Me" rightHeading={<Button title="Hire Me" style="default" />} mobileRightHeading={false}>
      <div className="d-flex flex-wrap justify-content-between" data-aos="fade-up" suppressHydrationWarning>
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
          <div className="d-md-none"><Button title="Hire Me" style="default" /></div>
        </div>
        <div className="contact-subscribe-box d-flex flex-column justify-self-end">
          <div className="form-label">Have a Project in Mind? Let's Build It.</div>
          <MessageForm />
        </div>
      </div>
    </ContentContainer>
  );
};

export default Contact;
