'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, Sliders, LayoutDashboard } from 'lucide-react';
import { useGradient } from '@/app/context/GradientContext';

const CodeStackLayout = ({ children }) => {
  const pathname = usePathname();
  const context = useGradient();
  const gradientStyle = context ? context.gradientStyle : { backgroundImage: 'linear-gradient(to right, #00DC82, #00B159)' };

  const isDirectoryPage = pathname === '/tools' || pathname === '/tools/';

  if (isDirectoryPage) {
    return <div className="w-full min-h-screen">{children}</div>;
  }

  return (
    <div className="w-full min-h-screen bg-[#09090b] text-slate-100 flex flex-col">
      {/* Top Utility Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-brand-mint hover:border-brand-mint/40 transition-all duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Utilities</span>
          </Link>

          <span className="hidden sm:inline-block text-slate-700">|</span>

          <div className="hidden sm:inline-flex items-center gap-2 text-xs font-mono text-slate-400">
            <Sliders className="w-3.5 h-3.5 text-brand-mint" />
            <span className="bg-clip-text text-transparent font-bold" style={gradientStyle}>
              Developer Workspace Tool
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/workspace/utilitieshub"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-brand-mint" />
            <span>Workspace Hub</span>
          </Link>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="w-full flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
};

export default CodeStackLayout;

