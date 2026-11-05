'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from "lucide-react";
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import ToolkitSection from './components/ToolkitSection';
import AboutSection from './components/AboutSection';
import JourneySection from './components/JourneySection';
import CertificatesSection from './components/CertificatesSection';
import InterestsSection from './components/InterestsSection';
import ArticlesSection from './components/ArticlesSection';
import { DevArticle } from '@/app/utils/getArticles';

interface PortfolioTwViewProps {
  initialPortfolioData: any;
  initialArticles: DevArticle[];
}

export default function PortfolioTwView({
  initialPortfolioData,
  initialArticles,
}: PortfolioTwViewProps) {
  const { hero, about, projectsCards, skills, stats, timelineItems, certificates, interest } =
    initialPortfolioData || {};

  return (
    <div className="relative min-h-screen bg-[#09090b] text-slate-100 flex flex-col selection:bg-emerald-400 selection:text-black">
      {/* ========================================================
          1. NAVIGATION HEADER (Pure Tailwind)
         ======================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/portfolio-tw" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-black text-sm shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              R
            </span>
            <span className="font-display font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              Rahul Maurya
            </span>
            <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Tailwind
            </span>
          </Link>

          {/* Quick Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm text-slate-400 font-medium">
            <a href="#hero" className="hover:text-emerald-400 transition-colors">Hero</a>
            <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>
            <a href="#toolkit" className="hover:text-emerald-400 transition-colors">Toolkit</a>
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#journey" className="hover:text-emerald-400 transition-colors">Journey</a>
            <a href="#certificates" className="hover:text-emerald-400 transition-colors">Certificates</a>
            <a href="#articles" className="hover:text-emerald-400 transition-colors">Articles</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:border-emerald-500/40"
              title="View original Bootstrap version"
            >
              <span>Bootstrap Version</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================
          2. HERO SECTION
         ======================================================== */}
      <div id="hero">
        <HeroSection hero={hero} resumeUrl={about?.resumeUrl} />
      </div>

      {/* ========================================================
          3. MAIN PORTFOLIO SECTIONS (Converted to Pure Tailwind)
         ======================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-32">
        {/* Section 2: Projects Showcase */}
        <ProjectsSection projects={projectsCards || []} />

        {/* Section 3: The Toolkit (Skills) */}
        <ToolkitSection skills={skills || []} />

        {/* Section 4: About Me & Stats */}
        <AboutSection about={about} stats={stats || []} />

        {/* Section 5: The Journey So Far (Timeline) */}
        <JourneySection timelineItems={timelineItems || []} />

        {/* Section 6: Continuous Learning (Certificates) */}
        <CertificatesSection certificates={certificates || []} />

        {/* Section 7: Beyond the Code (Interests) */}
        {interest && interest.length > 0 && <InterestsSection interest={interest} />}

        {/* Section 8: Articles & Insights */}
        <ArticlesSection articles={initialArticles || []} />
      </main>

      {/* ========================================================
          4. FOOTER (Pure Tailwind)
         ======================================================== */}
      <footer className="mt-20 border-t border-white/5 bg-[#09090b]/80 backdrop-blur-md py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Rahul Maurya. Engineered with Next.js & Pure Tailwind CSS.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/mrahulrahi" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/in/mrahulrahi" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
              LinkedIn
            </a>
            <a href="https://youtube.com/@fireliquidator" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
