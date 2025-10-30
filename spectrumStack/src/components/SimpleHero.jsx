/* eslint-disable react/prop-types */

const SimpleHero = ({ title, subTitle, gradientColor }) => {

    return (
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
    )
}

export default SimpleHero