'use client';

import React from 'react';
import Link from 'next/link';
import * as motion from 'motion/react-client';
import {
  Cpu,
  Wrench,
  Layers,
  Code2,
  Sparkles,
  ArrowUpRight,
  Terminal,
  Heart,
  Palette
} from 'lucide-react';

const LAB_EXPERIMENTS = [
  {
    id: 'workspace',
    title: 'Developer Workspace',
    category: 'Interactive Lab',
    desc: 'An all-in-one developer workspace featuring real-time code playgrounds, markdown editors, and live utilities.',
    badge: 'Live Sandbox',
    href: '/workspace',
    icon: <Cpu className="w-5 h-5" />,
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    accentColor: 'text-emerald-400',
    borderColor: 'hover:border-emerald-500/40'
  },
  {
    id: 'tools',
    title: 'Web Utilities & Tools',
    category: 'Productivity Suite',
    desc: 'Fast browser utilities including code formatters, CSS gradient generators, SVG tools, and regex builders.',
    badge: '15+ Utilities',
    href: '/tools',
    icon: <Wrench className="w-5 h-5" />,
    gradient: 'from-teal-500/20 via-cyan-500/10 to-transparent',
    accentColor: 'text-teal-400',
    borderColor: 'hover:border-teal-500/40'
  },
  {
    id: 'ui',
    title: 'UI Component Sandbox',
    category: 'Design System',
    desc: 'Modular, accessible UI components crafted with React 19, Tailwind CSS v4, and modern web animations.',
    badge: 'Component Kit',
    href: '/ui',
    icon: <Layers className="w-5 h-5" />,
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    accentColor: 'text-cyan-400',
    borderColor: 'hover:border-cyan-500/40'
  },
  {
    id: 'code-blocks',
    title: 'Production Code Blocks',
    category: 'Curated Snippets',
    desc: 'Battle-tested snippets for custom React hooks, layout primitives, API wrappers, and keyframe animations.',
    badge: 'Copy & Paste',
    href: '/code-blocks',
    icon: <Code2 className="w-5 h-5" />,
    gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    accentColor: 'text-indigo-400',
    borderColor: 'hover:border-indigo-500/40'
  },
  {
    id: 'style-guide',
    title: 'Design Style Guide',
    category: 'Visual Specs',
    desc: 'Interactive showcase of typography, color tokens, button states, and layout grid variables.',
    badge: 'Design System',
    href: '/style-guide',
    icon: <Palette className="w-5 h-5" />,
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    accentColor: 'text-amber-400',
    borderColor: 'hover:border-amber-500/40'
  },
  {
    id: 'valentine-app',
    title: 'Valentine Experience',
    category: 'Creative App',
    desc: 'An interactive micro-app featuring dynamic particle cursors, spatial audio, and playful UI interactions.',
    badge: 'Micro-app',
    href: '/valentine-app',
    icon: <Heart className="w-5 h-5" />,
    gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
    accentColor: 'text-rose-400',
    borderColor: 'hover:border-rose-500/40'
  }
];

export default function LabShowcaseSection() {
  return (
    <section id="lab" className="relative w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono mb-3">
            <Terminal size={13} />
            <span>INTERACTIVE PLAYGROUNDS & UTILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white">
            The Developer <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-teal-300 to-emerald-300">Lab</span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md">
          Beyond client projects, I build and maintain interactive web sandboxes, developer utilities, and reusable component libraries.
        </p>
      </div>

      {/* Grid of Lab Experiments */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {LAB_EXPERIMENTS.map(exp => (
          <Link
            key={exp.id}
            href={exp.href}
            className={`group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-zinc-900/50 border border-white/10 ${exp.borderColor} backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/5`}
          >
            {/* Top Ambient Highlight */}
            <div
              className={`absolute -top-24 -right-24 w-48 h-48 bg-linear-to-br ${exp.gradient} rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none`}
            />

            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-3 mb-5 relative z-10">
                <div
                  className={`w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${exp.accentColor} group-hover:scale-110 transition-transform`}
                >
                  {exp.icon}
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-white/5 text-slate-300 border border-white/5">
                  {exp.badge}
                </span>
              </div>

              {/* Title & Category */}
              <div className="relative z-10">
                <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${exp.accentColor}`}>
                  {exp.category}
                </span>
                <h3 className="text-xl font-bold font-display text-white group-hover:text-emerald-300 transition-colors mt-0.5 mb-2">
                  {exp.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {exp.desc}
                </p>
              </div>
            </div>

            {/* Bottom Action Row */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-white transition-colors relative z-10">
              <span className="font-mono text-[11px]">Explore Playground</span>
              <span className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-emerald-500 group-hover:text-black flex items-center justify-center transition-all">
                <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
