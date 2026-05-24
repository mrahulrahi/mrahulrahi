'use client'
import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, TrendingUp, Info } from 'lucide-react';
import { getPortfolioData, saveStatItem, deleteStatItem } from '../dataActions';

const StatsView = () => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentStat, setCurrentStat] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await getPortfolioData();
            setStats(data.stats || []);
        } catch (e) {
            console.error("Error loading stats", e);
        }
        setLoading(false);
    };

    const handleEdit = (stat) => {
        setCurrentStat({ ...stat });
        setIsEditing(true);
    };

    const handleAdd = () => {
        setCurrentStat({ icon: 'FaUserGraduate', countEnd: 1, suffix: ' +', description: '' });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this stat?")) {
            await deleteStatItem(id);
            dispatchToast('Stat deleted');
            loadData();
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...currentStat, countEnd: Number(currentStat.countEnd) };
            await saveStatItem(payload);
            dispatchToast('Stat saved successfully');
            setIsEditing(false);
            loadData();
        } catch (err) {
            dispatchToast('Failed to save stat');
        }
    };

    const dispatchToast = (msg) => {
        window.dispatchEvent(new CustomEvent('show-toast', { detail: msg }));
    };

    if (isEditing) {
        return (
            <div className="space-y-6 animate-fade-in max-w-3xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-brand-text">
                        {currentStat.id ? 'Edit Stat Card' : 'New Stat Card'}
                    </h2>
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">Cancel</button>
                </div>

                <form onSubmit={handleSave} className="bg-white dark:bg-brand-surface p-6 rounded-xl border border-gray-200 dark:border-brand-border space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Value (Ending Number)</label>
                            <input required type="number" value={currentStat.countEnd} onChange={e => setCurrentStat({...currentStat, countEnd: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Suffix (e.g. ' +', '%', 'h')</label>
                            <input required type="text" value={currentStat.suffix} onChange={e => setCurrentStat({...currentStat, suffix: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Icon Name (React Icons)</label>
                            <input required type="text" value={currentStat.icon} onChange={e => setCurrentStat({...currentStat, icon: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                            <span className="text-[10px] text-gray-400 mt-1 block">e.g. FaUserGraduate, MdWeb, FaClock, FaGitAlt, FaLayerGroup</span>
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Description / Title</label>
                            <input required type="text" value={currentStat.description} onChange={e => setCurrentStat({...currentStat, description: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>
                    </div>

                    <div className="bg-brand-mint/5 border border-brand-mint/20 rounded-lg p-4 flex gap-3 text-xs text-brand-mint/90">
                        <Info className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold mb-1">Dynamic Icon Packs Supported</p>
                            <p>You can use standard React Icon classes from FontAwesome (Fa/Fa6), RemixIcons (Ri), MaterialIcons (Md), SimpleIcons (Si), Tabler (Tb), and Lucide (Lu).</p>
                        </div>
                    </div>

                    <button type="submit" className="bg-brand-mint text-brand-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-brand-fern hover:text-white transition-colors">Save Stat Card</button>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Stats Manager</h2>
                    <p className="text-gray-500 dark:text-brand-muted mt-1">Manage numbers, achievements, and impact counters shown on the main page.</p>
                </div>
                <button onClick={handleAdd} className="bg-brand-mint text-brand-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-fern hover:text-white transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Stat Card
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500 font-mono">Loading dynamic counters...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map(stat => (
                        <div key={stat.id} className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-5 group hover:border-brand-mint transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-brand-mint/10 text-brand-mint rounded-lg"><TrendingUp className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-2xl font-display font-bold text-gray-900 dark:text-brand-text">{stat.countEnd}{stat.suffix}</p>
                                        <p className="text-xs text-gray-400 font-mono">Icon: {stat.icon}</p>
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-gray-700 dark:text-brand-muted mb-4">{stat.description}</p>
                            </div>
                            <div className="pt-4 border-t border-gray-100 dark:border-brand-border flex items-center justify-between">
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(stat)} className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted"><Edit3 className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(stat.id)} className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                                </div>
                                <span className="text-xs text-gray-400">ID: {stat.id}</span>
                            </div>
                        </div>
                    ))}

                    <button onClick={handleAdd} className="bg-gray-50 dark:bg-brand-surfaceHighlight/30 border border-dashed border-gray-300 dark:border-brand-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-brand-mint hover:bg-brand-mint/5 transition-all group min-h-[160px]">
                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-brand-surfaceHighlight flex items-center justify-center text-gray-400 group-hover:bg-brand-mint group-hover:text-brand-black transition-colors mb-2"><Plus className="w-5 h-5" /></div>
                        <h3 className="font-bold text-base text-gray-900 dark:text-brand-text">Create Stat Card</h3>
                    </button>
                </div>
            )}
        </div>
    );
};

export default StatsView;
