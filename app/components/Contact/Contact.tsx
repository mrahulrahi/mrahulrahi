import './Contact.css'

const Contact = () => {
    return (
        <div className="content-container contact-container bg-violet" id='contact'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="heading d-flex">
                            <h3>Contact Me</h3>
                        </div>
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
                                <a className="contact-submit" href="">Subscribe Now</a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact