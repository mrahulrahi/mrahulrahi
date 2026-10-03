'use client'

import React, { useState, useMemo } from 'react';
import { TrendingUp, DollarSign, Calendar, RotateCcw, Info, BarChart3, Sparkles } from 'lucide-react';

const SalaryCalculator = () => {
    const [startingSalary, setStartingSalary] = useState(600000);
    const [numYears, setNumYears] = useState(5);
    const [defaultRate, setDefaultRate] = useState(10);
    const [customRates, setCustomRates] = useState({});

    const handleRateChange = (year, value) => {
        setCustomRates(prev => ({
            ...prev,
            [year]: Math.max(0, parseFloat(value) || 0)
        }));
    };

    const resetCustomRates = () => setCustomRates({});

    // Calculate progression based on yearly rates
    const projection = useMemo(() => {
        let currentSalary = parseFloat(startingSalary) || 0;
        const results = [];

        for (let i = 1; i <= numYears; i++) {
            const rate = customRates[i] !== undefined ? customRates[i] : defaultRate;
            const increaseAmount = currentSalary * (rate / 100);
            const startSalary = currentSalary;
            currentSalary += increaseAmount;

            results.push({
                year: i,
                startSalary,
                rate,
                increase: increaseAmount,
                finalSalary: currentSalary
            });
        }
        return results;
    }, [startingSalary, numYears, defaultRate, customRates]);

    const finalSalary = projection.length > 0 ? projection[projection.length - 1].finalSalary : startingSalary;
    const totalIncrease = finalSalary - startingSalary;
    const totalPercentage = startingSalary > 0 ? (totalIncrease / startingSalary) * 100 : 0;

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-slate-900/30 rounded-3xl min-h-screen text-slate-100 font-sans backdrop-blur-md relative overflow-hidden border border-slate-800/80 shadow-2xl">
            {/* Background ambient lighting */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-mint/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header Banner */}
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pb-6 border-b border-slate-800 relative z-10">
                <div>
                    <div className="inline-flex items-center gap-1.5 bg-brand-mint/10 border border-brand-mint/20 text-brand-mint px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Compounding Career Planner</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-brand-mint" />
                        Salary Increment & Growth Planner
                    </h1>
                    <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xl">
                        Simulate compound annual salary increments, promotion bonuses, and custom yearly growth steps over time.
                    </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-4 shrink-0 shadow-inner">
                    <div className="text-right">
                        <p className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Starting Base</p>
                        <p className="text-base md:text-lg font-bold text-slate-300 font-mono">{formatCurrency(startingSalary)}</p>
                    </div>
                    <div className="h-8 w-px bg-slate-800" />
                    <div className="text-right">
                        <p className="text-[10px] font-mono text-brand-mint uppercase font-semibold">Target Ending</p>
                        <p className="text-base md:text-lg font-bold text-brand-mint font-mono">{formatCurrency(finalSalary)}</p>
                    </div>
                </div>
            </header>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                {/* Left Sidebar: Controls */}
                <aside className="lg:col-span-4 space-y-6">
                    <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-md shadow-inner space-y-5">
                        <h2 className="text-sm font-mono font-bold tracking-wider text-slate-300 uppercase flex items-center gap-2 border-b border-slate-800 pb-3">
                            <Calendar className="w-4 h-4 text-brand-mint" />
                            Projection Parameters
                        </h2>

                        <div>
                            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                                Current Annual Salary (₹)
                            </label>
                            <input
                                type="number"
                                value={startingSalary}
                                onChange={(e) => setStartingSalary(Math.max(0, parseFloat(e.target.value) || 0))}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                                    Forecast Horizon
                                </label>
                                <span className="text-xs font-mono font-bold text-brand-mint">{numYears} Years</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="25"
                                value={numYears}
                                onChange={(e) => setNumYears(parseInt(e.target.value) || 1)}
                                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-brand-mint border border-slate-800"
                            />
                            <div className="flex justify-between text-[10px] font-mono text-slate-600 mt-1">
                                <span>1 Year</span>
                                <span>25 Years</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                                Baseline Annual Hike (%)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.5"
                                    min="0"
                                    value={defaultRate}
                                    onChange={(e) => setDefaultRate(Math.max(0, parseFloat(e.target.value) || 0))}
                                    className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 outline-none transition-all"
                                />
                                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-xs">%</span>
                            </div>
                        </div>

                        {Object.keys(customRates).length > 0 && (
                            <button
                                type="button"
                                onClick={resetCustomRates}
                                className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all text-xs font-mono flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Reset Custom Yearly Overrides</span>
                            </button>
                        )}
                    </div>

                    {/* Pro Tip Card */}
                    <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 text-slate-300 shadow-inner">
                        <h3 className="font-bold text-xs uppercase font-mono tracking-wider mb-2 flex items-center gap-2 text-brand-mint">
                            <Info className="w-4 h-4" />
                            Compound Growth Note
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Each year&apos;s hike applies compounds on top of previous raises. You can also customize individual years in the table below to account for promotions or job changes.
                        </p>
                    </div>
                </aside>

                {/* Right Main Display: KPIs & Table */}
                <main className="lg:col-span-8 space-y-6">
                    {/* KPI Metric Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800/80 shadow-inner">
                            <p className="text-slate-500 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                                Ending Salary (Yr {numYears})
                            </p>
                            <div className="text-xl md:text-2xl font-bold font-mono text-brand-mint">
                                {formatCurrency(finalSalary)}
                            </div>
                            <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-md w-fit border border-emerald-500/20">
                                <TrendingUp className="w-3 h-3" />
                                <span>+{totalPercentage.toFixed(1)}% Total Growth</span>
                            </div>
                        </div>

                        <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800/80 shadow-inner">
                            <p className="text-slate-500 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                                Annual Increase Gained
                            </p>
                            <div className="text-xl md:text-2xl font-bold font-mono text-cyan-400">
                                +{formatCurrency(totalIncrease)}
                            </div>
                            <p className="text-[11px] font-mono text-slate-500 mt-2">
                                Absolute earnings rise per year
                            </p>
                        </div>

                        <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800/80 shadow-inner">
                            <p className="text-slate-500 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                                Compound Factor
                            </p>
                            <div className="text-xl md:text-2xl font-bold font-mono text-white">
                                {(finalSalary / (startingSalary || 1)).toFixed(2)}x
                            </div>
                            <p className="text-[11px] font-mono text-slate-500 mt-2">
                                Multiple of starting compensation
                            </p>
                        </div>
                    </div>

                    {/* Progression Table */}
                    <div className="bg-slate-900/40 rounded-2xl border border-slate-800/80 shadow-inner overflow-hidden">
                        <div className="p-4 bg-slate-950/40 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                                <BarChart3 className="w-4 h-4 text-brand-mint" />
                                Annual Growth Trajectory
                            </h2>
                            <span className="text-[11px] font-mono text-slate-500">
                                Tip: Adjust percentage values in the table to model promotion spikes
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs font-mono">
                                <thead>
                                    <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400">
                                        <th className="px-5 py-3 font-semibold">Year</th>
                                        <th className="px-5 py-3 font-semibold">Starting Pay</th>
                                        <th className="px-5 py-3 font-semibold">Annual Hike</th>
                                        <th className="px-5 py-3 font-semibold text-right">Added Value</th>
                                        <th className="px-5 py-3 font-semibold text-right text-brand-mint">End-of-Year Salary</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                    {projection.map((row) => {
                                        const isCustom = customRates[row.year] !== undefined;
                                        return (
                                            <tr key={row.year} className="hover:bg-slate-800/30 transition-colors">
                                                <td className="px-5 py-3.5 font-medium text-slate-300">
                                                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 text-[10px]">
                                                        YR {row.year}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3.5 text-slate-300 font-medium">
                                                    {formatCurrency(row.startSalary)}
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <div className="relative inline-flex items-center">
                                                        <input
                                                            type="number"
                                                            step="0.5"
                                                            min="0"
                                                            value={row.rate}
                                                            onChange={(e) => handleRateChange(row.year, e.target.value)}
                                                            className={`w-20 px-2 py-1 rounded-lg border text-xs font-mono outline-none transition-all ${
                                                                isCustom
                                                                    ? 'bg-brand-mint/10 border-brand-mint text-brand-mint font-bold'
                                                                    : 'bg-slate-950 border-slate-800 text-slate-300 focus:border-brand-mint'
                                                            }`}
                                                        />
                                                        <span className="ml-1.5 text-slate-500">%</span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3.5 text-right text-emerald-400">
                                                    +{formatCurrency(row.increase)}
                                                </td>
                                                <td className="px-5 py-3.5 text-right font-bold text-brand-mint">
                                                    {formatCurrency(row.finalSalary)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="mt-8 text-center text-slate-500 text-xs pt-4 border-t border-slate-800">
                <p>© 2026 Salary Growth Planner. Assumes annual compounding increments applied to baseline compensation.</p>
            </footer>
        </div>
    );
};

export default SalaryCalculator;