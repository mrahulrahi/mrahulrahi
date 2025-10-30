
const SimpleHero = (title, subTitle, bgGradient) => {
    return (
        <div className={`simple-hero-container flex items-end min-h-[350px] py-10`} >
            <main className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h4 className={`mb-2 bg-clip-text text-transparent ${bgGradient}`} >{subTitle}</h4>
                        <h1 className={`mb-0 bg-clip-text text-transparent ${bgGradient}`} >{title}</h1>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SimpleHero