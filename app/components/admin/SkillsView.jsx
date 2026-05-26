'use client'
import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Library, Info } from 'lucide-react';
import { getPortfolioData, saveSkillItem, deleteSkillItem } from '@/app/(admin)/admin/dataActions';

const SkillsView = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkill, setCurrentSkill] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await getPortfolioData();
            setSkills(data.skills || []);
        } catch (e) {
            console.error("Error loading skills", e);
        }
        setLoading(false);
    };

    const handleEdit = (skill) => {
        setCurrentSkill({ ...skill });
        setIsEditing(true);
    };

    const handleAdd = () => {
        setCurrentSkill({ icon: 'FaReact', title: '' });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this skill?")) {
            await deleteSkillItem(id);
            dispatchToast('Skill deleted');
            loadData();
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await saveSkillItem(currentSkill);
            dispatchToast('Skill saved successfully');
            setIsEditing(false);
            loadData();
        } catch (err) {
            dispatchToast('Failed to save skill');
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
                        {currentSkill.id ? 'Edit Skill Tool' : 'New Skill Tool'}
                    </h2>
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">Cancel</button>
                </div>

                <form onSubmit={handleSave} className="bg-white dark:bg-brand-surface p-6 rounded-xl border border-gray-200 dark:border-brand-border space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Skill Name / Title</label>
                            <input required type="text" value={currentSkill.title} onChange={e => setCurrentSkill({...currentSkill, title: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Icon Name (React Icons)</label>
                            <input required type="text" value={currentSkill.icon} onChange={e => setCurrentSkill({...currentSkill, icon: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                            <span className="text-[10px] text-gray-400 mt-1 block">e.g. FaReact, FaHtml5, FaCss3Alt, TbBrandTailwind, BiLogoTypescript, SiAdobexd</span>
                        </div>
                    </div>

                    <div className="bg-brand-mint/5 border border-brand-mint/20 rounded-lg p-4 flex gap-3 text-xs text-brand-mint/90">
                        <Info className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold mb-1">Matching React Icon Libraries</p>
                            <p>To render the icon perfectly, make sure to enter the exact case-sensitive name of the icon. Icons are loaded from `react-icons` packages: FontAwesome (Fa), Remix (Ri), BoxIcons (Bi), SimpleIcons (Si), Tabler (Tb), Lucide (Lu), and MaterialDesign (Md).</p>
                        </div>
                    </div>

                    <button type="submit" className="bg-brand-mint text-brand-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-brand-fern hover:text-white transition-colors">Save Skill</button>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Skills Toolkit</h2>
                    <p className="text-gray-500 dark:text-brand-muted mt-1">Manage the developer tools, frameworks, and programming language skill badges.</p>
                </div>
                <button onClick={handleAdd} className="bg-brand-mint text-brand-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-fern hover:text-white transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Skill
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500 font-mono">Loading developer toolkit...</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {skills.map(skill => (
                        <div key={skill.id} className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-5 group hover:border-brand-mint transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-brand-mint/10 text-brand-mint rounded-lg"><Library className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-base font-bold text-gray-900 dark:text-brand-text">{skill.title}</p>
                                        <p className="text-xs text-gray-400 font-mono">{skill.icon}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-brand-border flex items-center justify-between">
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(skill)} className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted"><Edit3 className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(skill.id)} className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                                </div>
                                <span className="text-xs text-gray-400">ID: {skill.id}</span>
                            </div>
                        </div>
                    ))}

                    <button onClick={handleAdd} className="bg-gray-50 dark:bg-brand-surfaceHighlight/30 border border-dashed border-gray-300 dark:border-brand-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-brand-mint hover:bg-brand-mint/5 transition-all group min-h-[140px]">
                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-brand-surfaceHighlight flex items-center justify-center text-gray-400 group-hover:bg-brand-mint group-hover:text-brand-black transition-colors mb-2"><Plus className="w-5 h-5" /></div>
                        <h3 className="font-bold text-sm text-gray-900 dark:text-brand-text">Create Skill Tool</h3>
                    </button>
                </div>
            )}
        </div>
    );
};

export default SkillsView;
