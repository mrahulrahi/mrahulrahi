'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { 
    Plus, Trash2, Edit, TrendingUp, TrendingDown, Wallet, 
    Filter, Calendar, X, Check, RotateCcw, Sparkles, 
    PiggyBank, Info, Search, DollarSign, Tag, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const CATEGORIES = {
    income: [
        { name: 'Salary', color: '#10B981', icon: '💼' },
        { name: 'Freelance', color: '#3B82F6', icon: '💻' },
        { name: 'Investment', color: '#8B5CF6', icon: '📈' },
        { name: 'Gift', color: '#EC4899', icon: '🎁' },
        { name: 'Others', color: '#6B7280', icon: '💵' }
    ],
    expense: [
        { name: 'Food & Dining', color: '#EF4444', icon: '🍔' },
        { name: 'Rent & Living', color: '#F59E0B', icon: '🏠' },
        { name: 'Utilities', color: '#06B6D4', icon: '⚡' },
        { name: 'Entertainment', color: '#8B5CF6', icon: '🎬' },
        { name: 'Shopping', color: '#EC4899', icon: '🛍️' },
        { name: 'Transport', color: '#14B8A6', icon: '🚗' },
        { name: 'Others', color: '#6B7280', icon: '📦' }
    ]
};

const DEFAULT_TRANSACTIONS = [
    { id: 1, title: 'Monthly Salary', amount: 85000, type: 'income', category: 'Salary', date: '2026-07-01', note: 'Main salary credit' },
    { id: 2, title: 'Freelance Project Design', amount: 15000, type: 'income', category: 'Freelance', date: '2026-07-05', note: 'NextJS client work' },
    { id: 3, title: 'Apartment Rent', amount: 22000, type: 'expense', category: 'Rent & Living', date: '2026-07-01', note: 'Standard rent payment' },
    { id: 4, title: 'Supermarket Groceries', amount: 4500, type: 'expense', category: 'Food & Dining', date: '2026-07-03', note: 'Weekly stock' },
    { id: 5, title: 'Steam Summer Sale', amount: 1200, type: 'expense', category: 'Entertainment', date: '2026-07-04', note: 'Picked up strategy games' },
    { id: 6, title: 'Electricity & Internet', amount: 3200, type: 'expense', category: 'Utilities', date: '2026-07-05', note: 'AC & Wi-Fi bills' },
    { id: 7, title: 'Restaurant Dinner', amount: 2800, type: 'expense', category: 'Food & Dining', date: '2026-07-06', note: 'Dinner with friends' }
];

export default function ExpenseTracker() {
    // ----------------------------------------------------
    // State Definitions
    // ----------------------------------------------------
    const [transactions, setTransactions] = useState([]);
    const [budget, setBudget] = useState(45000);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [isMounted, setIsMounted] = useState(false);

    // Form inputs state
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('Food & Dining');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [note, setNote] = useState('');
    const [editingId, setEditingId] = useState(null);

    // ----------------------------------------------------
    // Initial Load & Storage
    // ----------------------------------------------------
    useEffect(() => {
        setIsMounted(true);
        const storedTransactions = localStorage.getItem('expense_tracker_transactions');
        const storedBudget = localStorage.getItem('expense_tracker_budget');

        if (storedTransactions) {
            try {
                setTransactions(JSON.parse(storedTransactions));
            } catch (e) {
                setTransactions(DEFAULT_TRANSACTIONS);
            }
        } else {
            setTransactions(DEFAULT_TRANSACTIONS);
        }

        if (storedBudget) {
            setBudget(Number(storedBudget));
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('expense_tracker_transactions', JSON.stringify(transactions));
        }
    }, [transactions, isMounted]);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('expense_tracker_budget', budget.toString());
        }
    }, [budget, isMounted]);

    // Handle Type shift for automatic category sync
    const handleTypeChange = (newType) => {
        setType(newType);
        if (newType === 'income') {
            setCategory(CATEGORIES.income[0].name);
        } else {
            setCategory(CATEGORIES.expense[0].name);
        }
    };

    // ----------------------------------------------------
    // Metrics Calculations
    // ----------------------------------------------------
    const metrics = useMemo(() => {
        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach(t => {
            const amt = Number(t.amount) || 0;
            if (t.type === 'income') {
                totalIncome += amt;
            } else {
                totalExpense += amt;
            }
        });

        const currentBalance = totalIncome - totalExpense;
        const budgetPercent = budget > 0 ? (totalExpense / budget) * 100 : 0;

        return {
            totalIncome,
            totalExpense,
            currentBalance,
            budgetPercent: Math.min(Math.round(budgetPercent), 1000) // Support percentages over 100%
        };
    }, [transactions, budget]);

    // ----------------------------------------------------
    // Category Breakdown Calculation
    // ----------------------------------------------------
    const categoryBreakdown = useMemo(() => {
        const breakdown = {};
        let totalExpense = 0;

        // Initialize with default expense categories to ensure colors exist
        CATEGORIES.expense.forEach(cat => {
            breakdown[cat.name] = {
                name: cat.name,
                value: 0,
                color: cat.color,
                icon: cat.icon,
                count: 0
            };
        });

        transactions.forEach(t => {
            if (t.type === 'expense') {
                const amt = Number(t.amount) || 0;
                totalExpense += amt;
                if (!breakdown[t.category]) {
                    const fallbackColor = CATEGORIES.expense.find(c => c.name === t.category)?.color || '#6B7280';
                    const fallbackIcon = CATEGORIES.expense.find(c => c.name === t.category)?.icon || '📦';
                    breakdown[t.category] = {
                        name: t.category,
                        value: 0,
                        color: fallbackColor,
                        icon: fallbackIcon,
                        count: 0
                    };
                }
                breakdown[t.category].value += amt;
                breakdown[t.category].count += 1;
            }
        });

        const list = Object.values(breakdown)
            .filter(item => item.value > 0)
            .sort((a, b) => b.value - a.value);

        return {
            list,
            totalExpense
        };
    }, [transactions]);

    // ----------------------------------------------------
    // Custom Donut SVG Segments
    // ----------------------------------------------------
    const donutSegments = useMemo(() => {
        const segments = [];
        let accumulatedPercent = 0;
        const radius = 50;
        const circumference = 2 * Math.PI * radius;

        categoryBreakdown.list.forEach((item) => {
            const percent = categoryBreakdown.totalExpense > 0 ? item.value / categoryBreakdown.totalExpense : 0;
            const strokeDasharray = `${percent * circumference} ${circumference}`;
            const strokeDashoffset = -accumulatedPercent * circumference;

            segments.push({
                ...item,
                strokeDasharray,
                strokeDashoffset,
                percent: Math.round(percent * 100)
            });

            accumulatedPercent += percent;
        });

        return segments;
    }, [categoryBreakdown]);

    // ----------------------------------------------------
    // Actions & CRUD
    // ----------------------------------------------------
    const handleSave = (e) => {
        e.preventDefault();
        if (!title.trim()) return alert('Please enter a description/title');
        if (!amount || Number(amount) <= 0) return alert('Please enter a positive amount');
        if (!date) return alert('Please select a date');

        const txData = {
            id: editingId || Date.now(),
            title: title.trim(),
            amount: Number(amount),
            type,
            category,
            date,
            note: note.trim()
        };

        if (editingId) {
            setTransactions(prev => prev.map(t => t.id === editingId ? txData : t));
            setEditingId(null);
        } else {
            setTransactions(prev => [txData, ...prev]);
        }

        // Reset form
        setTitle('');
        setAmount('');
        setNote('');
        setDate(new Date().toISOString().split('T')[0]);
        // Set category to current type's first category
        const firstCategoryName = CATEGORIES[type][0].name;
        setCategory(firstCategoryName);
    };

    const handleEdit = (tx) => {
        setEditingId(tx.id);
        setTitle(tx.title);
        setAmount(tx.amount.toString());
        setType(tx.type);
        setCategory(tx.category);
        setDate(tx.date);
        setNote(tx.note || '');
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this transaction?')) {
            setTransactions(prev => prev.filter(t => t.id !== id));
            if (editingId === id) {
                setEditingId(null);
                setTitle('');
                setAmount('');
                setNote('');
            }
        }
    };

    const handleReset = () => {
        if (window.confirm('Reset all transaction data to default? This will clear custom items.')) {
            setTransactions(DEFAULT_TRANSACTIONS);
            setBudget(45000);
            setEditingId(null);
        }
    };

    const handleClearAll = () => {
        if (window.confirm('Clear ALL transactions?')) {
            setTransactions([]);
            setEditingId(null);
        }
    };

    // ----------------------------------------------------
    // Search & Filtering
    // ----------------------------------------------------
    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  (t.note && t.note.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesType = typeFilter === 'all' || t.type === typeFilter;
            const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;

            return matchesSearch && matchesType && matchesCategory;
        });
    }, [transactions, searchQuery, typeFilter, categoryFilter]);

    // Format utility
    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    // Check budget limit class
    const getBudgetProgressColor = (percent) => {
        if (percent >= 100) return 'bg-rose-500 shadow-rose-500/20';
        if (percent >= 80) return 'bg-amber-500 shadow-amber-500/20';
        return 'bg-brand-mint shadow-brand-mint/20';
    };

    const getBudgetTextColor = (percent) => {
        if (percent >= 100) return 'text-rose-400';
        if (percent >= 80) return 'text-amber-400';
        return 'text-brand-mint';
    };

    if (!isMounted) {
        return (
            <div className="flex items-center justify-center py-20 text-slate-400 font-mono">
                <span>Synchronizing Ledgers...</span>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-slate-900/30 rounded-3xl min-h-screen text-slate-100 font-sans backdrop-blur-md relative overflow-hidden">
            {/* Ambient subtle blurs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-mint/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header Dashboard Banner */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-800 pb-6 relative z-10">
                <div>
                    <div className="inline-flex items-center gap-1.5 bg-brand-mint/10 border border-brand-mint/20 text-brand-mint px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Interactive Asset Hub</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Expense & Budget Console</h1>
                    <p className="text-xs text-slate-400">Manage transaction ledgers, set savings targets, and review visual expenditure breakdowns.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button 
                        onClick={handleReset} 
                        className="px-3.5 py-2 text-xs font-semibold bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl transition-all flex items-center gap-1.5 text-slate-300 hover:text-white cursor-pointer"
                        title="Restore pre-populated transactions"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restore Defaults</span>
                    </button>
                    <button 
                        onClick={handleClearAll} 
                        className="px-3.5 py-2 text-xs font-semibold bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 rounded-xl transition-all flex items-center gap-1.5 text-rose-400 cursor-pointer"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear All</span>
                    </button>
                </div>
            </div>

            {/* Top Cards: Financial Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10">
                {/* Current Balance */}
                <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group shadow-inner">
                    <div className="absolute inset-0 bg-linear-to-br from-brand-mint/5 to-transparent pointer-events-none" />
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-brand-mint/10 border border-brand-mint/20 rounded-xl text-brand-mint">
                            <Wallet className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">NET SAVINGS</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-1">Available Balance</p>
                    <p className={`text-2xl font-bold font-mono tracking-tight ${metrics.currentBalance >= 0 ? 'text-white' : 'text-rose-400'}`}>
                        {formatCurrency(metrics.currentBalance)}
                    </p>
                </div>

                {/* Total Income */}
                <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group shadow-inner">
                    <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">TOTAL CREDITS</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-1">Total Inflow</p>
                    <p className="text-2xl font-bold text-emerald-400 font-mono tracking-tight">
                        {formatCurrency(metrics.totalIncome)}
                    </p>
                </div>

                {/* Total Expense */}
                <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group shadow-inner">
                    <div className="absolute inset-0 bg-linear-to-br from-rose-500/5 to-transparent pointer-events-none" />
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400">
                            <TrendingDown className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">TOTAL DEBITS</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-1">Total Outflow</p>
                    <p className="text-2xl font-bold text-rose-400 font-mono tracking-tight">
                        {formatCurrency(metrics.totalExpense)}
                    </p>
                </div>

                {/* Monthly Budget Tracker */}
                <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group shadow-inner">
                    <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent pointer-events-none" />
                    <div className="flex justify-between items-start mb-3">
                        <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                            <PiggyBank className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">LIMIT CAP</span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-xs text-slate-400">Monthly Budget</p>
                        <p className="text-xs font-bold font-mono text-slate-200">{formatCurrency(budget)}</p>
                    </div>

                    {/* Interactive Slider Input */}
                    <input 
                        type="range"
                        min="5000"
                        max="150000"
                        step="5000"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-mint mb-2.5"
                    />

                    {/* Progress indicator bar */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-1 flex">
                        <div 
                            className={`h-full transition-all duration-500 rounded-full ${getBudgetProgressColor(metrics.budgetPercent)}`}
                            style={{ width: `${Math.min(metrics.budgetPercent, 100)}%` }}
                        />
                    </div>
                    
                    <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-slate-500">Cap utilization:</span>
                        <span className={`font-bold ${getBudgetTextColor(metrics.budgetPercent)}`}>
                            {metrics.budgetPercent}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Middle Section: Transaction Form & Visual Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 relative z-10">
                {/* Transaction input form */}
                <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-inner flex flex-col justify-between">
                    <div>
                        <h2 className="text-sm font-mono font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800 pb-3 mb-5 flex items-center gap-2">
                            <Tag className="w-4 h-4 text-brand-mint" />
                            {editingId ? 'Edit Ledger Entry' : 'New Ledger Entry'}
                        </h2>

                        <form onSubmit={handleSave} className="space-y-4">
                            {/* Type Toggle switcher */}
                            <div>
                                <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">Transaction Type</label>
                                <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-xl">
                                    <button
                                        type="button"
                                        onClick={() => handleTypeChange('expense')}
                                        className={`w-1/2 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${type === 'expense' 
                                            ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400' 
                                            : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'}`}
                                    >
                                        Debit (Expense)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleTypeChange('income')}
                                        className={`w-1/2 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${type === 'income' 
                                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' 
                                            : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'}`}
                                    >
                                        Credit (Income)
                                    </button>
                                </div>
                            </div>

                            {/* Title field */}
                            <div>
                                <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Weekly Groceries, Gas bill, Salary"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 transition-all"
                                    maxLength={50}
                                    required
                                />
                            </div>

                            {/* Amount and Date grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Amount (INR)</label>
                                    <div className="relative">
                                        <span className="absolute left-3.5 top-2.5 text-slate-500 text-xs">₹</span>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-xl pl-8 pr-3 py-2.5 text-xs outline-none focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 transition-all font-mono"
                                            min="0"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Transaction Date</label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 transition-all font-mono"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Category Select Dropdown */}
                            <div>
                                <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 transition-all cursor-pointer"
                                >
                                    {CATEGORIES[type].map(cat => (
                                        <option key={cat.name} value={cat.name}>
                                            {cat.icon} {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Note field */}
                            <div>
                                <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Additional Notes (Optional)</label>
                                <textarea
                                    placeholder="Add payment details, reference codes..."
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="w-full h-16 bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-xl px-4 py-2 text-xs outline-none focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 transition-all resize-none"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-2">
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingId(null);
                                            setTitle('');
                                            setAmount('');
                                            setNote('');
                                        }}
                                        className="w-1/3 py-2.5 text-xs font-bold bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                        <span>Cancel</span>
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className={`grow py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                        type === 'income'
                                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/10'
                                            : 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/10'
                                    }`}
                                >
                                    {editingId ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                    <span>{editingId ? 'Save Changes' : 'Record Transaction'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Visual Analytics */}
                <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-inner flex flex-col justify-between">
                    <div>
                        <h2 className="text-sm font-mono font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800 pb-3 mb-5 flex items-center gap-2">
                            <Tag className="w-4 h-4 text-brand-mint" />
                            Expense Analytics Breakdown
                        </h2>

                        {categoryBreakdown.list.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-500 border border-dashed border-slate-800 rounded-2xl p-6">
                                <Info className="w-8 h-8 mb-2 opacity-40 text-slate-400" />
                                <p className="text-xs font-mono">No expense records found</p>
                                <p className="text-[10px] opacity-60 text-center max-w-[240px] mt-1">Record debits on the form panel to compile category allocation graphs.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 py-2">
                                {/* SVG Donut Chart */}
                                <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                                    <svg width="100%" height="100%" viewBox="0 0 120 120" className="transform -rotate-90">
                                        <circle
                                            cx="60"
                                            cy="60"
                                            r="50"
                                            fill="transparent"
                                            stroke="#1e293b"
                                            strokeWidth="10"
                                        />
                                        {donutSegments.map((seg, idx) => (
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
                                                className="transition-all duration-750 hover:stroke-[12px] cursor-pointer"
                                                title={`${seg.name}: ${seg.percent}%`}
                                            />
                                        ))}
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/40 rounded-full m-[11px] backdrop-blur-xs">
                                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">EXPENSES</span>
                                        <span className="text-base font-bold font-mono text-slate-200 mt-0.5">
                                            {formatCurrency(categoryBreakdown.totalExpense)}
                                        </span>
                                    </div>
                                </div>

                                {/* Custom Legend list with animated allocation progress */}
                                <div className="flex-1 w-full space-y-3.5 max-h-56 overflow-y-auto pr-1">
                                    {donutSegments.map((item, idx) => (
                                        <div key={idx} className="group relative">
                                            <div className="flex justify-between items-center text-xs font-semibold mb-1">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-sm shrink-0">{item.icon}</span>
                                                    <span className="text-slate-300 group-hover:text-white transition-colors">{item.name}</span>
                                                    <span className="text-[9px] font-mono bg-slate-950 border border-slate-800 text-slate-500 px-1.5 py-0.5 rounded leading-none">
                                                        x{item.count}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-slate-400 font-mono text-[11px]">{formatCurrency(item.value)}</span>
                                                    <span className="text-brand-mint font-mono font-bold text-[10px] w-8 text-right">
                                                        {item.percent}%
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Progress line */}
                                            <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full rounded-full transition-all duration-500"
                                                    style={{ 
                                                        width: `${item.percent}%`,
                                                        backgroundColor: item.color 
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Transaction Filter Console & Log */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-inner relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6 border-b border-slate-800/80 pb-4">
                    <div>
                        <h2 className="text-sm font-mono font-bold tracking-wider text-slate-400 uppercase flex items-center gap-2">
                            <Tag className="w-4 h-4 text-brand-mint" />
                            Ledger History Log
                        </h2>
                    </div>

                    {/* Filters Console controls */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                        {/* Search Bar */}
                        <div className="relative max-w-xs w-full">
                            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-600" />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 placeholder-slate-600 outline-none focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 text-xs transition-all"
                            />
                        </div>

                        {/* Type Filter switcher */}
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-brand-mint/50 cursor-pointer"
                        >
                            <option value="all">Type: All</option>
                            <option value="income">Credits (Inflow)</option>
                            <option value="expense">Debits (Outflow)</option>
                        </select>

                        {/* Category Filter switcher */}
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 text-xs outline-none focus:border-brand-mint/50 cursor-pointer"
                        >
                            <option value="all">Category: All</option>
                            {CATEGORIES.income.map(cat => (
                                <option key={`in-${cat.name}`} value={cat.name}>
                                    🟢 {cat.name}
                                </option>
                            ))}
                            {CATEGORIES.expense.map(cat => (
                                <option key={`ex-${cat.name}`} value={cat.name}>
                                    🔴 {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Ledger Listing */}
                {filteredTransactions.length === 0 ? (
                    <div className="text-center py-16 bg-slate-950/20 border border-slate-800 rounded-2xl p-6">
                        <Info className="w-10 h-10 text-slate-600 mx-auto mb-3 animate-pulse" />
                        <h3 className="text-sm font-bold text-slate-400">No ledger matches found</h3>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">No records found matching your filters. Try shifting categories or adjust search keys.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 text-slate-500 text-[10px] font-mono uppercase tracking-wider">
                                    <th className="pb-3 pl-4">Details</th>
                                    <th className="pb-3 pl-4">Category</th>
                                    <th className="pb-3 pl-4">Date</th>
                                    <th className="pb-3 pl-4 text-right">Amount</th>
                                    <th className="pb-3 pr-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/40">
                                {filteredTransactions.map((tx) => {
                                    // Fetch icon corresponding to current categories
                                    const allCats = [...CATEGORIES.income, ...CATEGORIES.expense];
                                    const catIcon = allCats.find(c => c.name === tx.category)?.icon || '📦';
                                    const catColor = allCats.find(c => c.name === tx.category)?.color || '#6B7280';

                                    return (
                                        <tr key={tx.id} className="hover:bg-slate-900/20 transition-all group">
                                            {/* Details Description */}
                                            <td className="py-4 pl-4">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                                                        {tx.title}
                                                    </span>
                                                    {tx.note && (
                                                        <span className="text-[10px] text-slate-500 italic mt-0.5 max-w-md truncate">
                                                            {tx.note}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Category badge */}
                                            <td className="py-4 pl-4">
                                                <div className="inline-flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-xl text-[10px] font-medium text-slate-300">
                                                    <span className="text-xs shrink-0" style={{ color: catColor }}>{catIcon}</span>
                                                    <span>{tx.category}</span>
                                                </div>
                                            </td>

                                            {/* Date info */}
                                            <td className="py-4 pl-4 text-xs font-mono text-slate-400">
                                                {tx.date}
                                            </td>

                                            {/* Amount metrics */}
                                            <td className="py-4 pl-4 text-right">
                                                <span className={`text-xs font-mono font-bold ${
                                                    tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                                                }`}>
                                                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                                                </span>
                                            </td>

                                            {/* Action modifiers */}
                                            <td className="py-4 pr-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button 
                                                        onClick={() => handleEdit(tx)} 
                                                        className={`p-1.5 rounded-lg border text-slate-500 hover:text-slate-200 hover:bg-slate-900/60 transition-all cursor-pointer ${
                                                            editingId === tx.id ? 'border-brand-mint text-brand-mint bg-brand-mint/5' : 'border-slate-800'
                                                        }`}
                                                        title="Edit this entry"
                                                    >
                                                        <Edit className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(tx.id)} 
                                                        className="p-1.5 rounded-lg border border-slate-800 text-slate-500 hover:text-rose-400 hover:bg-rose-500/5 transition-all cursor-pointer"
                                                        title="Delete this entry"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
