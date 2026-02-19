import React, { ReactNode } from 'react'
import * as motion from "motion/react-client"

interface Props {
    children: ReactNode;
    background?: string;
    className?: string;
    id?: string;
    column?: string;
    heading?: string;
    rightHeading?: ReactNode;
    mobileRightHeading?: boolean;
    backgroundFixedElement?: ReactNode;

}

const ContentContainer = ({ children, background, className, id, column, heading, rightHeading, mobileRightHeading, backgroundFixedElement }: Props) => {

    return (
        <>
            <section id={id} className={`content-container ` + className + ` bg-` + background}>
                {backgroundFixedElement}
                <div className="container">
                    <div className="row">
                        <div className={column === undefined ? 'col-lg-12' : column}>
                            {heading &&
                                <motion.div className="heading position-relative d-flex flex-wrap justify-content-between align-items-end gap-4" initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    viewport={{ once: true, amount: 0.2 }}>
                                    <div className="heading-left">
                                        <h3>{heading}</h3>
                                        <div className="heading-underline"></div>
                                    </div>
                                    {rightHeading && <div className="heading-right d-none d-md-block">
                                        {rightHeading}
                                    </div>}
                                </motion.div>
                            }
                            {children}

                            {rightHeading && mobileRightHeading && <div className="bottom-cta-box d-md-none mt-5">
                                {rightHeading}
                            </div>}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContentContainer