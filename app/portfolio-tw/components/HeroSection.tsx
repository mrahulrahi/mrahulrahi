'use client';

import React from 'react';
import Image from 'next/image';
import * as motion from "motion/react-client";
import { ArrowDown, Sparkles } from "lucide-react";

interface HeroData {
  hey?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
}

interface HeroSectionProps {
  hero?: HeroData;
  resumeUrl?: string;
}

export default function HeroSection({ hero, resumeUrl }: HeroSectionProps) {
  const hey = hero?.hey || "Hey! ✌️ I'm";
  const firstName = hero?.firstName || "Rahul";
  const lastName = hero?.lastName || "Maurya";
  const role = hero?.role || "Frontend Developer";
  const location = hero?.location || "[ India ]";
  const description =
    hero?.description ||
    "I craft beautiful and functional websites using HTML, CSS, JavaScript, and React — blending design precision with code clarity to build seamless user experiences.";

  const heyWords = hey.split(" ");
  const heyHighlight = heyWords[0];
  const heyRest = heyWords.slice(1).join(" ");

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-32">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-87.5 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 w-100 h-62.5 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Floating Decorative Tech Icons */}
      <div className="absolute inset-0 max-w-5xl mx-auto pointer-events-none hidden md:block" aria-hidden="true">
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-28 left-8 lg:left-16 w-14 h-14 p-3 rounded-2xl bg-[#ff6c39]/15 border border-[#ff6c39]/30 backdrop-blur-md shadow-lg"
        >
          <Image src="/html-5.png" alt="HTML5" width={40} height={40} className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-40 left-12 lg:left-24 w-14 h-14 p-3 rounded-2xl bg-[#2965f1]/15 border border-[#2965f1]/30 backdrop-blur-md shadow-lg"
        >
          <Image src="/css-3.png" alt="CSS3" width={40} height={40} className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-24 right-8 lg:right-16 w-14 h-14 p-3 rounded-2xl bg-[#ffd814]/15 border border-[#ffd814]/30 backdrop-blur-md shadow-lg"
        >
          <Image src="/java.png" alt="JavaScript" width={40} height={40} className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-44 right-12 lg:right-24 w-14 h-14 p-3 rounded-2xl bg-[#5ed3f3]/15 border border-[#5ed3f3]/30 backdrop-blur-md shadow-lg"
        >
          <Image src="/react.png" alt="React" width={40} height={40} className="w-full h-full object-contain" />
        </motion.div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Live Availability Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-emerald-500/10 border border-emerald-500/25 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all hover:bg-emerald-500/15">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-emerald-400 tracking-wide">
              Available for Freelance & Full-Time Roles
            </span>
          </div>

          {/* Avatar with Radiant Glow Ring */}
          <div className="relative mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-linear-to-tr from-emerald-500/30 to-teal-400/20 blur-md transform scale-110" />
            <div className="relative w-28 h-28 rounded-full p-1 bg-linear-to-tr from-emerald-500 to-teal-400 shadow-[0_0_25px_rgba(16,185,129,0.35)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900">
                <Image
                  src={hero?.imageUrl || "/hero-img.jpg"}
                  alt={`${firstName} ${lastName}`}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Hero Typography */}
          <p className="text-sm sm:text-base font-medium text-slate-400 mb-2">
            <span className="text-emerald-400 font-semibold">{heyHighlight}</span> {heyRest}
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-2 font-display">
            {firstName} <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-200">{lastName}</span>
          </h1>

          <h2 className="text-lg sm:text-2xl font-semibold text-slate-300 mb-4">
            {role} <span className="text-emerald-400/80 font-mono text-base sm:text-lg">{location}</span>
          </h2>

          {/* Specialty Tags */}
          <div className="flex flex-wrap justify-center gap-2 my-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-slate-300 backdrop-blur-sm hover:border-emerald-500/40 transition-colors">
              ⚡ Next.js & React
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-slate-300 backdrop-blur-sm hover:border-emerald-500/40 transition-colors">
              🎨 Pixel-Perfect UI/UX
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-slate-300 backdrop-blur-sm hover:border-emerald-500/40 transition-colors">
              🚀 MERN Stack
            </span>
          </div>

          {/* Description */}
          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed mt-2 mb-8">
            {description}
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href="#portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-black bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
            >
              <Sparkles size={16} />
              <span>Creative Showcase</span>
              <ArrowDown size={16} />
            </a>
            <a
              href={resumeUrl || "https://flowcv.com/resume/29mh2gwpwu"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md transition-all hover:-translate-y-0.5"
            >
              <span>Download Resume</span>
              <ArrowDown size={16} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Subtle Marquee Footer Text */}
      <div className="absolute bottom-4 left-0 right-0 overflow-hidden opacity-10 pointer-events-none select-none">
        <div className="whitespace-nowrap flex gap-12 text-6xl md:text-8xl font-black uppercase tracking-widest text-emerald-400">
          <span>REACT</span>
          <span>•</span>
          <span>NEXT.JS</span>
          <span>•</span>
          <span>TYPESCRIPT</span>
          <span>•</span>
          <span>TAILWIND CSS</span>
          <span>•</span>
          <span>NODE.JS</span>
        </div>
      </div>
    </section>
  );
}

