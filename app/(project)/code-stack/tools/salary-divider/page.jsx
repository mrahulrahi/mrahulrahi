'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { 
    PiggyBank, Info, RotateCcw, Sparkles, Percent, ShieldCheck, 
    TrendingUp, Calculator, ShieldAlert, BadgeCheck, Lightbulb, 
    ArrowUpRight, ArrowDownRight, Compass, Settings
} from 'lucide-react';

const CATEGORY_META = {
    needs: { name: 'Living Expenses (Needs)', color: '#EF4444', icon: '🏠', desc: 'Rent, groceries, utility bills, health care, basic transportation.' },
    wants: { name: 'Lifestyle & Fun (Wants)', color: '#F59E0B', icon: '🍔', desc: 'Dining out, subscriptions, shopping, hobbies, travel, entertainment.' },
    savings: { name: 'Emergency Savings', color: '#06B6D4', icon: '🛡️', desc: 'Liquid cash, emergency fund, short-term goal accounts.' },
    investments: { name: 'Wealth Investments', color: '#10B981', icon: '📈', desc: 'Stocks, mutual funds, EPF/PPF, index funds, gold, real estate.' },
    others: { name: 'Debts & Giving', color: '#8B5CF6', icon: '🤝', desc: 'Credit card debts, education loans, charity donations, family support.' }
};

const PRESETS = [
    {
        id: 'rule503020',
        name: '50/30/20 Rule',
        description: 'Standard balanced budgeting framework for most individuals.',
        percentages: { needs: 50, wants: 30, savings: 10, investments: 10, others: 0 }
    },
    {
        id: 'rule702010',
        name: '70/20/10 Rule',
        description: 'Great for high-cost areas or family-first household management.',
        percentages: { needs: 70, wants: 10, savings: 10, investments: 10, others: 0 }
    },
    {
        id: 'goldenRatio',
        name: 'Golden Ratio (Rich Habits)',
        description: 'Focused heavily on long-term wealth building and compound growth.',
        percentages: { needs: 40, wants: 10, savings: 15, investments: 25, others: 10 }
    },
    {
        id: 'custom',
        name: 'Custom Division',
        description: 'Apportion percentages completely based on your current objectives.',
        percentages: { needs: 30, wants: 20, savings: 20, investments: 20, others: 10 }
    }
];

