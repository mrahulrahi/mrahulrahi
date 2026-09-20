
import type { Metadata } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import './portfolio.css'
import ImportBsJS from '@/app/importBsJS'
import { Josefin_Sans, Outfit } from 'next/font/google'
import Header from '@/app/components/portfolio/Header/Header'
import Footer from '@/app/components/portfolio/Footer/Footer'
import FloatingWorkspaceToggle from '@/app/components/layout/FloatingWorkspaceToggle'
import CommandPalette from '@/app/components/layout/CommandPalette/CommandPalette'

// Google Fonts setup
const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-josefinSans',
})

const outfit = Outfit({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'Rahul Maurya (mrahulrahi) | Front-end Developer & UI/UX Architect',
  description: 'Personal portfolio of Rahul Maurya, a Front-end Developer & UI/UX Architect specializing in React, Next.js, TypeScript, and the MERN stack.',
  keywords: ['Rahul Maurya', 'mrahulrahi', 'Frontend Developer', 'React Developer', 'Next.js', 'UI/UX Designer', 'MERN Stack', 'Portfolio'],
  authors: [{ name: 'Rahul Maurya', url: 'https://mrahulrahi.vercel.app' }],
  creator: 'Rahul Maurya',
  openGraph: {
    title: 'Rahul Maurya | Front-end Developer & UI/UX Architect',
    description: 'Explore featured web apps, technical skills, interactive developer lab, and articles by Rahul Maurya.',
    url: 'https://mrahulrahi.vercel.app',
    siteName: 'Rahul Maurya Portfolio',
    images: [
      {
        url: '/rahi.webp',
        width: 800,
        height: 800,
        alt: 'Rahul Maurya - Front-end Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rahul Maurya | Front-end Developer',
    description: 'Explore featured web apps, technical skills, and articles by Rahul Maurya.',
    creator: '@mrahulrahi',
    images: ['/rahi.webp'],
  },
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rahul Maurya',
    alternateName: 'mrahulrahi',
    url: 'https://mrahulrahi.vercel.app',
    image: 'https://mrahulrahi.vercel.app/rahi.webp',
    jobTitle: 'Front-end Developer & UI/UX Architect',
    sameAs: [
      'https://github.com/mrahulrahi',
      'https://linkedin.com/in/mrahulrahi',
      'https://www.youtube.com/@fireliquidator',
      'https://t.me/mrahulrahi',
      'https://gurushots.com/rahicreations',
    ],
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'MERN Stack', 'UI/UX Design'],
  };

  return (
    <html lang="en" className={`${josefinSans.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="overlay">
        <Header />
        <main>{children}</main>
        <CommandPalette />
        <FloatingWorkspaceToggle />
        <Footer />
        <ImportBsJS />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
