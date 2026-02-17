
import type { Metadata } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import './portfolio.css'
import ImportBsJS from '../importBsJS'
import { Josefin_Sans, Outfit } from 'next/font/google'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

// Google Fonts setup
const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefinSans',
})

const outfit = Outfit({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'mrahulrahi',
  description: 'portfolio',
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${josefinSans.variable} ${outfit.variable}`}>
      <body className="overlay">
        <Header />
        <main>{children}</main>
        <Footer />
        <ImportBsJS />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
