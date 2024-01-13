import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.css'
import ImportBsJS from "./importBsJS";
import './globals.css'
import { Josefin_Sans } from 'next/font/google'

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
      <ImportBsJS />
      <body className={josefinSans.className}>
        <Header />
        <main>{children}</main>
        <Contact />
        <Footer />
      </body>
    </html>
  )
}
