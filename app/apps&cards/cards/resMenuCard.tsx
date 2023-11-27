import React from 'react'

const resMenuCard = () => {
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
    </div>
  )
}

export default resMenuCard