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

            <ContentContainer>
                <Link href="/tools/gradient-bg">Gradient BG</Link>
                <Link href="/tools/quote-generator">Quote Generator</Link>
            </ContentContainer>
        </>
    )

}

export default page