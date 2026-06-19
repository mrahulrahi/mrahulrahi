'use client'
import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Heart } from 'lucide-react';
import { getPortfolioData, saveInterest, deleteInterest, Interest, TagItem } from '@/app/(admin)/admin/dataActions';

const InterestsView: React.FC = () => {
    const [interests, setInterests] = useState<Interest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentInterest, setCurrentInterest] = useState<Interest | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await getPortfolioData();
            setInterests(data.interest || []);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const handleEdit = (interest: Interest) => {
        setCurrentInterest({ ...interest, items: interest.items ? [...interest.items] : [] });
        setIsEditing(true);
    };

    const handleAdd = () => {
        setCurrentInterest({ title: '', desc: '', url: '', imgUrl: '', items: [{ label: '', icon: '' }], createdBy: 'Rahi' });
        setIsEditing(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this interest?")) {
            await deleteInterest(id);
            dispatchToast('Interest deleted');
            loadData();
        }
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!currentInterest) return;
        await saveInterest(currentInterest);
        dispatchToast('Interest saved successfully');
        setIsEditing(false);
        loadData();
    };

    const dispatchToast = (msg: string) => {
        window.dispatchEvent(new CustomEvent('show-toast', { detail: msg }));
    };

    const addItem = () => {
        if (!currentInterest) return;
        setCurrentInterest({
            ...currentInterest,
            items: [...(currentInterest.items || []), { label: '', icon: '' }]
        });
    };

    const updateItem = (index: number, field: keyof TagItem, value: string) => {
        if (!currentInterest || !currentInterest.items) return;
        const newItems = [...currentInterest.items];
        newItems[index] = {
            ...newItems[index],
            [field]: value
        };
        setCurrentInterest({ ...currentInterest, items: newItems });
    };

    const removeItem = (index: number) => {
        if (!currentInterest || !currentInterest.items) return;
        const newItems = currentInterest.items.filter((_, i) => i !== index);
        setCurrentInterest({ ...currentInterest, items: newItems });
    };

    if (isEditing) {
        if (!currentInterest) return null;
        return (
            <div className="space-y-6 animate-fade-in max-w-4xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-brand-text">
                        {currentInterest.id ? 'Edit Interest' : 'New Interest'}
                    </h2>
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">Cancel</button>
                </div>
                
                <form onSubmit={handleSave} className="bg-white dark:bg-brand-surface p-6 rounded-xl border border-gray-200 dark:border-brand-border space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Title</label>
                            <input required type="text" value={currentInterest.title} onChange={e => setCurrentInterest({...currentInterest, title: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">URL (Main Link)</label>
                            <input required type="text" value={currentInterest.url} onChange={e => setCurrentInterest({...currentInterest, url: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Image URL</label>
                            <input required type="text" value={currentInterest.imgUrl} onChange={e => setCurrentInterest({...currentInterest, imgUrl: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Created By</label>
                            <input required type="text" value={currentInterest.createdBy || ''} onChange={e => setCurrentInterest({...currentInterest, createdBy: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Description</label>
                        <textarea required rows={3} value={currentInterest.desc} onChange={e => setCurrentInterest({...currentInterest, desc: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm"></textarea>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-brand-border">
                        <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted">Sub-links / Tags</label>
                        {(currentInterest.items || []).map((item, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                                <input required type="text" placeholder="Label (e.g. YouTube)" value={item.label} onChange={e => updateItem(idx, 'label', e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-sm outline-none focus:border-brand-mint text-gray-900 dark:text-brand-text" />
                                <input required type="text" placeholder="Icon Name (e.g. LuYoutube)" value={item.icon} onChange={e => updateItem(idx, 'icon', e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-sm outline-none focus:border-brand-mint text-gray-900 dark:text-brand-text" />
                                <button type="button" onClick={() => removeItem(idx)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        ))}
                        <button type="button" onClick={addItem} className="text-sm text-brand-mint font-bold hover:underline">+ Add Tag</button>
                    </div>
                    
                    <button type="submit" className="bg-brand-mint text-brand-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-brand-fern hover:text-white transition-colors mt-4">Save Interest</button>
                </form>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Interests & External Links</h2>
                    <p className="text-gray-500 dark:text-brand-muted mt-1">Manage side projects and external platforms.</p>
                </div>
                <button onClick={handleAdd} className="bg-brand-mint text-brand-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-fern hover:text-white transition-colors">Add Interest</button>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500 font-mono">Loading data...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {interests.map((interest) => (
                        <div key={interest.id} className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl overflow-hidden group hover:border-brand-mint transition-all flex flex-col">
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-start gap-4 mb-4">
                                    {interest.imgUrl ? (
                                        <img src={interest.imgUrl} alt={interest.title} className="w-16 h-16 rounded object-cover border border-gray-200 dark:border-brand-border bg-white" />
                                    ) : (
                                        <div className="w-16 h-16 rounded flex items-center justify-center bg-brand-mint/10 text-brand-mint"><Heart className="w-6 h-6" /></div>
                                    )}
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">{interest.title}</h3>
                                        <a href={interest.url} target="_blank" rel="noreferrer" className="text-xs font-mono text-brand-mint mt-1 hover:underline truncate block w-48">{interest.url}</a>
                                    </div>
                                </div>
                                
                                <p className="text-sm text-gray-500 dark:text-brand-muted mb-4 line-clamp-3">{interest.desc}</p>
                                
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {(interest.items || []).map((it, idx) => (
                                        <span key={idx} className="text-[10px] px-2 py-1 bg-gray-100 dark:bg-brand-surfaceHighlight rounded font-mono text-gray-600 dark:text-brand-muted border border-gray-200 dark:border-brand-border">
                                            {it.icon}: {it.label}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-brand-border flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(interest)} className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted"><Edit3 className="w-4 h-4" /></button>
                                        <button onClick={() => interest.id !== undefined && handleDelete(interest.id)} className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                    <span className="text-xs text-gray-400">By: {interest.createdBy}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button onClick={handleAdd} className="bg-gray-50 dark:bg-brand-surfaceHighlight/30 border border-dashed border-gray-300 dark:border-brand-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-brand-mint hover:bg-brand-mint/5 transition-all group min-h-[200px]">
                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-brand-surfaceHighlight flex items-center justify-center text-gray-400 group-hover:bg-brand-mint group-hover:text-brand-black transition-colors mb-4">
                            <Plus className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">Add Interest Profile</h3>
                    </button>
                </div>
            )}
        </div>
    );
};

export default InterestsView;
