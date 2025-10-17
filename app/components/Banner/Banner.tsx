import { ReactNode, JSX } from 'react';
import './Banner.css'

interface Props {
  children?: ReactNode | string;
  heading?: JSX.Element | string;
  logo?: string;
  bgImage: string;
}

const Banner = ({ children, heading, logo, bgImage }: Props) => {
  return (
    <section className="banner-container d-flex align-items-center position-relative">
      {bgImage && <div className="banner-bg" style={{ backgroundImage: `url(${bgImage})` }}></div>}

      <div className="container">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <div className="banner-box d-flex flex-column align-items-center justify-content-center text-center" data-aos="fade-up" suppressHydrationWarning>
              {logo && <div className="banner-logo"><img src={logo} alt="Banner Logo" /></div>}
              {heading && <h1>{heading}</h1>}
              {children &&
                <div className="banner-cta d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3">
                  {children}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner