'use client'

import Link from "next/link"
import ContentContainer from "./components/ContentContainer"
import { Josefin_Sans, Outfit } from 'next/font/google'

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefinSans',
})

const outfit = Outfit({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export default function NotFound({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className={`${josefinSans.variable} ${outfit.variable}`}>
        <ContentContainer className="page_404" column="col-sm-12">
          <div className="text-center">
            <div className="page_404-bg"></div>

            <div className="page_404-content">
              <h3>
                Look like you're lost
              </h3>

              <p>the page you are looking for not avaible!</p>

              <Link href="/" className="btn btn-green">Go to Home</Link>
            </div>
          </div>
        </ContentContainer>
      </body>
    </html>
  )
}