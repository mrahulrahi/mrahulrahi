'use client'

import React, { useState, useEffect, useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
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
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface AmortizationYearData {
  year: number;
  emi: number;
  interest: number;
  principal: number;
  totalPaid: number;
  balance: number;
}

interface AmortizationResult {
  totalMonths: number;
  totalInterest: number;
  totalPaid: number;
  yearlyData: AmortizationYearData[];
  monthlyData: { month: number; balance: number }[];
  initialEmi: number;
}

/**
 * UTILS: Formatting and Calculations
 */
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

const calculateEMI = (p: number, r: number, n: number) => {
  if (n <= 0) return 0;
  const monthlyRate = r / 12 / 100;

  if (monthlyRate === 0) {
    return p / n;
  }
  const denominator = Math.pow(1 + monthlyRate, n) - 1;
  if (denominator === 0) return 0;
  return (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / denominator;
};

const runAmortization = (
  principal: number,
  annualRate: number,
  tenureYears: number,
  yearlyIncrease: number,
  extraEmiPerYear: boolean
): AmortizationResult => {
  let balance = principal;
  const monthlyRate = annualRate / 12 / 100;
  let currentEmi = calculateEMI(principal, annualRate, tenureYears * 12);
  const initialEmi = currentEmi;
  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;
  const yearlyData: AmortizationYearData[] = [];
  const monthlyData: { month: number; balance: number }[] = [];

  let yearlyInterest = 0;
  let yearlyPrincipal = 0;
  let yearlyTotalPaid = 0;

  while (balance > 0 && month < 600) { // Safety cap 50 years
    month++;
    const interestForMonth = balance * monthlyRate;
    let principalForMonth = currentEmi - interestForMonth;

    if (principalForMonth > balance) principalForMonth = balance;
    balance -= principalForMonth;
    totalInterest += interestForMonth;
    totalPaid += (principalForMonth + interestForMonth);

    // Apply Extra EMI once a year (at the end of year)
    if (extraEmiPerYear && month % 12 === 0 && balance > 0) {
      let extraAmt = currentEmi;
      if (extraAmt > balance) extraAmt = balance;
      balance -= extraAmt;
      totalPaid += extraAmt;
      yearlyPrincipal += extraAmt;
      yearlyTotalPaid += extraAmt;
    }

    yearlyInterest += interestForMonth;
    yearlyPrincipal += principalForMonth;
    yearlyTotalPaid += (principalForMonth + interestForMonth);
    monthlyData.push({ month, balance: Math.max(0, balance) });

    if (month % 12 === 0 || balance <= 1) {
      const yearNum = Math.ceil(month / 12);
      yearlyData.push({
        year: yearNum,
        balance: Math.max(0, Math.round(balance)),
        emi: Math.round(currentEmi),
        interest: Math.round(yearlyInterest),
        principal: Math.round(yearlyPrincipal),
        totalPaid: Math.round(yearlyTotalPaid)
      });
      yearlyInterest = 0;
      yearlyPrincipal = 0;
      yearlyTotalPaid = 0;

      if (month % 12 === 0) {
        currentEmi = currentEmi * (1 + yearlyIncrease / 100);
      }
    }

    if (balance <= 0) break;
  }

  return { totalMonths: month, totalInterest, totalPaid, yearlyData, monthlyData, initialEmi };
};

export default function SmartEMIPlanner() {
  const [loanAmount, setLoanAmount] = useState<number>(5000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(20);
  const [yearlyIncrease, setYearlyIncrease] = useState<number>(10);
  const [extraEmi, setExtraEmi] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'visual' | 'table'>('visual');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400 font-mono">
        <span>Initializing Smart EMI Engine...</span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-900/30 rounded-3xl min-h-screen text-slate-100 font-sans backdrop-blur-md relative overflow-hidden border border-slate-800/80 shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-mint/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pb-6 border-b border-slate-800 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-brand-mint/10 border border-brand-mint/20 text-brand-mint px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Debt Reduction Simulator</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-brand-mint animate-pulse" />
            Smart EMI Planner
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xl">
            Model pre-payment strategies, 13th month EMI impacts, and compound step-ups to become debt-free faster.
          </p>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-4 shrink-0 shadow-inner">
          <div className="text-right">
            <p className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Standard EMI</p>
            <p className="text-base md:text-lg font-bold text-slate-300 font-mono">{formatCurrency(results.normal.initialEmi)}</p>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-right">
            <p className="text-[10px] font-mono text-brand-mint uppercase font-semibold">Current Smart EMI</p>
            <p className="text-base md:text-lg font-bold text-brand-mint font-mono">{formatCurrency(results.smart.initialEmi)}</p>
          </div>
        </div>
      </header>

      {/* Main Grid: Controls + Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Sidebar: Form Controls */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-md shadow-inner space-y-5">
            <h2 className="text-sm font-mono font-bold tracking-wider text-slate-300 uppercase flex items-center gap-2 border-b border-slate-800 pb-3">
              <Wallet className="w-4 h-4 text-brand-mint" />
              Loan Parameters
            </h2>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">Loan Amount (₹)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Math.max(1000, Number(e.target.value)))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0.1, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">Tenure (Yrs)</label>
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={tenure}
                  onChange={(e) => setTenure(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 outline-none transition-all"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <h2 className="text-sm font-mono font-bold tracking-wider text-slate-300 uppercase flex items-center gap-2 mb-4">
                <ArrowUpCircle className="w-4 h-4 text-emerald-400" />
                Smart Acceleration Modifiers
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-mono text-slate-400">Yearly EMI Step-Up</label>
                    <span className="text-xs font-mono font-bold text-brand-mint">{yearlyIncrease}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="1"
                    value={yearlyIncrease}
                    onChange={(e) => setYearlyIncrease(Number(e.target.value))}
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-brand-mint border border-slate-800"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-600 mt-1">
                    <span>0% (Flat)</span>
                    <span>25% (Aggressive)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-brand-mint w-4 h-4 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-slate-200">13th EMI Strategy</p>
                      <p className="text-[10px] text-slate-500">Pay 1 extra EMI each year towards principal</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setExtraEmi(!extraEmi)}
                    aria-label="Toggle 13th EMI Strategy"
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${extraEmi ? 'bg-brand-mint' : 'bg-slate-800'}`}
                  >
                    <div className={`absolute top-1 bg-slate-950 w-4 h-4 rounded-full transition-all shadow ${extraEmi ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pro Tip Card */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 text-slate-300 shadow-inner">
            <h3 className="font-bold text-xs uppercase font-mono tracking-wider mb-2 flex items-center gap-2 text-brand-mint">
              <Info className="w-4 h-4" />
              Strategic Insight
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stepping up your EMI by just 5–10% annually with an annual bonus payment can slash your total liability by over 40% and shave nearly a decade off your tenure.
            </p>
          </div>
        </aside>

        {/* Right Main: KPI Cards + Viewport Tabs */}
        <main className="lg:col-span-8 space-y-6">
          {/* Key Metrics 3-Card Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800/80 shadow-inner">
              <p className="text-slate-500 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">Interest Saved</p>
              <div className="text-xl md:text-2xl font-bold font-mono text-brand-mint">
                {formatCurrency(results.interestSaved)}
              </div>
              <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-md w-fit border border-emerald-500/20">
                <TrendingDown className="w-3 h-3" />
                <span>Reduced Interest</span>
              </div>
            </div>

            <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800/80 shadow-inner">
              <p className="text-slate-500 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">Tenure Saved</p>
              <div className="text-xl md:text-2xl font-bold font-mono text-cyan-400">
                {results.yearsSaved} yrs {results.monthsSaved} mos
              </div>
              <p className="text-[11px] font-mono text-slate-500 mt-2">
                Debt-free in Year {Math.ceil(results.smart.totalMonths / 12)}
              </p>
            </div>

            <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800/80 shadow-inner">
              <p className="text-slate-500 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">Total Savings</p>
              <div className="text-xl md:text-2xl font-bold font-mono text-white">
                {formatCurrency(results.totalSaved)}
              </div>
              <p className="text-[11px] font-mono text-slate-500 mt-2">Overall wealth retained</p>
            </div>
          </div>

          {/* Visualization / Table Container */}
          <div className="bg-slate-900/40 rounded-2xl border border-slate-800/80 shadow-inner overflow-hidden">
            {/* Tab Nav Buttons */}
            <div className="flex border-b border-slate-800 bg-slate-950/40">
              <button
                type="button"
                onClick={() => setActiveTab('visual')}
                className={`flex-1 py-3 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'visual'
                    ? 'text-brand-mint border-b-2 border-brand-mint bg-brand-mint/5'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/40'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Balance Trajectory (Chart)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('table')}
                className={`flex-1 py-3 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'table'
                    ? 'text-brand-mint border-b-2 border-brand-mint bg-brand-mint/5'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/40'
                }`}
              >
                <TableIcon className="w-4 h-4" />
                <span>Amortization Schedule</span>
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'visual' ? (
                <div className="space-y-6">
                  <div className="w-full h-80 min-h-80">
                    <h3 className="text-center text-xs font-mono font-semibold text-slate-400 mb-4 uppercase tracking-widest">
                      Remaining Balance: Standard vs Accelerated Plan
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorSmart" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00DC82" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#00DC82" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                        <XAxis
                          dataKey="year"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                          tickFormatter={(val) => `₹${(val / 100000).toFixed(0)}L`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#09090b',
                            borderRadius: '12px',
                            border: '1px solid #27272a',
                            color: '#f8fafc',
                            fontFamily: 'JetBrains Mono',
                            fontSize: '12px'
                          }}
                          formatter={(value) => formatCurrency(Number(value))}
                        />
                        <Legend verticalAlign="top" height={36} iconType="circle" />
                        <Area
                          type="monotone"
                          dataKey="Normal Loan"
                          stroke="#64748b"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorNormal)"
                        />
                        <Area
                          type="monotone"
                          dataKey="Smart Plan"
                          stroke="#00DC82"
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#colorSmart)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Summary Comparison Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                      <p className="text-[10px] font-mono font-bold text-slate-500 uppercase mb-2">Standard Loan Profile</p>
                      <div className="flex justify-between mb-1 text-xs font-mono">
                        <span className="text-slate-400">Total Tenure</span>
                        <span className="font-semibold text-slate-200">{tenure} Years ({tenure * 12} Mos)</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Total Interest</span>
                        <span className="font-semibold text-rose-400">{formatCurrency(results.normal.totalInterest)}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/60 border border-brand-mint/30">
                      <p className="text-[10px] font-mono font-bold text-brand-mint uppercase mb-2">Smart Accelerated Profile</p>
                      <div className="flex justify-between mb-1 text-xs font-mono">
                        <span className="text-slate-400">Total Tenure</span>
                        <span className="font-semibold text-brand-mint">
                          {Math.floor(results.smart.totalMonths / 12)} yrs {results.smart.totalMonths % 12} mos
                        </span>
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Total Interest</span>
                        <span className="font-semibold text-brand-mint">{formatCurrency(results.smart.totalInterest)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto -mx-6">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="bg-slate-950/80 border-y border-slate-800 text-slate-400">
                        <th className="px-6 py-3 font-semibold">Year</th>
                        <th className="px-6 py-3 font-semibold">EMI</th>
                        <th className="px-6 py-3 font-semibold text-right">Interest Paid</th>
                        <th className="px-6 py-3 font-semibold text-right">Principal Paid</th>
                        <th className="px-6 py-3 font-semibold text-right text-brand-mint">Year-End Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {results.smart.yearlyData.map((row) => (
                        <tr key={row.year} className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-3.5 font-medium text-slate-300">Year {row.year}</td>
                          <td className="px-6 py-3.5 text-slate-300">{formatCurrency(row.emi)}</td>
                          <td className="px-6 py-3.5 text-right text-rose-400">-{formatCurrency(row.interest)}</td>
                          <td className="px-6 py-3.5 text-right text-emerald-400">+{formatCurrency(row.principal)}</td>
                          <td className="px-6 py-3.5 text-right font-bold text-brand-mint">
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

      {/* Footer Disclaimer */}
      <footer className="mt-8 text-center text-slate-500 text-xs pt-4 border-t border-slate-800">
        <p>© 2026 Smart EMI Planner. For illustrative financial planning purposes only.</p>
      </footer>
    </div>
  );
}
