'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Chart from 'chart.js/auto';
import { RefreshCw, Wallet, ArrowUpCircle, Calendar } from 'lucide-react';

interface EmiViewProps {
    theme: string;
}

interface AmortizationYearData {
    year: number;
    balance: number;
}

interface AmortizationResult {
    totalMonths: number;
    totalInterest: number;
    totalPaid: number;
    yearlyData: AmortizationYearData[];
    initialEmi: number;
}

const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

const calculateEMI = (p: number, r: number, n: number) => {
    const monthlyRate = r / 12 / 100;
    return (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
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

    while (balance > 1 && month < 600) {
        month++;
        const interestForMonth = balance * monthlyRate;
        let principalForMonth = currentEmi - interestForMonth;
        if (principalForMonth > balance) principalForMonth = balance;
        balance -= principalForMonth;
        totalInterest += interestForMonth;
        totalPaid += (principalForMonth + interestForMonth);
        if (extraEmiPerYear && month % 12 === 0 && balance > 0) {
            let extraAmt = currentEmi;
            if (extraAmt > balance) extraAmt = balance;
            balance -= extraAmt;
            totalPaid += extraAmt;
        }
        if (month % 12 === 0 || balance <= 1) {
            const yearNum = Math.ceil(month / 12);
            yearlyData.push({ year: yearNum, balance: Math.max(0, balance) });
            if (month % 12 === 0) currentEmi = currentEmi * (1 + yearlyIncrease / 100);
        }
        if (balance <= 1) break;
    }
    return { totalMonths: month, totalInterest, totalPaid, yearlyData, initialEmi };
};

const EmiView: React.FC<EmiViewProps> = ({ theme }) => {
    const [loanAmount, setLoanAmount] = useState<number>(5000000);
    const [rate, setRate] = useState<number>(8.5);
    const [tenure, setTenure] = useState<number>(20);
    const [increase, setIncrease] = useState<number>(10);
    const [extraEmi, setExtraEmi] = useState<boolean>(true);

    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    const normalData = useMemo(() => runAmortization(loanAmount, rate, tenure, 0, false), [loanAmount, rate, tenure]);
    const smartData = useMemo(() => runAmortization(loanAmount, rate, tenure, increase, extraEmi), [loanAmount, rate, tenure, increase, extraEmi]);

    const savedInt = normalData.totalInterest - smartData.totalInterest;
    const timeSavedM = normalData.totalMonths - smartData.totalMonths;
    const totalSaved = normalData.totalPaid - smartData.totalPaid;

    useEffect(() => {
        if (!chartRef.current) return;
        
        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        const maxYear = Math.max(normalData.yearlyData.length, smartData.yearlyData.length);
        const labels = Array.from({ length: maxYear + 1 }, (_, i) => `Yr ${i}`);
        
        const normPoints = labels.map((_, i) => { 
            if (i === 0) return loanAmount; 
            const d = normalData.yearlyData.find(x => x.year === i); 
            if (d) return d.balance;
            const lastYear = normalData.yearlyData[normalData.yearlyData.length - 1]?.year;
            return lastYear && i > lastYear ? 0 : null;
        });

        const smartPoints = labels.map((_, i) => { 
            if (i === 0) return loanAmount; 
            const d = smartData.yearlyData.find(x => x.year === i); 
            if (d) return d.balance;
            const lastYear = smartData.yearlyData[smartData.yearlyData.length - 1]?.year;
            return lastYear && i > lastYear ? 0 : null;
        });
        
        const isDark = theme === 'dark';
        const gridColor = isDark ? '#27272A' : '#E5E7EB';
        const textColor = isDark ? '#A1A1AA' : '#6B7280';

        if (chartInstanceRef.current) {
            chartInstanceRef.current.data.labels = labels;
            chartInstanceRef.current.data.datasets[0].data = normPoints;
            chartInstanceRef.current.data.datasets[1].data = smartPoints;
            
            const scales = chartInstanceRef.current.options.scales;
            if (scales) {
                if (scales.x && scales.x.ticks) {
                    scales.x.ticks.color = textColor;
                }
                if (scales.y && scales.y.ticks) {
                    scales.y.ticks.color = textColor;
                }
                if (scales.y && scales.y.grid) {
                    scales.y.grid.color = gridColor;
                }
            }
            chartInstanceRef.current.update();
        } else {
            chartInstanceRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        { label: 'Standard Loan', data: normPoints, borderColor: '#9CA3AF', backgroundColor: 'rgba(156, 163, 175, 0.1)', borderWidth: 2, fill: true, tension: 0.4, pointRadius: 0 },
                        { label: 'Smart Plan', data: smartPoints, borderColor: '#00DC82', backgroundColor: 'rgba(0, 220, 130, 0.2)', borderWidth: 2, fill: true, tension: 0.4, pointRadius: 0 }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: { legend: { display: true, labels: { color: textColor, font: { family: 'Inter' } } } },
                    scales: {
                        x: { grid: { display: false }, ticks: { color: textColor, font: { family: 'JetBrains Mono' } } },
                        y: { grid: { color: gridColor, borderDash: [4, 4] } as any, ticks: { color: textColor, font: { family: 'JetBrains Mono' }, callback: (val) => '₹' + Number(val) / 100000 + 'L' } }
                    }
                }
            });
        }
    }, [normalData, smartData, loanAmount, theme]);

    useEffect(() => {
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, []);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text flex items-center gap-2">
                        <RefreshCw className="w-6 h-6 text-brand-mint" />
                        Smart EMI Planner
                    </h2>
                    <p className="text-gray-500 dark:text-brand-muted mt-1">Live Tool Preview</p>
                </div>
                <div className="bg-white dark:bg-brand-surface px-4 py-2 rounded-xl border border-gray-200 dark:border-brand-border flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-[10px] text-gray-500 dark:text-brand-muted uppercase font-semibold">Standard EMI</p>
                        <p className="text-lg font-bold text-gray-700 dark:text-brand-text">{formatCurrency(normalData.initialEmi)}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-200 dark:bg-brand-border"></div>
                    <div className="text-right">
                        <p className="text-[10px] text-brand-mint uppercase font-semibold">Smart EMI</p>
                        <p className="text-lg font-bold text-brand-mint">{formatCurrency(smartData.initialEmi)}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <aside className="lg:col-span-4 space-y-6">
                    <div className="bg-white dark:bg-brand-surface p-6 rounded-xl border border-gray-200 dark:border-brand-border space-y-5">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-brand-text flex items-center gap-2 mb-2">
                            <Wallet className="w-5 h-5 text-brand-mint" />
                            Loan Details
                        </h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-brand-muted mb-1 font-mono">Loan Amount (₹)</label>
                            <input type="number" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-brand-muted mb-1 font-mono">Rate (%)</label>
                                <input type="number" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-brand-muted mb-1 font-mono">Tenure (Yrs)</label>
                                <input type="number" value={tenure} onChange={e => setTenure(Number(e.target.value))} className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono" />
                            </div>
                        </div>

                        <div className="h-px bg-gray-200 dark:bg-brand-border my-4"></div>

                        <h2 className="text-lg font-semibold text-gray-900 dark:text-brand-text flex items-center gap-2 mb-2">
                            <ArrowUpCircle className="w-5 h-5 text-brand-mint" />
                            Smart Modifiers
                        </h2>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-sm font-medium text-gray-600 dark:text-brand-muted font-mono">Yearly Increase (%)</label>
                                <span className="text-sm font-bold text-brand-mint font-mono">{increase}%</span>
                            </div>
                            <input type="range" min="0" max="25" step="1" value={increase} onChange={e => setIncrease(Number(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-brand-black rounded-lg appearance-none cursor-pointer accent-brand-mint" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-brand-black rounded-xl border border-gray-200 dark:border-brand-border">
                            <div className="flex items-center gap-3">
                                <Calendar className="text-gray-400 w-5 h-5" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-brand-text">13th EMI Strategy</p>
                                    <p className="text-xs text-gray-500 dark:text-brand-muted">Pay one extra EMI yearly</p>
                                </div>
                            </div>
                            <button onClick={() => setExtraEmi(!extraEmi)} className={`w-12 h-6 rounded-full transition-colors relative ${extraEmi ? 'bg-brand-mint' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                <div className={`absolute top-1 bg-white dark:bg-brand-black w-4 h-4 rounded-full transition-all ${extraEmi ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>
                    </div>
                </aside>

                <main className="lg:col-span-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-brand-surface p-5 rounded-xl border border-gray-200 dark:border-brand-border">
                            <p className="text-gray-500 dark:text-brand-muted text-xs font-bold uppercase tracking-wider mb-1">Interest Saved</p>
                            <span className="text-2xl font-black text-brand-fern dark:text-brand-mint block">{formatCurrency(savedInt)}</span>
                        </div>
                        <div className="bg-white dark:bg-brand-surface p-5 rounded-xl border border-gray-200 dark:border-brand-border">
                            <p className="text-gray-500 dark:text-brand-muted text-xs font-bold uppercase tracking-wider mb-1">Time Saved</p>
                            <span className="text-2xl font-black text-blue-600 dark:text-blue-400 block">{`${Math.floor(timeSavedM / 12)}y ${timeSavedM % 12}m`}</span>
                        </div>
                        <div className="bg-white dark:bg-brand-surface p-5 rounded-xl border border-gray-200 dark:border-brand-border">
                            <p className="text-gray-500 dark:text-brand-muted text-xs font-bold uppercase tracking-wider mb-1">Total Savings</p>
                            <span className="text-2xl font-black text-gray-900 dark:text-brand-text block">{formatCurrency(totalSaved)}</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-brand-surface rounded-xl border border-gray-200 dark:border-brand-border p-6">
                        <div className="w-full h-80 chart-container">
                            <canvas ref={chartRef}></canvas>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default EmiView;
