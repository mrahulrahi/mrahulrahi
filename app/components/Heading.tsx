import { ReactNode } from 'react';
import { motion } from "framer-motion"

interface Props {
    children?: ReactNode;
    heading: string;
}

const Heading = ({ heading, children }: Props) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                className="heading d-flex flex-wrap justify-content-between align-items-end gap-4">
                <div className="heading-left">
                    <h3>{heading}</h3>
                    <div className="heading-underline"></div>
                </div>
                {children && <div className="heading-right">
                    {children}
                </div>}
            </motion.div>
        </>
    )
}

export default Heading