import './InnerHero.css'
import { IoIosArrowDroprightCircle } from "react-icons/io";

interface Props {
    heading: JSX.Element;
    subHeading?: JSX.Element;
}

const InnerHero = ({ heading, subHeading }: Props) => {
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
                                    <h3>{subHeading}</h3>
                                    <div className="inner-hero-btn-box">
                                        <a href="#projects" className="btn btn-default">Featured Work
                                            <IoIosArrowDroprightCircle /></a>
                                        <a className="btn btn-default green" href="">FireLiquidator</a>
                                        <a className="btn btn-default" href="">Rahi Creations</a>
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