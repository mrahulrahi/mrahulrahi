import { ReactNode } from 'react';
import './Banner.css'
import { motion } from "framer-motion"

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
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
              className="banner-text">
              <h1>{children}</h1>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner