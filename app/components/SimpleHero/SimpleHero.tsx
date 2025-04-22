import React from 'react'
import './SimpleHero.css'

interface Props {
    title?: string;
    subTitle?: string;
    bgGradient?: string;
}

const SimpleHero = ({ title, subTitle, bgGradient }: Props) => {
    return (
        <div className={`simple-hero-container d-flex align-items-center`} style={{ background: bgGradient }}>
            <main className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h4 className="mb-2">{subTitle}</h4>
                        <h1 className="mb-0">{title}</h1>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SimpleHero