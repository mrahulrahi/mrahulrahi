'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import * as motion from 'motion/react-client';
import { User, Sparkles, MapPin, Code2, Copy, Check, FileCode, CheckCircle2 } from 'lucide-react';
import { renderIcon } from '@/app/components/portfolio/icons';

const CountUp = dynamic(() => import('react-countup'), { ssr: false });

interface StatItem {
  id: number;
  icon: any;
  countEnd: number;
  suffix: string;
  description: string;
}

interface AboutData {
  description?: string;
  stackPrefix?: string;
  stack?: string;
  resumeUrl?: string;
  resumeTitle?: string;
}

interface AboutSectionProps {
  about?: AboutData;
  stats?: StatItem[];
}

const TS_CODE_SNIPPET = `interface DeveloperProfile {
  name: string;
  role: string;
  experience: string;
  location: string;
  stack: string[];
  philosophies: string[];
  hireable: boolean;
}

export const rahulMaurya: DeveloperProfile = {
  name: "Rahul Maurya",
  role: "Frontend Developer & UI/UX Architect",
  experience: "3.5+ Years shipping web apps",
  location: "India (Remote / Worldwide)",
  stack: [
    "Next.js 16 (App Router)",
    "React 19 & TypeScript",
    "Tailwind CSS v4 & Modern CSS",
    "Framer Motion & Animations",
    "Node.js & MERN Stack"
  ],
  philosophies: [
    "Pixel-perfect visual fidelity",
    "Sub-100ms interaction latency",
    "Clean, maintainable architecture"
  ],
  hireable: true
};`;

export default function AboutSection({ about, stats }: AboutSectionProps) {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<'story' | 'code'>('story');
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(TS_CODE_SNIPPET);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="about" className="relative w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono mb-3">
            <User size={13} />
            <span>BIOGRAPHY & STATS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white">
            Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">The Code</span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md">
          A peek into my background, core engineering philosophy, and the tangible metrics from my development journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Bio & Interactive Code View Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-md relative overflow-hidden"
        >
          <div>
            {/* Tab Navigation Controls */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('story')}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'story'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white bg-white/5 border border-transparent'
                  }`}
                >
                  <User size={13} />
                  <span>Story & Mission</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('code')}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                    activeTab === 'code'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white bg-white/5 border border-transparent'
                  }`}
                >
                  <FileCode size={13} />
                  <span>developer.ts</span>
                </button>
              </div>

              {activeTab === 'code' ? (
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 hover:bg-emerald-500 hover:text-black text-slate-300 transition-colors"
                  title="Copy TypeScript snippet"
                >
                  {copiedCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Frontend Architect</span>
                </div>
              )}
            </div>

            {/* Tab 1: Story / Narrative View */}
            {activeTab === 'story' ? (
              <div className="space-y-6">
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {about?.description ||
                    "I am a front-end web developer whose life's passion is Technology and I also love to click photographs. I can provide clean code and pixel perfect design. I also make the website responsive & more interactive with web animations."}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-200">
                    <span className="text-slate-400">{about?.stackPrefix || 'Primary Stack:'}</span>
                    <span className="font-bold text-emerald-400">{about?.stack || 'MERN Stack & Next.js'}</span>
                  </div>

                  <span className="px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-mono text-slate-300">
                    ⚡ 80+ Projects Delivered
                  </span>
                </div>
              </div>
            ) : (
              /* Tab 2: Interactive Code Snippet */
              <div className="rounded-2xl bg-black/60 border border-white/10 p-4 font-mono text-xs overflow-x-auto">
                <div className="flex items-center gap-1.5 pb-3 mb-3 border-b border-white/5 text-[11px] text-slate-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-400">src/developer/rahulMaurya.ts</span>
                </div>
                <pre className="text-slate-300 leading-relaxed font-mono">
                  <code>{TS_CODE_SNIPPET}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Marquee Ticker */}
          <div className="mt-8 pt-6 border-t border-white/5 overflow-hidden">
            <div className="animate-marquee flex gap-8 whitespace-nowrap select-none opacity-80 text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-2">🧠 Turning ideas into interactive interfaces</span>
              <span className="text-emerald-400">•</span>
              <span className="flex items-center gap-2">🎯 Let’s create something amazing together</span>
              <span className="text-emerald-400">•</span>
              <span className="flex items-center gap-2">⚡ Clean, modular & responsive architecture</span>
              <span className="text-emerald-400">•</span>
              <span className="flex items-center gap-2">🧠 Turning ideas into interactive interfaces</span>
              <span className="text-emerald-400">•</span>
              <span className="flex items-center gap-2">🎯 Let’s create something amazing together</span>
              <span className="text-emerald-400">•</span>
              <span className="flex items-center gap-2">⚡ Clean, modular & responsive architecture</span>
              <span className="text-emerald-400">•</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Profile Photo Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-md relative group overflow-hidden"
        >
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-emerald-500/40 via-teal-500/20 to-transparent shadow-2xl shadow-emerald-500/10">
            <Image
              src="/rahi.webp"
              alt="Rahul Maurya"
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-lg font-bold font-display text-white">Rahul Maurya</h3>
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-1 font-mono">
              <MapPin size={12} className="text-emerald-400" />
              <span>India</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Available for Work</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom: Stats Numbers Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-12 p-6 sm:p-8 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                The Edge I Bring
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">By the Numbers</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats &&
              stats.map(stat => {
                const renderedIcon = typeof stat.icon === 'object' ? stat.icon : renderIcon(stat.icon);
                return (
                  <div
                    key={stat.id}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all hover:-translate-y-1 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg mb-3 group-hover:scale-110 transition-transform">
                      {renderedIcon}
                    </div>

                    <div className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                      {isClient ? (
                        <CountUp start={0} end={stat.countEnd} duration={3} suffix={stat.suffix} decimals={stat.countEnd % 1 !== 0 ? 1 : 0} />
                      ) : (
                        <span>0{stat.suffix}</span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 mt-1 font-medium">{stat.description}</p>
                  </div>
                );
              })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
