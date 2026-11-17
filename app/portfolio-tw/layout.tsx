import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';
import { josefinSans, outfit } from '@/app/fonts';
import FloatingWorkspaceToggle from '@/app/components/layout/FloatingWorkspaceToggle';
import CommandPalette from '@/app/components/layout/CommandPalette/CommandPalette';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const viewport: Viewport = {
  themeColor: '#11d486',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://mrahulrahi.vercel.app'),
  title: {
    default: 'Rahul Maurya (mrahulrahi) | Tailwind Edition',
    template: '%s | Rahul Maurya',
  },
  description: 'Portfolio of Rahul Maurya, built with pure Tailwind CSS, Next.js, and modern web animations.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortfolioTwLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${josefinSans.variable} ${outfit.variable} dark`}>
      <body className="min-h-screen bg-[#09090b] text-slate-100 antialiased selection:bg-emerald-400 selection:text-black overflow-x-hidden font-sans">
        {children}
        <CommandPalette />
        <FloatingWorkspaceToggle />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

