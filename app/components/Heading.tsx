import React from 'react'
import * as motion from "motion/react-client"

interface Props {
    heading?: string;
    className?: string;
}

const Heading = ({ heading, className }: Props) => {
    return (
        <motion.div className={`heading position-relative d-flex flex-wrap justify-content-between align-items-end gap-4 ${className}`}    initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}>
            <div className="heading-left">
                <h3>{heading}</h3>
                <div className="heading-underline"></div>
            </div>
        </motion.div>
    )
}

export default Heading