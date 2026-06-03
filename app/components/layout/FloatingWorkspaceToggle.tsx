'use client'

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Cpu, User, ArrowLeftRight } from 'lucide-react';
import './FloatingWorkspaceToggle.css';

export default function FloatingWorkspaceToggle() {
    const router = useRouter();
    const pathname = usePathname();
    
    // Do not show the toggle on admin pages
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    const isWorkspace = pathname === '/workspace';

    const handleToggle = () => {
        if (isWorkspace) {
            router.push('/');
        } else {
            router.push('/workspace');
        }
    };

    return (
        <button
            onClick={handleToggle}
            className="floating-toggle-btn"
            aria-label={isWorkspace ? "Switch to Portfolio Homepage" : "Switch to Developer Workspace"}
        >
            <div className="floating-toggle-icon">
                {isWorkspace ? (
                    <User className="w-4 h-4" />
                ) : (
                    <Cpu className="w-4 h-4 animate-pulse-mint" />
                )}
            </div>
            
            <span className="floating-toggle-text">
                {isWorkspace ? 'PORTFOLIO' : 'WORKSPACE'}
            </span>

            <ArrowLeftRight className="w-3.5 h-3.5 floating-toggle-arrow" />
        </button>
    );
}
