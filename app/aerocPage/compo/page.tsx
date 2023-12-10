import React from 'react'
import TextImageBlock from './TextImageBlock'
import ContactForm from './ContactForm'

const compo = () => {
  return (
    <div>

     <TextImageBlock />

    <ContactForm />


      <div className="content-container bg-gold">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content-box d-flex flex-wrap">
                <div className="heading">
                  <h3>Components</h3>
                </div>

                <div className="team-list d-flex flex-wrap">
                  <div className="team-item">
                    <div className="team-box glass-bg">
                      <div className="team-img"><img src="/user-4.jpg" alt="" /></div>
                      <div className="team-text">
                        <h3>Keith Marshall</h3>
                        <p>Designer</p>
                        <ul className="d-flex justify-content-center">
                          <li>
                            <a href="#"><i className="fab fa-facebook"></i></a>
                          </li>
                          <li>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                          </li>
                          <li>
                            <a href="#"><i className="fab fa-linkedin"></i></a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="team-item">
                    <div className="team-box glass-bg">
                      <div className="team-img"><img src="/user-5.jpg" alt="" /></div>
                      <div className="team-text">
                        <h3>George Williams</h3>
                        <p>Developer</p>
                        <ul className="d-flex justify-content-center">
                          <li>
                            <a href="#"><i className="fab fa-facebook"></i></a>
                          </li>
                          <li>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                          </li>
                          <li>
                            <a href="#"><i className="fab fa-linkedin"></i></a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="team-item">
                    <div className="team-box glass-bg">
                      <div className="team-img"><img src="/user-6.jpg" alt="" /></div>
                      <div className="team-text">
                        <h3>Julia Castillo</h3>
                        <p>Client Service</p>
                        <ul className="d-flex justify-content-center">
                          <li>
                            <a href="#"><i className="fab fa-facebook"></i></a>
                          </li>
                          <li>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                          </li>
                          <li>
                            <a href="#"><i className="fab fa-linkedin"></i></a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="user-list d-flex flex-wrap">
                  <div className="user-item">
                    <div className="user-box">
                      <img src="/user-1.jpg" alt="" />
                      <h3>Rahul Maurya</h3>
                      <p>Web Developer</p>
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fab fa-facebook"></i>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <i className="fab fa-linkedin"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="user-item">
                    <div className="user-box">
                      <img src="/user-2.jpg" alt="" />
                      <h3>Keith Marshall</h3>
                      <p>Designer</p>
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fab fa-facebook"></i>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <i className="fab fa-linkedin"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="user-item">
                    <div className="user-box">
                      <img src="/user-3.jpg" alt="" />
                      <h3>George Williams</h3>
                      <p>Developer</p>
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fab fa-facebook"></i>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <i className="fab fa-linkedin"></i>
                          </a>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


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


      <div className="content-container bg-gold">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content-box d-flex flex-wrap">
                <div className="heading">
                  <h3>Components</h3>
                </div>

                <div className="plan-list">
                  <article className="plan glass-bg">
                    <h4 className="plan-title">FREE</h4>
                    <h5 className="plan-price">$0/month</h5>
                    <h6>For hobby projects or small teams.</h6>
                    <ul className="plan-features">
                      <li className="plan-feature">1 Workspace</li>
                      <li className="plan-feature">Unlimited Traffic</li>
                      <li className="plan-feature">10GB Storage</li>
                      <li className="plan-feature">Basic Support</li>
                    </ul>
                    <div>
                      <button className="btn btn-default">CHOOSE PLAN</button>
                    </div>
                  </article>
                  <article className="plan plan-highlighted glass-bg">
                    <h4 className="plan-annotation">RECOMMENDED</h4>
                    <h4 className="plan-title">PLUS</h4>
                    <h5 className="plan-price">$29/month</h5>
                    <h6>For ambitious projects.</h6>
                    <ul className="plan-features">
                      <li className="plan-feature">5 Workspaces</li>
                      <li className="plan-feature">Unlimited Traffic</li>
                      <li className="plan-feature">100GB Storage</li>
                      <li className="plan-feature">Plus Support</li>
                    </ul>
                    <div>
                      <button className="btn btn-default">CHOOSE PLAN</button>
                    </div>
                  </article>
                  <article className="plan glass-bg">
                    <h4 className="plan-title">PREMIUM</h4>
                    <h5 className="plan-price">$99/month</h5>
                    <h6>Your enterprise solution.</h6>
                    <ul className="plan-features">
                      <li className="plan-feature">10 Workspaces</li>
                      <li className="plan-feature">Unlimited Traffic</li>
                      <li className="plan-feature">Unlimited Storage</li>
                      <li className="plan-feature">Priority Support</li>
                    </ul>
                    <div>
                      <button className="btn btn-default">CHOOSE PLAN</button>
                    </div>
                  </article>
                </div>

                <div id="key-features" className="glass-bg">
                  <h1 className="section-title">Many Good Reasons to Stick Around</h1>
                  <ul className="key-feature-list d-flex flex-wrap">
                    <li className="key-feature-item">
                      <div className="key-feature-box d-flex flex-column align-items-center justify-content-center">
                        <div className="key-feature-image">
                          <img src="/feature-img-1.png" alt="" />
                        </div>
                        <div className="key-feature-description">3,857,000 Trusting Customers</div>
                      </div>
                    </li>
                    <li className="key-feature-item">
                      <div className="key-feature-box d-flex flex-column align-items-center justify-content-center">
                        <div className="key-feature-image">
                          <img src="/feature-img-2.png" alt="" />
                        </div>
                        <div className="key-feature-description">Receive on time</div>
                      </div>
                    </li>
                    <li className="key-feature-item">
                      <div className="key-feature-box d-flex flex-column align-items-center justify-content-center">
                        <div className="key-feature-image">
                          <img src="/feature-img-3.png" alt="" />
                        </div>
                        <div className="key-feature-description">Lightning Fast CDN</div>
                      </div>
                    </li>
                    <li className="key-feature-item">
                      <div className="key-feature-box d-flex flex-column align-items-center justify-content-center">
                        <div className="key-feature-image">
                          <img src="/feature-img-4.png" alt="" />
                        </div>
                        <div className="key-feature-description">Fixed Price Projects</div>
                      </div>
                    </li>
                    <li className="key-feature-item">
                      <div className="key-feature-box d-flex flex-column align-items-center justify-content-center">
                        <div className="key-feature-image">
                          <img src="/feature-img-5.png" alt="" />
                        </div>
                        <div className="key-feature-description">99.999% Uptime Guarantee</div>
                      </div>
                    </li>
                    <li className="key-feature-item">
                      <div className="key-feature-box d-flex flex-column align-items-center justify-content-center">
                        <div className="key-feature-image">
                          <img src="/feature-img-6.png" alt="" />
                        </div>
                        <div className="key-feature-description">Highly Skilled</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="content-container bg-green">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content-box d-flex flex-wrap">
                <div className="heading">
                  <h3>Components</h3>
                </div>
                <div className="login-container position-relative glass-bg">
                  <div className="img-container">
                    <img src="/user.svg" alt="profile" className="profile" />
                  </div>
                  <div>
                    <div className="login-input-box">
                      <img src="/person.svg" alt="username" className="user-name" />
                      <input type="text" placeholder="Full Name" className="name input" />
                    </div>
                    <div className="login-input-box">
                      <img src="/person.svg" alt="username" className="user-name" />
                      <input type="text" placeholder="Username" className="name input" />
                    </div>
                    <div className="login-input-box">
                      <img src="/lock.svg" alt="pass" className="pass" />
                      <input type="password" placeholder="Email" className="name input" />
                    </div>
                    <div className="login-input-box">
                      <img src="/lock.svg" alt="pass" className="pass" />
                      <input type="password" placeholder="Password" className="name input" />
                    </div>
                    <div className="login-input-box">
                      <img src="/lock.svg" alt="pass" className="pass" />
                      <input type="password" placeholder="Password" className="name input" />
                    </div>
                    <div className="link d-flex justify-content-between">
                      <span>
                        <input type="checkbox" id="agree-terms" required />
                        <label htmlFor="agree-terms"><a href="#">Agree to Terms &amp; Conditions</a>
                        </label>
                      </span>
                      <a href="google.com">Forgot Password?</a>
                    </div>
                  </div>
                  <button className="btn btn-default btn-login">
                    SIGNUP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default compo