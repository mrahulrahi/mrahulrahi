import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
    background?: string;
    className?: string;
    id?: string;
    column?: string;
}

const ContentContainer = ({ children, background, className, id, column }: Props) => {

    return (
        <>
            <section id={id} className={`content-container ` + className + ` bg-` + background}>
                <div className="container">
                    <div className="row">
                        <div className={column === undefined ? 'col-lg-12' : column}>
                            {children}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContentContainer