'use client';
import { ReactNode } from 'react';
import './InnerHero.css'
import { motion } from "framer-motion"

interface Props {
    heading: JSX.Element | string;
    children: ReactNode;
    bgImage: string;
}


const InnerHero = ({ heading, children, bgImage }: Props) => {
    return (
        <div>
            <section className="inner-hero-container d-flex align-items-start position-relative">
                <div className="inner-hero-bg" style={{ backgroundImage: `url(${bgImage})` }}></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                                className="inner-hero-box d-flex align-items-center justify-content-center">
                                <div className="inner-hero-text text-center">
                                    <h1>{heading}</h1>
                                    <div className="inner-hero-btn-box d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3">
                                        {children}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default InnerHero