'use client'
import React, { useState, useEffect } from 'react';
import { Search, Eye, EyeOff, Component, PenTool, CheckCircle, Info } from 'lucide-react';
import { getUiToolsData, saveUiComponentVisibility, saveToolVisibility } from '../dataActions';

const UiToolsView = () => {
    const [uiComponents, setUiComponents] = useState([]);
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('components'); // 'components' | 'tools'
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await getUiToolsData();
            setUiComponents(data.uiComponents || []);
            setTools(data.tools || []);
        } catch (e) {
            console.error("Error loading visibility data", e);
            dispatchToast('Failed to load visibility settings');
        }
        setLoading(false);
    };

    const handleUiToggle = async (id, currentVisible) => {
        const nextVisible = !currentVisible;
        
        // Optimistic UI update
        setUiComponents(prev => 
            prev.map(item => item.id === id ? { ...item, visible: nextVisible } : item)
        );

        try {
            await saveUiComponentVisibility(id, nextVisible);
            dispatchToast(`"${id}" is now ${nextVisible ? 'visible to public' : 'hidden from public'}`);
        } catch (err) {
            console.error("Failed to save component visibility", err);
            dispatchToast('Error updating component visibility');
            // Rollback state
            setUiComponents(prev => 
                prev.map(item => item.id === id ? { ...item, visible: currentVisible } : item)
            );
        }
    };

    const handleToolToggle = async (id, currentVisible) => {
        const nextVisible = !currentVisible;

        // Optimistic UI update
        setTools(prev => 
            prev.map(item => item.id === id ? { ...item, visible: nextVisible } : item)
        );

        try {
            await saveToolVisibility(id, nextVisible);
            dispatchToast(`"${id}" is now ${nextVisible ? 'visible to public' : 'hidden from public'}`);
        } catch (err) {
            console.error("Failed to save tool visibility", err);
            dispatchToast('Error updating tool visibility');
            // Rollback state
            setTools(prev => 
                prev.map(item => item.id === id ? { ...item, visible: currentVisible } : item)
            );
        }
    };

    const dispatchToast = (msg) => {
        window.dispatchEvent(new CustomEvent('show-toast', { detail: msg }));
    };

    // Filter list by search query
    const filteredComponents = uiComponents.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredTools = tools.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Heading */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">UI & Tools Visibility</h2>
                    <p className="text-gray-500 dark:text-brand-muted mt-1">Control which components and interactive applications are visible on public routes.</p>
                </div>
            </div>

            {/* Tab Navigation and Search Panel */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border p-3 rounded-xl">
                <div className="flex bg-gray-100 dark:bg-brand-black border border-gray-200 dark:border-brand-border rounded-lg p-1 shrink-0">
                    <button
                        onClick={() => { setActiveTab('components'); setSearchQuery(''); }}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all shadow-sm flex items-center gap-2 ${activeTab === 'components' ? 'bg-white dark:bg-brand-surfaceHighlight text-gray-900 dark:text-white' : 'text-gray-500 dark:text-brand-muted hover:text-gray-900 dark:hover:text-white'}`}
                    >
                        <Component className="w-4 h-4" />
                        UI Components ({uiComponents.length})
                    </button>
                    <button
                        onClick={() => { setActiveTab('tools'); setSearchQuery(''); }}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all shadow-sm flex items-center gap-2 ${activeTab === 'tools' ? 'bg-white dark:bg-brand-surfaceHighlight text-gray-900 dark:text-white' : 'text-gray-500 dark:text-brand-muted hover:text-gray-900 dark:hover:text-white'}`}
                    >
                        <PenTool className="w-4 h-4" />
                        Interactive Tools ({tools.length})
                    </button>
                </div>

                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder={`Search ${activeTab === 'components' ? 'components' : 'tools'}...`}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm transition-colors"
                    />
                </div>
            </div>

            {/* Info Alert */}
            <div className="bg-brand-mint/5 border border-brand-mint/20 rounded-xl p-4 flex gap-3 text-xs text-brand-mint/90">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                    <p className="font-bold mb-0.5">Admin Control Center</p>
                    <p>Toggling a card's visibility state directly affects whether that item shows up for public users visiting the `/ui` (Component Explorer) or `/tools` routes. The changes are written securely to `db.json` and are reflected instantly without requiring any site rebuilds.</p>
                </div>
            </div>

            {/* Content Lists */}
            {loading ? (
                <div className="text-center py-16 text-gray-500 font-mono flex items-center justify-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-mint animate-ping"></span>
                    Loading visibility datasets...
                </div>
            ) : (
                <>
                    {activeTab === 'components' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredComponents.length > 0 ? (
                                filteredComponents.map(item => (
                                    <div key={item.id} className={`bg-white dark:bg-brand-surface border rounded-xl p-5 transition-all flex flex-col justify-between hover:shadow-md ${item.visible ? 'border-brand-mint/50 dark:border-brand-mint/30' : 'border-gray-200 dark:border-brand-border'}`}>
                                        <div>
                                            <div className="flex items-center justify-between gap-4 mb-3">
                                                <span className="text-[10px] font-mono bg-gray-100 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted px-2 py-0.5 rounded">
                                                    {item.id}
                                                </span>
                                                <div className="flex items-center gap-1.5 text-xs font-semibold">
                                                    {item.visible ? (
                                                        <span className="text-brand-mint flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> Public</span>
                                                    ) : (
                                                        <span className="text-gray-400 flex items-center gap-1"><EyeOff className="w-3.5 h-3.5" /> Hidden</span>
                                                    )}
                                                </div>
                                            </div>
                                            <h3 className="text-base font-bold text-gray-900 dark:text-brand-text mb-1">{item.name}</h3>
                                            <p className="text-xs text-gray-500 dark:text-brand-muted line-clamp-2 leading-relaxed">{item.description}</p>
                                        </div>

                                        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-brand-border flex items-center justify-between">
                                            <span className="text-[11px] font-mono text-gray-400">Visibility Toggle</span>
                                            <button
                                                type="button"
                                                onClick={() => handleUiToggle(item.id, item.visible)}
                                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                                                    item.visible ? 'bg-brand-mint' : 'bg-gray-200 dark:bg-brand-border'
                                                }`}
                                            >
                                                <span
                                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-brand-black shadow ring-0 transition duration-200 ease-in-out ${
                                                        item.visible ? 'translate-x-5' : 'translate-x-0'
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 text-gray-500 border border-dashed border-gray-200 dark:border-brand-border rounded-xl">
                                    No components matching your search.
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTools.length > 0 ? (
                                filteredTools.map(item => (
                                    <div key={item.id} className={`bg-white dark:bg-brand-surface border rounded-xl p-5 transition-all flex flex-col justify-between hover:shadow-md ${item.visible ? 'border-brand-mint/50 dark:border-brand-mint/30' : 'border-gray-200 dark:border-brand-border'}`}>
                                        <div>
                                            <div className="flex items-center justify-between gap-4 mb-3">
                                                <span className="text-[10px] font-mono bg-gray-100 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted px-2 py-0.5 rounded truncate max-w-[200px]" title={item.href}>
                                                    {item.href}
                                                </span>
                                                <div className="flex items-center gap-1.5 text-xs font-semibold">
                                                    {item.visible ? (
                                                        <span className="text-brand-mint flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> Public</span>
                                                    ) : (
                                                        <span className="text-gray-400 flex items-center gap-1"><EyeOff className="w-3.5 h-3.5" /> Hidden</span>
                                                    )}
                                                </div>
                                            </div>
                                            <h3 className="text-base font-bold text-gray-900 dark:text-brand-text mb-1">{item.name}</h3>
                                            <p className="text-xs text-gray-500 dark:text-brand-muted line-clamp-2 leading-relaxed">{item.description}</p>
                                        </div>

                                        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-brand-border flex items-center justify-between">
                                            <span className="text-[11px] font-mono text-gray-400">Visibility Toggle</span>
                                            <button
                                                type="button"
                                                onClick={() => handleToolToggle(item.id, item.visible)}
                                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                                                    item.visible ? 'bg-brand-mint' : 'bg-gray-200 dark:bg-brand-border'
                                                }`}
                                            >
                                                <span
                                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-brand-black shadow ring-0 transition duration-200 ease-in-out ${
                                                        item.visible ? 'translate-x-5' : 'translate-x-0'
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 text-gray-500 border border-dashed border-gray-200 dark:border-brand-border rounded-xl">
                                    No tools matching your search.
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default UiToolsView;
