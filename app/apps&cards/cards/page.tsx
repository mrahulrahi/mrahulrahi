import React from 'react'

const cards = () => {
  return (
    <div>

      <div className="content-container bg-gold">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content-box d-flex flex-wrap glass-bg">
                <div className="heading d-flex flex-wrap justify-content-between align-items-center">
                  <h3>Responsive Menu</h3>
                  <div className="btn-holder">
                    <button className="btn btn-default btn-green" type="button" name="button" onclick="showAddResmenuModal()">
                      Add Responsive Menu
                    </button>
                  </div>
                </div>
                <div className="resmenu-list d-flex flex-wrap">
                  <div className="resmenu-item">
                    <div className="resmenu-box">
                      <div className="resmenu-heading ms-auto">Chicken</div>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                        et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip
                        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                        dolore
                        eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.</p>
                    </div>
                  </div>
                  <div className="resmenu-item">
                    <div className="resmenu-box">
                      <div className="resmenu-heading ms-auto">Beef</div>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip
                        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                        dolore
                        eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.</p>
                    </div>
                  </div>
                  <div className="resmenu-item">
                    <div className="resmenu-box">
                      <div className="resmenu-heading ms-auto">Sushi</div>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip
                        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                        dolore
                        eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.</p>
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
              <div className="content-box d-flex flex-wrap glass-bg">
                <div className="heading d-flex flex-wrap justify-content-between align-items-center">
                  <h3>Responsive Cards</h3>
                  <div className="btn-holder">
                    <button className="btn btn-default" type="button" name="button" onclick="showAddRescardModal()">
                      Add Responsive Card
                    </button>
                  </div>
                </div>
                <div className="rescard-list d-flex flex-wrap">
                  <div className="rescard-item">
                    <div className="rescard-box">
                      <div className="rescard-img">
                        <img src="/new-york.jpg" alt="Sunset in New York" />
                      </div>
                      <div className="rescard-text">
                        <h4>New York</h4>
                        <p>One of the most vibrant cities you can visit - a trip no one should
                          miss!</p>
                      </div>
                    </div>
                  </div>
                  <div className="rescard-item">
                    <div className="rescard-box">
                      <div className="rescard-img">
                        <img src="/kuala-lumpur.jpg" alt="Sunset in New York" />
                      </div>
                      <div className="rescard-text">
                        <h4>Kuala Lumpur</h4>
                        <p>One of the most vibrant cities you can visit - a trip no one should
                          miss!</p>
                      </div>
                    </div>
                  </div>
                  <div className="rescard-item">
                    <div className="rescard-box">
                      <div className="rescard-img">
                        <img src="/hong-kong.jpg" alt="Sunset in New York" />
                      </div>
                      <div className="rescard-text">
                        <h4>Hong Kong</h4>
                        <p>One of the most vibrant cities you can visit - a trip no one should
                          miss!</p>
                      </div>
                    </div>
                  </div>
                  <div className="rescard-item">
                    <div className="rescard-box">
                      <div className="rescard-img">
                        <img src="/singapore.jpg" alt="Sunset in New York" />
                      </div>
                      <div className="rescard-text">
                        <h4>Singapore</h4>
                        <p>One of the most vibrant cities you can visit - a trip no one should
                          miss!</p>
                      </div>
                    </div>
                  </div>
                  <div className="rescard-item">
                    <div className="rescard-box">
                      <div className="rescard-img">
                        <img src="/mumbai.jpg" alt="" />
                      </div>
                      <div className="rescard-text">
                        <h4>Mumbai</h4>
                        <p>Scan the QR code to visit Frontend Mentor and take your coding skills to the next level</p>
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


      <div className="content-container bg-green">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content-box d-flex flex-wrap glass-bg">
                <div className="heading d-flex flex-wrap justify-content-between align-items-center">
                  <h3>Service Card</h3>
                  <div className="btn-holder">
                    <button className="btn btn-default" type="button" name="button" onclick="showAddQrcardModal()">
                      Add Service Card
                    </button>
                  </div>
                </div>
                <div className="service-card-list d-flex flex-wrap">
                  <div className="service-card-item">
                    <div className="service-card-box d-flex flex-column glass-bg">
                      <div className="service-card-img">
                        <img src="/web-design.png" alt="" />
                      </div>
                      <div className="service-card-text">
                        <h4>Web Design</h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                        </p>
                      </div>
                      <div className="service-card-btn mt-auto">
                        <a className="btn btn-default" href="">LEARN MORE</a>
                      </div>
                    </div>
                  </div>
                  <div className="service-card-item">
                    <div className="service-card-box d-flex flex-column glass-bg">
                      <div className="service-card-img">
                        <img src="/app-design.png" alt="" />
                      </div>
                      <div className="service-card-text">
                        <h4>App Design</h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                        </p>
                      </div>
                      <div className="service-card-btn mt-auto">
                        <a className="btn btn-default" href="">LEARN MORE</a>
                      </div>
                    </div>
                  </div>
                  <div className="service-card-item">
                    <div className="service-card-box d-flex flex-column glass-bg">
                      <div className="service-card-img">
                        <img src="/graphic-design.png" alt="" />
                      </div>
                      <div className="service-card-text">
                        <h4>Graphic Design</h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                        </p>
                      </div>
                      <div className="service-card-btn mt-auto">
                        <a className="btn btn-default" href="">LEARN MORE</a>
                      </div>
                    </div>
                  </div>
                  <div className="service-card-item">
                    <div className="service-card-box d-flex flex-column glass-bg">
                      <div className="service-card-img">
                        <img src="/photography.png" alt="" />
                      </div>
                      <div className="service-card-text">
                        <h4>Photography</h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                        </p>
                      </div>
                      <div className="service-card-btn mt-auto">
                        <a className="btn btn-default" href="">LEARN MORE</a>
                      </div>
                    </div>
                  </div>
                  <div className="service-card-item">
                    <div className="service-card-box d-flex flex-column glass-bg">
                      <div className="service-card-img">
                        <img src="/hostingry.png" alt="" />
                      </div>
                      <div className="service-card-text">
                        <h4>Hostingry</h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                        </p>
                      </div>
                      <div className="service-card-btn mt-auto">
                        <a className="btn btn-default" href="">LEARN MORE</a>
                      </div>
                    </div>
                  </div>
                  <div className="service-card-item">
                    <div className="service-card-box d-flex flex-column glass-bg">
                      <div className="service-card-img">
                        <img src="/phonesmania.png" alt="" />
                      </div>
                      <div className="service-card-text">
                        <h4>PhonesMania</h4>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                        </p>
                      </div>
                      <div className="service-card-btn mt-auto">
                        <a className="btn btn-default" href="">LEARN MORE</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <section className="modal-content-container">

        <div id="resmenuModal" className="modal">
          <div className="modal-content">
            <div className="modal-head">
              <div className="modal-head-content">
                <span>Add Responsive Menu</span>
              </div>
            </div>

            <div className="modal-body">
              <label for="title">Title</label>
              <input id="title" type="text" />
              <br />

              <label for="content">Content</label>
              <input id="content" type="text" />
              <div className="modal-btn-box d-flex gap-1 justify-content-center">
                <button className="btn btn-default confirm-btn" type="button" name="button" onclick="addResmenu()">
                  Confirm
                </button>
                <button className="btn btn-default close-btn" type="button" name="button" onclick="closeResmenuBtn()">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="rescardModal" className="modal">
          <div className="modal-content">
            <div className="modal-head">
              <div className="modal-head-content">
                <span>Add Responsive Card</span>
              </div>
            </div>

            <div className="modal-body">
              <label for="image">Image Url</label>
              <input id="image" type="text" />
              <br />
              <label for="title">Title</label>
              <input id="res-title" type="text" />
              <br />

              <label for="content">Content</label>
              <input id="res-content" type="text" />
              <div className="modal-btn-box d-flex gap-1 justify-content-center">
                <button className="btn btn-default confirm-btn" type="button" name="button" onclick="addRescard()">
                  Confirm
                </button>
                <button className="btn btn-default close-btn" type="button" name="button" onclick="closeRescardBtn()">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="nftcardModal" className="modal">
          <div className="modal-content">
            <div className="modal-head">
              <div className="modal-head-content">
                <span>Add NFT Card</span>
              </div>
            </div>

            <div className="modal-body">
              <label for="image">Image Url</label>
              <input id="nft-image" type="text" />
              <br />
              <label for="title">Title</label>
              <input id="nft-title" type="text" />
              <br />

              <label for="content">Content</label>
              <input id="nft-content" type="text" />

              <label for="price">Price</label>
              <input id="nft-price" type="text" />

              <label for="time">Time</label>
              <input id="nft-time" type="text" />

              <label for="creator">Creator</label>
              <input id="nft-creator" type="text" />
              <div className="modal-btn-box d-flex gap-1 justify-content-center">
                <button className="btn btn-default confirm-btn" type="button" name="button" onclick="addNftcard()">
                  Confirm
                </button>
                <button className="btn btn-default close-btn" type="button" name="button" onclick="closeNftcardBtn()">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  )
}

export default cards