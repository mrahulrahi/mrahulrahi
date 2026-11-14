'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as motion from 'motion/react-client';
import {
  Mail,
  Send,
  Sparkles,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUp,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  Heart,
  User,
  AtSign,
  Tag,
  Clock,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { FaLinkedinIn, FaGithub, FaYoutube, FaTelegram } from 'react-icons/fa';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const PROJECT_TOPICS = [
  'Web Application',
  'Next.js Portfolio',
  'UI/UX Redesign',
  'MERN Stack Project',
  'Consulting / Freelance'
];

export default function FooterSection() {
  const [year, setYear] = useState(2026);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormData>();

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear());

    // Update live India Standard Time (IST)
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mrahulrahi@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleTopicClick = (topic: string) => {
    if (selectedTopic === topic) {
      setSelectedTopic('');
      setValue('subject', '');
    } else {
      setSelectedTopic(topic);
      setValue('subject', `${topic} Inquiry`);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setIsError(false);
    try {
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'Failed to send message');
      }
      setMessage(result.message || 'Thanks for reaching out! I will get back to you shortly.');
      setIsError(false);
      setShowMessage(true);
      reset();
      setSelectedTopic('');
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong. Please try again or email me directly.');
      setIsError(true);
      setShowMessage(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
        setMessage('');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const socialLinks = [
    {
      name: 'LinkedIn',
      handle: 'in/mrahulrahi',
      url: 'https://linkedin.com/in/mrahulrahi/',
      icon: <FaLinkedinIn size={16} />,
      color: 'hover:text-[#0077b5] hover:border-[#0077b5]/40 hover:bg-[#0077b5]/10',
    },
    {
      name: 'GitHub',
      handle: '@mrahulrahi',
      url: 'https://github.com/mrahulrahi/',
      icon: <FaGithub size={16} />,
      color: 'hover:text-white hover:border-white/40 hover:bg-white/10',
    },
    {
      name: 'YouTube',
      handle: '@fireliquidator',
      url: 'https://www.youtube.com/@fireliquidator',
      icon: <FaYoutube size={16} />,
      color: 'hover:text-[#ff0000] hover:border-[#ff0000]/40 hover:bg-[#ff0000]/10',
    },
    {
      name: 'Telegram',
      handle: '@mrahulrahi',
      url: 'https://t.me/mrahulrahi',
      icon: <FaTelegram size={16} />,
      color: 'hover:text-[#229ed9] hover:border-[#229ed9]/40 hover:bg-[#229ed9]/10',
    },
  ];

  const quickNav = [
    { label: 'Hero', href: '#hero' },
    { label: 'Projects Showcase', href: '#projects' },
    { label: 'The Toolkit', href: '#toolkit' },
    { label: 'About & Stats', href: '#about' },
    { label: 'Career Journey', href: '#journey' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Articles & Insights', href: '#articles' },
  ];

  const labLinks = [
    { label: 'Developer Workspace', href: '/workspace' },
    { label: 'Web Utilities & Tools', href: '/tools' },
    { label: 'UI Component Sandbox', href: '/ui' },
    { label: 'Curated Code Blocks', href: '/code-blocks' },
    { label: 'Design Style Guide', href: '/style-guide' },
  ];

  return (
    <footer id="contact" className="relative w-full pt-20 overflow-hidden bg-[#09090b]">
      {/* Dynamic Background Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* ========================================================
          1. HEROIC CONTACT & COLLABORATION CARD
         ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950/90 to-black/95 border border-white/10 p-6 sm:p-10 lg:p-12 backdrop-blur-2xl shadow-2xl overflow-hidden"
        >
          {/* Top Edge Ambient Highlight */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Value Proposition & Direct Contact Hub */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div>
                {/* Live Availability Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-5 shadow-sm shadow-emerald-500/10">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>AVAILABLE FOR WORK & COLLABORATION</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white mb-4 leading-[1.12]">
                  Got an idea?{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
                    Let's make it real.
                  </span>
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  I specialize in crafting high-impact frontend web applications, responsive websites, and custom UI/UX animations. Whether you have a project ready to launch or an idea to brainstorm, let's connect.
                </p>
              </div>

              {/* Direct Info Pills */}
              <div className="space-y-3 text-xs font-mono">
                {/* Email with 1-click Copy */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-all group">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Mail size={16} />
                    </span>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">Direct Email</p>
                      <span className="text-slate-200 font-semibold">mrahulrahi@gmail.com</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-500 hover:text-black text-slate-300 transition-all text-xs font-semibold"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check size={13} className="text-emerald-400 group-hover:text-black" /> : <Copy size={13} />}
                    <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                {/* Response Speed & Local Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-300">
                    <Zap size={16} className="text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">Response Time</p>
                      <span className="text-white font-semibold">&lt; 4 Hours</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-300">
                    <Clock size={16} className="text-teal-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">India (IST)</p>
                      <span className="text-white font-semibold">{currentTime || 'UTC+5:30'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels Row */}
              <div>
                <p className="text-[11px] uppercase font-mono text-slate-400 mb-3 tracking-wider">Social Channels</p>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {socialLinks.map(s => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className={`w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-300 transition-all duration-300 hover:scale-110 hover:shadow-lg ${s.color}`}
                      title={s.handle}
                    >
                      {s.icon}
                    </a>
                  ))}
                  <a
                    href="https://t.me/mrahulrahi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
                  >
                    <span>Instant Telegram</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Modern Contact Message Form */}
            <div className="lg:col-span-7 bg-zinc-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <MessageSquare size={17} className="text-emerald-400" />
                  <span>Send a Direct Message</span>
                </div>
                <span className="text-xs font-mono text-slate-500">All fields required *</span>
              </div>

              {/* Quick Topic Chips */}
              <div className="mb-6">
                <p className="text-xs text-slate-400 font-mono mb-2">What is this project about?</p>
                <div className="flex flex-wrap gap-2">
                  {PROJECT_TOPICS.map(topic => {
                    const isSelected = selectedTopic === topic;
                    return (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => handleTopicClick(topic)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/30'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                        }`}
                      >
                        {topic}
                      </button>
                    );
                  })}
                </div>
              </div>

              {showMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl mb-6 text-sm flex items-start gap-3 border ${
                    isError
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  }`}
                >
                  {isError ? (
                    <AlertCircle size={18} className="shrink-0 mt-0.5 text-rose-400" />
                  ) : (
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-emerald-400" />
                  )}
                  <span>{message}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="form-name" className="block text-xs font-mono text-slate-400 mb-1.5">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                      <input
                        id="form-name"
                        type="text"
                        placeholder="e.g. Rahul Maurya"
                        required
                        autoComplete="name"
                        disabled={isSubmitting}
                        {...register('name', { required: true })}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="form-email" className="block text-xs font-mono text-slate-400 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <AtSign size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                      <input
                        id="form-email"
                        type="email"
                        placeholder="e.g. rahul@example.com"
                        required
                        autoComplete="email"
                        disabled={isSubmitting}
                        {...register('email', { required: true })}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="form-subject" className="block text-xs font-mono text-slate-400 mb-1.5">
                    Subject / Project Topic
                  </label>
                  <div className="relative">
                    <Tag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    <input
                      id="form-subject"
                      type="text"
                      placeholder="e.g. Building a modern Next.js SaaS Web App"
                      required
                      disabled={isSubmitting}
                      {...register('subject', { required: true })}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="form-message" className="block text-xs font-mono text-slate-400 mb-1.5">
                    Project Details & Scope
                  </label>
                  <textarea
                    id="form-message"
                    rows={4}
                    placeholder="Tell me a bit about your project goals, timelines, or requirements..."
                    required
                    disabled={isSubmitting}
                    {...register('message', { required: true })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/10 transition-all disabled:opacity-50 resize-y"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-black bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Project Inquiry</span>
                      <Send size={15} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ========================================================
          2. BACKGROUND WATERMARK BRAND STATEMENT
         ======================================================== */}
      <div className="w-full overflow-hidden select-none pointer-events-none opacity-5 mb-8" aria-hidden="true">
        <p className="whitespace-nowrap text-center text-7xl sm:text-9xl font-black font-display tracking-tight text-white uppercase">
          Rahul Maurya • Creative Engineer •
        </p>
      </div>

      {/* ========================================================
          3. SITEMAP, BRANDING & FOOTER NAVIGATION
         ======================================================== */}
      <div className="border-t border-white/10 bg-black/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Brand Column (Col 1-5) */}
            <div className="lg:col-span-5 space-y-4">
              <Link href="/portfolio-tw" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-2 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                  <Image src="/logo.svg" alt="Rahul Maurya" width={32} height={32} className="w-full h-full object-contain filter invert" />
                </div>
                <div>
                  <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors block leading-tight">
                    Rahul Maurya
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Frontend Developer & UI/UX Architect</span>
                </div>
              </Link>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm pt-1">
                Passionate about crafting performant React and Next.js applications, building accessible UI systems, and exploring creative web animations.
              </p>

              <div className="flex items-center gap-2 pt-2 text-xs font-mono text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Based in India • Shipping Worldwide</span>
              </div>
            </div>

            {/* Navigation Column (Col 6-8) */}
            <div className="lg:col-span-3 space-y-3">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">Portfolio Sections</p>
              <ul className="space-y-2 text-xs sm:text-sm">
                {quickNav.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                    >
                      <span className="hover:translate-x-1 transition-transform inline-block">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Developer Workspace & Resources (Col 9-12) */}
            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">Developer Workspace</p>
              <ul className="space-y-2 text-xs sm:text-sm">
                {labLinks.map(item => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">{item.label}</span>
                      <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
                  >
                    <span>Switch to Original Bootstrap Portfolio</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ========================================================
              4. LOWER COPYRIGHT BAR
             ======================================================== */}
          <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <span>© {year} Rahul Maurya (mrahulrahi). All rights reserved.</span>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <span>Engineered with</span>
              <Heart size={13} className="text-rose-500 fill-rose-500 mx-0.5" />
              <span>in Next.js 16 & Pure Tailwind CSS v4</span>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-500 hover:text-black text-slate-300 transition-all border border-white/10 hover:border-emerald-500 shadow-sm"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
