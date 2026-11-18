'use client';

import React from 'react';
import * as motion from 'motion/react-client';
import { Award, ExternalLink, CheckCircle2 } from 'lucide-react';
import { renderIcon } from '@/app/components/portfolio/icons';

interface CertificateItem {
  id: number;
  url: string;
  title: string;
  organization: string;
  icon?: string;
}

interface CertificatesSectionProps {
  certificates: CertificateItem[];
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
  return (
    <section id="certificates" className="relative w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-mono mb-3">
            <Award size={13} />
            <span>CREDENTIALS & COURSES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white">
            Continuous <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-orange-300 to-emerald-300">Learning</span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md">
          Formal credentials, industry programs, and certifications completed to broaden technical depth.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {certificates &&
          certificates.map(item => {
            const iconComponent = item.icon ? renderIcon(item.icon) : <Award size={24} />;
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-3xl bg-zinc-900/50 border border-white/10 hover:border-amber-500/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-2xl group-hover:scale-110 transition-transform">
                    {iconComponent}
                  </div>
                  <span className="w-8 h-8 rounded-xl bg-white/5 group-hover:bg-amber-400 group-hover:text-black text-slate-400 flex items-center justify-center transition-all">
                    <ExternalLink size={14} />
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold font-display text-white group-hover:text-amber-300 transition-colors mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-white/5">
                    <span>{item.organization}</span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                      <CheckCircle2 size={12} />
                      <span>Verified</span>
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
      </motion.div>
    </section>
  );
}
