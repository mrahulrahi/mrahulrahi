'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { 
    Plus, Trash2, Edit, CheckCircle, Clock, User, 
    ArrowUpRight, ArrowDownRight, Search, Filter, 
    RotateCcw, Sparkles, AlertCircle, Calendar, Tag, Info, HandCoins
} from 'lucide-react';

const DEFAULT_DEBTS = [
    { id: 1, name: 'Alice Smith', amount: 1500, type: 'give', date: '2026-07-02', note: 'Lent for lunch and cab fare', status: 'pending' },
    { id: 2, name: 'Bob Johnson', amount: 4500, type: 'take', date: '2026-07-03', note: 'Borrowed for mechanical keyboard purchase', status: 'pending' },
    { id: 3, name: 'Charlie Brown', amount: 800, type: 'give', date: '2026-07-01', note: 'Share for movie tickets', status: 'settled' },
    { id: 4, name: 'Diana Prince', amount: 12000, type: 'give', date: '2026-07-05', note: 'Lent for monthly rent support', status: 'pending' },
    { id: 5, name: 'Evan Wright', amount: 2500, type: 'take', date: '2026-07-06', note: 'Borrowed for groceries stock', status: 'pending' }
];

export default function DebtTracker() {
    // ----------------------------------------------------
    // State Definitions
    // ----------------------------------------------------
    const [debts, setDebts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('pending');
    const [typeFilter, setTypeFilter] = useState('all');
    const [isMounted, setIsMounted] = useState(false);

    // Form inputs state
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('give'); // 'give' (lent / you will receive) vs 'take' (borrowed / you owe)
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [note, setNote] = useState('');
    const [editingId, setEditingId] = useState(null);

    // ----------------------------------------------------
    // Load & Save Data
    // ----------------------------------------------------
    useEffect(() => {
        setIsMounted(true);
        const storedDebts = localStorage.getItem('debt_tracker_entries');

        if (storedDebts) {
            try {
                setDebts(JSON.parse(storedDebts));
            } catch (e) {
                setDebts(DEFAULT_DEBTS);
            }
        } else {
            setDebts(DEFAULT_DEBTS);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('debt_tracker_entries', JSON.stringify(debts));
        }
    }, [debts, isMounted]);

    // ----------------------------------------------------
    // Calculations
    // ----------------------------------------------------
    const metrics = useMemo(() => {
        let totalOwedToMe = 0; // Total Give (Pending)
        let totalIOwe = 0;     // Total Take (Pending)

        debts.forEach(d => {
            if (d.status === 'pending') {
                const amt = Number(d.amount) || 0;
                if (d.type === 'give') {
                    totalOwedToMe += amt;
                } else {
                    totalIOwe += amt;
                }
            }
        });

        const netDebtPosition = totalOwedToMe - totalIOwe;

        return {
            totalOwedToMe,
            totalIOwe,
            netDebtPosition
        };
    }, [debts]);

    // ----------------------------------------------------
    // CRUD Actions
    // ----------------------------------------------------
    const handleSave = (e) => {
        e.preventDefault();
        if (!name.trim()) return alert('Please enter a person name');
        if (!amount || Number(amount) <= 0) return alert('Please enter a valid positive amount');
        if (!date) return alert('Please select a date');

        const debtData = {
            id: editingId || Date.now(),
            name: name.trim(),
            amount: Number(amount),
            type,
            date,
            note: note.trim(),
            status: editingId ? (debts.find(d => d.id === editingId)?.status || 'pending') : 'pending'
        };

        if (editingId) {
            setDebts(prev => prev.map(d => d.id === editingId ? debtData : d));
            setEditingId(null);
        } else {
            setDebts(prev => [debtData, ...prev]);
        }

        // Reset Form
        setName('');
        setAmount('');
        setNote('');
        setDate(new Date().toISOString().split('T')[0]);
    };

    const handleEdit = (debt) => {
        setEditingId(debt.id);
        setName(debt.name);
        setAmount(debt.amount.toString());
        setType(debt.type);
        setDate(debt.date);
        setNote(debt.note || '');
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this ledger entry?')) {
            setDebts(prev => prev.filter(d => d.id !== id));
            if (editingId === id) {
                setEditingId(null);
                setName('');
                setAmount('');
                setNote('');
            }
        }
    };

    const toggleStatus = (id) => {
        setDebts(prev => prev.map(d => {
            if (d.id === id) {
                const nextStatus = d.status === 'pending' ? 'settled' : 'pending';
                return { ...d, status: nextStatus };
            }
            return d;
        }));
    };

    const handleReset = () => {
        if (window.confirm('Reset all ledger entries to default mock data?')) {
            setDebts(DEFAULT_DEBTS);
            setEditingId(null);
        }
    };

    const handleClearAll = () => {
        if (window.confirm('Delete ALL ledger entries? This cannot be undone.')) {
            setDebts([]);
            setEditingId(null);
        }
    };

    // ----------------------------------------------------
    // Search & Filter
    // ----------------------------------------------------
    const filteredDebts = useMemo(() => {
        return debts.filter(d => {
            const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  (d.note && d.note.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
            const matchesType = typeFilter === 'all' || d.type === typeFilter;

            return matchesSearch && matchesStatus && matchesType;
        });
    }, [debts, searchQuery, statusFilter, typeFilter]);

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
                <span>Synchronizing Debt Ledger...</span>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-slate-900/30 rounded-3xl min-h-screen text-slate-100 font-sans backdrop-blur-md relative overflow-hidden">
            {/* Soft glowing ambient lighting */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header Dashboard Banner */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-800 pb-6 relative z-10">
                <div>
                    <div className="inline-flex items-center gap-1.5 bg-brand-mint/10 border border-brand-mint/20 text-brand-mint px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Debt & Loan Ledger</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Give & Take Debt Console</h1>
                    <p className="text-xs text-slate-400">Track mutual loan debts, borrow allocations, and settle outstanding balances easily.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button 
                        onClick={handleReset} 
                        className="px-3.5 py-2 text-xs font-semibold bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl transition-all flex items-center gap-1.5 text-slate-300 hover:text-white cursor-pointer"
                        title="Restore default mock entries"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Defaults</span>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
                {/* Owed to You (Give) */}
                <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group shadow-inner">
                    <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">GIVE (LENT)</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-1">Owed to You (Receivable)</p>
                    <p className="text-2xl font-bold text-emerald-400 font-mono tracking-tight">
                        {formatCurrency(metrics.totalOwedToMe)}
                    </p>
                </div>

                {/* You Owe (Take) */}
                <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group shadow-inner">
                    <div className="absolute inset-0 bg-linear-to-br from-rose-500/5 to-transparent pointer-events-none" />
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400">
                            <ArrowDownRight className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">TAKE (BORROWED)</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-1">You Owe (Payable)</p>
                    <p className="text-2xl font-bold text-rose-400 font-mono tracking-tight">
                        {formatCurrency(metrics.totalIOwe)}
                    </p>
                </div>

                {/* Net Debt Position */}
                <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group shadow-inner">
                    <div className="absolute inset-0 bg-linear-to-br from-brand-mint/5 to-transparent pointer-events-none" />
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-brand-mint/10 border border-brand-mint/20 rounded-xl text-brand-mint">
                            <HandCoins className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">NET POSITION</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-1">Net Balance Stance</p>
                    <p className={`text-2xl font-bold font-mono tracking-tight ${
                        metrics.netDebtPosition >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                        {metrics.netDebtPosition >= 0 ? '+' : ''}{formatCurrency(metrics.netDebtPosition)}
                    </p>
                </div>
            </div>

            {/* Middle Workspace: Form & List */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                {/* Lend/Borrow form input */}
                <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-inner flex flex-col justify-between h-fit">
                    <div>
                        <h2 className="text-sm font-mono font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800 pb-3 mb-5 flex items-center gap-2">
                            <Tag className="w-4 h-4 text-brand-mint" />
                            {editingId ? 'Edit Ledger Entry' : 'Log Debt Entry'}
                        </h2>

                        <form onSubmit={handleSave} className="space-y-4">
                            {/* Lend / Borrow Type Selector */}
                            <div>
                                <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">Ledger Flow Direction</label>
                                <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-xl">
                                    <button
                                        type="button"
                                        onClick={() => setType('give')}
                                        className={`w-1/2 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${type === 'give' 
                                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' 
                                            : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'}`}
                                    >
                                        🟢 Give (I Lent Money)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setType('take')}
                                        className={`w-1/2 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${type === 'take' 
                                            ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400' 
                                            : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'}`}
                                    >
                                        🔴 Take (I Borrowed)
                                    </button>
                                </div>
                            </div>

                            {/* Name field */}
                            <div>
                                <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Person Name</label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-600" />
                                    <input
                                        type="text"
                                        placeholder="e.g. John Doe, Sarah Miller"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-xl pl-9 pr-3 py-2.5 text-xs outline-none focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 transition-all font-semibold"
                                        maxLength={40}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Amount & Date */}
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
                                    <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Entry Date</label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 transition-all font-mono"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Optional Notes */}
                            <div>
                                <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Ledger Description (Notes)</label>
                                <textarea
                                    placeholder="Add details about what the loan was for..."
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="w-full h-20 bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-xl px-4 py-2 text-xs outline-none focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 transition-all resize-none"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-2">
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingId(null);
                                            setName('');
                                            setAmount('');
                                            setNote('');
                                        }}
                                        className="w-1/3 py-2.5 text-xs font-bold bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                                    >
                                        <span>Cancel</span>
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className={`grow py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                        type === 'give'
                                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/10'
                                            : 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/10'
                                    }`}
                                >
                                    {editingId ? <CheckCircle className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                    <span>{editingId ? 'Save Entry' : 'Log Debt'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Ledger Listing Log */}
                <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-inner flex flex-col justify-between">
                    <div>
                        {/* Filters bar */}
                        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6 border-b border-slate-800/80 pb-4">
                            <h2 className="text-sm font-mono font-bold tracking-wider text-slate-400 uppercase flex items-center gap-2">
                                <HandCoins className="w-4 h-4 text-brand-mint" />
                                Outstanding Ledger List
                            </h2>

                            <div className="flex flex-wrap items-center gap-2">
                                {/* Search filter */}
                                <div className="relative w-full md:w-44">
                                    <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-600" />
                                    <input
                                        type="text"
                                        placeholder="Search name..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-8 pr-2 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 placeholder-slate-600 outline-none focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 text-[10px] transition-all"
                                    />
                                </div>

                                {/* Status filter */}
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-2.5 py-1.5 text-[10px] outline-none cursor-pointer"
                                >
                                    <option value="pending">Only Pending</option>
                                    <option value="settled">Only Settled</option>
                                    <option value="all">Status: All</option>
                                </select>

                                {/* Direction Type filter */}
                                <select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-2.5 py-1.5 text-[10px] outline-none cursor-pointer"
                                >
                                    <option value="all">Direction: All</option>
                                    <option value="give">Give (Lent)</option>
                                    <option value="take">Take (Owe)</option>
                                </select>
                            </div>
                        </div>

                        {/* List Items */}
                        {filteredDebts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-500 border border-dashed border-slate-800 rounded-2xl p-6">
                                <AlertCircle className="w-8 h-8 mb-2 opacity-40 text-slate-400" />
                                <p className="text-xs font-mono">No outstanding debts match filters</p>
                                <p className="text-[10px] opacity-60 mt-1">Adjust search keywords, change status filtering, or add a debt above.</p>
                            </div>
                        ) : (
                            <div className="space-y-3.5 max-h-[440px] overflow-y-auto pr-1">
                                {filteredDebts.map((item) => (
                                    <div 
                                        key={item.id} 
                                        className={`p-4 rounded-2xl border transition-all relative group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                                            item.status === 'settled' 
                                                ? 'bg-slate-950/20 border-slate-850/50 opacity-60' 
                                                : item.type === 'give'
                                                    ? 'bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/30'
                                                    : 'bg-rose-500/5 hover:bg-rose-500/10 border-rose-500/20 hover:border-rose-500/30'
                                        }`}
                                    >
                                        {/* Status settlement strikethrough wrapper */}
                                        <div className="flex items-start gap-3">
                                            {/* Left icon marker */}
                                            <div className={`p-2 rounded-xl mt-0.5 ${
                                                item.status === 'settled'
                                                    ? 'bg-slate-900 text-slate-500'
                                                    : item.type === 'give'
                                                        ? 'bg-emerald-500/10 text-emerald-400'
                                                        : 'bg-rose-500/10 text-rose-400'
                                            }`}>
                                                {item.type === 'give' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className={`text-xs font-bold text-white ${item.status === 'settled' ? 'line-through text-slate-500' : ''}`}>
                                                        {item.name}
                                                    </h3>
                                                    {/* Custom Give or Take badge */}
                                                    <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded leading-none ${
                                                        item.status === 'settled'
                                                            ? 'bg-slate-950 border border-slate-850 text-slate-500'
                                                            : item.type === 'give'
                                                                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                                                                : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                                                    }`}>
                                                        {item.type === 'give' ? 'Give (Lent)' : 'Take (Owe)'}
                                                    </span>
                                                </div>
                                                {item.note && (
                                                    <p className={`text-[10px] text-slate-400 mt-1 max-w-sm leading-normal ${item.status === 'settled' ? 'line-through text-slate-500' : ''}`}>
                                                        {item.note}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-3 mt-1.5 text-[9px] font-mono text-slate-500">
                                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Settle Action / Actions triggers */}
                                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t border-slate-800/40 sm:border-0 pt-3 sm:pt-0">
                                            <div className="flex flex-col items-start sm:items-end">
                                                <span className={`text-sm font-mono font-bold ${
                                                    item.status === 'settled' 
                                                        ? 'line-through text-slate-500' 
                                                        : item.type === 'give' 
                                                            ? 'text-emerald-400' 
                                                            : 'text-rose-400'
                                                }`}>
                                                    {formatCurrency(item.amount)}
                                                </span>
                                                <span className="text-[8px] font-mono text-slate-500 uppercase mt-0.5">
                                                    {item.status === 'settled' ? 'SETTLED' : 'PENDING'}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                {/* Settle check button toggle */}
                                                <button
                                                    onClick={() => toggleStatus(item.id)}
                                                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                                        item.status === 'settled'
                                                            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                                                            : 'border-slate-800 text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/5'
                                                    }`}
                                                    title={item.status === 'settled' ? 'Re-open Debt' : 'Mark as Settled'}
                                                >
                                                    {item.status === 'settled' ? <CheckCircle className="w-3.5 h-3.5 animate-pulse" /> : <CheckCircle className="w-3.5 h-3.5" />}
                                                </button>
                                                {/* Edit entry */}
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    disabled={item.status === 'settled'}
                                                    className="p-1.5 rounded-lg border border-slate-800 text-slate-500 hover:text-slate-200 hover:bg-slate-900/60 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                                                    title="Edit Entry"
                                                >
                                                    <Edit className="w-3.5 h-3.5" />
                                                </button>
                                                {/* Delete entry */}
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-1.5 rounded-lg border border-slate-800 text-slate-500 hover:text-rose-400 hover:bg-rose-500/5 transition-all cursor-pointer"
                                                    title="Delete Entry"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Bottom notes informational */}
                    <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                        <Info className="w-3.5 h-3.5 text-slate-400" />
                        <span>Settled items are archived and excluded from the net balance total sheets.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
