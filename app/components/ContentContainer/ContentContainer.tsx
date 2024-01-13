import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
    background?: string;
    className? : string;
    id? : string;
}

const ContentContainer = ({ children, background, className, id }: Props) => {
    return (
        <>
            <div id={id} className={`content-container `+ className + ` bg-` + background}>
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