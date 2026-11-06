'use client';

import React from 'react';
import * as motion from 'motion/react-client';
import { Layers, Terminal } from 'lucide-react';
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

export default function ToolkitSection({ skills }: ToolkitSectionProps) {
  return (
    <section id="toolkit" className="relative w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono mb-3">
            <Layers size={12} />
            <span>CORE STACK & TOOLS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white">
            The <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-300">Toolkit</span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md">
          Frameworks, libraries, databases, and developer utilities I work with every day to engineer clean web experiences.
        </p>
      </div>

      {/* Modern Glass Card Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
      >
        {skills &&
          skills.map(skill => {
            const iconName = skill.icon || (typeof skill.logo === 'string' ? skill.logo : undefined);
            const renderedLogo = typeof skill.logo === 'object' ? skill.logo : renderIcon(iconName);

            return (
              <motion.div
                key={skill.id}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="group relative flex flex-col items-center justify-center p-5 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-emerald-500/40 backdrop-blur-md text-center transition-all duration-300 hover:bg-emerald-500/4 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5),0_0_20px_rgba(16,185,129,0.15)]"
              >
                {/* Icon Container */}
                <div
                  className="w-12 h-12 mb-3 flex items-center justify-center text-3xl text-emerald-400 group-hover:text-emerald-300 transition-all duration-300 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                  aria-hidden="true"
                >
                  {renderedLogo}
                </div>

                {/* Skill Name */}
                <p className="text-xs sm:text-sm font-semibold tracking-wide text-slate-200 group-hover:text-white transition-colors">
                  {skill.title}
                </p>

                {/* Subtle border shine effect */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-500/50 transition-all duration-500" />
              </motion.div>
            );
          })}
      </motion.div>
    </section>
  );
}

