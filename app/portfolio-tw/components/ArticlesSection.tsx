'use client';

import React from 'react';
import Image from 'next/image';
import * as motion from 'motion/react-client';
import { BookOpen, Heart, Calendar, ExternalLink, ArrowRight } from 'lucide-react';
import { DevArticle } from '@/app/utils/getArticles';

interface ArticlesSectionProps {
  articles: DevArticle[];
}

export default function ArticlesSection({ articles }: ArticlesSectionProps) {
  const displayArticles = (articles || []).slice(0, 6);

  return (
    <section id="articles" className="relative w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-3">
            <BookOpen size={12} />
            <span>DEV.TO WRITINGS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white">
            Articles & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-300">Insights</span>
          </h2>
        </div>
        <a
          href="https://dev.to/mrahulrahi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 font-mono transition-colors"
        >
          <span>View all on Dev.to</span>
          <ArrowRight size={14} />
        </a>
      </div>

      {displayArticles.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white/[0.02] border border-white/5 text-center text-slate-400 text-sm">
          No articles published yet. Check back soon!
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayArticles.map(article => {
            const fallbackCover = `https://placehold.co/800x400/18181b/10b981?text=${encodeURIComponent(
              article.title
            )}`;
            const dateStr = article.published_at ? article.published_at.slice(0, 10).split('-').reverse().join('/') : '';

            return (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-purple-500/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                {/* Cover Image */}
                <div className="relative w-full aspect-[16/9] bg-black/40 overflow-hidden border-b border-white/5">
                  <Image
                    src={article.cover_image || fallbackCover}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-5 sm:p-6">
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-purple-300 transition-colors line-clamp-2 mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {article.description}
                  </p>

                  {/* Meta Footer */}
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-1.5 text-rose-400/90">
                      <Heart size={14} className="fill-rose-400/20" />
                      <span>{article.public_reactions_count || 0}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Calendar size={13} />
                      <span>{dateStr}</span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}

