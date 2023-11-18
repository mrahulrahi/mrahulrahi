import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.css'
import ImportBsJS from "./importBsJS";
import { Josefin_Sans } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

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
        <Footer />
      </body>
    </html>
  )
}
