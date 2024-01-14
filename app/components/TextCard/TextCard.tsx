import './TextCard.css'

const TextCard = () => {
  return (
    <div className="content-container bg-green">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content-box d-flex flex-wrap">
                <div className="heading">
                  <h3>Components</h3>
                </div>
                <div className="package-list d-flex flex-wrap">
                  <section className="package-item">
                    <a href="#!" className="package-box  glass-bg">
                      <h1 className="package-title">Jake Sinclair</h1>
                      <h2 className="package-subtitle">Brand Designer</h2>
                      <p className="package-info">
                        Hostingry impressed me with amazing customer experience and
                        effortless migration from my previous provider.
                      </p>
                    </a>
                  </section>
                  <section className="package-item">
                    <a href="#!" className="package-box glass-bg">
                      <h1 className="package-title">Yassen Sattar</h1>
                      <h2 className="package-subtitle">Graphic and Web Designer</h2>
                      <p className="package-info">
                        Support matters to me the most. Your specialists were always
                        there to help me immediately.
                      </p>
                    </a>
                  </section>
                  <section className="package-item">
                    <a href="#!" className="package-box glass-bg">
                      <h1 className="package-title">Jhon Ortega</h1>
                      <h2 className="package-subtitle">Entrepreneur</h2>
                      <p className="package-info">
                        I was looking for a company that is very intuitive for beginners
                        and very well-configured for good performance.
                      </p>
                    </a>
                  </section>
                </div>

                <div className="testimonial-list d-flex flex-wrap glass-bg">
                  <div className="testimonial-item">
                    <div className="testimonial-box d-lg-flex flex-wrap gap-4 justify-content-between align-items-center">
                      <div className="testimonial-image-box">
                        <img src="/customer-1.jpg" alt="Mike Statham - Customer" className="testimonial-image" />
                      </div>
                      <div className="testimonial-info">
                        <h1 className="testimonial-name">Mike Statham</h1>
                        <h2 className="testimonial-subtitle">Co-Founder</h2>
                        <p className="testimonial-text">
                          hostingry helped me realize my project with a highly
                          constrained budget in like no time.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="testimonial-item">
                    <div
                      className="testimonial-box d-flex flex-wrap flex-row-reverse gap-4 justify-content-between align-items-center">
                      <div className="testimonial-image-box">
                        <img src="/customer-2.jpg" alt="John Mellow - Customer" className="testimonial-image" />
                      </div>
                      <div className="testimonial-info">
                        <h1 className="testimonial-name">John Mellow</h1>
                        <h2 className="testimonial-subtitle">Founder</h2>
                        <p className="testimonial-text">
                          I worked as a blogger and always looked for an integrated
                          hosting and file storage solution. I found it in hostingry!
                        </p>
                      </div>
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

export default TextCard