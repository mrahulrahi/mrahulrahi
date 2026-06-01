'use client'

import React, { useState, useEffect } from 'react';
import { 
    LayoutDashboard, Layers, Sliders, Terminal, User, FolderGit2, 
    ChevronRight, GraduationCap, Sparkles, Cpu, BookOpen, 
    ArrowUpRight, Github, Linkedin, ExternalLink, HelpCircle, Briefcase
} from 'lucide-react';
import UiLibrarySandbox from '@/app/components/portfolio/UiLibrarySandbox';
import ToolsDirectory from '@/app/components/portfolio/ToolsDirectory';
import EducationalCodeBlocks from '@/app/components/portfolio/EducationalCodeBlocks';
import { getPublicPortfolioData } from '@/app/(admin)/admin/dataActions';
import { skills as staticSkills, projectsCards as staticProjects } from '@/app/data/staticData';

type WorkspaceTab = 'portfolio' | 'ui-sandbox' | 'tools' | 'code-blocks';

export default function WorkspacePage() {
    const [activeTab, setActiveTab] = useState<WorkspaceTab>('portfolio');
    const [portfolioStats, setPortfolioStats] = useState({
        projectsCount: staticProjects.length,
        skillsCount: staticSkills.length,
        certificationsCount: 4,
        experienceYears: 2
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                const liveData = await getPublicPortfolioData();
                setPortfolioStats({
                    projectsCount: liveData.projectsCards?.length || staticProjects.length,
                    skillsCount: liveData.skills?.length || staticSkills.length,
                    certificationsCount: liveData.certificates?.length || 4,
                    experienceYears: 2
                });
            } catch (e) {
                console.error("Failed to load portfolio stats in workspace", e);
            }
        }
        fetchStats();
    }, []);

    const sidebarItems = [
        { id: 'portfolio' as WorkspaceTab, label: 'Portfolio Hub', icon: <User className="w-4 h-4" />, description: 'Overview & Statistics' },
        { id: 'ui-sandbox' as WorkspaceTab, label: 'UI Sandbox', icon: <Layers className="w-4 h-4" />, description: 'React Component Library' },
        { id: 'tools' as WorkspaceTab, label: 'Utilities Hub', icon: <Sliders className="w-4 h-4" />, description: 'Interactive Client Tools' },
        { id: 'code-blocks' as WorkspaceTab, label: 'Code Academy', icon: <Terminal className="w-4 h-4" />, description: 'Educational Playgrounds' }
    ];

    return (
        <div className="min-h-screen bg-[#09090b] text-slate-100 font-sans antialiased relative overflow-hidden flex flex-col pt-20">
            {/* Ambient Lighting Accents */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-mint/5 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-fern/15 blur-[150px] pointer-events-none" />

            {/* main dashboard grid container */}
            <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col lg:flex-row gap-8 relative z-10">
                
                {/* Left Side: Premium Nav Sidebar (Dashboard Layout) */}
                <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
                    {/* Workspace Branding Card */}
                    <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group shadow-inner">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/5 to-transparent pointer-events-none" />
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2.5 bg-brand-mint/10 border border-brand-mint/20 rounded-xl text-brand-mint">
                                <Cpu className="w-5 h-5 animate-pulse" />
                            </div>
                            <div>
                                <h2 className="text-sm font-mono font-bold tracking-widest text-slate-400">DEV_CENTER</h2>
                                <h1 className="text-lg font-bold text-white tracking-wide">Developer Hub</h1>
                            </div>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal font-mono border-t border-slate-800/60 pt-3 mt-1 uppercase tracking-wider">
                            SECURE ACCESS PORT : ACTIVE
                        </p>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-3 backdrop-blur-md flex flex-col gap-1.5 shadow-inner">
                        {sidebarItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center gap-3.5 group cursor-pointer ${
                                    activeTab === item.id
                                        ? 'bg-brand-mint/10 border-brand-mint/30 text-white shadow-[0_0_15px_-3px_rgba(0,220,130,0.15)]'
                                        : 'bg-transparent border-transparent hover:bg-slate-950/40 hover:border-slate-800/60 text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                <div className={`p-2.5 rounded-xl transition-colors shrink-0 ${
                                    activeTab === item.id
                                        ? 'bg-brand-mint/20 text-brand-mint'
                                        : 'bg-slate-950/60 border border-slate-800/60 text-slate-500 group-hover:text-slate-300'
                                }`}>
                                    {item.icon}
                                </div>
                                <div className="truncate flex-1">
                                    <h3 className="text-xs font-bold tracking-wide">{item.label}</h3>
                                    <p className="text-[10px] text-slate-500 truncate mt-0.5">{item.description}</p>
                                </div>
                                <ChevronRight className={`w-4 h-4 transition-transform ${
                                    activeTab === item.id ? 'translate-x-0.5 text-brand-mint' : 'text-slate-700 group-hover:text-slate-400'
                                }`} />
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Right Side: Tab Viewport Shell */}
                <main className="flex-1 bg-slate-900/20 border border-slate-800/80 rounded-[32px] p-6 lg:p-8 min-h-[500px] backdrop-blur-md flex flex-col justify-between overflow-hidden relative shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-black/40 via-transparent to-brand-black/20 pointer-events-none" />
                    
                    <div className="relative z-10 w-full flex-1">
                        {/* Tab Content Viewers */}
                        
                        {/* PORTFOLIO OVERVIEW TAB */}
                        {activeTab === 'portfolio' && (
                            <div className="space-y-8 w-full animate-pulse-once">
                                {/* Profile Banner Card */}
                                <div className="bg-slate-900/60 border border-slate-800 p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-inner">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-mint/5 rounded-full blur-3xl pointer-events-none" />
                                    <div className="space-y-3">
                                        <div className="inline-flex items-center gap-2 bg-brand-mint/10 border border-brand-mint/20 text-brand-mint px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider">
                                            <Sparkles className="w-3.5 h-3.5" />
                                            <span>Full-Stack Web Developer</span>
                                        </div>
                                        <h1 className="text-3xl font-display font-black text-white tracking-wide">Rahul Maurya</h1>
                                        <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                                            Specializing in building robust digital ecosystems, premium responsive animations, and elegant interactive sandboxes with next-gen architectures.
                                        </p>
                                        <div className="flex items-center gap-3 pt-2">
                                            <a href="https://github.com/mrahulrahi/" target="_blank" className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
                                                <Github className="w-4 h-4" />
                                            </a>
                                            <a href="https://linkedin.com/in/mrahulrahi/" target="_blank" className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
                                                <Linkedin className="w-4 h-4" />
                                            </a>
                                            <a href="/" className="text-xs font-semibold text-brand-mint hover:underline flex items-center gap-1.5 pl-2 font-mono">
                                                <span>Launch Main Site</span>
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Embedded Visual Quick-Stats */}
                                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto shrink-0">
                                        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-center min-w-32">
                                            <div className="text-2xl font-bold font-display text-brand-mint">{portfolioStats.projectsCount}+</div>
                                            <div className="text-[10px] font-mono text-slate-500 uppercase mt-1">Projects</div>
                                        </div>
                                        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-center min-w-32">
                                            <div className="text-2xl font-bold font-display text-brand-mint">{portfolioStats.skillsCount}</div>
                                            <div className="text-[10px] font-mono text-slate-500 uppercase mt-1">Tech Skills</div>
                                        </div>
                                        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-center min-w-32">
                                            <div className="text-2xl font-bold font-display text-brand-mint">{portfolioStats.certificationsCount}</div>
                                            <div className="text-[10px] font-mono text-slate-500 uppercase mt-1">Certificates</div>
                                        </div>
                                        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-center min-w-32">
                                            <div className="text-2xl font-bold font-display text-brand-mint">{portfolioStats.experienceYears} Yrs</div>
                                            <div className="text-[10px] font-mono text-slate-500 uppercase mt-1">Exp</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Core Skills Quick-Grid */}
                                <div className="space-y-4">
                                    <h2 className="text-xs font-mono text-slate-400 uppercase tracking-widest border-b border-slate-800/80 pb-2">Core Technology Matrix</h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        <div className="p-4 bg-slate-900/40 border border-slate-800/60 rounded-2xl flex items-center gap-3">
                                            <div className="p-2 bg-slate-950 rounded-lg text-[#61DAFB]"><Cpu className="w-4 h-4" /></div>
                                            <span className="text-xs font-semibold">React.js</span>
                                        </div>
                                        <div className="p-4 bg-slate-900/40 border border-slate-800/60 rounded-2xl flex items-center gap-3">
                                            <div className="p-2 bg-slate-950 rounded-lg text-[#000000]"><Cpu className="w-4 h-4" /></div>
                                            <span className="text-xs font-semibold">Next.js</span>
                                        </div>
                                        <div className="p-4 bg-slate-900/40 border border-slate-800/60 rounded-2xl flex items-center gap-3">
                                            <div className="p-2 bg-slate-950 rounded-lg text-[#3178C6]"><Cpu className="w-4 h-4" /></div>
                                            <span className="text-xs font-semibold">TypeScript</span>
                                        </div>
                                        <div className="p-4 bg-slate-900/40 border border-slate-800/60 rounded-2xl flex items-center gap-3">
                                            <div className="p-2 bg-slate-950 rounded-lg text-[#38BDF8]"><Cpu className="w-4 h-4" /></div>
                                            <span className="text-xs font-semibold">Tailwind CSS</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Navigation Cards */}
                                <div className="space-y-4">
                                    <h2 className="text-xs font-mono text-slate-400 uppercase tracking-widest border-b border-slate-800/80 pb-2">Explore Hub Modules</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <button onClick={() => setActiveTab('ui-sandbox')} className="bg-slate-900/30 border border-slate-800 hover:border-brand-mint/30 p-5 rounded-2xl text-left transition-all hover:-translate-y-1 cursor-pointer group">
                                            <Layers className="w-5 h-5 text-brand-mint mb-3" />
                                            <h3 className="text-sm font-bold text-white group-hover:text-brand-mint transition-colors">Launch UI Sandbox</h3>
                                            <p className="text-[11px] text-slate-400 leading-relaxed mt-1">Interact with our 33 visual client widgets and layout sandbox components.</p>
                                        </button>
                                        <button onClick={() => setActiveTab('tools')} className="bg-slate-900/30 border border-slate-800 hover:border-brand-mint/30 p-5 rounded-2xl text-left transition-all hover:-translate-y-1 cursor-pointer group">
                                            <Sliders className="w-5 h-5 text-brand-mint mb-3" />
                                            <h3 className="text-sm font-bold text-white group-hover:text-brand-mint transition-colors">Launch Utilities</h3>
                                            <p className="text-[11px] text-slate-400 leading-relaxed mt-1">Explore real-world client-side utilities, calculators, and API visualizers.</p>
                                        </button>
                                        <button onClick={() => setActiveTab('code-blocks')} className="bg-slate-900/30 border border-slate-800 hover:border-brand-mint/30 p-5 rounded-2xl text-left transition-all hover:-translate-y-1 cursor-pointer group">
                                            <Terminal className="w-5 h-5 text-brand-mint mb-3" />
                                            <h3 className="text-sm font-bold text-white group-hover:text-brand-mint transition-colors">Launch Academy</h3>
                                            <p className="text-[11px] text-slate-400 leading-relaxed mt-1">Examine modular sorting visualizers, custom hooks logs, and pointer grids.</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* UI SANDBOX VIEWPORT */}
                        {activeTab === 'ui-sandbox' && <UiLibrarySandbox isEmbedded={true} />}

                        {/* TOOLS VIEWPORT */}
                        {activeTab === 'tools' && <ToolsDirectory isEmbedded={true} />}

                        {/* CODE BLOCKS VIEWPORT */}
                        {activeTab === 'code-blocks' && <EducationalCodeBlocks />}
                    </div>
                </main>
            </div>
        </div>
    );
}
