'use client';

import Link from 'next/link';
import { ArrowLeft, Home, Compass, MessageSquare, Terminal } from 'lucide-react';
import * as motion from "motion/react-client";
import '@/app/globals.css';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-brand-black text-brand-text overlay">
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden px-6 py-20">
          {/* Glow Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-mint/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-fern/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-2xl w-full text-center relative z-10 space-y-8">
            {/* Animated Error Code */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative inline-block"
            >
              <h1 className="text-[120px] md:text-[180px] font-display font-black leading-none bg-clip-text bg-linear-to-r from-brand-mint via-brand-glow to-brand-fern tracking-tighter animate-pulse select-none" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', backgroundImage: 'linear-gradient(to right, var(--color-brand-mint, #00DC82), var(--color-brand-glow, #00F0FF), var(--color-brand-fern, #00B159))' }}>
                404
              </h1>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-surfaceHighlight border border-brand-border rounded-full text-xs font-mono text-brand-mint uppercase tracking-[0.2em] shadow-lg">
                Page Not Found
              </div>
            </motion.div>

            {/* Informative message */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-3 max-w-md mx-auto"
            >
              <h2 className="text-2xl font-bold text-white font-display">Lost in Cyberspace?</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track.
              </p>
            </motion.div>

            {/* Helpful quick links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto pt-4"
            >
              <Link href="/" className="group p-4 rounded-2xl bg-brand-surface/40 border border-brand-border/60 hover:border-brand-mint/40 transition-all duration-300 flex flex-col items-center gap-2 hover:shadow-[0_0_20px_rgba(0,220,130,0.05)]">
                <Home className="w-5 h-5 text-brand-mint group-hover:scale-110 transition-transform" />
                <span className="text-xs font-mono text-slate-400 group-hover:text-white transition-colors">Home</span>
              </Link>
              <Link href="/#about" className="group p-4 rounded-2xl bg-brand-surface/40 border border-brand-border/60 hover:border-brand-mint/40 transition-all duration-300 flex flex-col items-center gap-2 hover:shadow-[0_0_20px_rgba(0,220,130,0.05)]">
                <Compass className="w-5 h-5 text-brand-mint group-hover:scale-110 transition-transform" />
                <span className="text-xs font-mono text-slate-400 group-hover:text-white transition-colors">About</span>
              </Link>
              <Link href="/#portfolio" className="group p-4 rounded-2xl bg-brand-surface/40 border border-brand-border/60 hover:border-brand-mint/40 transition-all duration-300 flex flex-col items-center gap-2 hover:shadow-[0_0_20px_rgba(0,220,130,0.05)]">
                <Terminal className="w-5 h-5 text-brand-mint group-hover:scale-110 transition-transform" />
                <span className="text-xs font-mono text-slate-400 group-hover:text-white transition-colors">Projects</span>
              </Link>
              <Link href="/#contact" className="group p-4 rounded-2xl bg-brand-surface/40 border border-brand-border/60 hover:border-brand-mint/40 transition-all duration-300 flex flex-col items-center gap-2 hover:shadow-[0_0_20px_rgba(0,220,130,0.05)]">
                <MessageSquare className="w-5 h-5 text-brand-mint group-hover:scale-110 transition-transform" />
                <span className="text-xs font-mono text-slate-400 group-hover:text-white transition-colors">Contact</span>
              </Link>
            </motion.div>

            {/* Back to Home CTA */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="pt-6"
            >
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-mint hover:bg-brand-glow text-brand-black font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_15px_-3px_rgba(0,220,130,0.3)] hover:shadow-[0_0_25px_rgba(0,220,130,0.5)]">
                <ArrowLeft className="w-4 h-4" />
                <span>Go Back Home</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </body>
    </html>
  );
}
