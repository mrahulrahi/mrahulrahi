import React from 'react';
import { Search, Image as ImageIcon, Edit3, Eye, EyeOff, Plus } from 'lucide-react';

const PortfolioView = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Portfolio Manager</h2>
                    <p className="text-gray-500 dark:text-brand-muted mt-1">Manage projects and case studies.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search projects..." className="pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border text-sm w-64 focus:border-brand-mint outline-none text-gray-900 dark:text-brand-text" />
                    </div>
                    <button className="bg-brand-mint text-brand-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-fern hover:text-white transition-colors">Add Project</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl overflow-hidden group hover:border-brand-mint transition-all">
                    <div className="h-40 bg-gray-200 dark:bg-brand-black/50 relative flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                        <div className="absolute top-2 right-2 bg-brand-mint text-brand-black text-[10px] font-bold px-2 py-1 rounded">PUBLISHED</div>
                    </div>
                    <div className="p-5">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">FinTech Dashboard</h3>
                        <p className="text-xs font-mono text-brand-mint mt-1">UX / UI Design</p>
                        <p className="text-sm text-gray-500 dark:text-brand-muted mt-3 h-10 line-clamp-2">A comprehensive dashboard for a banking client focusing on data visualization.</p>
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-brand-border flex items-center justify-between">
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted"><Edit3 className="w-4 h-4" /></button>
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted"><Eye className="w-4 h-4" /></button>
                            </div>
                            <span className="text-xs text-gray-400">Updated 2d ago</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl overflow-hidden group hover:border-brand-mint transition-all">
                    <div className="h-40 bg-gray-200 dark:bg-brand-black/50 relative flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                        <div className="absolute top-2 right-2 bg-gray-500 text-white text-[10px] font-bold px-2 py-1 rounded">DRAFT</div>
                    </div>
                    <div className="p-5">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">E-commerce Mobile App</h3>
                        <p className="text-xs font-mono text-brand-mint mt-1">Product Design</p>
                        <p className="text-sm text-gray-500 dark:text-brand-muted mt-3 h-10 line-clamp-2">Concept app for a streetwear brand featuring AR try-on.</p>
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-brand-border flex items-center justify-between">
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted"><Edit3 className="w-4 h-4" /></button>
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted"><EyeOff className="w-4 h-4" /></button>
                            </div>
                            <span className="text-xs text-gray-400">Updated 5h ago</span>
                        </div>
                    </div>
                </div>

                <button className="bg-gray-50 dark:bg-brand-surfaceHighlight/30 border border-dashed border-gray-300 dark:border-brand-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-brand-mint hover:bg-brand-mint/5 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-brand-surfaceHighlight flex items-center justify-center text-gray-400 group-hover:bg-brand-mint group-hover:text-brand-black transition-colors mb-4">
                        <Plus className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">Create New Project</h3>
                    <p className="text-sm text-gray-500 dark:text-brand-muted mt-1">Add a case study to your portfolio</p>
                </button>
            </div>
        </div>
    );
};

export default PortfolioView;
