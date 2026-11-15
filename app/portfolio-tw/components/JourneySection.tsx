'use client';

import React, { useState, useMemo } from 'react';
import * as motion from 'motion/react-client';
import { Briefcase, GraduationCap, Sparkles, Building2, Calendar, Compass } from 'lucide-react';

interface RoleDetail {
  role?: string;
  duration?: string;
}

interface TimelineItem {
  id?: number;
  title: string;
  type?: 'experience' | 'education';
  roles?: RoleDetail[];
}

interface JourneySectionProps {
  timelineItems: TimelineItem[];
}

export default function JourneySection({ timelineItems }: JourneySectionProps) {
  const [journeyTab, setJourneyTab] = useState<'all' | 'experience' | 'education'>('all');

  const experienceList = useMemo(() => {
    return (timelineItems || [])
      .filter((item: any) => item.type === 'experience' || (!item.type && (item.id ?? 0) > 4))
      .slice()
      .reverse();
  }, [timelineItems]);

  const educationList = useMemo(() => {
    return (timelineItems || [])
      .filter((item: any) => item.type === 'education' || (!item.type && (item.id ?? 0) <= 4))
      .slice()
      .reverse();
  }, [timelineItems]);

  return (
    <section id="journey" className="relative w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-3">
            <Compass size={12} />
            <span>CAREER & ACADEMIA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white">
            The Journey <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-teal-300">So Far</span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md">
          A milestone timeline of my software engineering experience, freelance career, and educational accomplishments.
        </p>
      </div>

      {/* Top Controls: Filter Pills & Live Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-white/3 border border-white/10 backdrop-blur-md">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap" role="tablist">
          <button
            type="button"
            onClick={() => setJourneyTab('all')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              journeyTab === 'all'
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            <Sparkles size={14} />
            <span>All Tracks</span>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-black/20 text-white">
              {experienceList.length + educationList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setJourneyTab('experience')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              journeyTab === 'experience'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            <Briefcase size={14} />
            <span>Experience</span>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-black/20 text-current">
              {experienceList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setJourneyTab('education')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              journeyTab === 'education'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            <GraduationCap size={14} />
            <span>Education</span>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-black/20 text-current">
              {educationList.length}
            </span>
          </button>
        </div>

        {/* Live Beacon */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Active Frontend Dev & Scholar</span>
        </div>
      </div>

      {/* Grid Columns for Tracks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Experience Track */}
        {(journeyTab === 'all' || journeyTab === 'experience') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`flex flex-col p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-md ${
              journeyTab === 'experience' ? 'lg:col-span-2 max-w-3xl mx-auto w-full' : ''
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Briefcase size={18} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-white">Experience</h3>
                  <p className="text-xs text-slate-400">Professional work & engineering roles</p>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                {experienceList.length} Milestones
              </span>
            </div>

            {/* Timeline List */}
            <div className="space-y-6 relative pl-6 border-l border-white/10 ml-3">
              {experienceList.map(item => {
                const isItemActive = item.roles?.some(r => {
                  const dur = (r.duration || '').toLowerCase();
                  return dur.includes('now') || dur.includes('present');
                });

                return (
                  <div key={item.id ?? item.title} className="relative group">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-7.75 top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                        isItemActive
                          ? 'bg-emerald-500 border-black shadow-[0_0_12px_rgba(16,185,129,0.8)]'
                          : 'bg-zinc-800 border-slate-600 group-hover:border-emerald-400'
                      }`}
                    />

                    {/* Card */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/2 border border-white/5 hover:border-emerald-500/30 transition-all">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <Building2 size={16} className="text-emerald-400" />
                          <h4 className="text-base font-bold text-white">{item.title}</h4>
                        </div>
                        {isItemActive && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Active Role
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        {item.roles &&
                          item.roles.map((role, idx) => {
                            const isRoleCurrent =
                              (role.duration || '').toLowerCase().includes('now') ||
                              (role.duration || '').toLowerCase().includes('present');
                            return (
                              <div
                                key={idx}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm"
                              >
                                <span className="font-medium text-slate-300">{role.role}</span>
                                <span
                                  className={`inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-md ${
                                    isRoleCurrent
                                      ? 'text-emerald-400 bg-emerald-500/10'
                                      : 'text-slate-400 bg-white/5'
                                  }`}
                                >
                                  <Calendar size={11} />
                                  {role.duration}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Education Track */}
        {(journeyTab === 'all' || journeyTab === 'education') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`flex flex-col p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-md ${
              journeyTab === 'education' ? 'lg:col-span-2 max-w-3xl mx-auto w-full' : ''
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-white">Education</h3>
                  <p className="text-xs text-slate-400">Academic degrees & formal learning</p>
                </div>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                {educationList.length} Milestones
              </span>
            </div>

            {/* Timeline List */}
            <div className="space-y-6 relative pl-6 border-l border-white/10 ml-3">
              {educationList.map(item => {
                const isItemActive = item.roles?.some(r => {
                  const dur = (r.duration || '').toLowerCase();
                  return dur.includes('now') || dur.includes('present');
                });

                return (
                  <div key={item.id ?? item.title} className="relative group">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-7.75 top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                        isItemActive
                          ? 'bg-cyan-500 border-black shadow-[0_0_12px_rgba(6,182,212,0.8)]'
                          : 'bg-zinc-800 border-slate-600 group-hover:border-cyan-400'
                      }`}
                    />

                    {/* Card */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/2 border border-white/5 hover:border-cyan-500/30 transition-all">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <GraduationCap size={16} className="text-cyan-400" />
                          <h4 className="text-base font-bold text-white">{item.title}</h4>
                        </div>
                        {isItemActive && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            Pursuing
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        {item.roles &&
                          item.roles.map((role, idx) => {
                            const isRoleCurrent =
                              (role.duration || '').toLowerCase().includes('now') ||
                              (role.duration || '').toLowerCase().includes('present');
                            return (
                              <div
                                key={idx}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm"
                              >
                                <span className="font-medium text-slate-300">{role.role}</span>
                                <span
                                  className={`inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-md ${
                                    isRoleCurrent
                                      ? 'text-cyan-400 bg-cyan-500/10'
                                      : 'text-slate-400 bg-white/5'
                                  }`}
                                >
                                  <Calendar size={11} />
                                  {role.duration}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

