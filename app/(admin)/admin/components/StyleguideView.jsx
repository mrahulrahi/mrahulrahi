import React, { useState, useEffect } from 'react';

const StyleguideView = () => {
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCursorVisible(v => !v);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const copyColor = (color, name) => {
        navigator.clipboard.writeText(color);
        // You could dispatch a custom event here to trigger the global toast, 
        // or accept a showToast function as a prop.
        const event = new CustomEvent('show-toast', { detail: `${name} (${color}) copied` });
        window.dispatchEvent(event);
    };

    return (
        <main className="relative z-10 pt-24 px-6 lg:px-12 max-w-7xl mx-auto pb-20 space-y-24 transition-opacity duration-300">
            <div className="flex flex-wrap gap-4 md:gap-8 text-sm font-mono text-gray-500 dark:text-brand-muted border-b border-gray-200 dark:border-brand-border pb-4 mb-8">
                <a href="#essence" className="hover:text-brand-mint transition-colors">01.Essence</a>
                <a href="#palette" className="hover:text-brand-mint transition-colors">02.Palette</a>
                <a href="#typography" className="hover:text-brand-mint transition-colors">03.Type</a>
                <a href="#ui-lab" className="hover:text-brand-mint transition-colors">04.UI_Lab</a>
            </div>

            <section id="essence" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border text-xs font-mono text-brand-mint shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse"></span>
                        v1.0.0 System Online
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight text-gray-900 dark:text-brand-text">
                        Structured <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-mint to-brand-fern">Ecology</span>
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
                            &gt; Status: <span className="text-brand-mint">Online</span><span className={`w-2 h-4 bg-brand-mint block ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
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
                    <div onClick={() => copyColor('#09090B', 'Void Black')} className="group relative aspect-square rounded-xl border border-gray-200 dark:border-brand-border bg-brand-black flex flex-col justify-between p-4 cursor-pointer transition-all hover:border-brand-mint hover:shadow-lg overflow-hidden shadow-sm">
                        <div className="absolute inset-0 bg-[#09090B]"></div>
                        <span className="relative z-10 text-xs font-mono bg-brand-black/50 backdrop-blur px-2 py-1 rounded text-white w-max border border-white/10">Main BG</span>
                        <div className="relative z-10 flex justify-between items-end"><span className="font-display font-bold text-white">Void Black</span><span className="font-mono text-xs text-brand-muted">#09090B</span></div>
                    </div>
                    <div onClick={() => copyColor('#00DC82', 'Electric Mint')} className="group relative aspect-square rounded-xl border border-gray-200 dark:border-brand-border bg-brand-mint flex flex-col justify-between p-4 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg overflow-hidden shadow-sm">
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
    );
};

export default StyleguideView;
