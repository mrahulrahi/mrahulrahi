interface HeroProps {
    bgImg?: string;
    title: string;
    subTitle: string;
    content?: string;
    gradientColor?: React.CSSProperties;
}

const Hero = ({ bgImg, title, subTitle, content, gradientColor }: HeroProps) => {
    return (
        <div 
            className={`hero-container flex items-end relative rounded-3xl overflow-hidden ${!bgImg ? 'min-h-[260px] lg:min-h-[340px]' : 'min-h-[300px] lg:min-h-[400px]'}`}
            style={!bgImg && gradientColor ? gradientColor : undefined}
        >
            {/* Background Image Layer if present */}
            {bgImg && (
                <div 
                    className="absolute inset-0 bg-black/80 bg-center bg-cover bg-no-repeat z-1 after:absolute after:inset-0 after:bg-black/50" 
                    style={{ backgroundImage: `url(${bgImg})` }}
                />
            )}

            {/* Dynamic Gradient Overlay when gradientColor is passed without bgImg */}
            {!bgImg && gradientColor && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30 z-1 pointer-events-none" />
            )}

            {/* Fallback pattern when neither bgImg nor gradientColor is passed */}
            {!bgImg && !gradientColor && (
                <div className="absolute inset-0 hero-bg-pattern z-0" />
            )}

            <div className={`hero-content w-full max-w-[calc(100%-60px)] h-full text-neutral-content mx-auto relative z-10 ${!bgImg ? "pt-16 pb-10" : 'py-20'}`}>
                <div className="w-full">
                    <h6 className="mb-2 font-bold tracking-wider uppercase text-xs sm:text-sm text-emerald-400">
                        {subTitle}
                    </h6>
                    <h1 className="mb-0 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
                        {title}
                    </h1>
                    {content && <p className="mt-3 text-white/80 text-base max-w-2xl">{content}</p>}
                </div>
            </div>
        </div>
    );
};

export default Hero;