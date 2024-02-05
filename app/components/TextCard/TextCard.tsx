import './TextCard.css'

const TextCard = () => {
  return (
    <div className="content-container pt-0">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextCard