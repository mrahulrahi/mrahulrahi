'use client'
import { useState, useMemo } from 'react';
import { TrendingUp, DollarSign, Calendar, Plus, Trash2, ChevronRight, Info, BarChart3 } from 'lucide-react';

const SalaryCalculator = () => {
    const [baseSalary, setBaseSalary] = useState(50000);
    const [startingSalary, setStartingSalary] = useState(50000);
    const [numYears, setNumYears] = useState(5);
    const [defaultRate, setDefaultRate] = useState(10);
    const [customRates, setCustomRates] = useState({});
    const [yearlyIncrements, setYearlyIncrements] = useState([10, 8, 5, 5, 5]);

    // Calculate the progression
    const results = useMemo(() => {
        let progression = [];
        let currentSalary = parseFloat(baseSalary) || 0;

        for (let i = 1; i <= numYears; i++) {
            const rate = customRates[i] !== undefined ? customRates[i] : defaultRate;
            const increment = currentSalary * (rate / 100);
            const startSalary = currentSalary;
            currentSalary += increment;

            progression.push({
                year: i,
                startSalary,
                rate,
                increment,
                endSalary: currentSalary
            });
        }
        return progression;
    }, [baseSalary, numYears, defaultRate, customRates]);

    const handleRateChange = (year, value) => {
        setCustomRates(prev => ({
            ...prev,
            [year]: parseFloat(value) || 0
        }));
    };

    const resetCustomRates = () => setCustomRates({});

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    const totalGrowth = results.length > 0
        ? ((results[results.length - 1].endSalary - baseSalary) / baseSalary * 100).toFixed(1)
        : 0;



    // Adjust increments array when year count changes
    const handleYearCountChange = (newCount) => {
        const val = Math.max(1, Math.min(30, parseInt(newCount) || 1));
        setNumYears(val);

        setYearlyIncrements(prev => {
            if (val > prev.length) {
                // Add default increments for new years
                return [...prev, ...Array(val - prev.length).fill(5)];
            } else {
                // Trim for fewer years
                return prev.slice(0, val);
            }
        });
    };

    const updateIncrement = (index, value) => {
        const newIncrements = [...yearlyIncrements];
        newIncrements[index] = parseFloat(value) || 0;
        setYearlyIncrements(newIncrements);
    };

    // Calculate the projection
    const projection = useMemo(() => {
        let currentSalary = parseFloat(startingSalary) || 0;
        const results = [];

        for (let i = 0; i < numYears; i++) {
            const percentage = yearlyIncrements[i] || 0;
            const increaseAmount = currentSalary * (percentage / 100);
            const newSalary = currentSalary + increaseAmount;

            results.push({
                year: i + 1,
                baseSalary: currentSalary,
                percentage: percentage,
                increase: increaseAmount,
                finalSalary: newSalary
            });

            currentSalary = newSalary;
        }
        return results;
    }, [startingSalary, yearlyIncrements, numYears]);

    const totalIncrease = projection.length > 0
        ? projection[projection.length - 1].finalSalary - startingSalary
        : 0;

    const totalPercentage = startingSalary > 0
        ? (totalIncrease / startingSalary) * 100
        : 0;

    return (
        <>
            <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
                <div className="max-w-8xl mx-auto px-3">
                    {/* Header */}
                    <header className="mb-8 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                            <div className="bg-indigo-600 p-2 rounded-lg">
                                <TrendingUp className="text-white w-6 h-6" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-800">Salary Increment Tracker</h1>
                        </div>
                        <p className="text-slate-500">Plan your financial growth with compound annual increases.</p>
                    </header>
                    <header className="mb-8 flex items-center gap-3">
                        <div className="bg-emerald-600 p-3 rounded-2xl shadow-lg shadow-emerald-200">
                            <TrendingUp className="text-white w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-800">Salary Growth Planner</h1>
                            <p className="text-slate-500">Project your earnings based on custom yearly increments</p>
                        </div>
                    </header>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Controls Panel */}
                        <aside className="lg:col-span-4 space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-indigo-500" /> General Settings
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Starting Salary</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                                            <input
                                                type="number"
                                                className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                                                value={baseSalary}
                                                onChange={(e) => setBaseSalary(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Forecast Period (Years)</label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="30"
                                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                            value={numYears}
                                            onChange={(e) => setNumYears(parseInt(e.target.value))}
                                        />
                                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                                            <span>1 Year</span>
                                            <span className="font-bold text-indigo-600 text-sm">{numYears} Years</span>
                                            <span>30 Years</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Default Annual %</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                className="w-full pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                                                value={defaultRate}
                                                onChange={(e) => setDefaultRate(e.target.value)}
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-lg">
                                <h3 className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-4">Projections Summary</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm opacity-80 text-indigo-100">Ending Salary</p>
                                        <p className="text-2xl font-bold">{formatCurrency(results[results.length - 1]?.endSalary || 0)}</p>
                                    </div>
                                    <div className="pt-4 border-t border-indigo-800">
                                        <p className="text-sm opacity-80 text-indigo-100">Total % Growth</p>
                                        <p className="text-2xl font-bold">+{totalGrowth}%</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={resetCustomRates}
                                className="w-full py-3 px-4 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
                            >
                                <Trash2 className="w-4 h-4" /> Reset Custom Yearly Rates
                            </button>
                        </aside>

                        
                        <aside className="lg:col-span-4 space-y-6">
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Info className="w-5 h-5 text-emerald-600" />
                                    Input Details
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1.5">Starting Salary</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
                                            <input
                                                type="number"
                                                value={startingSalary}
                                                onChange={(e) => setStartingSalary(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium text-lg"
                                                placeholder="e.g. 50000"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1.5">Projection Period (Years)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                <Calendar className="w-4 h-4" />
                                            </span>
                                            <input
                                                type="number"
                                                value={numYears}
                                                onChange={(e) => handleYearCountChange(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium"
                                                min="1"
                                                max="30"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Yearly Adjustment List */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-emerald-600" />
                                    Annual % Increments
                                </h2>
                                <div className="space-y-3 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
                                    {yearlyIncrements.map((inc, idx) => (
                                        <div key={idx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            <span className="text-xs font-bold text-slate-400 w-12">YEAR {idx + 1}</span>
                                            <div className="relative flex-1">
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    value={inc}
                                                    onChange={(e) => updateIncrement(idx, e.target.value)}
                                                    className="w-full pr-8 pl-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm font-semibold"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Results Table */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                                    <h2 className="font-semibold text-slate-800">Year-by-Year Breakdown</h2>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <Info className="w-4 h-4" />
                                        Edit percentages in the table to override defaults
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50/50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                                                <th className="px-6 py-4">Year</th>
                                                <th className="px-6 py-4">Starting</th>
                                                <th className="px-6 py-4">Rate (%)</th>
                                                <th className="px-6 py-4">Increment</th>
                                                <th className="px-6 py-4 text-right">Ending Salary</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {results.map((row) => (
                                                <tr key={row.year} className="hover:bg-indigo-50/30 transition-colors group">
                                                    <td className="px-6 py-4 font-medium text-slate-400">Yr {row.year}</td>
                                                    <td className="px-6 py-4 font-medium text-slate-600">
                                                        {formatCurrency(row.startSalary)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="relative w-20">
                                                            <input
                                                                type="number"
                                                                className={`w-full py-1 px-2 rounded-md border text-sm focus:ring-1 focus:ring-indigo-500 outline-none transition-all ${customRates[row.year] !== undefined
                                                                    ? 'border-indigo-300 bg-indigo-50 text-indigo-700 font-bold'
                                                                    : 'border-transparent bg-slate-100 text-slate-500 group-hover:bg-white group-hover:border-slate-300'
                                                                    }`}
                                                                value={row.rate}
                                                                onChange={(e) => handleRateChange(row.year, e.target.value)}
                                                            />
                                                            {customRates[row.year] !== undefined && (
                                                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"></div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-green-600 font-medium">
                                                        +{formatCurrency(row.increment)}
                                                    </td>
                                                    <td className="px-6 py-4 text-right font-bold text-slate-800">
                                                        {formatCurrency(row.endSalary)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {results.length === 0 && (
                                    <div className="p-12 text-center text-slate-400">
                                        No data to display. Please set the number of years.
                                    </div>
                                )}


                            </div>
                            {/* Main Display */}
                        <main className="lg:col-span-8 space-y-6">
                            {/* Summary Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-lg shadow-emerald-100">
                                    <p className="text-emerald-100 text-sm font-medium uppercase tracking-wider">Projected Final Salary</p>
                                    <div className="text-4xl font-bold mt-1">
                                        ₹{projection.length > 0 ? projection[projection.length - 1].finalSalary.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '0'}
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full text-sm">
                                        <TrendingUp className="w-4 h-4" />
                                        <span>+{totalPercentage.toFixed(1)}% total growth</span>
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Increase Earned</p>
                                    <div className="text-4xl font-bold mt-1 text-slate-800">
                                        +₹{totalIncrease.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </div>
                                    <p className="text-slate-400 text-xs mt-4 italic">Over the next {numYears} years</p>
                                </div>
                            </div>

                            {/* Detailed Table */}
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                    <h3 className="font-bold text-slate-800">Breakdown per Year</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50">
                                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Year</th>
                                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Starting</th>
                                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Increment</th>
                                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Dollar Gain</th>
                                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ending Salary</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {projection.map((row) => (
                                                <tr key={row.year} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-6 py-4 font-bold text-slate-700">
                                                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">YR {row.year}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-600 font-medium">
                                                        ₹{row.baseSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-emerald-600 font-bold">+{row.percentage}%</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-emerald-600 font-medium italic">
                                                        +₹{row.increase.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                                    </td>
                                                    <td className="px-6 py-4 font-bold text-slate-800">
                                                        ₹{row.finalSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="bg-slate-100 p-4 rounded-2xl flex items-start gap-3">
                                <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Note: This calculator uses compound growth. Each year's percentage increment is applied to the previous year's total salary. Values are rounded to the nearest dollar in the display for clarity.
                                </p>
                            </div>
                        </main>
                        </div>
                    </div>

     
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}} />
            </div>
        </>
    );
};

export default SalaryCalculator;