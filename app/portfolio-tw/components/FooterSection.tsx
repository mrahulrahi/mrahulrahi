'use client';

import React, { useState, useEffect } from 'react';
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
  Heart
} from 'lucide-react';
import { FaLinkedinIn, FaGithub, FaYoutube, FaTelegram } from 'react-icons/fa';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function FooterSection() {
  const [year, setYear] = useState(2026);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>();

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mrahulrahi@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
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
      setMessage(result.message || 'Thanks for your message! I will get back to you shortly.');
      setIsError(false);
      setShowMessage(true);
      reset();
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong. Please try again or reach out directly via email.');
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
      url: 'https://linkedin.com/in/mrahulrahi/',
      icon: <FaLinkedinIn size={16} />,
      color: 'hover:text-[#0077b5] hover:border-[#0077b5]/50 hover:bg-[#0077b5]/10',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/mrahulrahi/',
      icon: <FaGithub size={16} />,
      color: 'hover:text-white hover:border-white/50 hover:bg-white/10',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@fireliquidator',
      icon: <FaYoutube size={16} />,
      color: 'hover:text-[#ff0000] hover:border-[#ff0000]/50 hover:bg-[#ff0000]/10',
    },
    {
      name: 'Telegram',
      url: 'https://t.me/mrahulrahi',
      icon: <FaTelegram size={16} />,
      color: 'hover:text-[#229ed9] hover:border-[#229ed9]/50 hover:bg-[#229ed9]/10',
    },
  ];

  const quickNav = [
    { label: 'Hero', href: '#hero' },
    { label: 'Projects', href: '#projects' },
    { label: 'Toolkit', href: '#toolkit' },
    { label: 'About', href: '#about' },
    { label: 'Journey', href: '#journey' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Articles', href: '#articles' },
  ];

  const labLinks = [
    { label: 'Developer Workspace', href: '/workspace' },
    { label: 'Web Utilities & Tools', href: '/tools' },
    { label: 'Component Library', href: '/ui' },
    { label: 'Code Blocks', href: '/code-blocks' },
    { label: 'Design Style Guide', href: '/style-guide' },
  ];

  return (
    <footer id="contact" className="relative w-full pt-16 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[250px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* ========================================================
          1. INTERACTIVE CONTACT & COLLABORATION CARD
         ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-zinc-950/70 border border-white/10 p-6 sm:p-10 lg:p-12 backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          {/* Subtle Top Border Gradient */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Direct Info & Value Proposition */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>LET'S COLLABORATE</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white mb-4 leading-[1.15]">
                  Have a project in mind?{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
                    Let's build it.
                  </span>
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Whether you need a modern web application, high-converting portfolio, or a custom UI/UX implementation — I am always open to discussing new projects, freelance missions, and full-time opportunities.
                </p>
              </div>

              {/* Direct Touch Badges */}
              <div className="space-y-3 font-mono text-xs">
                {/* Email with 1-click Copy */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <Mail size={16} />
                    </span>
                    <span className="text-slate-200">mrahulrahi@gmail.com</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 hover:bg-emerald-500 hover:text-black text-slate-300 transition-colors text-[11px]"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                {/* Location & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300">
                    <MapPin size={16} className="text-teal-400 shrink-0" />
                    <span>India [ Remote / Worldwide ]</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-emerald-400">
                    <Sparkles size={16} className="shrink-0" />
                    <span>Open for New Roles</span>
                  </div>
                </div>
              </div>

              {/* Social Channels Row */}
              <div>
                <p className="text-xs uppercase font-mono text-slate-400 mb-3 tracking-wider">Connect directly</p>
                <div className="flex items-center gap-3">
                  {socialLinks.map(s => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className={`w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-300 transition-all duration-300 hover:scale-110 hover:shadow-lg ${s.color}`}
                    >
                      {s.icon}
                    </a>
                  ))}
                  <a
                    href="https://t.me/mrahulrahi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
                  >
                    <span>Chat on Telegram</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Message Form */}
            <div className="lg:col-span-7 bg-zinc-900/60 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-6 text-sm font-semibold text-white">
                <MessageSquare size={18} className="text-emerald-400" />
                <span>Send a Direct Message</span>
              </div>

              {showMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl mb-6 text-sm flex items-start gap-3 border ${
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
                      Your Full Name *
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      placeholder="e.g. John Doe"
                      required
                      autoComplete="name"
                      disabled={isSubmitting}
                      {...register('name', { required: true })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all disabled:opacity-50"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="form-email" className="block text-xs font-mono text-slate-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      placeholder="e.g. john@example.com"
                      required
                      autoComplete="email"
                      disabled={isSubmitting}
                      {...register('email', { required: true })}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="form-subject" className="block text-xs font-mono text-slate-400 mb-1.5">
                    Subject / Project Topic *
                  </label>
                  <input
                    id="form-subject"
                    type="text"
                    placeholder="e.g. Frontend Web App Project Inquiry"
                    required
                    disabled={isSubmitting}
                    {...register('subject', { required: true })}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all disabled:opacity-50"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="form-message" className="block text-xs font-mono text-slate-400 mb-1.5">
                    Message Details *
                  </label>
                  <textarea
                    id="form-message"
                    rows={5}
                    placeholder="Tell me a bit about your project goals, timelines, or questions..."
                    required
                    disabled={isSubmitting}
                    {...register('message', { required: true })}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all disabled:opacity-50 resize-y"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-black bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ========================================================
          2. SITEMAP, BRANDING & FOOTER NAVIGATION
         ======================================================== */}
      <div className="border-t border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Brand Column (Col 1-5) */}
            <div className="lg:col-span-5 space-y-4">
              <Link href="/portfolio-tw" className="flex items-center gap-2 group">
                <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-black text-sm shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                  R
                </span>
                <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Rahul Maurya
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Tailwind v4
                </span>
              </Link>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                Frontend Developer & UI/UX Architect focused on high-performance React and Next.js applications, clean architecture, and delightful interactive user experiences.
              </p>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Based in India • Shipping Globally</span>
              </div>
            </div>

            {/* Navigation Column (Col 6-7) */}
            <div className="lg:col-span-3 space-y-3">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">Sections</p>
              <ul className="space-y-2 text-xs sm:text-sm">
                {quickNav.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                    >
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Developer Lab & Utilities Column (Col 8-10) */}
            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">Developer Workspace</p>
              <ul className="space-y-2 text-xs sm:text-sm">
                {labLinks.map(item => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{item.label}</span>
                      <ExternalLink size={12} className="opacity-60" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/"
                    className="text-emerald-400 hover:underline transition-colors inline-flex items-center gap-1.5 pt-2"
                  >
                    <span>Switch to Original Bootstrap Portfolio</span>
                    <ExternalLink size={12} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ========================================================
              3. LOWER COPYRIGHT BAR
             ======================================================== */}
          <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <span>© {year} Rahul Maurya (mrahulrahi). All rights reserved.</span>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <span>Made with</span>
              <Heart size={13} className="text-rose-500 fill-rose-500 mx-0.5" />
              <span>in React & Pure Tailwind CSS</span>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

