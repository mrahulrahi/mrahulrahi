import ContentContainer from '../ContentContainer/ContentContainer'
import Heading from '../Heading/Heading'
import './Contact.css'

const Contact = () => {
    return (
        <ContentContainer background='violet' id='contact'>
            <Heading heading='Contact Me' />
            <div className='d-flex flex-wrap justify-content-between'>
                <div
                    className="contact-box">
                    <h4>Get in Touch</h4>
                    <span>Let Me Get You A Beautiful Website.</span>
                    <div className="contact-btn">
                        <a className="btn btn-default" href="#">Hire Me</a>
                    </div>
                </div>
                <div className="contact-top-content justify-self-end">
                    <h5>Subscribe to Our Newsletter</h5>
                    <div className="footer-subscribe-form">
                        <input type="email" className="contact-email" name="" id="" aria-describedby="emailHelpId"
                            placeholder="Enter your email here*" />
                        <a className="btn btn-green" href="">Subscribe Now</a>
                    </div>
                </div>
            </div>
        </ContentContainer>
    )
}

export default Contact