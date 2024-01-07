import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
    background?: string;
    className? : string;
}

const ContentContainer = ({ children, background, className }: Props) => {
    return (
        <>
            <div className={`content-container `+ className + ` bg-` + background}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">

                            {children}

                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ContentContainer