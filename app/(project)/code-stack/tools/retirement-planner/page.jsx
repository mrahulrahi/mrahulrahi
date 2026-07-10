'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { 
    TrendingUp, ShieldAlert, Sparkles, Percent, DollarSign, Calendar, 
    RotateCcw, Info, Lightbulb, Settings, FileSpreadsheet, ArrowUpRight, 
    ArrowDownRight, CheckCircle2, AlertTriangle, ShieldCheck
} from 'lucide-react';

const DEFAULT_PRE_ALLOCATION = [
    { name: 'Fixed Returns', return: 7, tax: 30, share: 30 },
    { name: 'Large Cap Mutual Funds', return: 12, tax: 20, share: 40 },
    { name: 'Midcap Mutual Funds', return: 15, tax: 20, share: 15 },
    { name: 'Smallcap mutual funds', return: 18, tax: 20, share: 15 }
];

const DEFAULT_POST_ALLOCATION = [
    { name: 'Fixed Returns', return: 7, tax: 30, share: 50 },
    { name: 'Large Cap Mutual Funds', return: 12, tax: 20, share: 50 },
    { name: 'Midcap Mutual Funds', return: 15, tax: 20, share: 0 },
    { name: 'Smallcap mutual funds', return: 18, tax: 20, share: 0 }
];

