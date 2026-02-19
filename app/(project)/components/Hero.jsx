

const Hero = ({ bgImg, title, subTitle, content, gradientColor }) => {
    return (
        <>
            <div className={`hero-container flex items-end relative ${!bgImg ? 'hero-bg-pattern min-h-[250px]' : 'min-h-[300px] lg:min-h-[400px]' }`} >
                {bgImg &&
                    <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/80 bg-center bg-cover bg-no-repeat z-1 after:absolute after:top-0 after:left-0 after:bottom-0 after:right-0 after:bg-black/50" style={{ backgroundImage: `url(${bgImg})`, }}></div>
                }
                <div className={`hero-content w-full max-w-7xl h-full text-neutral-content mx-auto relative z-9 ${!bgImg ? "pt-20 pb-10" : 'py-20'}`}>
                    <div className="w-full">
                        <h6 className={`mb-2 font-extrabold ${!bgImg && "bg-clip-text text-transparent"}`} style={gradientColor}>{subTitle}</h6>
                        <h1 className={`mb-0 text-5xl ${!bgImg && "bg-clip-text text-transparent"}`} style={gradientColor}>{title}</h1>
                        <p className="mt-2">{content}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero