import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.css'
import ImportBsJS from "./importBsJS";
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

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
      <Header />
      <body className={inter.className}>{children}</body>
      <Footer />
    </html>
  )
}