export default function RetirementPlanner() {
    // ----------------------------------------------------
    // State Definitions
    // ----------------------------------------------------
    const [currentAge, setCurrentAge] = useState(28);
    const [retirementAge, setRetirementAge] = useState(66);
    const [planningAge, setPlanningAge] = useState(86);
    const [currentSavings, setCurrentSavings] = useState(100000);
    const [monthlyInvestments, setMonthlyInvestments] = useState(20000);
    const [annualStepUp, setAnnualStepUp] = useState(10); // step-up in savings every year (10%)
    const [retirementExpense, setRetirementExpense] = useState(50000); // post-retirement monthly (today's rate)
    const [inflation, setInflation] = useState(10); // annual inflation (10%)
    const [taxApplied, setTaxApplied] = useState(false); // toggle pre-tax vs post-tax calculations

    // Portfolios
    const [preAllocation, setPreAllocation] = useState(DEFAULT_PRE_ALLOCATION);
    const [postAllocation, setPostAllocation] = useState(DEFAULT_POST_ALLOCATION);

    const [isMounted, setIsMounted] = useState(false);
    const [hoveredData, setHoveredData] = useState(null);

    // ----------------------------------------------------
    // Load & Save to LocalStorage
    // ----------------------------------------------------
    useEffect(() => {
        setIsMounted(true);
        const storedConfig = localStorage.getItem('retirement_planner_config');
        if (storedConfig) {
            try {
                const parsed = JSON.parse(storedConfig);
                setCurrentAge(parsed.currentAge ?? 28);
                setRetirementAge(parsed.retirementAge ?? 66);
                setPlanningAge(parsed.planningAge ?? 86);
                setCurrentSavings(parsed.currentSavings ?? 100000);
                setMonthlyInvestments(parsed.monthlyInvestments ?? 20000);
                setAnnualStepUp(parsed.annualStepUp ?? 10);
                setRetirementExpense(parsed.retirementExpense ?? 50000);
                setInflation(parsed.inflation ?? 10);
                setTaxApplied(parsed.taxApplied ?? false);
                if (parsed.preAllocation) setPreAllocation(parsed.preAllocation);
                if (parsed.postAllocation) setPostAllocation(parsed.postAllocation);
            } catch (e) {
                console.error("Failed to load retirement configurations", e);
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            const data = {
                currentAge, retirementAge, planningAge, currentSavings,
                monthlyInvestments, annualStepUp, retirementExpense,
                inflation, taxApplied, preAllocation, postAllocation
            };
            localStorage.setItem('retirement_planner_config', JSON.stringify(data));
        }
    }, [
        currentAge, retirementAge, planningAge, currentSavings,
        monthlyInvestments, annualStepUp, retirementExpense,
        inflation, taxApplied, preAllocation, postAllocation, isMounted
    ]);

    // ----------------------------------------------------
    // Allocation Weighted Averages
    // ----------------------------------------------------
    const preSummary = useMemo(() => {
        let totalShare = 0;
        let weightedReturn = 0;
        let weightedTax = 0;

        preAllocation.forEach(asset => {
            const sh = Number(asset.share) || 0;
            totalShare += sh;
            weightedReturn += (Number(asset.return) || 0) * (sh / 100);
            weightedTax += (Number(asset.tax) || 0) * (sh / 100);
        });

        // Normalize if total share is not 100
        if (totalShare > 0 && totalShare !== 100) {
            weightedReturn = (weightedReturn * 100) / totalShare;
            weightedTax = (weightedTax * 100) / totalShare;
        }

        return {
            weightedReturn,
            weightedTax,
            totalShare
        };
    }, [preAllocation]);

    const postSummary = useMemo(() => {
        let totalShare = 0;
        let weightedReturn = 0;
        let weightedTax = 0;

        postAllocation.forEach(asset => {
            const sh = Number(asset.share) || 0;
            totalShare += sh;
            weightedReturn += (Number(asset.return) || 0) * (sh / 100);
            weightedTax += (Number(asset.tax) || 0) * (sh / 100);
        });

        if (totalShare > 0 && totalShare !== 100) {
            weightedReturn = (weightedReturn * 100) / totalShare;
            weightedTax = (weightedTax * 100) / totalShare;
        }

        return {
            weightedReturn,
            weightedTax,
            totalShare
        };
    }, [postAllocation]);

    // ----------------------------------------------------
    // Simulation Logic
    // ----------------------------------------------------
    const simulation = useMemo(() => {
        const rows = [];
        let savings = Number(currentSavings) || 0;
        let annualSavingsInput = (Number(monthlyInvestments) || 0) * 12;
        let initialRetirementExpenseYearly = (Number(retirementExpense) || 0) * 12;

        const maxSimulationAge = 110;
        let runoutAge = null;

        // Pre-tax returns vs post-tax returns
        const preRetireReturnRate = taxApplied 
            ? preSummary.weightedReturn * (1 - preSummary.weightedTax / 100)
            : preSummary.weightedReturn;

        const postRetireReturnRate = taxApplied 
            ? postSummary.weightedReturn * (1 - postSummary.weightedTax / 100)
            : postSummary.weightedReturn;

        for (let age = currentAge; age <= maxSimulationAge; age++) {
            const isEarning = age < retirementAge;
            const isDead = age > planningAge;

            let expenses = 0;
            let additions = 0;
            let interest = 0;
            let startSavings = savings;

            if (isDead) {
                expenses = 0;
                additions = 0;
                interest = 0;
                savings = 0;
            } else if (isEarning) {
                // Earning years
                expenses = 0;
                // calculate yearly addition with step-up growth compounding each year
                const yearsDiff = age - currentAge;
                additions = annualSavingsInput * Math.pow(1 + annualStepUp / 100, yearsDiff);
                interest = startSavings * (preRetireReturnRate / 100);
                savings = startSavings + additions + interest;
            } else {
                // Retired years
                additions = 0;
                // Inflation adjusted expenses compounding each year
                const yearsDiff = age - currentAge;
                expenses = initialRetirementExpenseYearly * Math.pow(1 + inflation / 100, yearsDiff);
                interest = Math.max(0, startSavings) * (postRetireReturnRate / 100);
                savings = startSavings - expenses + interest;
            }

            if (savings < 0 && runoutAge === null && !isDead) {
                runoutAge = age;
            }

            rows.push({
                age,
                startSavings: startSavings > 0 ? startSavings : 0,
                expenses: expenses > 0 ? expenses : 0,
                additions: additions > 0 ? additions : 0,
                interest: interest > 0 ? interest : 0,
                endSavings: savings > 0 ? savings : 0,
                status: isDead ? 'Dead' : isEarning ? 'Earning' : 'Retired',
                warning: savings < 0 && !isDead
            });
        }

        return {
            rows,
            runoutAge
        };
    }, [
        currentAge, retirementAge, planningAge, currentSavings,
        monthlyInvestments, annualStepUp, retirementExpense,
        inflation, taxApplied, preSummary, postSummary
    ]);

    // ----------------------------------------------------
    // SVG Projection Area Chart Generation
    // ----------------------------------------------------
    const chartPaths = useMemo(() => {
        const data = simulation.rows.filter(r => r.status !== 'Dead');
        if (data.length === 0) return { line: '', area: '', points: [] };

        const width = 600;
        const height = 180;
        const padding = 20;

        const maxVal = Math.max(...data.map(r => r.endSavings), 100000);
        const minVal = 0;

        const points = data.map((d, idx) => {
            const x = padding + (idx / (data.length - 1)) * (width - 2 * padding);
            const y = height - padding - ((d.endSavings - minVal) / (maxVal - minVal)) * (height - 2 * padding);
            return { x, y, age: d.age, savings: d.endSavings };
        });

        const line = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        const area = `${line} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

        return { line, area, points, width, height, padding };
    }, [simulation]);

    // ----------------------------------------------------
    // Portfolios Update Helpers
    // ----------------------------------------------------
    const handleAllocationChange = (type, index, field, value) => {
        const setter = type === 'pre' ? setPreAllocation : setPostAllocation;
        const list = type === 'pre' ? preAllocation : postAllocation;

        const updated = list.map((item, idx) => {
            if (idx === index) {
                return { ...item, [field]: Number(value) };
            }
            return item;
        });

        setter(updated);
    };

    const handleReset = () => {
        if (window.confirm("Restore default compounding configuration values?")) {
            setCurrentAge(28);
            setRetirementAge(66);
            setPlanningAge(86);
            setCurrentSavings(100000);
            setMonthlyInvestments(20000);
            setAnnualStepUp(10);
            setRetirementExpense(50000);
            setInflation(10);
            setTaxApplied(false);
            setPreAllocation(DEFAULT_PRE_ALLOCATION);
            setPostAllocation(DEFAULT_POST_ALLOCATION);
        }
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    const formatPercent = (val) => `${val.toFixed(2)}%`;

    if (!isMounted) {
        return (
            <div className="flex items-center justify-center py-20 text-slate-400 font-mono">
                <span>Compiling Compound Simulator...</span>
            </div>
        );
    }

    // Status warning checks
    const targetSavingsRunout = simulation.runoutAge;
    const isSafe = targetSavingsRunout === null || targetSavingsRunout > planningAge;

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-slate-900/30 rounded-3xl min-h-screen text-slate-100 font-sans backdrop-blur-md relative overflow-hidden">
            {/* Background dynamic ambient shadows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-mint/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header Dashboard Banner */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-800 pb-6 relative z-10">
                <div>
                    <div className="inline-flex items-center gap-1.5 bg-brand-mint/10 border border-brand-mint/20 text-brand-mint px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Compound Planner Engine</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Financial Retirement Planner</h1>
                    <p className="text-xs text-slate-400">Analyze long-term capital compounding, pre/post-retirement allocation splits, and inflation effects.</p>
                </div>
                <div>
                    <button 
                        onClick={handleReset} 
                        className="px-3.5 py-2 text-xs font-semibold bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl transition-all flex items-center gap-1.5 text-slate-300 hover:text-white cursor-pointer"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Defaults</span>
                    </button>
                </div>
            </div>

            {/* Config & Assumptions Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 relative z-10">
                {/* Inputs Setup Card */}
                <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-inner flex flex-col justify-between space-y-4">
                    <div>
                        <h2 className="text-sm font-mono font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800 pb-3 mb-5 flex items-center gap-2">
                            <Settings className="w-4 h-4 text-brand-mint" />
                            Simulation Parameters
                        </h2>

                        <div className="space-y-4">
                            {/* Ages setup */}
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Current Age</label>
                                    <input
                                        type="number"
                                        value={currentAge}
                                        onChange={(e) => setCurrentAge(Math.max(1, Number(e.target.value)))}
                                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-brand-mint/50 font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Retire Age</label>
                                    <input
                                        type="number"
                                        value={retirementAge}
                                        onChange={(e) => setRetirementAge(Math.max(currentAge, Number(e.target.value)))}
                                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-brand-mint/50 font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Target Age</label>
                                    <input
                                        type="number"
                                        value={planningAge}
                                        onChange={(e) => setPlanningAge(Math.max(retirementAge, Number(e.target.value)))}
                                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-brand-mint/50 font-mono"
                                    />
                                </div>
                            </div>

                            {/* Savings amounts setup */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Starting Savings</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2 text-[10px] text-slate-500">₹</span>
                                        <input
                                            type="number"
                                            value={currentSavings}
                                            onChange={(e) => setCurrentSavings(Math.max(0, Number(e.target.value)))}
                                            className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl pl-6 pr-2 py-2 text-xs outline-none focus:border-brand-mint/50 font-mono"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Monthly Invest</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2 text-[10px] text-slate-500">₹</span>
                                        <input
                                            type="number"
                                            value={monthlyInvestments}
                                            onChange={(e) => setMonthlyInvestments(Math.max(0, Number(e.target.value)))}
                                            className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl pl-6 pr-2 py-2 text-xs outline-none focus:border-brand-mint/50 font-mono"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Step-up and Inflation setup */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Yearly Savings Step-up</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={annualStepUp}
                                            onChange={(e) => setAnnualStepUp(Math.max(0, Number(e.target.value)))}
                                            className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl pr-6 pl-3 py-2 text-xs outline-none focus:border-brand-mint/50 font-mono"
                                        />
                                        <span className="absolute right-3 top-2 text-[10px] text-slate-500">%</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Annual Inflation</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={inflation}
                                            onChange={(e) => setInflation(Math.max(0, Number(e.target.value)))}
                                            className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl pr-6 pl-3 py-2 text-xs outline-none focus:border-brand-mint/50 font-mono"
                                        />
                                        <span className="absolute right-3 top-2 text-[10px] text-slate-500">%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Expenses post-retirement */}
                            <div>
                                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Monthly Retirement Expense (Today's Value)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2 text-[10px] text-slate-500">₹</span>
                                    <input
                                        type="number"
                                        value={retirementExpense}
                                        onChange={(e) => setRetirementExpense(Math.max(0, Number(e.target.value)))}
                                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl pl-6 pr-2 py-2 text-xs outline-none focus:border-brand-mint/50 font-mono"
                                    />
                                </div>
                            </div>

                            {/* Tax Toggle */}
                            <div className="flex items-center justify-between bg-slate-950 border border-slate-800 p-3 rounded-2xl">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold">Apply Portfolio Taxation</span>
                                    <span className="text-[10px] text-slate-500">Simulate compounding net of specified asset tax rates.</span>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={taxApplied}
                                    onChange={(e) => setTaxApplied(e.target.checked)}
                                    className="toggle toggle-success accent-brand-mint"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SVG Visualizer Chart & Analysis Card */}
                <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-inner flex flex-col justify-between">
                    <div>
                        <h2 className="text-sm font-mono font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-brand-mint" />
                                Lifetime Savings Projection Curve
                            </span>
                            
                            {/* Quick status badge */}
                            <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded ${
                                isSafe 
                                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                                    : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                            }`}>
                                {isSafe ? 'Secure Strategy' : `Depletes at Age ${targetSavingsRunout}`}
                            </span>
                        </h2>

                        {/* Custom SVG Area Line Chart */}
                        <div className="relative w-full overflow-hidden my-3">
                            <svg viewBox={`0 0 ${chartPaths.width} ${chartPaths.height}`} className="w-full h-auto overflow-visible">
                                <defs>
                                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#00DC82" stopOpacity="0.25" />
                                        <stop offset="100%" stopColor="#00DC82" stopOpacity="0.0" />
                                    </linearGradient>
                                </defs>

                                {/* Grid Background lines */}
                                <line x1="20" y1="20" x2="580" y2="20" stroke="#1e293b" strokeDasharray="4 4" />
                                <line x1="20" y1="90" x2="580" y2="90" stroke="#1e293b" strokeDasharray="4 4" />
                                <line x1="20" y1="160" x2="580" y2="160" stroke="#1e293b" strokeDasharray="4 4" />

                                {/* Area shading */}
                                <path d={chartPaths.area} fill="url(#chartGlow)" className="transition-all duration-300" />
                                {/* Main Line path */}
                                <path d={chartPaths.line} fill="none" stroke="#00DC82" strokeWidth="2" strokeLinecap="round" className="transition-all duration-300" />

                                {/* Interaction Tooltip tracking points */}
                                {chartPaths.points.map((p, idx) => (
                                    <circle
                                        key={idx}
                                        cx={p.x}
                                        cy={p.y}
                                        r="6"
                                        fill="transparent"
                                        className="cursor-pointer hover:fill-brand-mint hover:stroke-[3px] hover:stroke-brand-black"
                                        onMouseEnter={() => setHoveredData(p)}
                                        onMouseLeave={() => setHoveredData(null)}
                                    />
                                ))}
                            </svg>

                            {/* Floating tooltip hover box */}
                            {hoveredData && (
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-950/90 border border-slate-800 p-2.5 rounded-xl text-[10px] font-mono shadow-2xl backdrop-blur-xs flex gap-3 z-20">
                                    <div><span className="text-slate-500">Age:</span> <strong className="text-white">{hoveredData.age}</strong></div>
                                    <div><span className="text-slate-500">Savings:</span> <strong className="text-brand-mint">{formatCurrency(hoveredData.savings)}</strong></div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Insights Summary panel */}
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="bg-slate-950/40 border border-slate-800/80 p-4 rounded-2xl flex flex-col justify-center">
                            <span className="text-[9px] font-mono text-slate-500 uppercase">PEAK SAVINGS POOL</span>
                            <span className="text-sm font-mono font-bold text-white mt-1">
                                {formatCurrency(Math.max(...simulation.rows.map(r => r.endSavings), 0))}
                            </span>
                        </div>
                        <div className="bg-slate-950/40 border border-slate-800/80 p-4 rounded-2xl flex flex-col justify-center">
                            <span className="text-[9px] font-mono text-slate-500 uppercase">RUNOUT STATUS</span>
                            <span className={`text-sm font-mono font-bold mt-1 ${isSafe ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {isSafe ? 'Survives Target Age' : `Depletes at Age ${targetSavingsRunout}`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Asset Allocation Sliders Tabular panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 relative z-10">
                {/* Pre-Retirement Portfolio */}
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-inner">
                    <h3 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
                        <span>Pre-Retirement Investments</span>
                        <span className={`text-[10px] font-bold ${preSummary.totalShare === 100 ? 'text-brand-mint' : 'text-rose-400'}`}>
                            Share Total: {preSummary.totalShare}%
                        </span>
                    </h3>

                    <div className="space-y-4">
                        {preAllocation.map((asset, idx) => (
                            <div key={idx} className="grid grid-cols-12 gap-2.5 items-center">
                                <span className="col-span-4 text-[11px] text-slate-300 truncate font-semibold">{asset.name}</span>
                                <div className="col-span-3">
                                    <label className="text-[8px] font-mono text-slate-500 block mb-0.5">Return %</label>
                                    <input
                                        type="number"
                                        value={asset.return}
                                        onChange={(e) => handleAllocationChange('pre', idx, 'return', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-2xs text-slate-200 outline-none focus:border-brand-mint font-mono"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-[8px] font-mono text-slate-500 block mb-0.5">Tax %</label>
                                    <input
                                        type="number"
                                        value={asset.tax}
                                        onChange={(e) => handleAllocationChange('pre', idx, 'tax', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-2xs text-slate-200 outline-none focus:border-brand-mint font-mono"
                                    />
                                </div>
                                <div className="col-span-3">
                                    <label className="text-[8px] font-mono text-slate-500 block mb-0.5">Share %</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="5"
                                        value={asset.share}
                                        onChange={(e) => handleAllocationChange('pre', idx, 'share', e.target.value)}
                                        className="w-full h-1 rounded bg-slate-800 appearance-none accent-brand-mint"
                                    />
                                    <span className="text-[9px] font-mono text-slate-400 block text-right mt-0.5">{asset.share}%</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-4 text-[10px] font-mono text-slate-400">
                        <div>
                            <span>Weighted Return: </span>
                            <strong className="text-white">{formatPercent(preSummary.weightedReturn)}</strong>
                        </div>
                        <div>
                            <span>Weighted Tax Rate: </span>
                            <strong className="text-white">{formatPercent(preSummary.weightedTax)}</strong>
                        </div>
                    </div>
                </div>

                {/* Post-Retirement Portfolio */}
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-inner">
                    <h3 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
                        <span>Post-Retirement Investments</span>
                        <span className={`text-[10px] font-bold ${postSummary.totalShare === 100 ? 'text-brand-mint' : 'text-rose-400'}`}>
                            Share Total: {postSummary.totalShare}%
                        </span>
                    </h3>

                    <div className="space-y-4">
                        {postAllocation.map((asset, idx) => (
                            <div key={idx} className="grid grid-cols-12 gap-2.5 items-center">
                                <span className="col-span-4 text-[11px] text-slate-300 truncate font-semibold">{asset.name}</span>
                                <div className="col-span-3">
                                    <label className="text-[8px] font-mono text-slate-500 block mb-0.5">Return %</label>
                                    <input
                                        type="number"
                                        value={asset.return}
                                        onChange={(e) => handleAllocationChange('post', idx, 'return', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-2xs text-slate-200 outline-none focus:border-brand-mint font-mono"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-[8px] font-mono text-slate-500 block mb-0.5">Tax %</label>
                                    <input
                                        type="number"
                                        value={asset.tax}
                                        onChange={(e) => handleAllocationChange('post', idx, 'tax', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-2xs text-slate-200 outline-none focus:border-brand-mint font-mono"
                                    />
                                </div>
                                <div className="col-span-3">
                                    <label className="text-[8px] font-mono text-slate-500 block mb-0.5">Share %</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="5"
                                        value={asset.share}
                                        onChange={(e) => handleAllocationChange('post', idx, 'share', e.target.value)}
                                        className="w-full h-1 rounded bg-slate-800 appearance-none accent-brand-mint"
                                    />
                                    <span className="text-[9px] font-mono text-slate-400 block text-right mt-0.5">{asset.share}%</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-4 text-[10px] font-mono text-slate-400">
                        <div>
                            <span>Weighted Return: </span>
                            <strong className="text-white">{formatPercent(postSummary.weightedReturn)}</strong>
                        </div>
                        <div>
                            <span>Weighted Tax Rate: </span>
                            <strong className="text-white">{formatPercent(postSummary.weightedTax)}</strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Table: Simulation Ledger */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-inner relative z-10">
                <h2 className="text-sm font-mono font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800 pb-3 mb-5 flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-brand-mint" />
                    Compounding Sheet Ledger
                </h2>

                <div className="overflow-x-auto max-h-96">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 text-slate-500 text-[10px] font-mono uppercase tracking-wider sticky top-0 bg-slate-950 z-10">
                                <th className="pb-3 pl-3">Age</th>
                                <th className="pb-3 text-right">Starting Savings</th>
                                <th className="pb-3 text-right">Expenses (Post-Tax)</th>
                                <th className="pb-3 text-right">Additional Savings</th>
                                <th className="pb-3 text-right">Compounded Interest</th>
                                <th className="pb-3 text-right">Ending Savings</th>
                                <th className="pb-3 pr-3 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/40">
                            {simulation.rows.map((row) => (
                                <tr 
                                    key={row.age} 
                                    className={`hover:bg-slate-900/20 transition-all font-mono text-2xs ${
                                        row.status === 'Dead' 
                                            ? 'opacity-30 bg-slate-950/20' 
                                            : row.warning 
                                                ? 'bg-rose-500/5 hover:bg-rose-500/10 text-rose-300' 
                                                : row.status === 'Retired' 
                                                    ? 'bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-300' 
                                                    : 'text-slate-300'
                                    }`}
                                >
                                    {/* Age */}
                                    <td className="py-2.5 pl-3 font-bold text-white">
                                        {row.age}
                                    </td>

                                    {/* Starting */}
                                    <td className="py-2.5 text-right">
                                        {row.status === 'Dead' ? '-' : formatCurrency(row.startSavings)}
                                    </td>

                                    {/* Expenses */}
                                    <td className="py-2.5 text-right font-medium text-rose-400">
                                        {row.status === 'Retired' ? formatCurrency(row.expenses) : '-'}
                                    </td>

                                    {/* Additional savings */}
                                    <td className="py-2.5 text-right font-medium text-emerald-400">
                                        {row.status === 'Earning' ? formatCurrency(row.additions) : '-'}
                                    </td>

                                    {/* Interest earned */}
                                    <td className="py-2.5 text-right text-indigo-300">
                                        {row.status === 'Dead' ? '-' : `+${formatCurrency(row.interest)}`}
                                    </td>

                                    {/* Ending savings */}
                                    <td className="py-2.5 text-right font-bold text-white">
                                        {row.status === 'Dead' ? '-' : formatCurrency(row.endSavings)}
                                    </td>

                                    {/* Status tag */}
                                    <td className="py-2.5 pr-3 text-right">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                            row.status === 'Dead'
                                                ? 'bg-slate-950 text-slate-650'
                                                : row.warning
                                                    ? 'bg-rose-500/20 text-rose-400'
                                                    : row.status === 'Retired'
                                                        ? 'bg-emerald-500/20 text-emerald-400'
                                                        : 'bg-blue-500/20 text-blue-400'
                                        }`}>
                                            {row.status === 'Dead' ? 'Dead' : row.warning ? 'Depleted' : row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
