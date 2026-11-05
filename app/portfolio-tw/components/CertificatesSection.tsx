'use client';

import React from 'react';
import * as motion from 'motion/react-client';
import { Award, ExternalLink } from 'lucide-react';
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
            <Award size={12} />
            <span>CREDENTIALS & COURSES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white">
            Continuous <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-emerald-300">Learning</span>
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
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
                className="group p-5 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-amber-500/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-2xl group-hover:scale-110 transition-transform">
                    {iconComponent}
                  </div>
                  <span className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-amber-500 group-hover:text-black text-slate-400 flex items-center justify-center transition-colors">
                    <ExternalLink size={14} />
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold font-display text-white group-hover:text-amber-300 transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 font-medium">Issued by: {item.organization}</p>
                </div>
              </a>
            );
          })}
      </motion.div>
    </section>
  );
}

