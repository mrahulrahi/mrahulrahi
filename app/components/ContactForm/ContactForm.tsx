import './ContactForm.css'

const ContactForm = () => {
  return (
    
    <div className="content-container bg-green">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="content-box d-flex flex-wrap">
            <div className="heading">
              <h3>Contact Components</h3>
            </div>

            <div className="contact-wrapper">
              <div className="contact-box-1 d-flex flex-wrap glass-bg">
                <div className="contact-text">
                  <h4>Let's talk!</h4>
                  <div className="contact-details-list d-flex flex-wrap">
                    <div className="contact-details-item">
                      <h5>Phone</h5>
                      <p>+9199XXXXXXXX</p>
                    </div>
                    <div className="contact-details-item">
                      <h5>Address</h5>
                      <p> 191/6 Sundarpuram, Lucknow, India </p>
                    </div>
                    <div className="contact-details-item">
                      <h5>Email</h5>
                      <p>contact@a&c.com</p>
                    </div>
                    <div className="contact-details-item">
                      <h5>Timing</h5>
                      <p> 10am - 6pm | Monday - Friday</p>
                    </div>
                  </div>
                </div>

                <div className="contact-form">
                  <form className="contact-form-box">
                    <label>Name <span>*</span></label>
                    <input type="text" className="form-control" />
                    <label>Email <span>*</span></label>
                    <input type="email" className="form-control" />
                    <label>Comment or Message <span>*</span></label>
                    <textarea className="form-control"> </textarea><br />
                    <button className="btn btn-default" type="submit">SEND MESSAGE</button>
                  </form>
                </div>
              </div>

              <div className="contact-box-1 glass-bg d-flex flex-wrap justify-content-between align-items-center">
                <div className="contact-text">
                  <h3>CONTACT</h3>
                  <h1>GET IN TOUCH</h1>
                </div>
                <div className="contact-form">
                  <span className="d-flex justify-content-between">
                    <input type="text" name="Name" placeholder="Name" id="form-name" />
                    <input type="email" name="Email" placeholder="Email" id="form-email" />
                  </span>
                  <input type="text" name="Subject" placeholder="Subject" id="form-subject" />
                  <br />
                  <input type="text" name="Message" placeholder="Message" id="form-message" />
                  <br />
                  <input type="button" value="SEND MESSAGE" className="btn btn-default" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ContactForm