import React, { useState, useMemo } from 'react';
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
    Wallet,
    Calendar,
    TrendingDown,
    ArrowUpCircle,
    Info,
    Table as TableIcon,
    BarChart3,
    RefreshCw
} from 'lucide-react';

/**
 * UTILS: Formatting and Calculations
 */
const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(value);

const calculateEMI = (p, r, n) => {
    const monthlyRate = r / 12 / 100;
    return (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
};

const runAmortization = (principal, annualRate, tenureYears, yearlyIncrease, extraEmiPerYear) => {
    let balance = principal;
    const monthlyRate = annualRate / 12 / 100;
    let currentEmi = calculateEMI(principal, annualRate, tenureYears * 12);
    const initialEmi = currentEmi;

    let totalInterest = 0;
    let totalPaid = 0;
    let month = 0;
    const yearlyData = [];
    const monthlyData = [];

    let yearlyInterest = 0;
    let yearlyPrincipal = 0;
    let yearlyTotalPaid = 0;

    while (balance > 0 && month < 600) { // Safety cap 50 years
        month++;
        const interestForMonth = balance * monthlyRate;
        let principalForMonth = currentEmi - interestForMonth;

        if (principalForMonth > balance) {
            principalForMonth = balance;
        }

        balance -= principalForMonth;
        totalInterest += interestForMonth;
        totalPaid += (principalForMonth + interestForMonth);

        yearlyInterest += interestForMonth;
        yearlyPrincipal += principalForMonth;
        yearlyTotalPaid += (principalForMonth + interestForMonth);

        // Apply Extra EMI once a year (at the end of year)
        if (extraEmiPerYear && month % 12 === 0 && balance > 0) {
            let extraAmt = currentEmi;
            if (extraAmt > balance) extraAmt = balance;
            balance -= extraAmt;
            totalPaid += extraAmt;
            yearlyPrincipal += extraAmt;
            yearlyTotalPaid += extraAmt;
        }

        // Capture Month Data for Charts
        monthlyData.push({ month, balance: Math.max(0, balance) });

        // Year end summary and EMI increase
        if (month % 12 === 0 || balance <= 0) {
            const yearNum = Math.ceil(month / 12);
            yearlyData.push({
                year: yearNum,
                emi: currentEmi,
                interest: yearlyInterest,
                principal: yearlyPrincipal,
                totalPaid: yearlyTotalPaid,
                balance: Math.max(0, balance),
            });

            // Reset yearly counters
            yearlyInterest = 0;
            yearlyPrincipal = 0;
            yearlyTotalPaid = 0;

            // Increase EMI for next year
            if (month % 12 === 0) {
                currentEmi = currentEmi * (1 + yearlyIncrease / 100);
            }
        }

        if (balance <= 0) break;
    }

    return {
        totalMonths: month,
        totalInterest,
        totalPaid,
        yearlyData,
        monthlyData,
        initialEmi
    };
};

const SmartEMIPlanner = () => {
    // --- State ---
    const [loanAmount, setLoanAmount] = useState(5000000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [tenure, setTenure] = useState(20);
    const [yearlyIncrease, setYearlyIncrease] = useState(10);
    const [extraEmi, setExtraEmi] = useState(true);
    const [activeTab, setActiveTab] = useState('visual');

    // --- Calculations ---
    const results = useMemo(() => {
        const normal = runAmortization(loanAmount, interestRate, tenure, 0, false);
        const smart = runAmortization(loanAmount, interestRate, tenure, yearlyIncrease, extraEmi);

        const timeSavedMonths = normal.totalMonths - smart.totalMonths;
        const yearsSaved = Math.floor(timeSavedMonths / 12);
        const monthsSaved = timeSavedMonths % 12;

        return {
            normal,
            smart,
            interestSaved: normal.totalInterest - smart.totalInterest,
            yearsSaved,
            monthsSaved,
            totalSaved: normal.totalPaid - smart.totalPaid
        };
    }, [loanAmount, interestRate, tenure, yearlyIncrease, extraEmi]);

    // Transform data for the comparison chart
    const chartData = useMemo(() => {
        const maxMonths = Math.max(results.normal.totalMonths, results.smart.totalMonths);
        const data = [];
        for (let i = 0; i <= maxMonths; i += 12) {
            const year = i / 12;
            const normalPoint = results.normal.yearlyData.find(d => d.year === year)?.balance ?? (year === 0 ? loanAmount : 0);
            const smartPoint = results.smart.yearlyData.find(d => d.year === year)?.balance ?? (year === 0 ? loanAmount : 0);

            data.push({
                year: `Yr ${year}`,
                "Normal Loan": normalPoint,
                "Smart Plan": smartPoint
            });
        }
        return data;
    }, [results, loanAmount]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                            <RefreshCw className="text-blue-600" />
                            Smart EMI Planner
                        </h1>
                        <p className="text-slate-500 mt-1">Accelerate your journey to becoming debt-free.</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-xs text-slate-500 uppercase font-semibold">Standard EMI</p>
                            <p className="text-lg font-bold text-slate-700">{formatCurrency(results.normal.initialEmi)}</p>
                        </div>
                        <div className="h-8 w-1px bg-slate-200"></div>
                        <div className="text-right">
                            <p className="text-xs text-blue-600 uppercase font-semibold">Current Smart EMI</p>
                            <p className="text-lg font-bold text-blue-700">{formatCurrency(results.smart.initialEmi)}</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Sidebar - Inputs */}
                    <aside className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
                            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
                                <Wallet className="w-5 h-5 text-blue-500" />
                                Loan Details
                            </h2>

                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">Loan Amount (₹)</label>
                                <input
                                    type="number"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">Rate (%)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">Tenure (Yrs)</label>
                                    <input
                                        type="number"
                                        value={tenure}
                                        onChange={(e) => setTenure(Number(e.target.value))}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
                                <ArrowUpCircle className="w-5 h-5 text-green-500" />
                                Smart Modifiers
                            </h2>

                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="block text-sm font-medium text-slate-600">Yearly EMI Increase (%)</label>
                                    <span className="text-sm font-bold text-blue-600">{yearlyIncrease}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="25"
                                    step="1"
                                    value={yearlyIncrease}
                                    onChange={(e) => setYearlyIncrease(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>

                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-slate-400" />
                                    <div>
                                        <p className="text-sm font-semibold">13th EMI Strategy</p>
                                        <p className="text-xs text-slate-500">Pay one extra EMI yearly</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setExtraEmi(!extraEmi)}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${extraEmi ? 'bg-green-500' : 'bg-slate-300'}`}
                                >
                                    <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${extraEmi ? 'left-7' : 'left-1'}`}></div>
                                </button>
                            </div>
                        </div>

                        {/* Simple Info Card */}
                        <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <Info className="w-5 h-5" />
                                Pro Tip
                            </h3>
                            <p className="text-blue-100 text-sm leading-relaxed">
                                By increasing your EMI by just 5% annually, you could potentially save over 40% of your total interest cost and finish your loan years earlier.
                            </p>
                        </div>
                    </aside>

                    {/* Main Dashboard Area */}
                    <main className="lg:col-span-8 space-y-6">

                        {/* Stats Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Interest Saved</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-black text-green-600">{formatCurrency(results.interestSaved)}</span>
                                </div>
                                <div className="mt-2 flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded w-fit">
                                    <TrendingDown className="w-3 h-3" />
                                    Lower Cost
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Time Saved</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-black text-blue-600">
                                        {results.yearsSaved}y {results.monthsSaved}m
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 mt-2">Debt-free by Year {results.smart.yearlyData.length}</p>
                            </div>

                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Savings</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-black text-slate-800">{formatCurrency(results.totalSaved)}</span>
                                </div>
                                <p className="text-xs text-slate-400 mt-2">Reduction in total liability</p>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="flex border-b border-slate-100">
                                <button
                                    onClick={() => setActiveTab('visual')}
                                    className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'visual' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-slate-500 hover:bg-slate-50'}`}
                                >
                                    <BarChart3 className="w-4 h-4" />
                                    Visual Summary
                                </button>
                                <button
                                    onClick={() => setActiveTab('table')}
                                    className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${activeTab === 'table' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-slate-500 hover:bg-slate-50'}`}
                                >
                                    <TableIcon className="w-4 h-4" />
                                    Detailed Table
                                </button>
                            </div>

                            <div className="p-6">
                                {activeTab === 'visual' ? (
                                    <div className="space-y-6">
                                        <div className="h-[350px] w-full">
                                            <h3 className="text-center text-sm font-semibold text-slate-500 mb-4 uppercase tracking-widest">Outstanding Balance Comparison</h3>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={chartData}>
                                                    <defs>
                                                        <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1} />
                                                            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                                                        </linearGradient>
                                                        <linearGradient id="colorSmart" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                    <XAxis
                                                        dataKey="year"
                                                        axisLine={false}
                                                        tickLine={false}
                                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                                    />
                                                    <YAxis
                                                        axisLine={false}
                                                        tickLine={false}
                                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                                        tickFormatter={(val) => `₹${val / 100000}L`}
                                                    />
                                                    <Tooltip
                                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                                        formatter={(value) => formatCurrency(value)}
                                                    />
                                                    <Legend verticalAlign="top" height={36} iconType="circle" />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="Normal Loan"
                                                        stroke="#94a3b8"
                                                        strokeWidth={2}
                                                        fillOpacity={1}
                                                        fill="url(#colorNormal)"
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="Smart Plan"
                                                        stroke="#2563eb"
                                                        strokeWidth={3}
                                                        fillOpacity={1}
                                                        fill="url(#colorSmart)"
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Standard Summary</p>
                                                <div className="flex justify-between mb-1 text-sm">
                                                    <span>Tenure</span>
                                                    <span className="font-semibold">{tenure} Years</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span>Total Interest</span>
                                                    <span className="font-semibold">{formatCurrency(results.normal.totalInterest)}</span>
                                                </div>
                                            </div>
                                            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                                                <p className="text-xs font-bold text-blue-400 uppercase mb-2">Smart Summary</p>
                                                <div className="flex justify-between mb-1 text-sm text-blue-900">
                                                    <span>Tenure</span>
                                                    <span className="font-bold">{Math.floor(results.smart.totalMonths / 12)}y {results.smart.totalMonths % 12}m</span>
                                                </div>
                                                <div className="flex justify-between text-sm text-blue-900">
                                                    <span>Total Interest</span>
                                                    <span className="font-bold">{formatCurrency(results.smart.totalInterest)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto -mx-6">
                                        <table className="w-full text-left text-sm">
                                            <thead>
                                                <tr className="bg-slate-50 border-y border-slate-100">
                                                    <th className="px-6 py-3 font-bold text-slate-600">Year</th>
                                                    <th className="px-6 py-3 font-bold text-slate-600">EMI</th>
                                                    <th className="px-6 py-3 font-bold text-slate-600 text-right">Interest Paid</th>
                                                    <th className="px-6 py-3 font-bold text-slate-600 text-right">Principal Paid</th>
                                                    <th className="px-6 py-3 font-bold text-blue-600 text-right">Year-End Balance</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50">
                                                {results.smart.yearlyData.map((row) => (
                                                    <tr key={row.year} className="hover:bg-slate-50/50 transition-colors">
                                                        <td className="px-6 py-4 font-medium text-slate-700">Year {row.year}</td>
                                                        <td className="px-6 py-4 text-slate-600 font-mono">{formatCurrency(row.emi)}</td>
                                                        <td className="px-6 py-4 text-right text-red-500 font-mono">-{formatCurrency(row.interest)}</td>
                                                        <td className="px-6 py-4 text-right text-green-600 font-mono">+{formatCurrency(row.principal)}</td>
                                                        <td className="px-6 py-4 text-right font-bold text-slate-900 font-mono">
                                                            {row.balance > 0 ? formatCurrency(row.balance) : "PAID OFF 🎉"}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>

                    </main>
                </div>

                {/* Footer */}
                <footer className="mt-12 text-center text-slate-400 text-sm py-8 border-t border-slate-200">
                    <p>© 2026 Smart EMI Planner. For illustrative purposes only. Actual bank calculations may vary.</p>
                </footer>
            </div>
        </div>
    );
};

export default SmartEMIPlanner;