import React from 'react'
import './SimpleHero.css'
import { motion } from "framer-motion"

interface Props {
    title?: string;
    subTitle?: string;
    bgGradient?: string;
}

const SimpleHero = ({ title, subTitle, bgGradient }: Props) => {
    return (
        <div className={`simple-hero-container d-flex align-items-end`} >
            <main className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                    className="row">
                    <div className="col-lg-12">
                        <h4 className="mb-2" style={{ backgroundImage: bgGradient }}>{subTitle}</h4>
                        <h1 className="mb-0" style={{ backgroundImage: bgGradient }}>{title}</h1>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}

export default SimpleHero