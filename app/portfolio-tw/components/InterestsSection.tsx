'use client';

import React from 'react';
import Image from 'next/image';
import * as motion from 'motion/react-client';
import { Camera, ExternalLink, Sparkles, Youtube } from 'lucide-react';
import { renderIcon } from '@/app/components/portfolio/icons';

interface InterestSubItem {
  label: string;
  icon: string;
}

interface InterestItem {
  id: number;
  title: string;
  desc: string;
  url: string;
  imgUrl: string;
  items?: InterestSubItem[];
  createdBy?: string;
}

interface InterestsSectionProps {
  interest: InterestItem[];
}

export default function InterestsSection({ interest }: InterestsSectionProps) {
  return (
    <section id="sideHustle" className="relative w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono mb-3">
            <Camera size={12} />
            <span>CREATIVE PURSUITS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white">
            Beyond <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-rose-300">The Code</span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md">
          Visual photography portfolios, YouTube channels, and content creation side-projects.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {interest &&
          interest.map(item => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-white/10 hover:border-pink-500/40 backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-500/10"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden p-2 bg-white/5 border border-white/10 group-hover:border-pink-500/30 transition-colors">
                    <Image
                      src={item.imgUrl}
                      alt={item.title}
                      width={56}
                      height={56}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="w-9 h-9 rounded-xl bg-white/5 group-hover:bg-pink-500 group-hover:text-black text-slate-300 flex items-center justify-center transition-colors">
                    <ExternalLink size={16} />
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-display text-white group-hover:text-pink-300 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">{item.desc}</p>
              </div>

              {/* Sub-item pills */}
              <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-white/5">
                {item.items &&
                  item.items.map((sub, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/5 text-slate-300 border border-white/5"
                    >
                      {sub.icon && <span className="text-pink-400">{renderIcon(sub.icon)}</span>}
                      <span>{sub.label}</span>
                    </span>
                  ))}
              </div>
            </a>
          ))}
      </motion.div>
    </section>
  );
}

