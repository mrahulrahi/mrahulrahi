import { ReactNode } from 'react';
import './Banner.css'

interface Props {
  children: ReactNode | string;
  logo?: string;
  bgImage: string;
}

const Banner = ({ children, logo, bgImage }: Props) => {
  return (
    <section className="banner-container d-flex align-items-center position-relative">
      <div className="banner-bg" style={{ backgroundImage: `url(${bgImage})` }}></div>
      <div className="container">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="banner-text" data-aos="fade-up" suppressHydrationWarning>
              <h1>{children}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner