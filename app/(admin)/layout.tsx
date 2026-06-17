import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import '@/app/globals.css'
import { GradientProvider } from '@/app/context/GradientContext';
import Providers from '../(project)/providers'; // Points to the shared providers
const inter = Inter({ subsets: ['latin'] })
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard for mrahulrahi',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${jetBrainsMono.className} ${spaceGrotesk.className}`}>
        <GradientProvider>
          <Providers>
            {children}
          </Providers>
        </GradientProvider>
      </body>
    </html>
  )
}
