import type { Metadata } from 'next'
import '@/app/globals.css'
import { GradientProvider } from '@/app/context/GradientContext';
import Providers from './providers';
import 'highlight.js/styles/atom-one-dark.css';
import FloatingWorkspaceToggle from '@/app/components/layout/FloatingWorkspaceToggle';
import { josefinSans, outfit } from '@/app/fonts';

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
    <html lang="en" className={`${josefinSans.variable} ${outfit.variable}`}>
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
