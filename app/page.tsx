import Image from 'next/image'

export default function Home() {
  return (
    <main >

      <div className="hero-container d-flex align-items-start position-relative">
        <div className="hero-bg" style={{ backgroundImage: "url(" + `${require("/public/hero-img.jpg")}` + ")", }}></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hero-box d-flex align-items-center justify-content-center">
                <div className="hero-text text-center">
                  <h4><span>Hello,</span> I'm</h4>
                  <h1>Rahul <span>Maurya</span></h1>
                  <h3>I'm a <span>Web Developer</span>.</h3>
                  <div className="hero-btn">
                    <a href="#projects" className="btn btn-default">Featured Work
                      <i className="fas fa-arrow-down ms-2"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main >
  )
}
