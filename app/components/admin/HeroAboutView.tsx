'use client'
import React, { useState, useEffect } from 'react';
import { User, Sparkles } from 'lucide-react';
import { getPortfolioData, saveHeroData, saveAboutData, HeroData, AboutData } from '@/app/(admin)/admin/dataActions';

const HeroAboutView: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [hero, setHero] = useState<HeroData>({
        hey: '',
        firstName: '',
        lastName: '',
        role: '',
        location: '',
        description: ''
    });
    const [about, setAbout] = useState<AboutData>({
        subheading: '',
        name: '',
        role: '',
        description: '',
        stackPrefix: '',
        stack: '',
        resumeTitle: '',
        resumeUrl: '',
        imageUrl: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await getPortfolioData();
            if (data.hero) setHero(data.hero);
            if (data.about) setAbout(data.about);
        } catch (e) {
            console.error("Error loading Hero/About data", e);
        }
        setLoading(false);
    };

    const handleSaveHero = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await saveHeroData(hero);
            dispatchToast('Hero section updated successfully');
        } catch (err) {
            dispatchToast('Failed to save Hero section');
        }
    };

    const handleSaveAbout = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await saveAboutData(about);
            dispatchToast('About section updated successfully');
        } catch (err) {
            dispatchToast('Failed to save About section');
        }
    };

    const dispatchToast = (msg: string) => {
        window.dispatchEvent(new CustomEvent('show-toast', { detail: msg }));
    };

    if (loading) {
        return <div className="text-center py-12 text-gray-500 font-mono">Loading dynamic configuration...</div>;
    }

    return (
        <div className="space-y-8 animate-fade-in max-w-4xl">
            <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Hero & About Manager</h2>
                <p className="text-gray-500 dark:text-brand-muted mt-1">Manage the core identity texts, summaries, image paths, and download links.</p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Hero Form */}
                <section className="bg-white dark:bg-brand-surface p-6 rounded-xl border border-gray-200 dark:border-brand-border space-y-4">
                    <div className="flex items-center gap-3 border-b border-gray-100 dark:border-brand-border pb-4 mb-2">
                        <div className="p-2 bg-brand-mint/10 text-brand-mint rounded-lg"><Sparkles className="w-5 h-5" /></div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-brand-text">1. Landing Hero Text</h3>
                    </div>

                    <form onSubmit={handleSaveHero} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Hey Tagline</label>
                                <input required type="text" value={hero.hey} onChange={e => setHero({...hero, hey: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Location Tag</label>
                                <input required type="text" value={hero.location} onChange={e => setHero({...hero, location: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">First Name</label>
                                <input required type="text" value={hero.firstName} onChange={e => setHero({...hero, firstName: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Last Name</label>
                                <input required type="text" value={hero.lastName} onChange={e => setHero({...hero, lastName: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Hero Subheading / Profession</label>
                            <input required type="text" value={hero.role} onChange={e => setHero({...hero, role: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Hero Description</label>
                            <textarea required rows={3} value={hero.description} onChange={e => setHero({...hero, description: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm"></textarea>
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" className="bg-brand-mint text-brand-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-brand-fern hover:text-white transition-colors">Update Hero Settings</button>
                        </div>
                    </form>
                </section>

                {/* About Form */}
                <section className="bg-white dark:bg-brand-surface p-6 rounded-xl border border-gray-200 dark:border-brand-border space-y-4">
                    <div className="flex items-center gap-3 border-b border-gray-100 dark:border-brand-border pb-4 mb-2">
                        <div className="p-2 bg-brand-mint/10 text-brand-mint rounded-lg"><User className="w-5 h-5" /></div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-brand-text">2. Detailed About Info</h3>
                    </div>

                    <form onSubmit={handleSaveAbout} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Greeting Subheading</label>
                                <input required type="text" value={about.subheading} onChange={e => setAbout({...about, subheading: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Display Name</label>
                                <input required type="text" value={about.name} onChange={e => setAbout({...about, name: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Profession</label>
                                <input required type="text" value={about.role} onChange={e => setAbout({...about, role: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Image URL</label>
                                <input required type="text" value={about.imageUrl} onChange={e => setAbout({...about, imageUrl: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Stack Prefix Text (e.g. 'Stack - ')</label>
                                <input required type="text" value={about.stackPrefix} onChange={e => setAbout({...about, stackPrefix: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Stack/Technology list</label>
                                <input required type="text" value={about.stack} onChange={e => setAbout({...about, stack: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Resume Button Title</label>
                                <input required type="text" value={about.resumeTitle} onChange={e => setAbout({...about, resumeTitle: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Resume Link (FlowCV, Drive, etc.)</label>
                                <input required type="text" value={about.resumeUrl} onChange={e => setAbout({...about, resumeUrl: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">About Bio Paragraph</label>
                            <textarea required rows={4} value={about.description} onChange={e => setAbout({...about, description: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm"></textarea>
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" className="bg-brand-mint text-brand-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-brand-fern hover:text-white transition-colors">Update About Settings</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default HeroAboutView;
