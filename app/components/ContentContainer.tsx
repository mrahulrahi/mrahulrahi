import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
    background?: string;
    className?: string;
    id?: string;
    column?: string;
    heading?: string;
    rightHeading?: ReactNode;
    mobileRightHeading?: boolean;

}

const ContentContainer = ({ children, background, className, id, column, heading, rightHeading, mobileRightHeading }: Props) => {

    return (
        <>
            <section id={id} className={`content-container ` + className + ` bg-` + background}>
                <div className="container">
                    <div className="row">
                        <div className={column === undefined ? 'col-lg-12' : column}>
                            <div className="heading d-flex flex-wrap justify-content-between align-items-end gap-4" data-aos="fade-up" suppressHydrationWarning>
                                <div className="heading-left">
                                    <h3>{heading}</h3>
                                    <div className="heading-underline"></div>
                                </div>
                                {rightHeading && <div className="heading-right d-none d-md-block">
                                    {rightHeading}
                                </div>}
                            </div>
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