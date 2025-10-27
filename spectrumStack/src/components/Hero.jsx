/* eslint-disable react/prop-types */

const Hero = ({ bgImg, title, subTitle, content, lessHeight }) => {
    return (
        <>
            <div className={`hero place-self-center place-items-start ${lessHeight ? 'min-h-[200px]' : 'min-h-[500px]'}`} style={{ backgroundImage: `url(${bgImg})`, }}>
                <div className="hero-overlay"></div>
                <div className="hero-content w-full max-w-3xl h-full text-neutral-content py-20 mx-auto">
                    <div className="w-full">
                        <h6 className="mb-5">{subTitle}</h6>
                        <h1 className="mb-5 text-5xl font-bold">{title}</h1>
                        <p>{content}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero