import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'
import ImportBsJS from "./importBsJS";
import { Josefin_Sans } from 'next/font/google'

import Header from './components/Header'
import Footer from './components/Footer'
import Contact from './components/Contact';

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
      <script src="https://kit.fontawesome.com/8c25ccfa63.js" crossorigin="anonymous"></script>
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
