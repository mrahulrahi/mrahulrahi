import React, { useState, useEffect } from 'react';
import { Search, Image as ImageIcon, Edit3, Plus, Trash2 } from 'lucide-react';
import { getPortfolioData, saveProject, deleteProject } from '@/app/(admin)/admin/dataActions';

const PortfolioView = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await getPortfolioData();
            setProjects(data.projectsCards || []);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const handleEdit = (project) => {
        setCurrentProject({ ...project, technologies: project.technologies.join(', ') });
        setIsEditing(true);
    };

    const handleAdd = () => {
        setCurrentProject({ label: '', title: '', imgUrl: '', gitHubUrl: '', liveUrl: '', para: '', technologies: '' });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            await deleteProject(id);
            const event = new CustomEvent('show-toast', { detail: 'Project deleted' });
            window.dispatchEvent(event);
            loadData();
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const techArray = currentProject.technologies.split(',').map(t => t.trim()).filter(Boolean);
        const payload = { ...currentProject, technologies: techArray };
        
        await saveProject(payload);
        const event = new CustomEvent('show-toast', { detail: 'Project saved successfully' });
        window.dispatchEvent(event);
        setIsEditing(false);
        loadData();
    };

    if (isEditing) {
        return (
            <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-brand-text">
                        {currentProject.id ? 'Edit Project' : 'New Project'}
                    </h2>
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">Cancel</button>
                </div>
                
                <form onSubmit={handleSave} className="bg-white dark:bg-brand-surface p-6 rounded-xl border border-gray-200 dark:border-brand-border space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Title</label>
                            <input required type="text" value={currentProject.title} onChange={e => setCurrentProject({...currentProject, title: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Label (Category)</label>
                            <input required type="text" value={currentProject.label} onChange={e => setCurrentProject({...currentProject, label: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Image URL</label>
                            <input required type="text" value={currentProject.imgUrl} onChange={e => setCurrentProject({...currentProject, imgUrl: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Technologies (comma separated)</label>
                            <input required type="text" value={currentProject.technologies} onChange={e => setCurrentProject({...currentProject, technologies: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Live URL</label>
                            <input type="text" value={currentProject.liveUrl} onChange={e => setCurrentProject({...currentProject, liveUrl: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">GitHub URL</label>
                            <input type="text" value={currentProject.gitHubUrl} onChange={e => setCurrentProject({...currentProject, gitHubUrl: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Description</label>
                        <textarea required rows="4" value={currentProject.para} onChange={e => setCurrentProject({...currentProject, para: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text outline-none focus:border-brand-mint text-sm"></textarea>
                    </div>
                    <button type="submit" className="bg-brand-mint text-brand-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-brand-fern hover:text-white transition-colors">Save Project</button>
                </form>
            </div>
        )
    }

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
                    <button onClick={handleAdd} className="bg-brand-mint text-brand-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-fern hover:text-white transition-colors">Add Project</button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500 font-mono">Loading data...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl overflow-hidden group hover:border-brand-mint transition-all flex flex-col">
                            <div className="h-40 bg-gray-200 dark:bg-brand-black/50 relative flex items-center justify-center overflow-hidden shrink-0">
                                {project.imgUrl ? (
                                    <img src={project.imgUrl} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                ) : (
                                    <ImageIcon className="w-8 h-8 text-gray-400" />
                                )}
                                <div className="absolute top-2 right-2 bg-brand-mint text-brand-black text-[10px] font-bold px-2 py-1 rounded">PUBLISHED</div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">{project.title}</h3>
                                <p className="text-xs font-mono text-brand-mint mt-1">{project.label}</p>
                                <p className="text-sm text-gray-500 dark:text-brand-muted mt-3 h-10 line-clamp-2">{project.para}</p>
                                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-brand-border flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(project)} className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted"><Edit3 className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(project.id)} className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                    <span className="text-xs text-gray-400">ID: {project.id}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button onClick={handleAdd} className="bg-gray-50 dark:bg-brand-surfaceHighlight/30 border border-dashed border-gray-300 dark:border-brand-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-brand-mint hover:bg-brand-mint/5 transition-all group min-h-[300px]">
                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-brand-surfaceHighlight flex items-center justify-center text-gray-400 group-hover:bg-brand-mint group-hover:text-brand-black transition-colors mb-4">
                            <Plus className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">Create New Project</h3>
                        <p className="text-sm text-gray-500 dark:text-brand-muted mt-1">Add a case study to your portfolio</p>
                    </button>
                </div>
            )}
        </div>
    );
};

export default PortfolioView;
