import React from 'react'
import Banner from '../components/Banner/Banner'
import ContentContainer from '../components/ContentContainer'
import Link from 'next/link'

const page = () => {
    return (
        <>
            <Banner bgImage='./inner-hero-img.jpg'>
                Tools
            </Banner>

            <ContentContainer className="quiz-container" background='gold'>
                <div className="d-flex flex-wrap justify-content-between gap-5">
                    <Link href="/tools/gradient-bg" className="btn btn-violet">Gradient BG</Link>
                    <Link href="/tools/quote-generator" className="btn btn-violet">Quote Generator</Link>
                    <Link href="/tools/calculator" className="btn btn-violet">Calculator</Link>
                    <Link href="/tools/quiz-game" className="btn btn-violet">Quiz Game</Link>
                </div>
            </ContentContainer>
        </>
    )

}

export default page