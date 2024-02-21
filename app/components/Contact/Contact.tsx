import Button from '../Button/Button'
import './Contact.css'
import ContentContainer from '../ContentContainer/ContentContainer'
import Heading from '../Heading/Heading'


const Contact = () => {
    return (
        <ContentContainer background='violet' id='contact'>
            <Heading heading='Contact Me' />
            <div className='d-flex flex-wrap justify-content-between'>
                <div className="contact-box">
                    <h4>Get in Touch</h4>
                    <h5>Let Me Get You A Beautiful Website.</h5>
                    <div className="contact-btn">
                        <a className="btn btn-default" href="#">Hire Me</a>
                    </div>
                </div>
                <div className="contact-subscribe-box justify-self-end">
                    <div className="form-label">Subscribe to Our Newsletter</div>
                    <div className="form-group d-flex">
                        <input type="email" className="form-control" placeholder="Enter your email here*" />
                        <Button title="Subscribe Now" style="green" />
                    </div>
                </div>
            </div>
        </ContentContainer>
    )
}

export default Contact