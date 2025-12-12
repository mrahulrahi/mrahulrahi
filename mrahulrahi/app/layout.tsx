// app/layout.tsx
import type { Metadata } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import './globals.css'
import ImportBsJS from './importBsJS'
import { Josefin_Sans, Outfit } from 'next/font/google'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${josefinSans.variable} ${outfit.variable}`}>
      <body className="overlay">
        {children}
        <ImportBsJS />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