export default function SalaryDivider() {
    // ----------------------------------------------------
    // State Definitions
    // ----------------------------------------------------
    const [salary, setSalary] = useState(65000);
    const [frequency, setFrequency] = useState('monthly');
    const [selectedPreset, setSelectedPreset] = useState('rule503020');
    const [customPercentages, setCustomPercentages] = useState({
        needs: 30,
        wants: 20,
        savings: 20,
        investments: 20,
        others: 10
    });
    const [isMounted, setIsMounted] = useState(false);

    // ----------------------------------------------------
    // Load & Save to LocalStorage
    // ----------------------------------------------------
    useEffect(() => {
        setIsMounted(true);
        const storedSalary = localStorage.getItem('salary_divider_income');
        const storedPreset = localStorage.getItem('salary_divider_preset');
        const storedCustomPercentages = localStorage.getItem('salary_divider_custom_pct');

        if (storedSalary) setSalary(Number(storedSalary));
        if (storedPreset) setSelectedPreset(storedPreset);
        if (storedCustomPercentages) {
            try {
                setCustomPercentages(JSON.parse(storedCustomPercentages));
            } catch (e) {
                console.error("Failed to parse custom percentages", e);
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('salary_divider_income', salary.toString());
            localStorage.setItem('salary_divider_preset', selectedPreset);
            localStorage.setItem('salary_divider_custom_pct', JSON.stringify(customPercentages));
        }
    }, [salary, selectedPreset, customPercentages, isMounted]);

    // Get current working percentages depending on preset or custom state
    const currentPercentages = useMemo(() => {
        if (selectedPreset === 'custom') {
            return customPercentages;
        }
        const preset = PRESETS.find(p => p.id === selectedPreset);
        return preset ? preset.percentages : PRESETS[0].percentages;
    }, [selectedPreset, customPercentages]);

    // Calculate sum of percentages
    const percentageSum = useMemo(() => {
        return Object.values(currentPercentages).reduce((sum, val) => sum + val, 0);
    }, [currentPercentages]);

    // ----------------------------------------------------
    // Auto-Balance Utility
    // ----------------------------------------------------
    const handleAutoBalance = () => {
        if (percentageSum === 0) {
            // Distribute equally if all are zero
            setCustomPercentages({ needs: 20, wants: 20, savings: 20, investments: 20, others: 20 });
            return;
        }
        
        // Scale proportionally to sum exactly to 100%
        const scale = 100 / percentageSum;
        const balanced = {};
        let runningTotal = 0;
        const keys = Object.keys(customPercentages);

        keys.forEach((key, idx) => {
            if (idx === keys.length - 1) {
                // Prevent rounding errors by assigning remainder to last item
                balanced[key] = 100 - runningTotal;
            } else {
                const val = Math.round(customPercentages[key] * scale);
                balanced[key] = val;
                runningTotal += val;
            }
        });

        setCustomPercentages(balanced);
    };

    // ----------------------------------------------------
    // Allocation Calculations
    // ----------------------------------------------------
    const monthlyIncome = useMemo(() => {
        const amt = Number(salary) || 0;
        switch (frequency) {
            case 'yearly': return amt / 12;
            case 'biweekly': return (amt * 26) / 12;
            case 'weekly': return (amt * 52) / 12;
            case 'monthly':
            default:
                return amt;
        }
    }, [salary, frequency]);

    const allocations = useMemo(() => {
        const allocs = {};
        Object.keys(CATEGORY_META).forEach(key => {
            const pct = currentPercentages[key] || 0;
            const normalizedPct = percentageSum > 0 ? (pct / percentageSum) * 100 : 0;
            const monthlyAmount = (monthlyIncome * normalizedPct) / 100;
            
            allocs[key] = {
                ...CATEGORY_META[key],
                percent: Math.round(pct),
                monthly: monthlyAmount,
                weekly: monthlyAmount * 12 / 52,
                yearly: monthlyAmount * 12
            };
        });
        return allocs;
    }, [currentPercentages, monthlyIncome, percentageSum]);

    // Donut chart calculations
    const donutSegments = useMemo(() => {
        const segments = [];
        let accumulatedPercent = 0;
        const radius = 50;
        const circumference = 2 * Math.PI * radius;

        Object.keys(allocations).forEach(key => {
            const item = allocations[key];
            const percent = item.percent / 100;
            const strokeDasharray = `${percent * circumference} ${circumference}`;
            const strokeDashoffset = -accumulatedPercent * circumference;

            segments.push({
                key,
                ...item,
                strokeDasharray,
                strokeDashoffset
            });

            accumulatedPercent += percent;
        });

        return segments;
    }, [allocations]);

    // Financial Analysis recommendations
    const advice = useMemo(() => {
        const investRate = currentPercentages.investments + currentPercentages.savings;
        const needsRate = currentPercentages.needs;
        
        let header = 'Financial Path: Standard';
        let detail = 'Your budgeting follows typical outlines. Focus on reducing debt and expanding index fund portfolios.';
        let type = 'info';

        if (investRate >= 40) {
            header = 'Aggressive Wealth Accumulator 🚀';
            detail = 'Your retirement/investment rate is exceptionally high! This speed of compounding accelerates financial freedom timelines dramatically. Ensure you keep 3-6 months in a liquid emergency savings pot.';
            type = 'success';
        } else if (investRate >= 20) {
            header = 'Balanced Financial Strategy ⚖️';
            detail = 'Excellent allocation framework. You meet the recommended guidelines for saving and investing. Keep regular deposits automated to build wealth steadily.';
            type = 'success';
        } else if (needsRate > 55) {
            header = 'Budget Strain Risk Warning ⚠️';
            detail = 'Living essentials take up over 55% of your income. Consider looking for areas to trim recurring costs, or explore high-value side jobs to increase earnings and buffer savings.';
            type = 'warning';
        } else if (investRate < 10) {
            header = 'Accumulation Level: Vulnerable ⚠️';
            detail = 'Saving and investing under 10% of earnings leaves small room for emergencies or future independence. Prioritize cutting minor wants to bump emergency reserves to at least 15%.';
            type = 'warning';
        }

        return { header, detail, type };
    }, [currentPercentages]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    if (!isMounted) {
        return (
            <div className="flex items-center justify-center py-20 text-slate-400 font-mono">
                <span>Calibrating Allocator Engines...</span>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-slate-900/30 rounded-3xl min-h-screen text-slate-100 font-sans backdrop-blur-md relative overflow-hidden">
            {/* Soft background glow circles */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-brand-mint/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-800 pb-6 relative z-10">
                <div>
                    <div className="inline-flex items-center gap-1.5 bg-brand-mint/10 border border-brand-mint/20 text-brand-mint px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Salary Apportion Tool</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Financial Salary Divider</h1>
                    <p className="text-xs text-slate-400">Model your asset allocation, compare structural rules, and outline plans for saving and investing.</p>
                </div>
            </div>

            {/* Grid for Inputs & Preset Rules */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 relative z-10">
                {/* Inputs card panel */}
                <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-inner flex flex-col justify-between">
                    <div>
                        <h2 className="text-sm font-mono font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800 pb-3 mb-5 flex items-center gap-2">
                            <Settings className="w-4 h-4 text-brand-mint" />
                            Income & Framework Config
                        </h2>

                        <div className="space-y-5">
                            {/* Salary Input */}
                            <div>
                                <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Net Pay / Income</label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-2.5 text-slate-500 text-xs font-semibold">₹</span>
                                    <input
                                        type="number"
                                        placeholder="Enter Net Income"
                                        value={salary}
                                        onChange={(e) => setSalary(Math.max(0, Number(e.target.value)))}
                                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-xl pl-8 pr-3 py-2.5 text-xs outline-none focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 transition-all font-mono"
                                    />
                                </div>
                            </div>

                            {/* Income Period Frequency */}
                            <div>
                                <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Income Frequency</label>
                                <select
                                    value={frequency}
                                    onChange={(e) => setFrequency(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-brand-mint/50 cursor-pointer"
                                >
                                    <option value="monthly">Monthly Income</option>
                                    <option value="yearly">Annual Salary (CTC)</option>
                                    <option value="biweekly">Bi-weekly Income</option>
                                    <option value="weekly">Weekly Income</option>
                                </select>
                            </div>

                            {/* Division preset rules */}
                            <div>
                                <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">Division Templates</label>
                                <div className="grid grid-cols-1 gap-2.5">
                                    {PRESETS.map((preset) => (
                                        <button
                                            key={preset.id}
                                            type="button"
                                            onClick={() => setSelectedPreset(preset.id)}
                                            className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                                                selectedPreset === preset.id
                                                    ? 'bg-brand-mint/10 border-brand-mint/30 text-white shadow-md'
                                                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                                            }`}
                                        >
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="text-xs font-bold text-slate-200">{preset.name}</h4>
                                                {preset.id !== 'custom' && (
                                                    <span className="text-[9px] font-mono bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-500">
                                                        {preset.percentages.needs}/{preset.percentages.wants}/{preset.percentages.savings + preset.percentages.investments}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[10px] text-slate-500 leading-normal">{preset.description}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Custom Sliders Panel & SVG visualizer */}
                <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-inner flex flex-col justify-between">
                    <div>
                        <h2 className="text-sm font-mono font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800 pb-3 mb-5 flex items-center gap-2">
                            <Percent className="w-4 h-4 text-brand-mint" />
                            Allocation Balancer
                        </h2>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            {/* Sliders Container (Custom mode slider controls) */}
                            <div className="flex-1 w-full space-y-4">
                                {Object.keys(allocations).map((key) => {
                                    const item = allocations[key];
                                    return (
                                        <div key={key} className="space-y-1">
                                            <div className="flex justify-between items-center text-xs font-semibold">
                                                <div className="flex items-center gap-1.5">
                                                    <span>{item.icon}</span>
                                                    <span className="text-slate-300">{item.name}</span>
                                                </div>
                                                <span className="text-brand-mint font-mono font-bold">{item.percent}%</span>
                                            </div>

                                            {/* Slider Input: only enable in custom preset */}
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                step="5"
                                                value={item.percent}
                                                disabled={selectedPreset !== 'custom'}
                                                onChange={(e) => {
                                                    const val = Number(e.target.value);
                                                    setCustomPercentages(prev => ({
                                                        ...prev,
                                                        [key]: val
                                                    }));
                                                }}
                                                className={`w-full h-1 rounded-lg appearance-none accent-brand-mint ${
                                                    selectedPreset === 'custom' ? 'cursor-pointer bg-slate-800' : 'opacity-40 pointer-events-none bg-slate-950'
                                                }`}
                                            />
                                        </div>
                                    );
                                })}

                                {/* Validator total display */}
                                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {percentageSum === 100 ? (
                                            <div className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-mono uppercase">
                                                <ShieldCheck className="w-3.5 h-3.5" />
                                                Balanced
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded text-[10px] font-mono uppercase">
                                                <ShieldAlert className="w-3.5 h-3.5" />
                                                Total: {percentageSum}%
                                            </div>
                                        )}
                                        {selectedPreset !== 'custom' && (
                                            <span className="text-[10px] text-slate-500 italic">Preset lock active</span>
                                        )}
                                    </div>
                                    
                                    {selectedPreset === 'custom' && percentageSum !== 100 && (
                                        <button
                                            type="button"
                                            onClick={handleAutoBalance}
                                            className="px-2.5 py-1 text-[10px] font-bold bg-brand-mint text-slate-950 rounded-lg hover:opacity-90 transition-all cursor-pointer"
                                        >
                                            Auto Balance to 100%
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* SVG Donut Display */}
                            <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
                                <svg width="100%" height="100%" viewBox="0 0 120 120" className="transform -rotate-90">
                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="50"
                                        fill="transparent"
                                        stroke="#18181b"
                                        strokeWidth="8"
                                    />
                                    {percentageSum > 0 && donutSegments.map((seg, idx) => (
                                        <circle
                                            key={idx}
                                            cx="60"
                                            cy="60"
                                            r="50"
                                            fill="transparent"
                                            stroke={seg.color}
                                            strokeWidth="10"
                                            strokeDasharray={seg.strokeDasharray}
                                            strokeDashoffset={seg.strokeDashoffset}
                                            strokeLinecap="round"
                                            className="transition-all duration-500 hover:stroke-[12px] cursor-pointer"
                                            title={`${seg.name}: ${seg.percent}%`}
                                        />
                                    ))}
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/40 rounded-full m-[10px] backdrop-blur-xs">
                                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">MONTHLY NET</span>
                                    <span className="text-sm font-bold font-mono text-slate-200 mt-0.5">
                                        {formatCurrency(monthlyIncome)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Detailed Allocations Summary Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 relative z-10">
                {/* Recommendations Box */}
                <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-inner flex flex-col justify-between">
                    <div>
                        <h2 className="text-sm font-mono font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800 pb-3 mb-4 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-brand-mint" />
                            Financial Insights
                        </h2>
                        
                        <div className={`p-4 rounded-2xl border mb-4 ${
                            advice.type === 'success'
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                : advice.type === 'warning'
                                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                                    : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                        }`}>
                            <h3 className="text-xs font-bold mb-1.5 flex items-center gap-1.5">
                                <BadgeCheck className="w-4 h-4 shrink-0" />
                                {advice.header}
                            </h3>
                            <p className="text-[10px] leading-relaxed opacity-90">{advice.detail}</p>
                        </div>
                    </div>
                    
                    <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4">
                        <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase mb-2 tracking-wider">Compound Math Check</h4>
                        <p className="text-[11px] text-slate-400 leading-normal">
                            Investing <strong className="text-brand-mint font-bold">{formatCurrency(allocations.investments.monthly)}</strong> per month at an average annual return rate of 10% translates to approximately:
                        </p>
                        <ul className="mt-2 space-y-1 text-[10px] font-mono">
                            <li className="flex justify-between"><span className="text-slate-500">In 5 Years:</span> <span className="text-slate-300 font-semibold">~ {formatCurrency(allocations.investments.monthly * 78)}</span></li>
                            <li className="flex justify-between"><span className="text-slate-500">In 10 Years:</span> <span className="text-slate-300 font-semibold">~ {formatCurrency(allocations.investments.monthly * 206)}</span></li>
                            <li className="flex justify-between"><span className="text-slate-500">In 20 Years:</span> <span className="text-slate-300 font-semibold">~ {formatCurrency(allocations.investments.monthly * 765)}</span></li>
                        </ul>
                    </div>
                </div>

                {/* Categories Table details */}
                <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-inner">
                    <h2 className="text-sm font-mono font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800 pb-3 mb-5 flex items-center gap-2">
                        <Compass className="w-4 h-4 text-brand-mint" />
                        Allocation Equivalent Breakdown
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 text-slate-500 text-[10px] font-mono uppercase tracking-wider">
                                    <th className="pb-3 pl-3">Bucket</th>
                                    <th className="pb-3 text-right">Percent</th>
                                    <th className="pb-3 text-right">Weekly</th>
                                    <th className="pb-3 text-right">Monthly</th>
                                    <th className="pb-3 pr-3 text-right">Yearly</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/40">
                                {Object.keys(allocations).map((key) => {
                                    const item = allocations[key];
                                    return (
                                        <tr key={key} className="hover:bg-slate-900/20 transition-all group">
                                            {/* Name / Desc */}
                                            <td className="py-4 pl-3">
                                                <div className="flex items-start gap-2.5">
                                                    <span className="text-base shrink-0 mt-0.5">{item.icon}</span>
                                                    <div>
                                                        <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors block">
                                                            {item.name}
                                                        </span>
                                                        <span className="text-[9px] text-slate-500 leading-normal block max-w-sm mt-0.5">
                                                            {item.desc}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Percent */}
                                            <td className="py-4 text-right font-mono font-bold text-slate-300">
                                                <span style={{ color: item.color }}>{item.percent}%</span>
                                            </td>

                                            {/* Weekly */}
                                            <td className="py-4 text-right font-mono text-[11px] text-slate-400">
                                                {formatCurrency(item.weekly)}
                                            </td>

                                            {/* Monthly */}
                                            <td className="py-4 text-right font-mono font-bold text-xs text-slate-200">
                                                {formatCurrency(item.monthly)}
                                            </td>

                                            {/* Yearly */}
                                            <td className="py-4 pr-3 text-right font-mono text-[11px] text-slate-400">
                                                {formatCurrency(item.yearly)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
