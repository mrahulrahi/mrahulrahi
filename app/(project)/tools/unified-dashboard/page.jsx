'use client'
import React from 'react';
import WeatherWidget from './components/WeatherWidget';
import QuoteWidget from './components/QuoteWidget';
import NotesWidget from './components/NotesWidget';
import CalculatorWidget from './components/CalculatorWidget';
import QuizWidget from './components/QuizWidget';
import { useGradient } from '@/app/context/GradientContext';

export default function UnifiedDashboard() {
    const context = useGradient();
    const gradientStyle = context ? context.gradientStyle : { backgroundImage: 'linear-gradient(to right, #00DC82, #00B159)' };

    return (
        <div className="min-h-screen bg-[#09090b] text-slate-100 p-4 md:p-8 space-y-6">
            {/* Greeting Header */}
            <header className="flex justify-between items-center border-b border-slate-800/60 pb-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black bg-clip-text text-transparent tracking-wide font-sans" style={gradientStyle}>
                        Daily Horizon Dashboard
                    </h1>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Workspace Port : Active</p>
                </div>
            </header>

            {/* Top Grid: Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                <WeatherWidget />
                <QuoteWidget />
            </div>

            {/* Bottom Grid: Main Workspace */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                {/* Primary Panel: Notes & Tasks */}
                <div className="xl:col-span-2 h-full">
                    <div className="h-full flex flex-col justify-between">
                        <NotesWidget />
                    </div>
                </div>

                {/* Sidebar Panel: Utilities */}
                <div className="space-y-6 flex flex-col">
                    <CalculatorWidget />
                    <QuizWidget />
                </div>
            </div>
        </div>
    );
}
