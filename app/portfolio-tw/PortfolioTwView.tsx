'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X, ArrowUp, MessageSquare, Sparkles, Search } from "lucide-react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import ToolkitSection from './components/ToolkitSection';
import AboutSection from './components/AboutSection';
import LabShowcaseSection from './components/LabShowcaseSection';
import JourneySection from './components/JourneySection';
import CertificatesSection from './components/CertificatesSection';
import InterestsSection from './components/InterestsSection';
import ArticlesSection from './components/ArticlesSection';
import FooterSection from './components/FooterSection';
import { DevArticle } from '@/app/utils/getArticles';

interface PortfolioTwViewProps {
  initialPortfolioData: any;
  initialArticles: DevArticle[];
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Hero' },
  { id: 'projects', label: 'Projects' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'about', label: 'About' },
  { id: 'lab', label: 'Lab' },
  { id: 'journey', label: 'Journey' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'articles', label: 'Articles' },
  { id: 'contact', label: 'Contact' },
];

export default function PortfolioTwView({
  initialPortfolioData,
  initialArticles,
}: PortfolioTwViewProps) {
  const { hero, about, projectsCards, skills, stats, timelineItems, certificates, interest } =
    initialPortfolioData || {};

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showFloatingActions, setShowFloatingActions] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall scroll progress (0 to 100)
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);

      // Show floating back-to-top after scrolling down 400px
      setShowFloatingActions(window.scrollY > 400);

      // Active Section Spy
      const sectionElements = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#09090b] text-slate-100 flex flex-col selection:bg-emerald-400 selection:text-black">
      {/* Subtle Engineered Dot Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-size-[24px_24px] z-0"
        aria-hidden="true"
      />

      {/* Interactive Ambient Cursor Spotlight */}
      <div
        className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300 opacity-60 hidden md:block"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(17, 212, 134, 0.05), transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-transparent z-60 pointer-events-none">
        <div
          className="h-full bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 transition-all duration-75 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ========================================================
          1. NAVIGATION HEADER (Pure Tailwind + Active Scrollspy)
         ======================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/85 backdrop-blur-2xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link href="/portfolio-tw" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-xl bg-linear-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-black text-xs shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
              R
            </span>
            <span className="font-display font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              Rahul Maurya
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Tailwind v4
            </span>
          </Link>

          {/* Desktop Nav Links with Active State */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
            {NAV_ITEMS.map(item => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  type="button"
                  className={`px-3 py-1.5 rounded-full transition-all ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Command Palette Trigger Button */}
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(
                    new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true, bubbles: true })
                  );
                }
              }}
              type="button"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer"
              title="Open Command Search (Ctrl+K or ⌘K)"
              aria-label="Open Command Search"
            >
              <Search size={13} className="text-emerald-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-slate-300 font-semibold border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Quick Switch to Original Bootstrap */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:border-emerald-500/40"
              title="View original Bootstrap version"
            >
              <span className="hidden sm:inline">Bootstrap Version</span>
              <span className="sm:hidden">Original</span>
              <ArrowUpRight size={13} />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="lg:hidden w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-emerald-500/40 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-b border-white/10 bg-[#09090b]/95 backdrop-blur-2xl px-4 py-6 overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-2 mb-6">
                {NAV_ITEMS.map(item => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      type="button"
                      className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'text-slate-300 bg-white/2 border border-white/5 hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">Rahul Maurya • Portfolio</span>
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition-colors"
                >
                  <Sparkles size={13} />
                  <span>Let's Talk</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ========================================================
          2. HERO SECTION
         ======================================================== */}
      <div id="hero" className="relative z-10">
        <HeroSection hero={hero} resumeUrl={about?.resumeUrl} />
      </div>

      {/* ========================================================
          3. MAIN PORTFOLIO SECTIONS
         ======================================================== */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-36">
        {/* Section 2: Projects Showcase */}
        <ProjectsSection projects={projectsCards || []} />

        {/* Section 3: The Toolkit (Skills) */}
        <ToolkitSection skills={skills || []} />

        {/* Section 4: About Me & Stats */}
        <AboutSection about={about} stats={stats || []} />

        {/* Section 5: The Developer Lab (Interactive Playgrounds & Tools) */}
        <LabShowcaseSection />

        {/* Section 6: The Journey So Far (Timeline) */}
        <JourneySection timelineItems={timelineItems || []} />

        {/* Section 6: Continuous Learning (Certificates) */}
        <CertificatesSection certificates={certificates || []} />

        {/* Section 7: Beyond the Code (Interests) */}
        {interest && interest.length > 0 && <InterestsSection interest={interest} />}

        {/* Section 8: Articles & Insights */}
        <ArticlesSection articles={initialArticles || []} />
      </main>

      {/* ========================================================
          4. FOOTER & CONTACT
         ======================================================== */}
      <div className="relative z-10">
        <FooterSection />
      </div>

      {/* ========================================================
          5. FLOATING QUICK JUMP PILL (Bottom Right)
         ======================================================== */}
      <AnimatePresence>
        {showFloatingActions && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl shadow-2xl"
          >
            <button
              onClick={() => handleNavClick('contact')}
              type="button"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all hover:scale-105"
              title="Jump to Contact"
            >
              <MessageSquare size={14} />
              <span className="hidden sm:inline">Message</span>
            </button>

            <button
              onClick={scrollToTop}
              type="button"
              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors hover:scale-105"
              title="Back to Top"
            >
              <ArrowUp size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
