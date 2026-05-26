import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Clock, Award } from 'lucide-react';
import { getPortfolioData, saveTimelineItem, deleteTimelineItem, saveCertificate, deleteCertificate } from '@/app/(admin)/admin/dataActions';

const ResumeView = () => {
    const [activeTab, setActiveTab] = useState('timeline'); // 'timeline' or 'certificates'
    const [data, setData] = useState({ timelineItems: [], certificates: [] });
    const [loading, setLoading] = useState(true);

    const [isEditingTimeline, setIsEditingTimeline] = useState(false);
    const [currentTimeline, setCurrentTimeline] = useState(null);

    const [isEditingCert, setIsEditingCert] = useState(false);
    const [currentCert, setCurrentCert] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const fetched = await getPortfolioData();
            setData({
                timelineItems: fetched.timelineItems || [],
                certificates: fetched.certificates || []
            });
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    // --- Timeline Handlers ---
    const handleAddTimeline = () => {
        setCurrentTimeline({ title: '', roles: [{ role: '', duration: '' }] });
        setIsEditingTimeline(true);
    };

    const handleEditTimeline = (item) => {
        setCurrentTimeline({ ...item, roles: [...item.roles] });
        setIsEditingTimeline(true);
    };

    const handleDeleteTimeline = async (id) => {
        if (window.confirm("Delete this timeline item?")) {
            await deleteTimelineItem(id);
            dispatchToast('Timeline item deleted');
            loadData();
        }
    };

    const handleSaveTimeline = async (e) => {
        e.preventDefault();
        await saveTimelineItem(currentTimeline);
        dispatchToast('Timeline saved successfully');
        setIsEditingTimeline(false);
        loadData();
    };

    const addRole = () => {
        setCurrentTimeline({
            ...currentTimeline,
            roles: [...currentTimeline.roles, { role: '', duration: '' }]
        });
    };

    const updateRole = (index, field, value) => {
        const newRoles = [...currentTimeline.roles];
        newRoles[index][field] = value;
        setCurrentTimeline({ ...currentTimeline, roles: newRoles });
    };

    const removeRole = (index) => {
        const newRoles = currentTimeline.roles.filter((_, i) => i !== index);
        setCurrentTimeline({ ...currentTimeline, roles: newRoles });
    };

    // --- Certificate Handlers ---
    const handleAddCert = () => {
        setCurrentCert({ title: '', organization: '', url: '', icon: '' });
        setIsEditingCert(true);
    };

    const handleEditCert = (cert) => {
        setCurrentCert({ ...cert });
        setIsEditingCert(true);
    };

    const handleDeleteCert = async (id) => {
        if (window.confirm("Delete this certificate?")) {
            await deleteCertificate(id);
            dispatchToast('Certificate deleted');
            loadData();
        }
    };

    const handleSaveCert = async (e) => {
        e.preventDefault();
        await saveCertificate(currentCert);
        dispatchToast('Certificate saved successfully');
        setIsEditingCert(false);
        loadData();
    };

    const dispatchToast = (msg) => {
        window.dispatchEvent(new CustomEvent('show-toast', { detail: msg }));
    };

    if (isEditingTimeline) {
        return (
            <div className="space-y-6 animate-fade-in max-w-3xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-brand-text">
                        {currentTimeline.id ? 'Edit Timeline' : 'New Timeline'}
                    </h2>
                    <button onClick={() => setIsEditingTimeline(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">Cancel</button>
                </div>
                <form onSubmit={handleSaveTimeline} className="bg-white dark:bg-brand-surface p-6 rounded-xl border border-gray-200 dark:border-brand-border space-y-4">
                    <div>
                        <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Title (e.g. Schooling, MCA)</label>
                        <input required type="text" value={currentTimeline.title} onChange={e => setCurrentTimeline({...currentTimeline, title: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-brand-border">
                        <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted">Roles / Sub-items</label>
                        {currentTimeline.roles.map((role, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                                <input required type="text" placeholder="Role (e.g. 10th, Developer)" value={role.role} onChange={e => updateRole(idx, 'role', e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-sm outline-none focus:border-brand-mint text-gray-900 dark:text-brand-text" />
                                <input required type="text" placeholder="Duration (e.g. Jul 2012 - Jun 2014)" value={role.duration} onChange={e => updateRole(idx, 'duration', e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-sm outline-none focus:border-brand-mint text-gray-900 dark:text-brand-text" />
                                <button type="button" onClick={() => removeRole(idx)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        ))}
                        <button type="button" onClick={addRole} className="text-sm text-brand-mint font-bold hover:underline">+ Add Role</button>
                    </div>

                    <button type="submit" className="bg-brand-mint text-brand-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-brand-fern hover:text-white transition-colors mt-4">Save Timeline</button>
                </form>
            </div>
        );
    }

    if (isEditingCert) {
        return (
            <div className="space-y-6 animate-fade-in max-w-3xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-brand-text">
                        {currentCert.id ? 'Edit Certificate' : 'New Certificate'}
                    </h2>
                    <button onClick={() => setIsEditingCert(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">Cancel</button>
                </div>
                <form onSubmit={handleSaveCert} className="bg-white dark:bg-brand-surface p-6 rounded-xl border border-gray-200 dark:border-brand-border space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Title</label>
                            <input required type="text" value={currentCert.title} onChange={e => setCurrentCert({...currentCert, title: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Organization</label>
                            <input required type="text" value={currentCert.organization} onChange={e => setCurrentCert({...currentCert, organization: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Certificate URL</label>
                            <input required type="text" value={currentCert.url} onChange={e => setCurrentCert({...currentCert, url: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Icon (e.g. SiUdemy)</label>
                            <input required type="text" value={currentCert.icon} onChange={e => setCurrentCert({...currentCert, icon: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>
                    </div>
                    <button type="submit" className="bg-brand-mint text-brand-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-brand-fern hover:text-white transition-colors mt-4">Save Certificate</button>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Resume Manager</h2>
                    <p className="text-gray-500 dark:text-brand-muted mt-1">Manage timeline, education, and certificates.</p>
                </div>
                <div className="flex bg-gray-100 dark:bg-brand-surfaceHighlight rounded-lg p-1">
                    <button onClick={() => setActiveTab('timeline')} className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${activeTab === 'timeline' ? 'bg-white dark:bg-brand-surface text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
                        Timeline
                    </button>
                    <button onClick={() => setActiveTab('certificates')} className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${activeTab === 'certificates' ? 'bg-white dark:bg-brand-surface text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
                        Certificates
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500 font-mono">Loading data...</div>
            ) : (
                <>
                    {activeTab === 'timeline' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.timelineItems.map(item => (
                                <div key={item.id} className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-5 group hover:border-brand-mint transition-all">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-brand-mint/10 text-brand-mint rounded-lg"><Clock className="w-5 h-5" /></div>
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">{item.title}</h3>
                                    </div>
                                    <div className="space-y-3 mb-6">
                                        {item.roles.map((r, i) => (
                                            <div key={i} className="text-sm">
                                                <p className="font-medium text-gray-700 dark:text-gray-300">{r.role}</p>
                                                <p className="text-xs text-gray-500 dark:text-brand-muted">{r.duration}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-4 border-t border-gray-100 dark:border-brand-border flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEditTimeline(item)} className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted"><Edit3 className="w-4 h-4" /></button>
                                            <button onClick={() => handleDeleteTimeline(item.id)} className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button onClick={handleAddTimeline} className="bg-gray-50 dark:bg-brand-surfaceHighlight/30 border border-dashed border-gray-300 dark:border-brand-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-brand-mint hover:bg-brand-mint/5 transition-all group min-h-[200px]">
                                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-brand-surfaceHighlight flex items-center justify-center text-gray-400 group-hover:bg-brand-mint group-hover:text-brand-black transition-colors mb-4"><Plus className="w-6 h-6" /></div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">Add Timeline</h3>
                            </button>
                        </div>
                    )}

                    {activeTab === 'certificates' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.certificates.map(cert => (
                                <div key={cert.id} className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-5 group hover:border-brand-mint transition-all">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-brand-mint/10 text-brand-mint rounded-lg"><Award className="w-5 h-5" /></div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text truncate w-48">{cert.title}</h3>
                                            <p className="text-xs font-mono text-brand-mint">{cert.organization}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-brand-muted truncate mb-4">{cert.url}</p>
                                    <div className="pt-4 border-t border-gray-100 dark:border-brand-border flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEditCert(cert)} className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted"><Edit3 className="w-4 h-4" /></button>
                                            <button onClick={() => handleDeleteCert(cert.id)} className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button onClick={handleAddCert} className="bg-gray-50 dark:bg-brand-surfaceHighlight/30 border border-dashed border-gray-300 dark:border-brand-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-brand-mint hover:bg-brand-mint/5 transition-all group min-h-[150px]">
                                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-brand-surfaceHighlight flex items-center justify-center text-gray-400 group-hover:bg-brand-mint group-hover:text-brand-black transition-colors mb-4"><Plus className="w-6 h-6" /></div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">Add Certificate</h3>
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ResumeView;
