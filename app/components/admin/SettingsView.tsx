'use client'
import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const SettingsView: React.FC = () => {
    const [notifications, setNotifications] = useState<boolean>(true);

    return (
        <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 dark:border-brand-border pb-6">
                <div>
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Configuration</h2>
                    <p className="text-gray-500 dark:text-brand-muted mt-1">Manage admin profile and site metadata.</p>
                </div>
            </div>

            <div className="space-y-8">
                <section>
                    <h3 className="text-sm font-bold text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-4">Admin Profile</h3>
                    <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-mint to-brand-fern shrink-0 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                            M
                        </div>
                        <div className="flex-1 space-y-4 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Username</label>
                                    <input type="text" defaultValue="mrahulrahi" disabled className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-brand-black/50 border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted outline-none font-mono text-sm cursor-not-allowed" />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Email</label>
                                    <input type="email" defaultValue="admin@mrahulrahi.com" className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm" />
                                </div>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-brand-mint text-brand-black font-medium rounded hover:bg-brand-fern hover:text-white transition-colors text-sm">Save</button>
                    </div>
                </section>

                <section>
                    <h3 className="text-sm font-bold text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-4">Site Metadata & SEO</h3>
                    <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Site Title</label>
                            <input type="text" defaultValue="mrahulrahi | Portfolio & Tools" className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Meta Description</label>
                            <textarea rows={3} defaultValue="Design system, UI libraries, and helpful developer tools by mrahulrahi." className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm" />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Twitter URL</label>
                                <input type="text" placeholder="https://twitter.com/..." className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">GitHub URL</label>
                                <input type="text" placeholder="https://github.com/..." className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm" />
                            </div>
                        </div>
                        <button className="px-4 py-2 border border-gray-300 dark:border-brand-border text-gray-600 dark:text-brand-muted font-medium rounded hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight transition-colors text-sm">Update Meta</button>
                    </div>
                </section>

                <section>
                    <h3 className="text-sm font-bold text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-4">System Preferences</h3>
                    <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl overflow-hidden divide-y divide-gray-100 dark:divide-brand-border">
                        <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-brand-black/30 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded bg-purple-500/10 text-purple-500"><Bell className="w-4 h-4" /></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-brand-text">Content Notifications</p>
                                    <p className="text-xs text-gray-500 dark:text-brand-muted">Notify me when comments are posted.</p>
                                </div>
                            </div>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" id="toggle-notif" checked={notifications} onChange={() => setNotifications(!notifications)} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-brand-mint right-0" />
                                <label htmlFor="toggle-notif" className="toggle-label block overflow-hidden h-5 rounded-full bg-brand-mint cursor-pointer"></label>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SettingsView;
