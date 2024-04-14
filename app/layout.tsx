import type { Metadata } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next"
import 'bootstrap/dist/css/bootstrap.css'
import ImportBsJS from "./importBsJS";
import { Josefin_Sans, Outfit } from 'next/font/google'
import './style.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Contact from './components/Contact/Contact';

const josefinSans = Josefin_Sans({ subsets: ['latin'] })

const outfit = Outfit({
  weight: ['300', '400', '500','600', '700'],
  subsets: ['latin'],
  display:'swap',
  variable: '--font-outfit',
});

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
    <html lang="en">
      <body className={`${josefinSans.className} ${outfit.className}`}>
        <Header />
        <main>{children}</main>
        <Contact />
        <Footer />
        <ImportBsJS />
        <SpeedInsights />
      </body>
    </html>
  )
}
