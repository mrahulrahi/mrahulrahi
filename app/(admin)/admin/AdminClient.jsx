'use client'
import React, { useState, useEffect } from 'react';
import { Sun, Moon, CheckCircle } from 'lucide-react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import PortfolioView from './components/PortfolioView';
import EmiView from './components/EmiView';
import SettingsView from './components/SettingsView';
import StyleguideView from './components/StyleguideView';
import ResumeView from './components/ResumeView';
import InterestsView from './components/InterestsView';

const AdminPage = () => {
    const [activeView, setActiveView] = useState('app'); // 'styleguide' | 'app'
    const [activePage, setActivePage] = useState('dashboard'); // 'dashboard' | 'portfolio' | 'emi' | 'settings'
    const [theme, setTheme] = useState('light');
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('color-theme');
        if (storedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setTheme('dark');
        } else {
            document.documentElement.classList.remove('dark');
            setTheme('light');
        }

        const handleToast = (e) => {
            setToastMessage(e.detail);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        };
        window.addEventListener('show-toast', handleToast);
        return () => window.removeEventListener('show-toast', handleToast);
    }, []);

    const toggleTheme = () => {
        const isDark = theme === 'dark';
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            setTheme('light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            setTheme('dark');
        }
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            const event = new CustomEvent('show-toast', { detail: 'Link copied to clipboard' });
            window.dispatchEvent(event);
        });
    };

    return (
        <div className="bg-gray-50 text-gray-900 dark:bg-brand-black dark:text-brand-text font-sans antialiased selection:bg-brand-mint selection:text-brand-black transition-colors duration-300 overflow-x-hidden min-h-screen">
            <div className="fixed inset-0 bg-grid-pattern opacity-[0.4] dark:opacity-[0.07] pointer-events-none z-0 bg-grid transition-opacity duration-300"></div>

            <nav className="fixed top-0 w-full z-50 glass border-b border-gray-200 dark:border-brand-border h-16 flex items-center px-6 lg:px-8 justify-between transition-colors duration-300">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
                    <div className="w-8 h-8 bg-brand-mint/10 border border-brand-mint/30 rounded flex items-center justify-center text-brand-mint font-mono font-bold transition-all duration-300">m</div>
                    <span className="font-display font-bold text-lg tracking-wide text-gray-900 dark:text-brand-text">mrahulrahi</span>
                </div>

                <div className="hidden md:flex bg-gray-100 dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-lg p-1">
                    <button 
                        onClick={() => setActiveView('styleguide')} 
                        className={`px-4 py-1.5 rounded text-sm font-medium transition-all shadow-sm ${activeView === 'styleguide' ? 'bg-white dark:bg-brand-surfaceHighlight text-gray-900 dark:text-white' : 'text-gray-500 dark:text-brand-muted hover:text-gray-900 dark:hover:text-white'}`}
                    >
                        Style Guide
                    </button>
                    <button 
                        onClick={() => setActiveView('app')} 
                        className={`px-4 py-1.5 rounded text-sm font-medium transition-all shadow-sm ${activeView === 'app' ? 'bg-white dark:bg-brand-surfaceHighlight text-gray-900 dark:text-white' : 'text-gray-500 dark:text-brand-muted hover:text-gray-900 dark:hover:text-white'}`}
                    >
                        Admin CMS
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={toggleTheme} className="p-2 rounded-full border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted hover:text-brand-mint hover:border-brand-mint transition-all">
                        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                    <button onClick={copyLink} className="hidden sm:block border border-gray-200 dark:border-brand-border hover:border-brand-mint hover:text-brand-mint text-gray-500 dark:text-brand-muted px-4 py-2 rounded text-xs font-mono transition-all">
                        Share
                    </button>
                </div>
            </nav>

            {activeView === 'styleguide' ? (
                <StyleguideView />
            ) : (
                <div className="fixed inset-0 top-16 z-20 flex bg-gray-50 dark:bg-brand-black transition-opacity duration-300">
                    <Sidebar activePage={activePage} setActivePage={setActivePage} />

                    <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-brand-muted font-mono mb-6">
                            <span>admin</span>
                            <span>/</span>
                            <span className="text-gray-900 dark:text-brand-text capitalize">{activePage}</span>
                        </div>

                        {activePage === 'dashboard' && <DashboardView theme={theme} />}
                        {activePage === 'portfolio' && <PortfolioView />}
                        {activePage === 'resume' && <ResumeView />}
                        {activePage === 'interests' && <InterestsView />}
                        {activePage === 'emi' && <EmiView theme={theme} />}
                        {activePage === 'settings' && <SettingsView />}
                    </main>
                </div>
            )}

            <div className={`fixed bottom-8 right-8 bg-white dark:bg-brand-surface border border-brand-mint text-brand-mint px-6 py-3 rounded shadow-2xl transform transition-transform duration-300 flex items-center gap-2 z-50 font-mono text-sm ${showToast ? 'translate-y-0' : 'translate-y-24'}`}>
                <CheckCircle className="w-4 h-4" />
                <span>{toastMessage || 'Copied to clipboard'}</span>
            </div>
        </div>
    );
};

export default AdminPage;