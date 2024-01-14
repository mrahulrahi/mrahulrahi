import './TeamCard.css'

const TeamCard = () => {
  return (
    
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

  )
}

export default TeamCard