'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from '@/app/(admin)/admin/actions';
import { Lock, User, Eye, EyeOff, ShieldAlert, Terminal, Cpu, Radio } from 'lucide-react';

const LoginView: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await loginAction(username, password);
        if (result.success) {
            router.refresh();
        } else {
            setError(result.error || 'Authentication failed');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-brand-black text-brand-text font-sans antialiased relative overflow-hidden selection:bg-brand-mint/30 selection:text-brand-white">
            {/* Holographic Glowing Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-mint/5 blur-[150px] pointer-events-none animate-pulse duration-[10000ms]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-fern/10 blur-[150px] pointer-events-none animate-pulse duration-[8000ms]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-emerald-950/5 blur-[180px] pointer-events-none" />

            {/* Dynamic Grid Background with fade-out mask */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#09090b_100%)] pointer-events-none z-0" />

            {/* Floating Cyberspace Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-brand-mint/40 rounded-full blur-[2px] animate-ping duration-[3000ms]" />
                <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-brand-glow/30 rounded-full blur-[1px] animate-bounce duration-[5000ms]" />
                <div className="absolute bottom-1/3 left-10 w-2.5 h-2.5 bg-brand-fern/20 rounded-full blur-[2px] animate-pulse duration-[4000ms]" />
            </div>

            {/* Main Premium Authorization Card */}
            <div className="relative z-10 w-full max-w-[450px] mx-4 p-8 bg-brand-surface/40 border border-brand-border/60 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,220,130,0.02)] backdrop-blur-2xl transition-all duration-500 hover:border-brand-mint/30 hover:shadow-[0_0_60px_rgba(0,220,130,0.05)] group">
                
                {/* Tech Deco Corner Brackets */}
                <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-brand-muted/20 group-hover:border-brand-mint/50 transition-colors duration-500" />
                <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-brand-muted/20 group-hover:border-brand-mint/50 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-brand-muted/20 group-hover:border-brand-mint/50 transition-colors duration-500" />
                <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-brand-muted/20 group-hover:border-brand-mint/50 transition-colors duration-500" />

                {/* Cybernetic Animated Logo / Shield */}
                <div className="text-center mb-8 relative">
                    <div className="relative inline-flex items-center justify-center p-5 bg-brand-surfaceHighlight/50 border border-brand-border rounded-2xl mb-4 group-hover:border-brand-mint/30 transition-all duration-500 shadow-inner">
                        {/* Orbiting Ring SVGs */}
                        <div className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite] opacity-60">
                            <svg className="w-full h-full scale-110" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" className="text-brand-muted/10" strokeWidth="1" />
                                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" className="text-brand-mint/30" strokeWidth="1.5" strokeDasharray="15 80" />
                            </svg>
                        </div>
                        <div className="absolute inset-0 w-full h-full animate-[spin_8s_linear_infinite_reverse] opacity-40">
                            <svg className="w-full h-full scale-[1.2]" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" className="text-brand-fern/40" strokeWidth="1" strokeDasharray="30 60" />
                            </svg>
                        </div>

                        <div className="relative z-10 text-brand-mint drop-shadow-[0_0_8px_rgba(0,220,130,0.4)]">
                            <Lock className="w-6 h-6 animate-pulse" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-brand-white tracking-wide font-display">
                        SECURE GATEWAY
                    </h2>
                    
                    <div className="flex items-center justify-center gap-1.5 mt-2 font-mono text-[10px] text-brand-muted uppercase tracking-[0.2em]">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse" />
                        <span>PORT-AUTH : SHIELD_ACTIVE</span>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-950/20 border border-red-900/30 text-red-400 text-xs font-mono flex items-start gap-3 animate-shake">
                        <ShieldAlert className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                        <div className="flex-1">
                            <div className="font-bold text-[10px] uppercase tracking-wider text-red-400/80 mb-0.5">Authorization Error</div>
                            <div>{error}</div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] font-mono text-brand-muted uppercase tracking-wider">Operator Identity</label>
                            <span className="text-[9px] font-mono text-brand-muted/40">SYS.USER</span>
                        </div>
                        <div className="relative group/input">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within/input:text-brand-mint transition-colors duration-300">
                                <User className="w-4 h-4" />
                            </span>
                            <input 
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-brand-black/80 border border-brand-border/80 focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/20 text-brand-white placeholder-brand-muted/30 outline-none transition-all font-mono text-sm shadow-inner group-hover/input:border-brand-muted/40"
                                placeholder="IDENT_NUMBER"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] font-mono text-brand-muted uppercase tracking-wider">Access Passkey</label>
                            <span className="text-[9px] font-mono text-brand-muted/40">SYS.PASS</span>
                        </div>
                        <div className="relative group/input">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within/input:text-brand-mint transition-colors duration-300">
                                <Lock className="w-4 h-4" />
                            </span>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-brand-black/80 border border-brand-border/80 focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/20 text-brand-white placeholder-brand-muted/30 outline-none transition-all font-mono text-sm shadow-inner group-hover/input:border-brand-muted/40"
                                placeholder="••••••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-mint transition-colors cursor-pointer p-0.5"
                            >
                                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-4 mt-6 bg-brand-mint hover:bg-brand-glow text-brand-black font-bold font-mono rounded-xl shadow-[0_0_15px_-3px_rgba(0,220,130,0.3)] hover:shadow-[0_0_25px_rgba(0,220,130,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 text-xs uppercase tracking-[0.15em] border border-brand-mint/20 relative overflow-hidden group/btn cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                        {loading ? (
                            <>
                                <span className="w-4 h-4 rounded-full border-2 border-brand-black border-t-transparent animate-spin" />
                                <span className="animate-pulse">Authorizing...</span>
                            </>
                        ) : (
                            <>
                                <Terminal className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                                <span>Decrypt Terminal</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Subfooter status indicators */}
                <div className="mt-8 pt-6 border-t border-brand-border/40 flex justify-between items-center text-[9px] font-mono text-brand-muted/40">
                    <div className="flex items-center gap-1">
                        <Cpu className="w-3 h-3 text-brand-mint/60" />
                        <span>NODE: MAIN_US_EAST</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Radio className="w-3 h-3 text-brand-mint/60 animate-pulse" />
                        <span>PING: 12MS</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginView;
