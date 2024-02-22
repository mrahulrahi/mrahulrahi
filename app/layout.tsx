import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'
import ImportBsJS from "./importBsJS";
import { Josefin_Sans } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Contact from './components/Contact/Contact';

const josefinSans = Josefin_Sans({ subsets: ['latin'] })

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
      
      <body className={josefinSans.className}>
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
