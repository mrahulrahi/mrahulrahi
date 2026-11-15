'use client';

import React from 'react';
import Image from 'next/image';
import * as motion from "motion/react-client";
import { ArrowDown, Sparkles, Terminal, Code2, Download } from "lucide-react";

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

  const marqueeWords = [
    "REACT",
    "NEXT.JS 16",
    "TYPESCRIPT",
    "TAILWIND CSS V4",
    "NODE.JS",
    "MERN STACK",
    "UI/UX ARCHITECTURE",
    "MOTION ANIMATIONS"
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-28">
      {/* Dynamic Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[400px] h-[250px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Floating Decorative Tech Badges */}
      <div className="absolute inset-0 max-w-5xl mx-auto pointer-events-none hidden md:block" aria-hidden="true">
        {/* HTML5 */}
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-28 left-8 lg:left-14 w-14 h-14 p-3 rounded-2xl bg-[#ff6c39]/15 border border-[#ff6c39]/30 backdrop-blur-md shadow-xl flex items-center justify-center group"
          title="HTML5"
        >
          <Image src="/html-5.png" alt="HTML5" width={38} height={38} className="w-full h-full object-contain" />
        </motion.div>

        {/* CSS3 */}
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [2, -2, 2] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="absolute bottom-36 left-12 lg:left-20 w-14 h-14 p-3 rounded-2xl bg-[#2965f1]/15 border border-[#2965f1]/30 backdrop-blur-md shadow-xl flex items-center justify-center group"
          title="CSS3"
        >
          <Image src="/css-3.png" alt="CSS3" width={38} height={38} className="w-full h-full object-contain" />
        </motion.div>

        {/* JavaScript */}
        <motion.div
          animate={{ y: [0, -16, 0], rotate: [2, -2, 2] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
          className="absolute top-24 right-8 lg:right-14 w-14 h-14 p-3 rounded-2xl bg-[#ffd814]/15 border border-[#ffd814]/30 backdrop-blur-md shadow-xl flex items-center justify-center group"
          title="JavaScript"
        >
          <Image src="/java.png" alt="JavaScript" width={38} height={38} className="w-full h-full object-contain" />
        </motion.div>

        {/* React */}
        <motion.div
          animate={{ y: [0, 14, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 5.1, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
          className="absolute bottom-40 right-12 lg:right-20 w-14 h-14 p-3 rounded-2xl bg-[#5ed3f3]/15 border border-[#5ed3f3]/30 backdrop-blur-md shadow-xl flex items-center justify-center group"
          title="React"
        >
          <Image src="/react.png" alt="React" width={38} height={38} className="w-full h-full object-contain" />
        </motion.div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Live Availability Status Pill with Click Action */}
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.18)] transition-all hover:scale-105"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-emerald-400 tracking-wide font-mono">
              Available for Freelance & Full-Time Roles
            </span>
            <span className="text-emerald-400/60 group-hover:translate-x-0.5 transition-transform">→</span>
          </a>

          {/* Avatar with Radiant Glow Ring */}
          <div className="relative mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/40 via-teal-400/30 to-cyan-400/20 blur-xl transform scale-125" />
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-emerald-400 via-teal-300 to-cyan-400 shadow-[0_0_35px_rgba(16,185,129,0.35)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950">
                <Image
                  src={hero?.imageUrl || "/hero-img.jpg"}
                  alt={`${firstName} ${lastName}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Hero Typography */}
          <p className="text-sm sm:text-base font-medium text-slate-400 mb-2 font-mono">
            <span className="text-emerald-400 font-semibold">{heyHighlight}</span> {heyRest}
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-2 font-display">
            {firstName}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
              {lastName}
            </span>
          </h1>

          <h2 className="text-lg sm:text-2xl font-semibold text-slate-300 mb-4 flex items-center justify-center gap-2 flex-wrap">
            <span>{role}</span>
            <span className="text-emerald-400 font-mono text-sm sm:text-base px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              {location}
            </span>
          </h2>

          {/* Specialty Tags */}
          <div className="flex flex-wrap justify-center gap-2 my-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-slate-200 backdrop-blur-sm hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all">
              ⚡ Next.js & React 19
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-slate-200 backdrop-blur-sm hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all">
              🎨 Pixel-Perfect UI/UX
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-slate-200 backdrop-blur-sm hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all">
              🚀 Full-Stack JavaScript (MERN)
            </span>
          </div>

          {/* Description */}
          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed mt-2 mb-8">
            {description}
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-black bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
            >
              <Sparkles size={16} />
              <span>Creative Showcase</span>
              <ArrowDown size={15} />
            </a>
            <a
              href={resumeUrl || "https://flowcv.com/resume/29mh2gwpwu"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 backdrop-blur-md transition-all hover:-translate-y-0.5"
            >
              <Download size={15} />
              <span>Download Resume</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Infinite Seamless Scrolling Marquee in Background */}
      <div className="absolute bottom-6 left-0 right-0 overflow-hidden opacity-10 pointer-events-none select-none">
        <div className="animate-marquee flex gap-12 text-5xl md:text-7xl font-black uppercase tracking-widest text-emerald-400">
          {marqueeWords.concat(marqueeWords).map((word, idx) => (
            <React.Fragment key={idx}>
              <span>{word}</span>
              <span className="text-teal-500">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
