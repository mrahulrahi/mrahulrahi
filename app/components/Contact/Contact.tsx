import Button from '../Button'
import './Contact.css'
import ContentContainer from '../ContentContainer'
import Heading from '../Heading/Heading'


const Contact = () => {
    return (
        <ContentContainer background="violet" id="contact">
            <Heading heading="Contact Me">
                <Button title="Hire Me" style="default" />
            </Heading>
            <div className="d-flex flex-wrap justify-content-between" data-aos="fade-up">
                <div className="contact-box">
                    <h4>Get in Touch</h4>
                    <p>Let me get you a beautiful website.</p>
                </div>
                <div className="contact-subscribe-box justify-self-end">
                    <div className="form-label">Subscribe to Our Newsletter</div>
                    <div className="form-group d-flex flex-column flex-sm-row gap-3">
                        <input type="email" className="form-control" placeholder="Enter your email here*" />
                        <Button title="Subscribe Now" style="green" />
                    </div>
                </div>
            </div>
        </ContentContainer>
    )
}

export default Contact