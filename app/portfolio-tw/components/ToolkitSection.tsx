'use client';

import React, { useState, useMemo } from 'react';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { Layers, Terminal, Sparkles, Code2, Palette, Cpu } from 'lucide-react';
import { renderIcon } from '@/app/components/portfolio/icons';

interface SkillItem {
  id: number;
  icon?: string;
  logo?: any;
  title: string;
}

interface ToolkitSectionProps {
  skills: SkillItem[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Stack' },
  { id: 'frontend', label: 'Frontend & Logic' },
  { id: 'styling', label: 'Styling & UI' },
  { id: 'tools', label: 'Workflow & Design' }
];

export default function ToolkitSection({ skills }: ToolkitSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('all');

  const getSkillCategory = (title: string): string => {
    const t = (title || '').toLowerCase();
    if (t.includes('tailwind') || t.includes('bootstrap') || t.includes('css')) {
      return 'styling';
    }
    if (t.includes('figma') || t.includes('adobe') || t.includes('git') || t.includes('github') || t.includes('vscode')) {
      return 'tools';
    }
    return 'frontend';
  };

  const filteredSkills = useMemo(() => {
    if (activeTab === 'all') return skills;
    return (skills || []).filter(s => {
      const cat = getSkillCategory(s.title);
      return cat === activeTab;
    });
  }, [skills, activeTab]);

  return (
    <section id="toolkit" className="relative w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-400 text-xs font-mono mb-3">
            <Layers size={13} />
            <span>CORE STACK & TOOLS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-300">Toolkit</span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md">
          Frameworks, libraries, tools, and design suites I leverage daily to engineer high-performance web applications.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
        {CATEGORIES.map(cat => {
          const isActive = activeTab === cat.id;
          const count = cat.id === 'all' ? skills.length : skills.filter(s => getSkillCategory(s.title) === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-teal-400 text-black shadow-lg shadow-teal-500/25'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${isActive ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-slate-400'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Modern Glass Card Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map(skill => {
            const iconName = skill.icon || (typeof skill.logo === 'string' ? skill.logo : undefined);
            const renderedLogo = typeof skill.logo === 'object' ? skill.logo : renderIcon(iconName);
            const category = getSkillCategory(skill.title);

            return (
              <motion.div
                layout
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative flex flex-col items-center justify-center p-5 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-emerald-500/40 backdrop-blur-md text-center transition-all duration-300 hover:bg-emerald-500/4 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5),0_0_20px_rgba(16,185,129,0.18)]"
              >
                {/* Micro Category Pill */}
                <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded text-[9px] font-mono uppercase text-slate-500 group-hover:text-emerald-400 transition-colors">
                  {category}
                </span>

                {/* Icon Container */}
                <div
                  className="w-12 h-12 mb-3 mt-2 flex items-center justify-center text-3xl text-emerald-400 group-hover:text-emerald-300 transition-all duration-300 group-hover:scale-115 drop-shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                  aria-hidden="true"
                >
                  {renderedLogo}
                </div>

                {/* Skill Name */}
                <p className="text-xs sm:text-sm font-semibold tracking-wide text-slate-200 group-hover:text-white transition-colors">
                  {skill.title}
                </p>

                {/* Subtle border bottom glow */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-400 transition-all duration-500" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
