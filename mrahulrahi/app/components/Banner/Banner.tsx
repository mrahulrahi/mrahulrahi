import { ReactNode, JSX } from 'react';
import * as motion from "motion/react-client"
import './Banner.css'

interface Props {
  children?: ReactNode | string;
  heading?: JSX.Element | string;
  logo?: string;
  bgImage?: string;
  className?: string;
}

const Banner = ({ children, heading, logo, bgImage, className }: Props) => {
  return (
    <section className={`banner-container d-flex align-items-center position-relative ${className}`}>
      {bgImage && <div className="banner-bg" style={{ backgroundImage: `url(${bgImage})` }}></div>}

      <div className="container">
        <div className="row">
          <div className="col-md-10 mx-auto">
            <motion.div className="banner-box d-flex flex-column align-items-center justify-content-center text-center" initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}>
              {logo && <div className="banner-logo"><img src={logo} alt="Banner Logo" /></div>}
              {heading && <h1>{heading}</h1>}
              {children &&
                <div className="banner-cta d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3">
                  {children}
                </div>
              }
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner