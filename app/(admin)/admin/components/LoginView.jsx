'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from '../actions';
import { Lock } from 'lucide-react';

const LoginView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        const result = await loginAction(username, password);
        if (result.success) {
            router.refresh();
        } else {
            setError(result.error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-brand-black text-gray-900 dark:text-brand-text font-sans antialiased selection:bg-brand-mint selection:text-brand-black transition-colors duration-300">
            <div className="fixed inset-0 bg-grid-pattern opacity-[0.4] dark:opacity-[0.07] pointer-events-none z-0 bg-grid"></div>
            
            <div className="relative z-10 w-full max-w-md p-8 bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl shadow-2xl glass">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-brand-mint flex items-center justify-center text-brand-black shadow-lg">
                        <Lock className="w-6 h-6" />
                    </div>
                </div>
                
                <h2 className="text-2xl font-display font-bold text-center mb-2">Admin Access</h2>
                <p className="text-gray-500 dark:text-brand-muted text-center font-mono text-sm mb-8">System initialization required</p>

                {error && (
                    <div className="mb-6 p-3 rounded bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-mono text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Username</label>
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm"
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-2.5 mt-4 bg-brand-mint text-brand-black font-bold rounded-lg hover:bg-brand-fern hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Authenticating...' : 'Enter System'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginView;
