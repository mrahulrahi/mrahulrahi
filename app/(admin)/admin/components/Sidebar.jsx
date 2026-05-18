import React from 'react';
import { 
    LayoutDashboard, 
    Briefcase, 
    Component, 
    PenTool, 
    Calculator, 
    Settings 
} from 'lucide-react';

const Sidebar = ({ activePage, setActivePage }) => {
    return (
        <aside className="w-64 border-r border-gray-200 dark:border-brand-border bg-white dark:bg-brand-surface flex-col hidden md:flex">
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
                <button 
                    onClick={() => setActivePage('dashboard')} 
                    className={`nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activePage === 'dashboard' ? 'active' : 'text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text'}`}
                >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                </button>

                <div className="pt-4 mt-2 mb-2">
                    <div className="text-xs font-mono text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-2 px-2">Content Manager</div>
                    <button 
                        onClick={() => setActivePage('portfolio')} 
                        className={`nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activePage === 'portfolio' ? 'active' : 'text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text'}`}
                    >
                        <Briefcase className="w-4 h-4" />
                        Portfolio
                    </button>
                    <button className="nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text">
                        <Component className="w-4 h-4" />
                        Components
                    </button>
                    <button className="nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text">
                        <PenTool className="w-4 h-4" />
                        Blog & Notes
                    </button>
                </div>

                <div className="pt-4 mt-2 border-t border-gray-200 dark:border-brand-border">
                    <div className="text-xs font-mono text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-2 px-2">Tools</div>
                    <button 
                        onClick={() => setActivePage('emi')} 
                        className={`nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activePage === 'emi' ? 'active' : 'text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text'}`}
                    >
                        <Calculator className="w-4 h-4" />
                        Smart EMI
                    </button>
                </div>

                <div className="mt-auto pb-4">
                    <button 
                        onClick={() => setActivePage('settings')} 
                        className={`nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activePage === 'settings' ? 'active' : 'text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text'}`}
                    >
                        <Settings className="w-4 h-4" />
                        Configuration
                    </button>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
