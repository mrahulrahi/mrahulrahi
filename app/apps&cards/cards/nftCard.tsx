import React from 'react'

const nftCard = () => {
  return (
    <div>
        
      <div className="content-container bg-gold">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content-box d-flex flex-wrap glass-bg">
                <div className="heading d-flex flex-wrap justify-content-between align-items-center">
                  <h3>NFT Card</h3>
                  <div className="btn-holder">
                    <button className="btn btn-default btn-green" type="button" name="button" onclick="showAddNftcardModal()">
                      Add NFT Card
                    </button>
                  </div>
                </div>
                <div className="nftcard-list d-flex flex-wrap">
                  <div className="nftcard-item">
                    <div className="nftcard-box d-flex flex-column">
                      <div className="nftcard-image">
                        <img src="/image-equilibrium.jpg" alt=""/>
                      </div>
                      <div className="nftcard-text">
                        <h4>Equilibrium #3429</h4>
                        <p>Our Equilibrium collection promotes balance and calm.</p>
                      </div>
                      <div className="nftcard-cta mt-auto">
                        <ul className="nftcard-cta-list d-flex align-items-center justify-content-between">
                          <li className="nftcard-cta-item d-flex align-items-center"><img src="/icon-ethereum.svg"
                            alt="" /> 0.041 ETH</li>
                          <li className="nftcard-cta-item d-flex align-items-center"><img src="/icon-clock.svg"
                            alt="" />3 days left</li>
                        </ul>
                        <div className="nftcard-avatar d-flex align-items-center">
                          <img src="/image-avatar.png" alt="" />
                          <p>Creation of <span>Jules Wyvern</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="nftcard-item">
                    <div className="nftcard-box d-flex flex-column">
                      <div className="nftcard-image">
                        <img
                          src="https://cdn.dribbble.com/users/383277/screenshots/18055765/media/e5fc935b60035305099554810357012a.png"
                          alt="" />
                      </div>
                      <div className="nftcard-text">
                        <h4>Skelton #4551</h4>
                        <p>Best NFT in the market.</p>
                      </div>
                      <div className="nftcard-cta mt-auto">
                        <ul className="nftcard-cta-list d-flex align-items-center justify-content-between">
                          <li className="nftcard-cta-item d-flex align-items-center"><img src="/icon-ethereum.svg"
                            alt="" /> 0.045 ETH</li>
                          <li className="nftcard-cta-item d-flex align-items-center"><img src="/icon-clock.svg"
                            alt="" />7 days left</li>
                        </ul>
                        <div className="nftcard-avatar d-flex align-items-center">
                          <img src="/image-avatar.png" alt="" />
                          <p>Creation of <span>Rahi</span></p>
                        </div>
                      </div>
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

export default nftCard