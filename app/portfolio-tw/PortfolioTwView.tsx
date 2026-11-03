'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Code2, Layers, User, Award, BookOpen, Compass, ArrowUpRight } from "lucide-react";
import HeroSection from './components/HeroSection';
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
    <div className="relative min-h-screen bg-[#09090b] text-slate-100 flex flex-col">
      {/* ========================================================
          1. NAVIGATION HEADER (Pure Tailwind)
         ======================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/portfolio-tw" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-linear-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-black text-sm shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
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
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400 font-medium">
            <a href="#hero" className="hover:text-emerald-400 transition-colors">Hero</a>
            <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>
            <a href="#toolkit" className="hover:text-emerald-400 transition-colors">Toolkit</a>
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#journey" className="hover:text-emerald-400 transition-colors">Journey</a>
            <a href="#articles" className="hover:text-emerald-400 transition-colors">Articles</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:border-emerald-500/40"
              title="View original Bootstrap version"
            >
              <span>Original (Bootstrap)</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================
          2. HERO SECTION (Converted to Pure Tailwind)
         ======================================================== */}
      <div id="hero">
        <HeroSection hero={hero} resumeUrl={about?.resumeUrl} />
      </div>

      {/* ========================================================
          3. UPCOMING SECTIONS (Ready for your Tailwind conversion)
         ======================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Section 2: Projects Showcase */}
        <section id="projects" className="relative p-8 sm:p-12 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Code2 size={20} />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">Section 02</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Creative Showcase (Projects)</h2>
            </div>
          </div>
          <p className="text-slate-400 text-sm max-w-2xl mb-6">
            Filter tabs and project cards ({projectsCards?.length || 0} projects loaded). Ready for you to build with responsive CSS grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
          </p>
          <div className="p-6 rounded-2xl border border-dashed border-white/10 text-center text-slate-500 text-xs font-mono">
            {`<!-- Add your ProjectFilterSection & ProjectCard Tailwind implementation here -->`}
          </div>
        </section>

        {/* Section 3: The Toolkit (Skills) */}
        <section id="toolkit" className="relative p-8 sm:p-12 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Layers size={20} />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-teal-400">Section 03</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">The Toolkit (Skills)</h2>
            </div>
          </div>
          <p className="text-slate-400 text-sm max-w-2xl mb-6">
            Technical skills ({skills?.length || 0} skills loaded). Ready for you to build with `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4`.
          </p>
          <div className="p-6 rounded-2xl border border-dashed border-white/10 text-center text-slate-500 text-xs font-mono">
            {`<!-- Add your SkillCard Tailwind implementation here -->`}
          </div>
        </section>

        {/* Section 4: About Me & Stats */}
        <section id="about" className="relative p-8 sm:p-12 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <User size={20} />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">Section 04</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">About Me & Stats</h2>
            </div>
          </div>
          <p className="text-slate-400 text-sm max-w-2xl mb-6">
            Bio, profile photo, and stats list ({stats?.length || 0} stats loaded). Ready for `grid grid-cols-1 lg:grid-cols-12 gap-8`.
          </p>
          <div className="p-6 rounded-2xl border border-dashed border-white/10 text-center text-slate-500 text-xs font-mono">
            {`<!-- Add your About text, photo & StatCard Tailwind implementation here -->`}
          </div>
        </section>

        {/* Section 5: The Journey So Far */}
        <section id="journey" className="relative p-8 sm:p-12 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Compass size={20} />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400">Section 05</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">The Journey So Far</h2>
            </div>
          </div>
          <p className="text-slate-400 text-sm max-w-2xl mb-6">
            Filter pills (All, Experience, Education) and timeline cards ({timelineItems?.length || 0} milestones).
          </p>
          <div className="p-6 rounded-2xl border border-dashed border-white/10 text-center text-slate-500 text-xs font-mono">
            {`<!-- Add your Journey timeline Tailwind implementation here -->`}
          </div>
        </section>

        {/* Section 6: Continuous Learning */}
        <section id="certificates" className="relative p-8 sm:p-12 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Award size={20} />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">Section 06</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Continuous Learning (Certificates)</h2>
            </div>
          </div>
          <p className="text-slate-400 text-sm max-w-2xl mb-6">
            Certificates and accreditations ({certificates?.length || 0} certificates loaded).
          </p>
          <div className="p-6 rounded-2xl border border-dashed border-white/10 text-center text-slate-500 text-xs font-mono">
            {`<!-- Add your CertificateCard Tailwind implementation here -->`}
          </div>
        </section>

        {/* Section 7: Articles & Insights */}
        <section id="articles" className="relative p-8 sm:p-12 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <BookOpen size={20} />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-400">Section 07</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Articles & Insights</h2>
            </div>
          </div>
          <p className="text-slate-400 text-sm max-w-2xl mb-6">
            Dev.to blog articles ({initialArticles?.length || 0} articles loaded).
          </p>
          <div className="p-6 rounded-2xl border border-dashed border-white/10 text-center text-slate-500 text-xs font-mono">
            {`<!-- Add your Articles slider or grid Tailwind implementation here -->`}
          </div>
        </section>
      </main>

      {/* ========================================================
          4. FOOTER (Pure Tailwind)
         ======================================================== */}
      <footer className="mt-20 border-t border-white/5 bg-[#09090b]/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Rahul Maurya. Built with Next.js & Tailwind CSS.</p>
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

