import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import './portfolio.css'
import ImportBsJS from '@/app/importBsJS'
import { Josefin_Sans, Outfit } from 'next/font/google'
import Header from '@/app/components/portfolio/Header/Header'
import Footer from '@/app/components/portfolio/Footer/Footer'
import FloatingWorkspaceToggle from '@/app/components/layout/FloatingWorkspaceToggle'
import CommandPalette from '@/app/components/layout/CommandPalette/CommandPalette'

// Google Fonts setup with optimal display
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

export const viewport: Viewport = {
  themeColor: '#11d486',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://mrahulrahi.vercel.app'),
  title: {
    default: 'Rahul Maurya (mrahulrahi) | Front-end Developer & UI/UX Architect',
    template: '%s | Rahul Maurya',
  },
  description: 'Portfolio of Rahul Maurya, a Front-end Developer & UI/UX Architect specializing in React, Next.js, TypeScript, and the MERN stack.',
  keywords: [
    'Rahul Maurya',
    'mrahulrahi',
    'Frontend Developer',
    'React Developer',
    'Next.js Portfolio',
    'UI/UX Architect',
    'MERN Stack Developer',
    'Web Developer India',
    'Full Stack JavaScript',
  ],
  authors: [{ name: 'Rahul Maurya', url: 'https://mrahulrahi.vercel.app' }],
  creator: 'Rahul Maurya',
  publisher: 'Rahul Maurya',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  alternates: {
    canonical: '/',
  },
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
    worksFor: {
      '@type': 'Organization',
      name: 'SIS',
    },
    sameAs: [
      'https://github.com/mrahulrahi',
      'https://linkedin.com/in/mrahulrahi',
      'https://www.youtube.com/@fireliquidator',
      'https://t.me/mrahulrahi',
      'https://gurushots.com/rahicreations',
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Bootstrap',
      'MERN Stack',
      'UI/UX Design',
    ],
  };

  return (
    <html lang="en" className={`${josefinSans.variable} ${outfit.variable}`}>
      <head>
        <link rel="preconnect" href="https://dev.to" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://media.dev.to" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://dev.to" />
        <link rel="dns-prefetch" href="https://media.dev.to" />
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
