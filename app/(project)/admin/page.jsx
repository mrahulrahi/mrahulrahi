import React from 'react'
import {Inter, JetBrains_Mono, Space_Grotesk} from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

const AdminPage = () => {
  return (
    <>
   <div className={`${inter.className} ${jetBrainsMono.className} ${spaceGrotesk.className}`}> 
    <section className="bg-gray-50 text-gray-900 dark:bg-brand-black dark:text-brand-text font-sans antialiased selection:bg-brand-mint selection:text-brand-black transition-colors duration-300 overflow-x-hidden">

   
    <div className="fixed inset-0 bg-grid-pattern opacity-[0.4] dark:opacity-[0.07] pointer-events-none z-0 bg-grid transition-opacity duration-300"></div>

   
    <nav className="fixed top-0 w-full z-50 glass border-b border-gray-200 dark:border-brand-border h-16 flex items-center px-6 lg:px-8 justify-between transition-colors duration-300">
        <div className="flex items-center gap-2 cursor-pointer" onclick="window.location.reload()">
            <div className="w-8 h-8 bg-brand-mint/10 border border-brand-mint/30 rounded flex items-center justify-center text-brand-mint font-mono font-bold transition-all duration-300">m</div>
            <span className="font-display font-bold text-lg tracking-wide text-gray-900 dark:text-brand-text">mrahulrahi</span>
        </div>

        
        <div className="hidden md:flex bg-gray-100 dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-lg p-1">
            <button onclick="switchView('styleguide')" id="btn-styleguide" className="px-4 py-1.5 rounded text-sm font-medium transition-all bg-white dark:bg-brand-surfaceHighlight shadow-sm text-gray-900 dark:text-white">Style Guide</button>
            <button onclick="switchView('app')" id="btn-app" className="px-4 py-1.5 rounded text-sm font-medium transition-all text-gray-500 dark:text-brand-muted hover:text-gray-900 dark:hover:text-white">Admin CMS</button>
        </div>

        <div className="flex items-center gap-3">
             
             <button id="theme-toggle" className="p-2 rounded-full border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted hover:text-brand-mint hover:border-brand-mint transition-all">
                <i data-lucide="sun" className="w-4 h-4 hidden dark:block"></i>
                <i data-lucide="moon" className="w-4 h-4 block dark:hidden"></i>
            </button>
            
            <button onclick="copyLink()" className="hidden sm:block border border-gray-200 dark:border-brand-border hover:border-brand-mint hover:text-brand-mint text-gray-500 dark:text-brand-muted px-4 py-2 rounded text-xs font-mono transition-all">
                Share
            </button>
        </div>
    </nav>

    
    <main id="view-styleguide" className="relative z-10 pt-24 px-6 lg:px-12 max-w-7xl mx-auto pb-20 space-y-24 transition-opacity duration-300">
       
        <div className="flex flex-wrap gap-4 md:gap-8 text-sm font-mono text-gray-500 dark:text-brand-muted border-b border-gray-200 dark:border-brand-border pb-4 mb-8">
            <a href="#essence" className="hover:text-brand-mint transition-colors">01.Essence</a>
            <a href="#palette" className="hover:text-brand-mint transition-colors">02.Palette</a>
            <a href="#typography" className="hover:text-brand-mint transition-colors">03.Type</a>
            <a href="#ui-lab" className="hover:text-brand-mint transition-colors">04.UI_Lab</a>
            <a href="#prompts" className="hover:text-brand-mint transition-colors">05.Prompts</a>
        </div>

        
        <section id="essence" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border text-xs font-mono text-brand-mint shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse"></span>
                    v1.0.0 System Online
                </div>
                <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight text-gray-900 dark:text-brand-text">
                    Structured <br/>
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-mint to-brand-fern">Ecology</span>
                </h1>
                <p className="text-gray-600 dark:text-brand-muted text-lg max-w-xl leading-relaxed">
                    Bridging the gap between raw code structure and organic creativity. A design system for portfolio, UI libraries, and developer tools.
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                    <span className="px-3 py-1 border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted text-sm font-mono rounded hover:border-brand-mint transition-colors cursor-default">#Systemic</span>
                    <span className="px-3 py-1 border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted text-sm font-mono rounded hover:border-brand-mint transition-colors cursor-default">#Atomic</span>
                    <span className="px-3 py-1 border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted text-sm font-mono rounded hover:border-brand-mint transition-colors cursor-default">#Terminal-Inspired</span>
                </div>
            </div>
            
            <div className="lg:col-span-5 h-64 lg:h-80 bg-[#09090B] border border-gray-200 dark:border-brand-border rounded-lg p-6 relative overflow-hidden group shadow-xl">
                <div className="absolute top-0 left-0 w-full h-6 bg-brand-border/30 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="mt-6 font-mono text-sm space-y-2">
                    <p className="text-brand-muted">$ init <span className="text-brand-mint">mrahulrahi</span></p>
                    <p className="text-brand-muted">&gt; Loading modules...</p>
                    <p className="text-brand-muted">&gt; Applying theme: <span className="text-brand-glow">Electric Flora</span></p>
                    <p className="text-brand-text flex items-center gap-2">
                        &gt; Status: <span id="typing-text" className="text-brand-mint"></span><span className="cursor-blink w-2 h-4 bg-brand-mint block"></span>
                    </p>
                </div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border-r border-b border-brand-mint/30 rounded-br-xl"></div>
            </div>
        </section>

        
        <section id="palette" className="space-y-8">
            <div className="border-l-2 border-brand-mint pl-4">
                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Electric Flora Palette</h2>
                <p className="text-gray-600 dark:text-brand-muted mt-2">Monochromatic base with high-voltage green accents.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                
                <div className="palette-card group relative aspect-square rounded-xl border border-gray-200 dark:border-brand-border bg-brand-black flex flex-col justify-between p-4 cursor-pointer transition-all hover:border-brand-mint hover:shadow-lg overflow-hidden shadow-sm" data-color="#09090B" data-name="Void Black">
                    <div className="absolute inset-0 bg-[#09090B]"></div>
                    <span className="relative z-10 text-xs font-mono bg-brand-black/50 backdrop-blur px-2 py-1 rounded text-white w-max border border-white/10">Main BG</span>
                    <div className="relative z-10 flex justify-between items-end"><span className="font-display font-bold text-white">Void Black</span><span className="font-mono text-xs text-brand-muted">#09090B</span></div>
                </div>
                <div className="palette-card group relative aspect-square rounded-xl border border-gray-200 dark:border-brand-border bg-brand-mint flex flex-col justify-between p-4 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg overflow-hidden shadow-sm" data-color="#00DC82" data-name="Electric Mint">
                    <div className="absolute inset-0 bg-[#00DC82]"></div>
                    <span className="relative z-10 text-xs font-mono bg-black/20 backdrop-blur px-2 py-1 rounded text-black w-max border border-black/10 font-bold">Accent</span>
                    <div className="relative z-10 flex justify-between items-end text-brand-black"><span className="font-display font-bold">Electric Mint</span><span className="font-mono text-xs font-bold">#00DC82</span></div>
                </div>
                
            </div>
        </section>

        
        <section id="typography" className="space-y-8">
            <div className="border-l-2 border-brand-mint pl-4">
                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Typography Stack</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-8 shadow-sm">
                    <h3 className="text-brand-mint font-mono text-sm mb-1">Headings</h3>
                    <p className="text-2xl font-display font-bold text-gray-900 dark:text-brand-text mb-4">Space Grotesk</p>
                    <p className="font-display text-4xl font-bold leading-tight text-gray-900 dark:text-brand-text">Technical Brutalism</p>
                </div>
                <div className="col-span-1 bg-[#09090B] border border-gray-200 dark:border-brand-border rounded-xl p-8 shadow-xl">
                    <h3 className="text-brand-mint font-mono text-sm mb-1">Code</h3>
                    <p className="text-2xl font-mono text-brand-text mb-4">JetBrains Mono</p>
                    <div className="bg-[#1e1e1e] p-4 rounded border-l-2 border-brand-mint font-mono text-sm text-left"><span className="text-[#c678dd]">const</span> sys = <span className="text-[#98c379]">'Ready'</span>;</div>
                </div>
            </div>
        </section>
        
        
        <section id="ui-lab" className="py-12 border-t border-gray-200 dark:border-brand-border text-center">
            <p className="text-gray-500 dark:text-brand-muted font-mono">Switch to "Admin CMS" in the navbar to see the Dashboard.</p>
        </section>
    </main>

    
    <div id="view-app" className="hidden fixed inset-0 top-16 z-20 flex bg-gray-50 dark:bg-brand-black transition-opacity duration-300">
        
        
        <aside className="w-64 border-r border-gray-200 dark:border-brand-border bg-white dark:bg-brand-surface flex flex-col hidden md:flex">
            <div className="p-6">
                <div className="text-xs font-mono text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-4">Admin Console</div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-100 dark:bg-brand-surfaceHighlight border border-gray-200 dark:border-brand-border">
                    <div className="w-8 h-8 rounded bg-brand-mint flex items-center justify-center font-bold text-brand-black">M</div>
                    <div className="text-sm">
                        <div className="font-bold text-gray-900 dark:text-brand-text">mrahulrahi</div>
                        <div className="text-xs text-gray-500 dark:text-brand-muted">Super Admin</div>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                <button onclick="switchAppPage('dashboard')" id="nav-dashboard" className="nav-item active w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 dark:text-brand-text">
                    <i data-lucide="layout-dashboard" className="w-4 h-4"></i>
                    Dashboard
                </button>
                
                <div className="pt-4 mt-2 mb-2">
                    <div className="text-xs font-mono text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-2 px-2">Content Manager</div>
                    <button onclick="switchAppPage('portfolio')" id="nav-portfolio" className="nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text">
                        <i data-lucide="briefcase" className="w-4 h-4"></i>
                        Portfolio
                    </button>
                    <button className="nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text">
                        <i data-lucide="component" className="w-4 h-4"></i>
                        Components
                    </button>
                    <button className="nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text">
                        <i data-lucide="pen-tool" className="w-4 h-4"></i>
                        Blog & Notes
                    </button>
                </div>

                <div className="pt-4 mt-2 border-t border-gray-200 dark:border-brand-border">
                    <div className="text-xs font-mono text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-2 px-2">Tools</div>
                    <button onclick="switchAppPage('emi')" id="nav-emi" className="nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text">
                        <i data-lucide="calculator" className="w-4 h-4"></i>
                        Smart EMI
                    </button>
                </div>

                <div className="mt-auto pb-4">
                    <button onclick="switchAppPage('settings')" id="nav-settings" className="nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text">
                        <i data-lucide="settings" className="w-4 h-4"></i>
                        Configuration
                    </button>
                </div>
            </nav>
        </aside>

        
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
            
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-brand-muted font-mono mb-6">
                <span>admin</span>
                <span>/</span>
                <span id="breadcrumb-current" className="text-gray-900 dark:text-brand-text">Dashboard</span>
            </div>

            
            <div id="page-dashboard" className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Site Overview</h2>
                        <p className="text-gray-500 dark:text-brand-muted mt-1">Analytics for mrahulrahi.vercel.app</p>
                    </div>
                    <div className="flex gap-2">
                        <a href="https://mrahulrahi.vercel.app/" target="_blank" className="px-4 py-2 rounded bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border text-sm font-mono flex items-center gap-2 text-gray-900 dark:text-brand-text hover:border-brand-mint transition-colors">
                            <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse"></span> View Live Site
                        </a>
                        <button className="bg-brand-mint hover:bg-brand-fern hover:text-white text-brand-black px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2">
                            <i data-lucide="plus" className="w-4 h-4"></i> New Post
                        </button>
                    </div>
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <i data-lucide="eye" className="w-16 h-16 text-brand-mint"></i>
                        </div>
                        <p className="text-sm font-mono text-gray-500 dark:text-brand-muted">Total Views</p>
                        <p className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text mt-1">142.5k</p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-mono text-brand-mint">
                            <i data-lucide="arrow-up" className="w-3 h-3"></i> 8.4% vs last month
                        </div>
                    </div>
                    <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 relative overflow-hidden group">
                         <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <i data-lucide="download" className="w-16 h-16 text-brand-fern"></i>
                        </div>
                        <p className="text-sm font-mono text-gray-500 dark:text-brand-muted">Library Downloads</p>
                        <p className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text mt-1">8.2k</p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-mono text-brand-mint">
                            <i data-lucide="arrow-up" className="w-3 h-3"></i> 12% vs last month
                        </div>
                    </div>
                    <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <i data-lucide="mouse-pointer" className="w-16 h-16 text-brand-glow"></i>
                        </div>
                        <p className="text-sm font-mono text-gray-500 dark:text-brand-muted">Portfolio Clicks</p>
                        <p className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text mt-1">3,402</p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-mono text-brand-muted">
                            Avg session: 2m 14s
                        </div>
                    </div>
                </div>

                
                <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900 dark:text-brand-text">Traffic Volume</h3>
                        <select className="bg-transparent border border-gray-200 dark:border-brand-border text-xs rounded px-2 py-1 text-gray-500 dark:text-brand-muted outline-none">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <div className="w-full h-80 chart-container">
                        <canvas id="mainDashboardChart"></canvas>
                    </div>
                </div>
            </div>

            
            <div id="page-portfolio" className="hidden space-y-6 animate-fade-in">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Portfolio Manager</h2>
                        <p className="text-gray-500 dark:text-brand-muted mt-1">Manage projects and case studies.</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <i data-lucide="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"></i>
                            <input type="text" placeholder="Search projects..." className="pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border text-sm w-64 focus:border-brand-mint outline-none text-gray-900 dark:text-brand-text"/>
                        </div>
                        <button className="bg-brand-mint text-brand-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-fern hover:text-white transition-colors">Add Project</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl overflow-hidden group hover:border-brand-mint transition-all">
                        <div className="h-40 bg-gray-200 dark:bg-brand-black/50 relative flex items-center justify-center">
                            <i data-lucide="image" className="w-8 h-8 text-gray-400"></i>
                            <div className="absolute top-2 right-2 bg-brand-mint text-brand-black text-[10px] font-bold px-2 py-1 rounded">PUBLISHED</div>
                        </div>
                        <div className="p-5">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">FinTech Dashboard</h3>
                            <p className="text-xs font-mono text-brand-mint mt-1">UX / UI Design</p>
                            <p className="text-sm text-gray-500 dark:text-brand-muted mt-3 h-10 line-clamp-2">A comprehensive dashboard for a banking client focusing on data visualization.</p>
                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-brand-border flex items-center justify-between">
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted"><i data-lucide="edit-3" className="w-4 h-4"></i></button>
                                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted"><i data-lucide="eye" className="w-4 h-4"></i></button>
                                </div>
                                <span className="text-xs text-gray-400">Updated 2d ago</span>
                            </div>
                        </div>
                    </div>

                    
                    <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl overflow-hidden group hover:border-brand-mint transition-all">
                        <div className="h-40 bg-gray-200 dark:bg-brand-black/50 relative flex items-center justify-center">
                            <i data-lucide="image" className="w-8 h-8 text-gray-400"></i>
                            <div className="absolute top-2 right-2 bg-gray-500 text-white text-[10px] font-bold px-2 py-1 rounded">DRAFT</div>
                        </div>
                        <div className="p-5">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">E-commerce Mobile App</h3>
                            <p className="text-xs font-mono text-brand-mint mt-1">Product Design</p>
                            <p className="text-sm text-gray-500 dark:text-brand-muted mt-3 h-10 line-clamp-2">Concept app for a streetwear brand featuring AR try-on.</p>
                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-brand-border flex items-center justify-between">
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted"><i data-lucide="edit-3" className="w-4 h-4"></i></button>
                                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted"><i data-lucide="eye-off" className="w-4 h-4"></i></button>
                                </div>
                                <span className="text-xs text-gray-400">Updated 5h ago</span>
                            </div>
                        </div>
                    </div>

                    
                    <button className="bg-gray-50 dark:bg-brand-surfaceHighlight/30 border border-dashed border-gray-300 dark:border-brand-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-brand-mint hover:bg-brand-mint/5 transition-all group">
                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-brand-surfaceHighlight flex items-center justify-center text-gray-400 group-hover:bg-brand-mint group-hover:text-brand-black transition-colors mb-4">
                            <i data-lucide="plus" className="w-6 h-6"></i>
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">Create New Project</h3>
                        <p className="text-sm text-gray-500 dark:text-brand-muted mt-1">Add a case study to your portfolio</p>
                    </button>
                </div>
            </div>

            
            <div id="page-emi" className="hidden space-y-6 animate-fade-in">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                         <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text flex items-center gap-2">
                             <i data-lucide="refresh-cw" className="w-6 h-6 text-brand-mint"></i>
                             Smart EMI Planner
                         </h2>
                         <p className="text-gray-500 dark:text-brand-muted mt-1">Live Tool Preview</p>
                    </div>
                    <div className="bg-white dark:bg-brand-surface px-4 py-2 rounded-xl border border-gray-200 dark:border-brand-border flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-[10px] text-gray-500 dark:text-brand-muted uppercase font-semibold">Standard EMI</p>
                            <p className="text-lg font-bold text-gray-700 dark:text-brand-text" id="disp-standard-emi">₹0</p>
                        </div>
                        <div className="h-8 w-px bg-gray-200 dark:bg-brand-border"></div>
                        <div className="text-right">
                            <p className="text-[10px] text-brand-mint uppercase font-semibold">Smart EMI</p>
                            <p className="text-lg font-bold text-brand-mint" id="disp-smart-emi">₹0</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    <aside className="lg:col-span-4 space-y-6">
                        <div className="bg-white dark:bg-brand-surface p-6 rounded-xl border border-gray-200 dark:border-brand-border space-y-5">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-brand-text flex items-center gap-2 mb-2">
                                <i data-lucide="wallet" className="w-5 h-5 text-brand-mint"></i>
                                Loan Details
                            </h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-brand-muted mb-1 font-mono">Loan Amount (₹)</label>
                                <input type="number" id="inp-loan" value="5000000" className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono"/>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-brand-muted mb-1 font-mono">Rate (%)</label>
                                    <input type="number" id="inp-rate" step="0.1" value="8.5" className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-brand-muted mb-1 font-mono">Tenure (Yrs)</label>
                                    <input type="number" id="inp-tenure" value="20" className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono"/>
                                </div>
                            </div>

                            <div className="h-px bg-gray-200 dark:bg-brand-border my-4"></div>

                            <h2 className="text-lg font-semibold text-gray-900 dark:text-brand-text flex items-center gap-2 mb-2">
                                <i data-lucide="arrow-up-circle" className="w-5 h-5 text-brand-mint"></i>
                                Smart Modifiers
                            </h2>

                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="block text-sm font-medium text-gray-600 dark:text-brand-muted font-mono">Yearly Increase (%)</label>
                                    <span className="text-sm font-bold text-brand-mint font-mono" id="disp-increase">10%</span>
                                </div>
                                <input type="range" id="inp-increase" min="0" max="25" step="1" value="10" className="w-full h-2 bg-gray-200 dark:bg-brand-black rounded-lg appearance-none cursor-pointer accent-brand-mint"/>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-brand-black rounded-xl border border-gray-200 dark:border-brand-border">
                                <div className="flex items-center gap-3">
                                    <i data-lucide="calendar" className="text-gray-400"></i>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-brand-text">13th EMI Strategy</p>
                                        <p className="text-xs text-gray-500 dark:text-brand-muted">Pay one extra EMI yearly</p>
                                    </div>
                                </div>
                                <button id="btn-toggle-extra" className="w-12 h-6 rounded-full transition-colors relative bg-brand-mint">
                                    <div id="toggle-circle" className="absolute top-1 bg-white dark:bg-brand-black w-4 h-4 rounded-full transition-all left-7"></div>
                                </button>
                            </div>
                        </div>
                    </aside>

                    
                    <main className="lg:col-span-8 space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-brand-surface p-5 rounded-xl border border-gray-200 dark:border-brand-border">
                                <p className="text-gray-500 dark:text-brand-muted text-xs font-bold uppercase tracking-wider mb-1">Interest Saved</p>
                                <span className="text-2xl font-black text-brand-fern dark:text-brand-mint block" id="val-interest-saved">₹0</span>
                            </div>
                            <div className="bg-white dark:bg-brand-surface p-5 rounded-xl border border-gray-200 dark:border-brand-border">
                                <p className="text-gray-500 dark:text-brand-muted text-xs font-bold uppercase tracking-wider mb-1">Time Saved</p>
                                <span className="text-2xl font-black text-blue-600 dark:text-blue-400 block" id="val-time-saved">0y 0m</span>
                            </div>
                            <div className="bg-white dark:bg-brand-surface p-5 rounded-xl border border-gray-200 dark:border-brand-border">
                                <p className="text-gray-500 dark:text-brand-muted text-xs font-bold uppercase tracking-wider mb-1">Total Savings</p>
                                <span className="text-2xl font-black text-gray-900 dark:text-brand-text block" id="val-total-saved">₹0</span>
                            </div>
                        </div>

                        
                        <div className="bg-white dark:bg-brand-surface rounded-xl border border-gray-200 dark:border-brand-border p-6">
                            <div className="w-full h-80 chart-container">
                                <canvas id="emiChart"></canvas>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            
            <div id="page-settings" className="hidden space-y-6 animate-fade-in max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 dark:border-brand-border pb-6">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Configuration</h2>
                        <p className="text-gray-500 dark:text-brand-muted mt-1">Manage admin profile and site metadata.</p>
                    </div>
                </div>

                <div className="space-y-8">
                    
                    <section>
                        <h3 className="text-sm font-bold text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-4">Admin Profile</h3>
                        <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-linear-to-tr from-brand-mint to-brand-fern shrink-0 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                                M
                            </div>
                            <div className="flex-1 space-y-4 w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Username</label>
                                        <input type="text" value="mrahulrahi" disabled className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-brand-black/50 border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted outline-none font-mono text-sm cursor-not-allowed"/>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Email</label>
                                        <input type="email" value="admin@mrahulrahi.com" className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm"/>
                                    </div>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-brand-mint text-brand-black font-medium rounded hover:bg-brand-fern hover:text-white transition-colors text-sm">Save</button>
                        </div>
                    </section>

                    
                    <section>
                        <h3 className="text-sm font-bold text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-4">Site Metadata & SEO</h3>
                        <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Site Title</label>
                                <input type="text" value="mrahulrahi | Portfolio & Tools" className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm"/>
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Meta Description</label>
                                <textarea rows="3" className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm">Design system, UI libraries, and helpful developer tools by mrahulrahi.</textarea>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Twitter URL</label>
                                    <input type="text" placeholder="https://twitter.com/..." className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm"/>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">GitHub URL</label>
                                    <input type="text" placeholder="https://github.com/..." className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm"/>
                                </div>
                            </div>
                            <button className="px-4 py-2 border border-gray-300 dark:border-brand-border text-gray-600 dark:text-brand-muted font-medium rounded hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight transition-colors text-sm">Update Meta</button>
                        </div>
                    </section>

                    
                    <section>
                        <h3 className="text-sm font-bold text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-4">System Preferences</h3>
                        <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl overflow-hidden divide-y divide-gray-100 dark:divide-brand-border">
                            <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-brand-black/30 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded bg-purple-500/10 text-purple-500"><i data-lucide="bell" className="w-4 h-4"></i></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-brand-text">Content Notifications</p>
                                        <p className="text-xs text-gray-500 dark:text-brand-muted">Notify me when comments are posted.</p>
                                    </div>
                                </div>
                                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                    <input type="checkbox" name="toggle" id="toggle-notif" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-brand-mint right-0"/>
                                    <label for="toggle-notif" className="toggle-label block overflow-hidden h-5 rounded-full bg-brand-mint cursor-pointer"></label>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    </div>

    
    <div id="toast" className="fixed bottom-8 right-8 bg-white dark:bg-brand-surface border border-brand-mint text-brand-mint px-6 py-3 rounded shadow-2xl transform translate-y-24 transition-transform duration-300 flex items-center gap-2 z-50 font-mono text-sm">
        <i data-lucide="check-circle" className="w-4 h-4"></i>
        <span id="toast-msg">Copied to clipboard</span>
    </div>

   
</section>
   </div>
    </>
  )
}

export default AdminPage