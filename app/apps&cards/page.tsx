import React from 'react'

const AppsCardsPage = () => {
  return (
    <div>
      <div className="content-container bg-gold">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content-box d-flex flex-wrap">
                <div className="heading flex-wrap d-flex justify-content-between align-items-center">
                  <h3>Apps</h3>
                  <a href="" className="btn btn-default btn-green">View All</a>
                </div>
                <div className="block-card-list d-flex flex-wrap">
                  <div className="block-card-item">
                    <div className="block-card-box uiBoxYellow">
                      <h5 className="block-head">Calculator UI</h5>
                      <p className="block-text">See More</p>
                      <a className="block-img" href="./Calculator_UI/index.html"><img src="include/images/arrow.svg" alt="" /></a>
                    </div>
                  </div>
                  <div className="block-card-item">
                    <div className="block-card-box uiBoxGray">
                      <h5 className="block-head">Gradient BG</h5>
                      <p className="block-text">See More</p>
                      <a className="block-img" href="./Gradient_BG/index.html"><img src="include/images/arrow.svg" alt="" /></a>
                    </div>
                  </div>
                  <div className="block-card-item">
                    <div className="block-card-box uiBoxGreen">
                      <h5 className="block-head">Notes App</h5>
                      <p className="block-text">See More</p>
                      <a className="block-img" href="./Notes_App/index.html"><img src="include/images/arrow.svg" alt="" /></a>
                    </div>
                  </div>
                  <div className="block-card-item">
                    <div className="block-card-box uiBoxPink">
                      <h5 className="block-head">Quiz Game</h5>
                      <p className="block-text">See More</p>
                      <a className="block-img" href="./Quiz_Game/index.html"><img src="include/images/arrow.svg" alt="" /></a>
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

export default AppsCardsPage