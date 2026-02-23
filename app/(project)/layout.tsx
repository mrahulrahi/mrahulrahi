
import type { Metadata } from 'next'
import './globals.css'
import { Josefin_Sans, Outfit } from 'next/font/google'
import { GradientProvider } from '../context/GradientContext.jsx';
import Providers from './providers';
import 'highlight.js/styles/atom-one-dark.css'; 

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
  title: 'React Project',
  description: 'Built with Tailwind CSS',
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${josefinSans.variable} ${outfit.variable}`}>
        <GradientProvider>
          <Providers>
            {children}
          </Providers>
        </GradientProvider>
      </body>
    </html>
  )
}
