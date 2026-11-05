'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { Search, X, ExternalLink, Github, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { getIconComponent } from '@/app/components/portfolio/icons';

export interface ProjectItem {
  id: number;
  label: string;
  title: string;
  imgUrl: string;
  gitHubUrl: string;
  liveUrl: string;
  para: string;
  technologies?: string[];
}

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All Projects' },
  { id: 'nextjs', label: 'Next.js & React' },
  { id: 'web', label: 'Web & UI/UX' },
  { id: 'business', label: 'Business & Apps' }
];

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const matchesCategory = (project: ProjectItem, categoryId: string): boolean => {
    if (categoryId === 'all') return true;
    const label = (project.label || '').toLowerCase();
    const title = (project.title || '').toLowerCase();
    const para = (project.para || '').toLowerCase();
    const tech = (project.technologies || []).map(t => t.toLowerCase()).join(' ');

    if (categoryId === 'nextjs') {
      return (
        tech.includes('next') ||
        tech.includes('react') ||
        label.includes('next') ||
        label.includes('react') ||
        para.includes('next.js') ||
        para.includes('react')
      );
    }
    if (categoryId === 'web') {
      return (
        label.includes('web') ||
        label.includes('design') ||
        label.includes('portfolio') ||
        para.includes('web') ||
        para.includes('portfolio') ||
        para.includes('responsive')
      );
    }
    if (categoryId === 'business') {
      return (
        label.includes('business') ||
        label.includes('app') ||
        label.includes('slicemypage') ||
        title.includes('nts') ||
        title.includes('soul') ||
        title.includes('projects done') ||
        para.includes('business') ||
        para.includes('client') ||
        para.includes('delivered')
      );
    }
    return true;
  };

  const matchesSearch = (project: ProjectItem, query: string): boolean => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    const title = (project.title || '').toLowerCase();
    const label = (project.label || '').toLowerCase();
    const para = (project.para || '').toLowerCase();
    const tech = (project.technologies || []).map(t => t.toLowerCase()).join(' ');
    return title.includes(q) || label.includes(q) || para.includes(q) || tech.includes(q);
  };

  const tabCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    CATEGORY_TABS.forEach(tab => {
      counts[tab.id] = (projects || []).filter(p => matchesCategory(p, tab.id)).length;
    });
    return counts;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return (projects || []).filter(
      p => matchesCategory(p, activeCategory) && matchesSearch(p, searchQuery)
    );
  }, [projects, activeCategory, searchQuery]);

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
  };

  return (
    <section id="projects" className="relative w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <Sparkles size={12} />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white">
            Crafted With <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Code</span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md">
          A curated selection of modern web applications, responsive client websites, and interactive interfaces.
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none" role="tablist">
            {CATEGORY_TABS.map(tab => {
              const isActive = activeCategory === tab.id;
              const count = tabCounts[tab.id] || 0;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  type="button"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                      isActive ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Live Filter Summary */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 font-mono">
            <span>Showing</span>
            <span className="font-bold text-emerald-400">{filteredProjects.length}</span>
            <span>of {projects.length} featured builds</span>
          </div>

          {(activeCategory !== 'all' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-emerald-400 hover:text-emerald-300 hover:underline font-medium transition-colors"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map(card => {
            const techList = card.technologies || [];
            return (
              <motion.div
                layout
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="group relative flex flex-col rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-emerald-500/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                {/* Browser-style Header Bar & Image */}
                <div className="relative w-full aspect-[16/10] bg-black/40 overflow-hidden border-b border-white/5">
                  <div className="absolute top-2.5 right-3 z-10 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/50 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-red-500/80" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  </div>
                  <Image
                    src={card.imgUrl}
                    alt={card.title || 'Project preview'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                </div>

                {/* Card Content */}
                <div className="flex-1 flex flex-col p-5 sm:p-6">
                  {/* Category Chip */}
                  <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-emerald-400 mb-2">
                    {card.label}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                    {card.para}
                  </p>

                  {/* Tools / Tech Badges */}
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {techList.slice(0, 4).map((tech, idx) => {
                        const Icon = getIconComponent(tech);
                        return Icon ? (
                          <span
                            key={idx}
                            title={tech}
                            className="w-7 h-7 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-emerald-400 text-sm hover:scale-110 transition-transform"
                          >
                            <Icon />
                          </span>
                        ) : null;
                      })}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-2">
                      {card.gitHubUrl && (
                        <a
                          href={card.gitHubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${card.title} source code on GitHub`}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                        >
                          <Github size={15} />
                        </a>
                      )}
                      <a
                        href={card.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/20 hover:border-emerald-500 transition-all"
                      >
                        <span>Demo</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="p-12 rounded-3xl bg-white/[0.02] border border-white/5 text-center mt-6">
          <div className="w-12 h-12 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-2xl mb-3">
            🔍
          </div>
          <h4 className="text-lg font-bold text-white mb-1">No matching projects</h4>
          <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto mb-4">
            No projects matched "{searchQuery}" in this category. Try clearing your search or switching categories.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}

