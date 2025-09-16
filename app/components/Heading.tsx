import React from 'react'

interface Props {
    heading?: string;
}

const Heading = ({ heading }: Props) => {
    return (
        <div className="heading d-flex flex-wrap justify-content-between align-items-end gap-4" data-aos="fade-up" suppressHydrationWarning>
            <div className="heading-left">
                <h3>{heading}</h3>
                <div className="heading-underline"></div>
            </div>
        </div>
    )
}

export default Heading