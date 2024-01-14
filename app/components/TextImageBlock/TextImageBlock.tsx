import './TextImageBlock.css'

const TextImageBlock = () => {
  return (
    <div className="content-container bg-gold">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="content-box d-flex flex-wrap">
            <div className="heading">
              <h3>About Component</h3>
            </div>
            <div className="about-box d-flex flex-wrap glass-bg">
              <div className="about-img">
                <img src="/about.jpg" alt="" />
              </div>
              <div className="about-text">
                <h4>Our Story</h4>
                <h5>Welcome to RahiCreations<br />
                  Glad to have you here!<br />
                  We’re keen to tell you about us.</h5>
                <p>The website which you’re looking at right now was established in
                  November 2019. With more than five years development experience,
                  we here at Rahi Creations are whizz at Graphics Designing , Web
                  Designing , App Designing And Photography that provide excellent
                  user experience and are quite easy to manage. We are obsessed with
                  web-app development and committed to our work. Moreover, Our
                  vision is to deliver best in className stuff that you’re looking for
                  and we do assure you of providing best service out-there.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TextImageBlock