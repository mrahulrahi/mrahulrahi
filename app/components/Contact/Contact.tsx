import Button from '../Button'
import './Contact.css'
import ContentContainer from '../ContentContainer'
import Heading from '../Heading'


const Contact = () => {
    return (
        <ContentContainer background="dark" id="contact" className="contact-container">
            <Heading heading="Contact Me">
                <Button title="Hire Me" style="default" />
            </Heading>
            <div className="d-flex flex-wrap justify-content-between" data-aos="fade-up" suppressHydrationWarning>
                <div className="contact-box">
                    <h4 className="bg-clip-text bg-gradient-1">Get in Touch</h4>
                    <p>Let me get you a beautiful website.</p>
                </div>
                <div className="contact-subscribe-box justify-self-end">
                    <div className="form-label">Want to Start new project</div>
                    <div className="form-group d-flex flex-column flex-sm-row gap-3">
                        <input type="email" className="form-control" placeholder="Enter your email here*" />
                        <Button title="Ping Me" style="gradient"  url="https://t.me/mrahulrahi"/>
                    </div>
                </div>
            </div>
        </ContentContainer>
    )
}

export default Contact