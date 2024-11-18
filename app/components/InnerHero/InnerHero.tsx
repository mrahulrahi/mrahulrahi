import { ReactNode } from 'react';
import './InnerHero.css'

interface Props {
    heading: JSX.Element | string;
    children: ReactNode;
    bgImage: string;
}


const InnerHero = ({ heading, children, bgImage }: Props) => {
    return (
        <div>
            <section className="inner-hero-container d-flex align-items-start position-relative">
                <div className="inner-hero-bg" style={{ backgroundImage: `url(${bgImage})` }}></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-hero-box d-flex align-items-center justify-content-center" data-aos="fade-up" suppressHydrationWarning>
                                <div className="inner-hero-text text-center">
                                    <h1>{heading}</h1>
                                    <div className="inner-hero-btn-box d-flex flex-column flex-sm-row align-items-center justify-content-center">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default InnerHero