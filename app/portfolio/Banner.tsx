import React from 'react'

const Banner = () => {
  return (
    <div className="banner-container d-flex align-items-center position-relative">
    <div className="banner-bg"></div>
    <div className="container">
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="banner-logo mx-auto">
            <img src="/logo.png" alt=""/>
          </div>
          <div className="banner-text">
            <h1>Elements</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Banner