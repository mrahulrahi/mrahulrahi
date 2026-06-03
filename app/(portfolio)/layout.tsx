
import type { Metadata } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import './portfolio.css'
import ImportBsJS from '@/app/importBsJS'
import { Josefin_Sans, Outfit } from 'next/font/google'
import Header from '@/app/components/portfolio/Header/Header'
import Footer from '@/app/components/portfolio/Footer/Footer'
import FloatingWorkspaceToggle from '@/app/components/layout/FloatingWorkspaceToggle'

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
  title: 'Rahul Maurya | Front-end Developer',
  description: 'Portfolio of Rahul Maurya, a Front-end Developer specializing in the MERN stack.',
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
        <FloatingWorkspaceToggle />
        <Footer />
        <ImportBsJS />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
