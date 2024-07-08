import { ReactNode } from 'react';
import './Banner.css'

interface Props {
  children : ReactNode;
  logo?: string;
}

const Banner = ({children, logo} : Props) => {
  return (
    <div className="banner-container d-flex align-items-center position-relative">
    <div className="banner-bg"></div>
    <div className="container">
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="banner-text" data-aos="fade-up">
            <h1>{children}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Banner