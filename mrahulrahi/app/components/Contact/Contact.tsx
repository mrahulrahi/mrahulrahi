import * as motion from "motion/react-client"
import Button from '../Button'
import './Contact.css'
import ContentContainer from '../ContentContainer'
import MessageForm from './MessageForm' // 👈 import the new component
import Link from 'next/link'
import { FaLinkedinIn, FaGithub, FaYoutube, FaTelegram } from "react-icons/fa";

const Contact = () => {
  return (
    <ContentContainer background="" id="contact" className="contact-container" heading="Contact Me" rightHeading={<Button title="Hire Me" style="default" target='_blank' url="https://t.me/mrahulrahi" />} mobileRightHeading={false}>
      <motion.div className="d-flex flex-wrap justify-content-between"    initial={{ opacity: 0, y: 50 }}
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

export default Contact;
