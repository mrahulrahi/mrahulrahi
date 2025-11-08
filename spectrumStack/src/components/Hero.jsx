

const Hero = ({ bgImg, title, subTitle, content, lessHeight, gradientColor }) => {
    return (
        <>
            {bgImg &&
                <div className={`hero place-self-center place-items-start ${lessHeight ? 'min-h-[200px]' : 'min-h-[400px]'}`} style={{ backgroundImage: `url(${bgImg})`, }}>
                    <div className="hero-overlay"></div>
                    <div className="hero-content w-full max-w-3xl h-full text-neutral-content py-20 mx-auto">
                        <div className="w-full">
                            <h6 className="mb-5">{subTitle}</h6>
                            <h1 className="mb-5 text-5xl font-bold">{title}</h1>
                            <p>{content}</p>
                        </div>
                    </div>
                </div>
            }

            {!bgImg &&
                <div className="simple-hero-container flex items-end min-h-[350px] py-20">
                    <main className="container">
                        <div className="px-3">
                            <div className="w-full">
                                <h4 className="mb-2 bg-clip-text text-transparent" style={gradientColor}>{subTitle}</h4>
                                <h1 className="mb-0 bg-clip-text text-transparent" style={gradientColor}>{title}</h1>
                            </div>
                        </div>
                    </main>
                </div>
            }
        </>
    )
}

export default Hero