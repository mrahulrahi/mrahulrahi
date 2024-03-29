import { ReactNode } from 'react';
import './InnerHero.css'

interface Props {
    heading: JSX.Element;
    children: ReactNode;
}


const InnerHero = ({ heading, children }: Props) => {
    return (
        <div>
            <div className="inner-hero-container d-flex align-items-start position-relative">
                <div className="inner-hero-bg"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-hero-box d-flex align-items-center justify-content-center">
                                <div className="inner-hero-text text-center">
                                    <h1>{heading}</h1>
                                    <div className="inner-hero-btn-box d-flex align-items-center justify-content-center">
                                       {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InnerHero