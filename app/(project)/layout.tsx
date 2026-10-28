import type { Metadata } from 'next'
import '@/app/globals.css'
import { GradientProvider } from '@/app/context/GradientContext';
import Providers from './providers';
import 'highlight.js/styles/atom-one-dark.css';
import FloatingWorkspaceToggle from '@/app/components/layout/FloatingWorkspaceToggle';

export const metadata: Metadata = {
  title: {
    default: 'Developer Workspace & Utilities | Rahul Maurya',
    template: '%s | Rahul Maurya',
  },
  description: 'Interactive web utilities, UI component sandbox, and educational code playgrounds built by Rahul Maurya.',
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,300..700;1,300..700&family=Outfit:wght@300..900&display=swap"
        />
      </head>
      <body className="pt-0">
        <GradientProvider>
          <Providers>
            {children}
            <FloatingWorkspaceToggle />
          </Providers>
        </GradientProvider>
      </body>
    </html>
  )
}
