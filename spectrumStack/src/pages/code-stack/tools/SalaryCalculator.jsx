import React, { useState, useMemo } from 'react';
import {
    TrendingUp,
    Plus,
    Trash2,
    DollarSign,
    Percent,
    Calendar,
    ChevronRight,
    Info
} from 'lucide-react';

const SalaryCalculator = () => {
    const [baseSalary, setBaseSalary] = useState(50000);
    const [numYears, setNumYears] = useState(10);
    const [defaultRate, setDefaultRate] = useState(10);
    const [customRates, setCustomRates] = useState({});

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

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
            <div className="max-w-4xl mx-auto">
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Controls Panel */}
                    <div className="lg:col-span-1 space-y-6">
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
                    </div>

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
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SalaryCalculator;