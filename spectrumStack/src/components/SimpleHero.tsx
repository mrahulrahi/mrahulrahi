

interface Props {
    title?: string;
    subTitle?: string;
    bgGradient?: string;
}

const SimpleHero = ({ title, subTitle, bgGradient }: Props) => {
    return (
        <div className={`simple-hero-container d-flex align-items-end`} >
            <main className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h4 className="mb-2 bg-clip-text text-transparent" style={{ backgroundImage: bgGradient }}>{subTitle}</h4>
                        <h1 className="mb-0 bg-clip-text text-transparent" style={{ backgroundImage: bgGradient }}>{title}</h1>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SimpleHero