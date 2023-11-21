import React from 'react'

const Contact = () => {
    return (
        <div className="content-container contact-container bg-violet" id='contact'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="heading d-flex">
                            <h3>Contact Me</h3>
                        </div>

                        <div
                            className="contact-box d-flex flex-column flex-md-row flex-wrap justify-content-between align-items-md-center">
                            <h4>Get in Touch</h4>
                            <span>Let Me Get You A Beautiful Website.</span>
                            <div className="contact-btn">
                                <a className="btn btn-default" href="#">Hire Me</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact