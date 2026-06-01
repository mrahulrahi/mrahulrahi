'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Sparkles, Terminal, Sliders, ExternalLink, Calculator, HelpCircle, FileText, CloudSun, Quote } from 'lucide-react';
import { getPublicUiToolsData } from '@/app/(admin)/admin/dataActions';

interface ToolsDirectoryProps {
    isEmbedded?: boolean;
}

export default function ToolsDirectory({ isEmbedded = false }: ToolsDirectoryProps) {
    const [tools, setTools] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function loadPublicData() {
            setLoading(true);
            try {
                const data = await getPublicUiToolsData();
                const visibleTools = (data.tools || []).filter((t: any) => t.visible);
                setTools(visibleTools);
            } catch (err) {
                console.error("Failed to load tools data", err);
            } finally {
                setLoading(false);
            }
        }
        loadPublicData();
    }, []);

    // Helper to render distinct premium icons based on tool ID
    const getToolIcon = (id: string) => {
        const iconClasses = "w-6 h-6 text-brand-mint";
        switch (id) {
            case 'quiz-app':
                return <HelpCircle className={iconClasses} />;
            case 'notes-app':
                return <FileText className={iconClasses} />;
            case 'weather-app':
                return <CloudSun className={iconClasses} />;
            case 'quote-app':
                return <Quote className={iconClasses} />;
            case 'calculator-app':
            case 'salary-calculator':
            case 'salary-calculator-two':
            case 'smart-emi-planner':
            default:
                return <Calculator className={iconClasses} />;
        }
    };

    const filteredTools = tools.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`text-slate-100 font-sans transition-colors duration-300 ${isEmbedded ? 'w-full py-0 px-0' : 'bg-[#0f172a] min-h-screen py-24 px-4 sm:px-6 lg:px-8'}`}>
            
            {/* Header Area (only render if not embedded) */}
            {!isEmbedded && (
                <div className="max-w-7xl mx-auto text-center mb-16 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-64 h-64 bg-brand-mint/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="inline-flex items-center gap-2 bg-brand-mint/10 text-brand-mint px-4 py-1.5 rounded-full text-xs font-mono mb-4 border border-brand-mint/20 animate-pulse">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Interactive Workspace</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 leading-tight">
                        Interactive Web Utilities
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto mt-4 text-base md:text-lg leading-relaxed">
                        A suite of full-featured client utilities, financial estimators, and algorithmic playgrounds built to solve real-world tasks beautifully.
                    </p>
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 gap-3 text-slate-400 font-mono">
                    <span className="w-8 h-8 rounded-full border-4 border-slate-700 border-t-brand-mint animate-spin"></span>
                    <span>Synchronizing utility engines...</span>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto space-y-8">
                    
                    {/* Search and Metadata Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl backdrop-blur-md">
                        <span className="text-xs font-mono text-slate-400 self-center">
                            DISPLAYING <strong className="text-brand-mint font-bold">{filteredTools.length}</strong> ACTIVE APPLICATIONS
                        </span>

                        <div className="relative max-w-md w-full sm:w-80">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search utility directory..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 outline-none focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 text-sm transition-all"
                            />
                        </div>
                    </div>

                    {/* Tools Grid */}
                    {filteredTools.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTools.map(tool => (
                                <div
                                    key={tool.id}
                                    className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 hover:border-brand-mint/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md animate-pulse-once"
                                >
                                    {/* Subtly Glowing Background Accent on Card Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                                    <div>
                                        <div className="flex items-center justify-between gap-4 mb-4">
                                            <div className="p-3 bg-brand-mint/10 border border-brand-mint/20 rounded-2xl shrink-0">
                                                {getToolIcon(tool.id)}
                                            </div>
                                            <span className="text-[9px] font-mono bg-slate-950 border border-slate-800 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider">
                                                {tool.id}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-white mb-2 tracking-wide group-hover:text-brand-mint transition-colors">
                                            {tool.name}
                                        </h3>
                                        
                                        <p className="text-slate-400 text-xs leading-relaxed mb-6">
                                            {tool.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                                        <span className="text-[10px] font-mono text-slate-500">CLIENT APP</span>
                                        
                                        <Link
                                            href={tool.href}
                                            className="text-xs font-semibold text-slate-300 hover:text-brand-mint flex items-center gap-1 bg-slate-950 border border-slate-800 group-hover:border-brand-mint/30 px-3.5 py-2 rounded-xl transition-all"
                                        >
                                            <span>Launch App</span>
                                            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-900/50 border border-slate-800 rounded-3xl p-12">
                            <Sliders className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-spin" />
                            <h3 className="text-xl font-bold text-slate-300">No active applications found</h3>
                            <p className="text-slate-500 mt-2">Try searching with a different keyword or contact the site owner.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
