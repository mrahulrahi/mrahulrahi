'use client'

import React, { useState, useEffect, useMemo } from 'react';
import {
    TrendingUp, ShieldAlert, Sparkles, Percent, DollarSign, Calendar,
    RotateCcw, Info, Lightbulb, Settings, FileSpreadsheet, ArrowUpRight,
    ArrowDownRight, CheckCircle2, AlertTriangle, ShieldCheck,
    Car, Bike, Smartphone, Laptop, Plus, Trash2, Target, HandCoins,
    Tag, Edit, Flame, Activity
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

const getCategoryIcon = (category, className = "w-4 h-4") => {
    switch (category) {
        case 'car':
            return <Car className={className} />;
        case 'bike':
            return <Bike className={className} />;
        case 'smartphone':
            return <Smartphone className={className} />;
        case 'laptop':
            return <Laptop className={className} />;
        default:
            return <Sparkles className={className} />;
    }
};

const getCategoryDefaults = (category) => {
    switch (category) {
        case 'laptop':
        case 'smartphone':
            return {
                inflationRate: 3,
                bucketYield: 7,
                useLoan: false,
                downPaymentPct: 100,
                loanDuration: 0,
                loanInterest: 0
            };
        case 'car':
            return {
                inflationRate: 8,
                bucketYield: 12,
                useLoan: true,
                downPaymentPct: 20,
                loanDuration: 5,
                loanInterest: 9
            };
        case 'bike':
            return {
                inflationRate: 8,
                bucketYield: 12,
                useLoan: false,
                downPaymentPct: 100,
                loanDuration: 0,
                loanInterest: 0
            };
        default:
            return {
                inflationRate: 10,
                bucketYield: 10,
                useLoan: false,
                downPaymentPct: 100,
                loanDuration: 0,
                loanInterest: 0
            };
    }
};

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

    // Short-Term Goals
    const [shortTermGoals, setShortTermGoals] = useState([
        { id: '1', name: 'MacBook Pro', cost: 150000, targetAge: 30, category: 'laptop', enabled: true, inflationRate: 3, bucketYield: 7, useLoan: false, downPaymentPct: 100, loanDuration: 0, loanInterest: 0 },
        { id: '2', name: 'iPhone Upgrade', cost: 80000, targetAge: 32, category: 'smartphone', enabled: true, inflationRate: 3, bucketYield: 7, useLoan: false, downPaymentPct: 100, loanDuration: 0, loanInterest: 0 },
        { id: '3', name: 'Sports Bike', cost: 250000, targetAge: 34, category: 'bike', enabled: true, inflationRate: 8, bucketYield: 12, useLoan: false, downPaymentPct: 100, loanDuration: 0, loanInterest: 0 },
        { id: '4', name: 'Electric SUV', cost: 1500000, targetAge: 38, category: 'car', enabled: false, inflationRate: 8, bucketYield: 12, useLoan: true, downPaymentPct: 20, loanDuration: 5, loanInterest: 9 }
    ]);

    // Active Settings ID state
    const [openSettingsGoalId, setOpenSettingsGoalId] = useState(null);
    const [activeGoalsTab, setActiveGoalsTab] = useState('goals'); // 'goals' vs 'debts'
    const [bottomActiveTab, setBottomActiveTab] = useState('ledger'); // 'ledger' | 'fire' | 'optimizer'

    // Synced Debt / Debt Ledger states
    const [debts, setDebts] = useState([]);
    const [debtRepaymentAges, setDebtRepaymentAges] = useState({});
    const [debtIncludedToggles, setDebtIncludedToggles] = useState({});

    // Debt Form inputs state
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('give'); // 'give' (lent) vs 'take' (borrowed)
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [note, setNote] = useState('');
    const [editingId, setEditingId] = useState(null);

    // Debt filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('pending');
    const [typeFilter, setTypeFilter] = useState('all');

    // Form inputs state
    const [goalName, setGoalName] = useState('');
    const [goalCost, setGoalCost] = useState('');
    const [goalAge, setGoalAge] = useState(30);
    const [goalCategory, setGoalCategory] = useState('car');

    // Portfolios
    const [preAllocation, setPreAllocation] = useState(DEFAULT_PRE_ALLOCATION);
    const [postAllocation, setPostAllocation] = useState(DEFAULT_POST_ALLOCATION);

    const [isMounted, setIsMounted] = useState(false);
    const [hoveredData, setHoveredData] = useState(null);
    const [expandedDebtId, setExpandedDebtId] = useState(null);
    const [adjType, setAdjType] = useState('minus');
    const [adjAmount, setAdjAmount] = useState('');
    const [adjDate, setAdjDate] = useState(new Date().toISOString().split('T')[0]);
    const [adjNote, setAdjNote] = useState('');

    const getDebtNetAmount = (d) => {
        if (!d.transactions || !Array.isArray(d.transactions) || d.transactions.length === 0) {
            return Number(d.amount) || 0;
        }
        return d.transactions.reduce((acc, t) => {
            const amt = Number(t.amount) || 0;
            return t.type === 'plus' ? acc + amt : acc - amt;
        }, 0);
    };

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
                if (parsed.shortTermGoals) setShortTermGoals(parsed.shortTermGoals);
                if (parsed.debtRepaymentAges) setDebtRepaymentAges(parsed.debtRepaymentAges);
                if (parsed.debtIncludedToggles) setDebtIncludedToggles(parsed.debtIncludedToggles);
            } catch (e) {
                console.error("Failed to load retirement configurations", e);
            }
        }

        // Synced debts from Debt Tracker entries
        const storedDebts = localStorage.getItem('debt_tracker_entries');
        if (storedDebts) {
            try {
                const parsedDebts = JSON.parse(storedDebts);
                const migratedDebts = parsedDebts.map(d => {
                    if (!d.transactions || !Array.isArray(d.transactions)) {
                        return {
                            ...d,
                            transactions: [
                                {
                                    id: d.id,
                                    type: 'plus',
                                    amount: Number(d.amount) || 0,
                                    date: d.date,
                                    note: d.note || 'Original entry'
                                }
                            ]
                        };
                    }
                    return d;
                });
                setDebts(migratedDebts);
            } catch (e) {
                console.error("Failed to parse synced debts", e);
            }
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            const data = {
                currentAge, retirementAge, planningAge, currentSavings,
                monthlyInvestments, annualStepUp, retirementExpense,
                inflation, taxApplied, preAllocation, postAllocation,
                shortTermGoals,
                debtRepaymentAges,
                debtIncludedToggles
            };
            localStorage.setItem('retirement_planner_config', JSON.stringify(data));
        }
    }, [
        currentAge, retirementAge, planningAge, currentSavings,
        monthlyInvestments, annualStepUp, retirementExpense,
        inflation, taxApplied, preAllocation, postAllocation,
        shortTermGoals, debtRepaymentAges, debtIncludedToggles, isMounted
    ]);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('debt_tracker_entries', JSON.stringify(debts));
        }
    }, [debts, isMounted]);

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
    const preRetireReturnRate = useMemo(() => {
        return taxApplied
            ? preSummary.weightedReturn * (1 - preSummary.weightedTax / 100)
            : preSummary.weightedReturn;
    }, [taxApplied, preSummary]);

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

            // Calculate short-term goal cash expenses and EMIs at this age
            let goalExpensesVal = 0; // Immediate cash / down payments
            let emiExpensesVal = 0;  // Ongoing EMIs
            const goalsListAtAge = [];
            const emiListAtAge = [];

            shortTermGoals.forEach(g => {
                if (!g.enabled) return;

                const goalInflation = g.inflationRate !== undefined ? g.inflationRate : inflation;
                const yearsDiff = age - currentAge;
                const inflatedCost = Number(g.cost) * Math.pow(1 + goalInflation / 100, yearsDiff);

                // Check if this goal is purchased at this age
                if (Number(g.targetAge) === age) {
                    if (g.useLoan) {
                        const downPaymentCost = inflatedCost * ((g.downPaymentPct ?? 20) / 100);
                        goalExpensesVal += downPaymentCost;
                        goalsListAtAge.push({ ...g, inflatedCost, costPaid: downPaymentCost, type: 'downpayment' });
                    } else {
                        goalExpensesVal += inflatedCost;
                        goalsListAtAge.push({ ...g, inflatedCost, costPaid: inflatedCost, type: 'cash' });
                    }
                }

                // Check if this goal has active EMI at this age
                if (g.useLoan && age >= Number(g.targetAge) && age < Number(g.targetAge) + Number(g.loanDuration)) {
                    // Loan principal = inflatedCostAtPurchase
                    const yearsDiffAtPurchase = Number(g.targetAge) - currentAge;
                    const inflatedCostAtPurchase = Number(g.cost) * Math.pow(1 + goalInflation / 100, yearsDiffAtPurchase);
                    const downPaymentCostAtPurchase = inflatedCostAtPurchase * ((g.downPaymentPct ?? 20) / 100);
                    const loanPrincipal = inflatedCostAtPurchase - downPaymentCostAtPurchase;

                    const r_annual = g.loanInterest ?? 9;
                    const r_monthly = r_annual / 12 / 100;
                    const n_months = Number(g.loanDuration) * 12;

                    let monthlyEmi = 0;
                    if (r_monthly > 0) {
                        monthlyEmi = loanPrincipal * r_monthly * Math.pow(1 + r_monthly, n_months) / (Math.pow(1 + r_monthly, n_months) - 1);
                    } else {
                        monthlyEmi = loanPrincipal / n_months;
                    }

                    const annualEmi = monthlyEmi * 12;
                    emiExpensesVal += annualEmi;
                    emiListAtAge.push({ ...g, annualEmi, monthlyEmi });
                }
            });

            const totalGoalOutflow = goalExpensesVal + emiExpensesVal;

            // Calculate synced debt inflows and outflows at this age
            let debtInflowVal = 0;
            let debtOutflowVal = 0;
            const debtInflowsListAtAge = [];
            const debtOutflowsListAtAge = [];

            debts.forEach(d => {
                // Only pending items are simulated on the projection curve
                if (d.status !== 'pending') return;

                const isIncluded = debtIncludedToggles[d.id] !== false;
                if (!isIncluded) return;

                const settlementAge = debtRepaymentAges[d.id] ?? currentAge;
                if (settlementAge === age) {
                    const amt = getDebtNetAmount(d);
                    if (d.type === 'give') {
                        debtInflowVal += amt;
                        debtInflowsListAtAge.push(d);
                    } else {
                        debtOutflowVal += amt;
                        debtOutflowsListAtAge.push(d);
                    }
                }
            });

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
                interest = Math.max(0, startSavings) * (preRetireReturnRate / 100);
                savings = startSavings + additions + interest - totalGoalOutflow + debtInflowVal - debtOutflowVal;
            } else {
                // Retired years
                additions = 0;
                // Inflation adjusted expenses compounding each year
                const yearsDiff = age - currentAge;
                expenses = initialRetirementExpenseYearly * Math.pow(1 + inflation / 100, yearsDiff);
                interest = Math.max(0, startSavings) * (postRetireReturnRate / 100);
                savings = startSavings - expenses + interest - totalGoalOutflow + debtInflowVal - debtOutflowVal;
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
                goalExpenses: goalExpensesVal,
                emiExpenses: emiExpensesVal,
                goalsList: goalsListAtAge,
                emiList: emiListAtAge,
                debtInflow: debtInflowVal,
                debtOutflow: debtOutflowVal,
                debtInflowsList: debtInflowsListAtAge,
                debtOutflowsList: debtOutflowsListAtAge,
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
        inflation, taxApplied, preSummary, postSummary, shortTermGoals,
        debts, debtRepaymentAges, debtIncludedToggles
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

    const milestonePoints = useMemo(() => {
        if (!chartPaths.points || chartPaths.points.length === 0) return [];
        return chartPaths.points.map(p => {
            const row = simulation.rows.find(r => r.age === p.age);
            const goalsAtAge = row?.goalsList || [];
            const activeEmisAtAge = row?.emiList || [];
            const debtInflowsAtAge = row?.debtInflowsList || [];
            const debtOutflowsAtAge = row?.debtOutflowsList || [];
            const hasMilestone = goalsAtAge.length > 0 || debtInflowsAtAge.length > 0 || debtOutflowsAtAge.length > 0;
            return { ...p, goals: goalsAtAge, emis: activeEmisAtAge, debtInflows: debtInflowsAtAge, debtOutflows: debtOutflowsAtAge, hasMilestone };
        }).filter(p => p.hasMilestone);
    }, [chartPaths.points, simulation.rows]);

    const goalsAtHoveredAge = useMemo(() => {
        if (!hoveredData) return [];
        return simulation.rows.find(r => r.age === hoveredData.age)?.goalsList || [];
    }, [hoveredData, simulation.rows]);

    const emisAtHoveredAge = useMemo(() => {
        if (!hoveredData) return [];
        return simulation.rows.find(r => r.age === hoveredData.age)?.emiList || [];
    }, [hoveredData, simulation.rows]);

    const debtInflowsAtHoveredAge = useMemo(() => {
        if (!hoveredData) return [];
        return simulation.rows.find(r => r.age === hoveredData.age)?.debtInflowsList || [];
    }, [hoveredData, simulation.rows]);

    const debtOutflowsAtHoveredAge = useMemo(() => {
        if (!hoveredData) return [];
        return simulation.rows.find(r => r.age === hoveredData.age)?.debtOutflowsList || [];
    }, [hoveredData, simulation.rows]);

    const fireAnalytics = useMemo(() => {
        const todayAnnualExpense = retirementExpense * 12;
        const todayFireNumber = todayAnnualExpense * 25;

        const yearsToRetire = Math.max(0, retirementAge - currentAge);
        const inflationFactor = Math.pow(1 + inflation / 100, yearsToRetire);
        const futureAnnualExpense = todayAnnualExpense * inflationFactor;
        const futureFireNumber = futureAnnualExpense * 25;

        const fiRow = simulation.rows.find(r => r.interest > r.expenses && r.status !== 'Dead');
        const fiAge = fiRow ? fiRow.age : null;

        const peakRow = simulation.rows.reduce((peak, r) => r.endSavings > peak.endSavings ? r : peak, { endSavings: 0, age: currentAge });

        const retirementRow = simulation.rows.find(r => r.age === retirementAge);
        const nestEggAtRetirement = retirementRow ? retirementRow.startSavings : 0;
        const realNestEggValue = nestEggAtRetirement / inflationFactor;

        const readinessPct = todayFireNumber > 0 ? Math.min(100, Math.max(0, (currentSavings / todayFireNumber) * 100)) : 100;

        return {
            todayFireNumber,
            futureFireNumber,
            fiAge,
            peakSavings: peakRow.endSavings,
            peakSavingsAge: peakRow.age,
            nestEggAtRetirement,
            realNestEggValue,
            readinessPct
        };
    }, [simulation.rows, retirementExpense, retirementAge, currentAge, inflation, currentSavings]);

    const handleOptimizePortfolio = () => {
        if (window.confirm("Would you like to automatically rebalance your pre-retirement and post-retirement portfolios for optimal tax-efficiency and capital preservation?")) {
            setPreAllocation([
                { name: 'Fixed Returns', return: 7, tax: 30, share: 15 },
                { name: 'Large Cap Mutual Funds', return: 12, tax: 20, share: 50 },
                { name: 'Midcap Mutual Funds', return: 15, tax: 20, share: 20 },
                { name: 'Smallcap mutual funds', return: 18, tax: 20, share: 15 }
            ]);

            setPostAllocation([
                { name: 'Fixed Returns', return: 7, tax: 30, share: 60 },
                { name: 'Large Cap Mutual Funds', return: 12, tax: 20, share: 30 },
                { name: 'Midcap Mutual Funds', return: 15, tax: 20, share: 10 },
                { name: 'Smallcap mutual funds', return: 18, tax: 20, share: 0 }
            ]);

            alert("Portfolios optimized successfully! Pre-retirement fixed returns reduced to limit tax drag, and post-retirement secured to avoid equity volatility.");
        }
    };

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
            setShortTermGoals([
                { id: '1', name: 'MacBook Pro', cost: 150000, targetAge: 30, category: 'laptop', enabled: true, inflationRate: 3, bucketYield: 7, useLoan: false, downPaymentPct: 100, loanDuration: 0, loanInterest: 0 },
                { id: '2', name: 'iPhone Upgrade', cost: 80000, targetAge: 32, category: 'smartphone', enabled: true, inflationRate: 3, bucketYield: 7, useLoan: false, downPaymentPct: 100, loanDuration: 0, loanInterest: 0 },
                { id: '3', name: 'Sports Bike', cost: 250000, targetAge: 34, category: 'bike', enabled: true, inflationRate: 8, bucketYield: 12, useLoan: false, downPaymentPct: 100, loanDuration: 0, loanInterest: 0 },
                { id: '4', name: 'Electric SUV', cost: 1500000, targetAge: 38, category: 'car', enabled: false, inflationRate: 8, bucketYield: 12, useLoan: true, downPaymentPct: 20, loanDuration: 5, loanInterest: 9 }
            ]);
        }
    };

    const getInflatedCost = (cost, targetAge, customInflation) => {
        const yearsDiff = Math.max(0, Number(targetAge) - currentAge);
        const infRate = customInflation !== undefined ? customInflation : inflation;
        return Number(cost) * Math.pow(1 + infRate / 100, yearsDiff);
    };

    const getRequiredMonthlySavings = (g) => {
        const targetAge = Number(g.targetAge);
        const yearsToSave = targetAge - currentAge;
        if (yearsToSave <= 0) return 0;

        const goalInflation = g.inflationRate !== undefined ? g.inflationRate : inflation;
        const inflatedCost = getInflatedCost(g.cost, targetAge, goalInflation);

        // Target amount is down payment if using loan, else full cost
        const targetAmount = g.useLoan
            ? inflatedCost * ((g.downPaymentPct ?? 20) / 100)
            : inflatedCost;

        const monthlyRate = (g.bucketYield !== undefined ? g.bucketYield : preRetireReturnRate) / 12 / 100;
        if (monthlyRate <= 0) {
            return targetAmount / (yearsToSave * 12);
        }

        const totalMonths = yearsToSave * 12;
        const required = targetAmount * monthlyRate / (Math.pow(1 + monthlyRate, totalMonths) - 1);
        return required;
    };

    const totalRequiredMonthlyGoalSavings = useMemo(() => {
        let total = 0;
        shortTermGoals.forEach(g => {
            if (g.enabled) {
                total += getRequiredMonthlySavings(g);
            }
        });
        return total;
    }, [shortTermGoals, currentAge, preRetireReturnRate, inflation]);

    const handleAddGoal = (e) => {
        e.preventDefault();
        if (!goalName.trim() || !goalCost || !goalAge) return;

        const defaults = getCategoryDefaults(goalCategory);
        const newGoal = {
            id: Date.now().toString(),
            name: goalName,
            cost: Number(goalCost),
            targetAge: Number(goalAge),
            category: goalCategory,
            enabled: true,
            ...defaults
        };

        setShortTermGoals(prev => [...prev, newGoal]);
        setGoalName('');
        setGoalCost('');
    };

    const handleDeleteGoal = (id) => {
        setShortTermGoals(prev => prev.filter(g => g.id !== id));
    };

    const handleToggleGoal = (id) => {
        setShortTermGoals(prev => prev.map(g => g.id === id ? { ...g, enabled: !g.enabled } : g));
    };

    const handleGoalParamChange = (id, field, value) => {
        setShortTermGoals(prev => prev.map(g => {
            if (g.id === id) {
                return { ...g, [field]: value };
            }
            return g;
        }));
    };

    const handleAutoOptimize = () => {
        if (totalRequiredMonthlyGoalSavings > 0) {
            const addedAmount = Math.round(totalRequiredMonthlyGoalSavings);
            if (window.confirm(`Would you like to increase your monthly investment by ${formatCurrency(addedAmount)} (raising it from ${formatCurrency(monthlyInvestments)} to ${formatCurrency(monthlyInvestments + addedAmount)}) to fully cover your active short-term goals?`)) {
                setMonthlyInvestments(prev => prev + addedAmount);
            }
        }
    };

    // ----------------------------------------------------
    // Integrated Debt Book CRUD & Selectors
    // ----------------------------------------------------
    const debtMetrics = useMemo(() => {
        let totalOwedToMe = 0; // Give type (Lent)
        let totalIOwe = 0;     // Take type (Borrowed)

        debts.forEach(d => {
            if (d.status === 'pending') {
                const amt = getDebtNetAmount(d);
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

    const filteredDebts = useMemo(() => {
        return debts.filter(d => {
            const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (d.note && d.note.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
            const matchesType = typeFilter === 'all' || d.type === typeFilter;

            return matchesSearch && matchesStatus && matchesType;
        });
    }, [debts, searchQuery, statusFilter, typeFilter]);

    const handleSaveDebt = (e) => {
        e.preventDefault();
        if (!name.trim()) return alert('Please enter a person name');
        if (!amount || Number(amount) <= 0) return alert('Please enter a valid positive amount');
        if (!date) return alert('Please select a date');

        const initialTx = {
            id: Date.now(),
            type: 'plus',
            amount: Number(amount),
            date,
            note: note.trim() || 'Initial ledger entry'
        };

        if (editingId) {
            const existingDebt = debts.find(d => d.id === editingId);
            const updatedTransactions = [...(existingDebt?.transactions || [])];
            if (updatedTransactions.length > 0) {
                updatedTransactions[0] = {
                    ...updatedTransactions[0],
                    amount: Number(amount),
                    date,
                    note: note.trim()
                };
            } else {
                updatedTransactions.push(initialTx);
            }

            const debtData = {
                id: editingId,
                name: name.trim(),
                amount: Number(amount),
                type,
                date,
                note: note.trim(),
                status: existingDebt?.status || 'pending',
                transactions: updatedTransactions
            };

            setDebts(prev => prev.map(d => d.id === editingId ? debtData : d));
            setEditingId(null);
        } else {
            const debtData = {
                id: Date.now(),
                name: name.trim(),
                amount: Number(amount),
                type,
                date,
                note: note.trim(),
                status: 'pending',
                transactions: [initialTx]
            };
            setDebts(prev => [debtData, ...prev]);
        }

        // Reset inputs
        setName('');
        setAmount('');
        setNote('');
        setDate(new Date().toISOString().split('T')[0]);
    };

    const handleEditDebt = (debt) => {
        setEditingId(debt.id);
        setName(debt.name);

        // Use first transaction's amount for editing if it exists, otherwise fallback
        const originalAmt = debt.transactions && debt.transactions.length > 0
            ? debt.transactions[0].amount
            : debt.amount;

        setAmount(originalAmt.toString());
        setType(debt.type);
        setDate(debt.date);
        setNote(debt.note || '');
    };

    const handleDeleteDebt = (id) => {
        if (window.confirm('Are you sure you want to delete this ledger entry?')) {
            setDebts(prev => prev.filter(d => d.id !== id));
            if (editingId === id) {
                setEditingId(null);
                setName('');
                setAmount('');
                setNote('');
            }
            if (expandedDebtId === id) {
                setExpandedDebtId(null);
            }
        }
    };

    const toggleDebtStatus = (id) => {
        setDebts(prev => prev.map(d => {
            if (d.id === id) {
                const nextStatus = d.status === 'pending' ? 'settled' : 'pending';
                return { ...d, status: nextStatus };
            }
            return d;
        }));
    };

    // Adjustment handlers
    const handleAddAdjustment = (debtId, adjType, adjAmountVal, adjDateVal, adjNoteVal) => {
        if (!adjAmountVal || Number(adjAmountVal) <= 0) return alert('Please enter a positive adjustment amount');
        if (!adjDateVal) return alert('Please select a date');

        const nextTx = {
            id: Date.now(),
            type: adjType,
            amount: Number(adjAmountVal),
            date: adjDateVal,
            note: adjNoteVal.trim() || (adjType === 'plus' ? 'Additional amount' : 'Partial repayment')
        };

        setDebts(prev => prev.map(d => {
            if (d.id === debtId) {
                const updatedTx = [...(d.transactions || []), nextTx];
                return {
                    ...d,
                    transactions: updatedTx,
                    amount: updatedTx.reduce((acc, t) => t.type === 'plus' ? acc + t.amount : acc - t.amount, 0)
                };
            }
            return d;
        }));
    };

    const handleDeleteAdjustment = (debtId, txId) => {
        setDebts(prev => prev.map(d => {
            if (d.id === debtId) {
                if ((d.transactions || []).length <= 1) {
                    alert('Cannot delete the only transaction. Delete the entire debt entry instead.');
                    return d;
                }
                const updatedTx = d.transactions.filter(t => t.id !== txId);
                return {
                    ...d,
                    transactions: updatedTx,
                    amount: updatedTx.reduce((acc, t) => t.type === 'plus' ? acc + t.amount : acc - t.amount, 0)
                };
            }
            return d;
        }));
    };

    // Import/Export Configuration JSON
    const handleExportConfig = () => {
        const storedConfig = localStorage.getItem('retirement_planner_config');
        const storedDebts = localStorage.getItem('debt_tracker_entries');

        const backupData = {
            version: '1.0',
            exportedAt: new Date().toISOString(),
            config: storedConfig ? JSON.parse(storedConfig) : null,
            debts: storedDebts ? JSON.parse(storedDebts) : []
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `retirement_planner_backup_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    };

    const handleImportConfig = (e) => {
        const fileReader = new FileReader();
        const files = e.target.files;
        if (!files || files.length === 0) return;

        fileReader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target?.result);
                if (!parsed || (!parsed.config && !parsed.debts)) {
                    return alert('Invalid backup file structure. Must contain config and debts keys.');
                }

                if (window.confirm('Importing this file will overwrite your existing planner and ledger database. Do you wish to proceed?')) {
                    if (parsed.config) {
                        localStorage.setItem('retirement_planner_config', JSON.stringify(parsed.config));
                    }
                    if (parsed.debts) {
                        localStorage.setItem('debt_tracker_entries', JSON.stringify(parsed.debts));
                    }
                    alert('Data imported successfully! The dashboard will now reload.');
                    window.location.reload();
                }
            } catch (err) {
                alert('Failed to parse backup JSON file. Ensure the file is valid JSON.');
                console.error(err);
            }
        };

        fileReader.readAsText(files[0]);
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
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={handleExportConfig}
                        className="px-3 py-2 text-xs font-semibold bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl transition-all flex items-center gap-1.5 text-slate-350 hover:text-white cursor-pointer"
                        title="Download JSON backup"
                    >
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Export Backup</span>
                    </button>

                    <label
                        className="px-3 py-2 text-xs font-semibold bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl transition-all flex items-center gap-1.5 text-slate-350 hover:text-white cursor-pointer relative"
                        title="Upload JSON backup"
                    >
                        <ArrowDownRight className="w-3.5 h-3.5 text-cyan-405" />
                        <span>Import Backup</span>
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleImportConfig}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                    </label>

                    <button
                        onClick={handleReset}
                        className="px-3 py-2 text-xs font-semibold bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl transition-all flex items-center gap-1.5 text-slate-400 hover:text-rose-400 cursor-pointer"
                        title="Restore default parameters"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                    </button>
                    <button class="px-3.5 py-2 text-xs font-semibold bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 rounded-xl transition-all flex items-center gap-1.5 text-rose-400 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 lucide-trash-2 w-3.5 h-3.5" aria-hidden="true"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg><span>Clear All</span></button>
                </div>
            </div>

            {/* Config & Assumptions Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 relative z-10">
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded ${isSafe
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

                                {/* Milestone indicator markers on curve */}
                                {milestonePoints.map((mp, idx) => (
                                    <g key={idx} className="transition-all duration-300">
                                        {/* Pulsing glow ring */}
                                        <circle
                                            cx={mp.x}
                                            cy={mp.y}
                                            r="8"
                                            className="fill-amber-400/10 stroke-amber-400/40 stroke-[0.5px] animate-pulse"
                                        />
                                        {/* Center dot */}
                                        <circle
                                            cx={mp.x}
                                            cy={mp.y}
                                            r="3.5"
                                            className="fill-amber-400 stroke-1.5 stroke-slate-950 cursor-pointer"
                                            onMouseEnter={() => setHoveredData({ age: mp.age, savings: mp.savings })}
                                            onMouseLeave={() => setHoveredData(null)}
                                        />
                                    </g>
                                ))}

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
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-950/90 border border-slate-800 p-2.5 rounded-xl text-[10px] font-mono shadow-2xl backdrop-blur-xs flex flex-col gap-1.5 z-20 min-w-[200px]">
                                    <div className="flex justify-between items-center gap-3">
                                        <div><span className="text-slate-500">Age:</span> <strong className="text-white">{hoveredData.age}</strong></div>
                                        <div><span className="text-slate-500">Savings:</span> <strong className="text-brand-mint">{formatCurrency(hoveredData.savings)}</strong></div>
                                    </div>
                                    {goalsAtHoveredAge.length > 0 && (
                                        <div className="border-t border-slate-800/80 pt-1.5 mt-0.5">
                                            <div className="text-[8px] text-amber-400 font-bold uppercase tracking-wider mb-0.5">Goals Purchased:</div>
                                            <div className="flex flex-col gap-1">
                                                {goalsAtHoveredAge.map(g => (
                                                    <div key={g.id} className="text-[9px] text-slate-300 flex items-center justify-between gap-1.5">
                                                        <span className="flex items-center gap-1">
                                                            {getCategoryIcon(g.category, "w-3 h-3 text-amber-400")}
                                                            <span>{g.name}</span>
                                                        </span>
                                                        <span className="font-semibold text-white">{formatCurrency(g.costPaid)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {emisAtHoveredAge.length > 0 && (
                                        <div className="border-t border-slate-800/80 pt-1.5 mt-0.5">
                                            <div className="text-[8px] text-cyan-400 font-bold uppercase tracking-wider mb-0.5">Active Loan EMIs:</div>
                                            <div className="flex flex-col gap-1">
                                                {emisAtHoveredAge.map(g => (
                                                    <div key={g.id} className="text-[9px] text-slate-300 flex items-center justify-between gap-1.5">
                                                        <span className="flex items-center gap-1">
                                                            {getCategoryIcon(g.category, "w-3 h-3 text-cyan-400")}
                                                            <span>{g.name} (EMI)</span>
                                                        </span>
                                                        <span className="font-semibold text-white">{formatCurrency(g.monthlyEmi)}/mo</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {debtInflowsAtHoveredAge.length > 0 && (
                                        <div className="border-t border-slate-800/80 pt-1.5 mt-0.5">
                                            <div className="text-[8px] text-emerald-400 font-bold uppercase tracking-wider mb-0.5">Debt Repayments (Inflow):</div>
                                            <div className="flex flex-col gap-1">
                                                {debtInflowsAtHoveredAge.map(d => (
                                                    <div key={d.id} className="text-[9px] text-slate-300 flex items-center justify-between gap-1.5">
                                                        <span className="flex items-center gap-1">
                                                            <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                                                            <span>{d.name}</span>
                                                        </span>
                                                        <span className="font-semibold text-emerald-400">+{formatCurrency(d.amount)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {debtOutflowsAtHoveredAge.length > 0 && (
                                        <div className="border-t border-slate-800/80 pt-1.5 mt-0.5">
                                            <div className="text-[8px] text-rose-400 font-bold uppercase tracking-wider mb-0.5">Debt Settlements (Outflow):</div>
                                            <div className="flex flex-col gap-1">
                                                {debtOutflowsAtHoveredAge.map(d => (
                                                    <div key={d.id} className="text-[9px] text-slate-300 flex items-center justify-between gap-1.5">
                                                        <span className="flex items-center gap-1">
                                                            <ArrowDownRight className="w-3 h-3 text-rose-400" />
                                                            <span>{d.name}</span>
                                                        </span>
                                                        <span className="font-semibold text-rose-400">-{formatCurrency(d.amount)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Insights Summary panel */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
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

            {/* Short-Term Goals Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 relative z-10">
                {/* Goal / Debt Form Card */}
                <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-inner flex flex-col justify-between">
                    {activeGoalsTab === 'goals' ? (
                        <div>
                            <h2 className="text-sm font-mono font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800 pb-3 mb-5 flex items-center gap-2">
                                <Target className="w-4 h-4 text-brand-mint" />
                                Add Short-Term Goal
                            </h2>
                            <form onSubmit={handleAddGoal} className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Goal Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Electric Bike, New Laptop"
                                        value={goalName}
                                        onChange={(e) => setGoalName(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-brand-mint/50"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Category</label>
                                        <select
                                            value={goalCategory}
                                            onChange={(e) => setGoalCategory(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-brand-mint/50"
                                        >
                                            <option value="car">🚗 Car</option>
                                            <option value="bike">🏍️ Bike</option>
                                            <option value="smartphone">📱 Smartphone</option>
                                            <option value="laptop">💻 Laptop</option>
                                            <option value="other">🎁 Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Target Age</label>
                                        <input
                                            type="number"
                                            min={currentAge}
                                            max={planningAge}
                                            value={goalAge}
                                            onChange={(e) => setGoalAge(Math.max(currentAge, Math.min(planningAge, Number(e.target.value))))}
                                            className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-brand-mint/50 font-mono"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Cost (Today's Value)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2 text-[10px] text-slate-500">₹</span>
                                        <input
                                            type="number"
                                            min="1"
                                            placeholder="Cost in INR"
                                            value={goalCost}
                                            onChange={(e) => setGoalCost(Math.max(0, Number(e.target.value)))}
                                            className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl pl-6 pr-2 py-2 text-xs outline-none focus:border-brand-mint/50 font-mono"
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full mt-2 py-2 bg-brand-mint hover:bg-brand-mint/90 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg hover:shadow-brand-mint/20 cursor-pointer flex items-center justify-center gap-1"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Add to Timeline</span>
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-sm font-mono font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800 pb-3 mb-5 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-brand-mint" />
                                {editingId ? 'Edit Debt Entry' : 'Log Debt Entry'}
                            </h2>
                            <form onSubmit={handleSaveDebt} className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Ledger Flow Direction</label>
                                    <div className="flex bg-slate-950 border border-slate-850 p-1 rounded-xl">
                                        <button
                                            type="button"
                                            onClick={() => setType('give')}
                                            className={`w-1/2 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${type === 'give'
                                                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold'
                                                : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'}`}
                                        >
                                            🟢 Give (I Lent Money)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setType('take')}
                                            className={`w-1/2 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${type === 'take'
                                                ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold'
                                                : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'}`}
                                        >
                                            🔴 Take (I Borrowed)
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Person Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. John Doe, Sarah Miller"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-brand-mint/50"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Amount (INR)</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-2 text-[10px] text-slate-500">₹</span>
                                            <input
                                                type="number"
                                                placeholder="0"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl pl-6 pr-2 py-2 text-xs outline-none focus:border-brand-mint/50 font-mono"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Entry Date</label>
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-brand-mint/50 font-mono"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Ledger Description (Notes)</label>
                                    <textarea
                                        placeholder="Add details about what the loan was for..."
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        className="w-full h-16 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-brand-mint/50 resize-none"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    {editingId && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingId(null);
                                                setName('');
                                                setAmount('');
                                                setNote('');
                                            }}
                                            className="w-1/3 py-2 text-xs font-bold bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 rounded-xl transition-all cursor-pointer font-mono uppercase"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        className={`grow py-2 text-xs font-bold rounded-xl transition-all cursor-pointer font-mono uppercase ${type === 'give' ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950' : 'bg-rose-500 hover:bg-rose-600 text-white'
                                            }`}
                                    >
                                        {editingId ? 'Save' : 'Log'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                {/* Goals List Card */}
                <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-inner flex flex-col justify-between">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5 flex-wrap gap-2">
                        <div className="flex bg-slate-950 p-1 border border-slate-800/80 rounded-xl">
                            <button
                                onClick={() => setActiveGoalsTab('goals')}
                                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${activeGoalsTab === 'goals'
                                    ? 'bg-brand-mint/15 border border-brand-mint/35 text-brand-mint'
                                    : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
                                    }`}
                            >
                                🎯 Goals ({shortTermGoals.filter(g => g.enabled).length})
                            </button>
                            <button
                                onClick={() => setActiveGoalsTab('debts')}
                                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${activeGoalsTab === 'debts'
                                    ? 'bg-brand-mint/15 border border-brand-mint/35 text-brand-mint'
                                    : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
                                    }`}
                            >
                                🤝 Debt Ledger ({debts.filter(d => d.status === 'pending').length})
                            </button>
                        </div>

                        <span className="text-[10px] text-slate-500 font-mono">
                            {activeGoalsTab === 'goals'
                                ? `${shortTermGoals.length} total goals`
                                : `${debts.length} ledger items`
                            }
                        </span>
                    </div>

                    {activeGoalsTab === 'goals' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
                                {shortTermGoals.length === 0 ? (
                                    <div className="col-span-2 flex flex-col items-center justify-center py-12 text-slate-500 text-center">
                                        <Target className="w-8 h-8 text-slate-650 mb-2 opacity-50" />
                                        <p className="text-xs">No short-term goals added yet.</p>
                                        <p className="text-[10px] text-slate-600 mt-1">Use the form on the left to add items you plan to buy.</p>
                                    </div>
                                ) : (
                                    shortTermGoals.map(g => {
                                        const inflatedCost = getInflatedCost(g.cost, g.targetAge, g.inflationRate);
                                        return (
                                            <div
                                                key={g.id}
                                                className={`flex flex-col p-3.5 rounded-2xl border transition-all ${g.enabled
                                                    ? 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                                                    : 'bg-slate-950/10 border-slate-900 opacity-50'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${g.enabled
                                                            ? 'bg-brand-mint/10 border border-brand-mint/20 text-brand-mint'
                                                            : 'bg-slate-900 border border-slate-850 text-slate-500'
                                                            }`}>
                                                            {getCategoryIcon(g.category, "w-5 h-5")}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h4 className="text-xs font-bold text-white flex items-center gap-1.5 min-w-0">
                                                                <span className="truncate" title={g.name}>{g.name}</span>
                                                                <span className="text-[9px] px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded font-mono shrink-0">
                                                                    Age {g.targetAge}
                                                                </span>
                                                            </h4>
                                                            <div className="flex flex-col gap-0.5 mt-1 text-[10px] font-mono">
                                                                <div>
                                                                    <span className="text-slate-500">Today: </span>
                                                                    <span className="text-slate-300">{formatCurrency(g.cost)}</span>
                                                                </div>
                                                                <div>
                                                                    <span className="text-slate-500">Inflated: </span>
                                                                    <span className="text-amber-400 font-semibold">{formatCurrency(getInflatedCost(g.cost, g.targetAge, g.inflationRate))}</span>
                                                                </div>
                                                                {g.targetAge > currentAge ? (
                                                                    <div>
                                                                        <span className="text-slate-500">Save Monthly: </span>
                                                                        <span className="text-brand-mint font-semibold">
                                                                            {formatCurrency(getRequiredMonthlySavings(g))}
                                                                        </span>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <span className="text-rose-400 italic">Immediate cash purchase</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-1.5 shrink-0">
                                                        <button
                                                            onClick={() => setOpenSettingsGoalId(openSettingsGoalId === g.id ? null : g.id)}
                                                            className={`p-1 hover:bg-slate-800 rounded transition-all cursor-pointer ${openSettingsGoalId === g.id ? 'text-brand-mint bg-slate-850' : 'text-slate-500 hover:text-slate-300'}`}
                                                            title="Advanced Settings"
                                                        >
                                                            <Settings className="w-3.5 h-3.5" />
                                                        </button>
                                                        <input
                                                            type="checkbox"
                                                            checked={g.enabled}
                                                            onChange={() => handleToggleGoal(g.id)}
                                                            className="toggle toggle-xs accent-brand-mint toggle-success cursor-pointer"
                                                            title={g.enabled ? "Disable this goal" : "Enable this goal"}
                                                        />
                                                        <button
                                                            onClick={() => handleDeleteGoal(g.id)}
                                                            className="p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-all cursor-pointer"
                                                            title="Delete goal"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {openSettingsGoalId === g.id && (
                                                    <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-[10px]">
                                                        <div>
                                                            <label className="block text-[8px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">Bucket Yield %</label>
                                                            <input
                                                                type="number"
                                                                value={g.bucketYield ?? 10}
                                                                onChange={(e) => handleGoalParamChange(g.id, 'bucketYield', Number(e.target.value))}
                                                                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-2xs text-slate-200 outline-none font-mono"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[8px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">Inflation Rate %</label>
                                                            <input
                                                                type="number"
                                                                value={g.inflationRate ?? 10}
                                                                onChange={(e) => handleGoalParamChange(g.id, 'inflationRate', Number(e.target.value))}
                                                                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-2xs text-slate-200 outline-none font-mono"
                                                            />
                                                        </div>

                                                        <div className="col-span-2 flex items-center justify-between bg-slate-950/60 p-2 rounded-xl border border-slate-800/40">
                                                            <span className="font-bold text-[9px] text-slate-400 uppercase font-mono">Use Loan / EMI Finance</span>
                                                            <input
                                                                type="checkbox"
                                                                checked={g.useLoan ?? false}
                                                                onChange={(e) => handleGoalParamChange(g.id, 'useLoan', e.target.checked)}
                                                                className="toggle toggle-xs toggle-info cursor-pointer"
                                                            />
                                                        </div>

                                                        {(g.useLoan ?? false) && (
                                                            <>
                                                                <div>
                                                                    <label className="block text-[8px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">Down Payment %</label>
                                                                    <input
                                                                        type="number"
                                                                        min="0"
                                                                        max="100"
                                                                        value={g.downPaymentPct ?? 20}
                                                                        onChange={(e) => handleGoalParamChange(g.id, 'downPaymentPct', Math.max(0, Math.min(100, Number(e.target.value))))}
                                                                        className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-2xs text-slate-200 outline-none font-mono"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-[8px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">Loan Term (Yrs)</label>
                                                                    <input
                                                                        type="number"
                                                                        min="1"
                                                                        value={g.loanDuration ?? 5}
                                                                        onChange={(e) => handleGoalParamChange(g.id, 'loanDuration', Math.max(1, Number(e.target.value)))}
                                                                        className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-2xs text-slate-200 outline-none font-mono"
                                                                    />
                                                                </div>
                                                                <div className="col-span-2">
                                                                    <label className="block text-[8px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">Loan Interest Rate %</label>
                                                                    <input
                                                                        type="number"
                                                                        min="0"
                                                                        value={g.loanInterest ?? 9}
                                                                        onChange={(e) => handleGoalParamChange(g.id, 'loanInterest', Math.max(0, Number(e.target.value)))}
                                                                        className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-2xs text-slate-200 outline-none font-mono"
                                                                    />
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {shortTermGoals.filter(g => g.enabled).length > 0 && (
                                <div className="mt-5 p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                                    <div>
                                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Goal Savings Plan</div>
                                        <div className="text-lg font-mono font-bold text-brand-mint mt-0.5">
                                            {formatCurrency(totalRequiredMonthlyGoalSavings)} <span className="text-xs text-slate-400 font-normal">/ month</span>
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-1 max-w-[480px]">
                                            Invest this dedicated amount monthly (compounding at {formatPercent(preRetireReturnRate)}) on top of your retirement savings to buy these goals with <strong>₹0 loan</strong>.
                                        </p>
                                    </div>
                                    <div className="text-right shrink-0 flex flex-col items-end gap-2">
                                        <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg text-[9px] font-mono uppercase tracking-wider">
                                            <ShieldCheck className="w-3.5 h-3.5" />
                                            <span>Zero Loan Path</span>
                                        </span>
                                        <button
                                            onClick={handleAutoOptimize}
                                            className="px-2.5 py-1 text-[10px] font-semibold bg-brand-mint text-slate-950 hover:bg-brand-mint/90 rounded-lg transition-all shadow-md cursor-pointer uppercase tracking-wider font-mono"
                                        >
                                            Auto-Optimize
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {activeGoalsTab === 'debts' && (
                        <div className="space-y-4">
                            {/* Debt metrics overview */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left">
                                <div className="flex items-start justify-between bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-xl">
                                    <div>
                                        <span className="text-[8px] font-mono text-slate-500 uppercase block">GIVE (LENT)</span>
                                        <span className="text-[10px] font-mono text-slate-400 mb-1">Owed to You (Receivable)</span>
                                        <span className="text-xs font-mono font-bold text-emerald-400 block mt-0.5">{formatCurrency(debtMetrics.totalOwedToMe)}</span>
                                    </div>
                                    <div class="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right w-5 h-5" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg></div>
                                </div>
                                <div className="flex items-start justify-between bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-xl">
                                    <div>
                                        <span className="text-[8px] font-mono text-slate-500 uppercase block">TAKE (BORROWED)</span>
                                        <p class="text-[10px] text-slate-400 mb-1">You Owe (Payable)</p>
                                        <span className="text-xs font-mono font-bold text-rose-400 block mt-0.5">{formatCurrency(debtMetrics.totalIOwe)}</span>
                                    </div>
                                    <div class="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-right w-5 h-5" aria-hidden="true"><path d="m7 7 10 10"></path><path d="M17 7v10H7"></path></svg></div>
                                </div>
                                <div className="flex items-start justify-between bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-xl">
                                    <div>
                                        <span className="text-[8px] font-mono text-slate-500 uppercase block">NET POSITION</span>
                                        <p class="text-[10px] text-slate-400 mb-1">Net Balance Stance</p>
                                        <span className={`text-xs font-mono font-bold block mt-0.5 ${debtMetrics.netDebtPosition >= 0 ? 'text-emerald-400' : 'text-rose-455'}`}>
                                            {debtMetrics.netDebtPosition >= 0 ? '+' : ''}{formatCurrency(debtMetrics.netDebtPosition)}
                                        </span>
                                    </div>
                                    <div class="p-2.5 bg-brand-mint/10 border border-brand-mint/20 rounded-xl text-brand-mint"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand-coins w-5 h-5" aria-hidden="true"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"></path><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"></path><path d="m2 16 6 6"></path><circle cx="16" cy="9" r="2.9"></circle><circle cx="6" cy="5" r="3"></circle></svg></div>
                                </div>
                            </div>

                            {/* Search and Filters toolbar */}
                            <div className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    placeholder="Search debts by name or notes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="grow bg-slate-950 border border-slate-800/80 rounded-xl px-3 py-1.5 text-[10px] text-slate-300 outline-none focus:border-brand-mint/50"
                                />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="bg-slate-950 border border-slate-800/80 rounded-xl px-2 py-1.5 text-[10px] text-slate-350 outline-none cursor-pointer focus:border-brand-mint/50"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="settled">Settled</option>
                                    <option value="all">All Status</option>
                                </select>
                                <select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    className="bg-slate-950 border border-slate-800/80 rounded-xl px-2 py-1.5 text-[10px] text-slate-350 outline-none cursor-pointer focus:border-brand-mint/50"
                                >
                                    <option value="all">All Types</option>
                                    <option value="give">Give (Lent)</option>
                                    <option value="take">Take (Owe)</option>
                                </select>
                            </div>

                            {/* Debts list */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[280px] overflow-y-auto pr-1">
                                {filteredDebts.length === 0 ? (
                                    <div className="col-span-2 flex flex-col items-center justify-center py-12 text-slate-500 text-center">
                                        <HandCoins className="w-8 h-8 text-slate-650 mb-2 opacity-50" />
                                        <p className="text-xs">No matching debts found.</p>
                                        <p className="text-[10px] text-slate-600 mt-1">Use the Log form on the left to add items you give or take.</p>
                                    </div>
                                ) : (
                                    filteredDebts.map(d => {
                                        const isIncluded = debtIncludedToggles[d.id] !== false;
                                        const settlementAge = debtRepaymentAges[d.id] ?? currentAge;
                                        return (
                                            <div
                                                key={d.id}
                                                className={`flex flex-col p-3 rounded-2xl border transition-all ${d.status === 'settled'
                                                    ? 'bg-slate-950/20 border-slate-850/50 opacity-60'
                                                    : isIncluded
                                                        ? d.type === 'give'
                                                            ? 'bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/30'
                                                            : 'bg-rose-500/5 hover:bg-rose-500/10 border-rose-500/20 hover:border-rose-500/30'
                                                        : 'bg-slate-950/20 border-slate-850/50 opacity-60'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${d.status === 'settled'
                                                            ? 'bg-slate-900 border border-slate-850 text-slate-500'
                                                            : isIncluded
                                                                ? d.type === 'give'
                                                                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                                                                    : 'bg-rose-500/10 border border-rose-500/20 text-rose-450'
                                                                : 'bg-slate-900 border border-slate-850 text-slate-500'
                                                            }`}>
                                                            {d.type === 'give' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                                                        </div>
                                                        <div className="min-w-0 text-left">
                                                            <h4 className="text-xs font-bold text-white flex items-center gap-1.5 min-w-0">
                                                                <span className="truncate" title={d.name}>{d.name}</span>
                                                                <span className={`text-[7px] font-mono uppercase px-1 py-0.2 rounded leading-none shrink-0 ${d.status === 'settled'
                                                                    ? 'bg-slate-800 text-slate-400'
                                                                    : d.type === 'give'
                                                                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                                                                        : 'bg-rose-500/10 border border-rose-500/20 text-rose-455'
                                                                    }`}>
                                                                    {d.status === 'settled' ? 'Settled' : d.type === 'give' ? 'Give' : 'Take'}
                                                                </span>
                                                            </h4>
                                                            <div className="flex flex-col gap-0.5 mt-1 text-[9px] font-mono">
                                                                <div>
                                                                    <span className="text-slate-500">Balance: </span>
                                                                    <span className={`font-semibold ${d.status === 'settled' ? 'text-slate-400 line-through' : d.type === 'give' ? 'text-emerald-400' : 'text-rose-450'}`}>
                                                                        {formatCurrency(getDebtNetAmount(d))}
                                                                    </span>
                                                                </div>
                                                                {d.note && (
                                                                    <div className="text-slate-400 truncate max-w-[110px]" title={d.note}>
                                                                        <span className="text-slate-500">Note: </span>{d.note}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-1 shrink-0">
                                                        {d.status === 'pending' && (
                                                            <input
                                                                type="checkbox"
                                                                checked={isIncluded}
                                                                onChange={(e) => setDebtIncludedToggles(prev => ({ ...prev, [d.id]: e.target.checked }))}
                                                                className="toggle toggle-xs accent-brand-mint toggle-success cursor-pointer"
                                                                title={isIncluded ? "Exclude from simulation" : "Include in simulation"}
                                                            />
                                                        )}
                                                        <button
                                                            onClick={() => {
                                                                setExpandedDebtId(expandedDebtId === d.id ? null : d.id);
                                                                setAdjType('minus');
                                                                setAdjAmount('');
                                                                setAdjNote('');
                                                            }}
                                                            className={`p-1 rounded border transition-all cursor-pointer ${expandedDebtId === d.id
                                                                ? 'border-brand-mint/55 bg-brand-mint/15 text-brand-mint'
                                                                : 'border-slate-800 text-slate-500 hover:text-brand-mint hover:bg-brand-mint/5'
                                                                }`}
                                                            title="Adjustments Ledger (±)"
                                                        >
                                                            <Calendar className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => toggleDebtStatus(d.id)}
                                                            className={`p-1 rounded border transition-all cursor-pointer ${d.status === 'settled'
                                                                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                                                                : 'border-slate-800 text-slate-550 hover:text-emerald-450 hover:bg-emerald-500/5'
                                                                }`}
                                                            title={d.status === 'settled' ? 'Mark as Outstanding' : 'Mark as Settled'}
                                                        >
                                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEditDebt(d)}
                                                            disabled={d.status === 'settled'}
                                                            className="p-1 rounded border border-slate-800 text-slate-550 hover:text-slate-200 hover:bg-slate-900/60 disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer"
                                                            title="Edit Entry"
                                                        >
                                                            <Edit className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteDebt(d.id)}
                                                            className="p-1 rounded border border-slate-800 text-slate-550 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                                                            title="Delete Entry"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Expanded adjustments panel */}
                                                {expandedDebtId === d.id && (
                                                    <div className="mt-3 pt-3 border-t border-slate-800/85 text-2xs font-mono text-left space-y-3">
                                                        <div>
                                                            <div className="text-[8px] text-slate-500 uppercase tracking-wider mb-1">Transaction History:</div>
                                                            <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                                                                {(d.transactions || []).map(t => (
                                                                    <div key={t.id} className="flex justify-between items-start bg-slate-950/80 border border-slate-850 p-1.5 rounded-lg gap-1.5">
                                                                        <div className="min-w-0">
                                                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                                                <span className={`font-bold ${t.type === 'plus' ? 'text-emerald-400' : 'text-rose-455'}`}>
                                                                                    {t.type === 'plus' ? '+' : '-'}{formatCurrency(t.amount)}
                                                                                </span>
                                                                                <span className="text-[7px] text-slate-500">{t.date}</span>
                                                                            </div>
                                                                            {t.note && <div className="text-slate-400 text-[8px] truncate mt-0.5" title={t.note}>{t.note}</div>}
                                                                        </div>
                                                                        <button
                                                                            onClick={() => handleDeleteAdjustment(d.id, t.id)}
                                                                            className="text-slate-650 hover:text-rose-400 p-0.5 rounded transition-all shrink-0 cursor-pointer"
                                                                            title="Delete transaction entry"
                                                                        >
                                                                            <Trash2 className="w-3 h-3" />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Log adjustment inside expanded panel */}
                                                        {d.status === 'pending' && (
                                                            <div className="bg-slate-950/40 border border-slate-850 p-2 rounded-xl space-y-2">
                                                                <div className="text-[8px] text-brand-mint font-bold uppercase tracking-wider">Log Adjustment (±):</div>
                                                                <div className="flex bg-slate-950 p-0.5 border border-slate-850 rounded-lg">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setAdjType('plus')}
                                                                        className={`w-1/2 py-0.5 text-[8px] font-bold rounded transition-all cursor-pointer ${adjType === 'plus'
                                                                            ? 'bg-emerald-500/10 text-emerald-400'
                                                                            : 'bg-transparent text-slate-500 hover:text-slate-300'
                                                                            }`}
                                                                    >
                                                                        + Plus (Increase)
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setAdjType('minus')}
                                                                        className={`w-1/2 py-0.5 text-[8px] font-bold rounded transition-all cursor-pointer ${adjType === 'minus'
                                                                            ? 'bg-rose-500/10 text-rose-400'
                                                                            : 'bg-transparent text-slate-500 hover:text-slate-300'
                                                                            }`}
                                                                    >
                                                                        - Minus (Repay)
                                                                    </button>
                                                                </div>
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                                    <div>
                                                                        <label className="text-[7px] text-slate-500 block mb-0.5">Amount (INR)</label>
                                                                        <input
                                                                            type="number"
                                                                            placeholder="Amount"
                                                                            value={adjAmount}
                                                                            onChange={(e) => setAdjAmount(e.target.value)}
                                                                            className="w-full bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 text-2xs outline-none text-slate-300 font-mono"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="text-[7px] text-slate-500 block mb-0.5">Date</label>
                                                                        <input
                                                                            type="date"
                                                                            value={adjDate}
                                                                            onChange={(e) => setAdjDate(e.target.value)}
                                                                            className="w-full bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 text-2xs outline-none text-slate-350 font-mono"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <label className="text-[7px] text-slate-500 block mb-0.5">Note</label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="e.g. partial return"
                                                                        value={adjNote}
                                                                        onChange={(e) => setAdjNote(e.target.value)}
                                                                        className="w-full bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 text-2xs outline-none text-slate-300"
                                                                    />
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        handleAddAdjustment(d.id, adjType, adjAmount, adjDate, adjNote);
                                                                        setAdjAmount('');
                                                                        setAdjNote('');
                                                                    }}
                                                                    className="w-full py-1 bg-brand-mint hover:bg-brand-mint/90 text-slate-950 font-bold rounded text-2xs font-mono uppercase transition-all cursor-pointer"
                                                                >
                                                                    Post Adjustment
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {d.status === 'pending' && isIncluded && (
                                                    <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                                                        <span className="font-mono text-slate-500 uppercase tracking-wider text-[8px]">Settlement Age</span>
                                                        <span class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar w-3 h-3" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>{adjDate}</span> 
                                                        <div className="flex items-center gap-1.5">
                                                            <input
                                                                type="range"
                                                                min={currentAge}
                                                                max={planningAge}
                                                                value={settlementAge}
                                                                onChange={(e) => setDebtRepaymentAges(prev => ({ ...prev, [d.id]: Number(e.target.value) }))}
                                                                className="w-20 h-1 rounded bg-slate-800 appearance-none accent-brand-mint cursor-pointer"
                                                            />
                                                            <span className="font-mono text-slate-300 text-2xs bg-slate-950 px-1 py-0.5 border border-slate-850 rounded">
                                                                Age {settlementAge}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Asset Allocation Sliders Tabular panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 relative z-10">
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
                            <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-2.5 items-start sm:items-center bg-slate-950/20 sm:bg-transparent p-3 sm:p-0 rounded-2xl border border-slate-850/50 sm:border-0">
                                <span className="col-span-1 sm:col-span-4 text-xs sm:text-[11px] text-slate-350 sm:text-slate-300 font-semibold block text-left truncate" title={asset.name}>{asset.name}</span>
                                <div className="col-span-1 sm:col-span-8 grid grid-cols-3 gap-2">
                                    <div>
                                        <label className="text-[8px] font-mono text-slate-500 block mb-0.5 sm:hidden">Return %</label>
                                        <input
                                            type="number"
                                            value={asset.return}
                                            onChange={(e) => handleAllocationChange('pre', idx, 'return', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-2xs text-slate-200 outline-none focus:border-brand-mint font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[8px] font-mono text-slate-500 block mb-0.5 sm:hidden">Tax %</label>
                                        <input
                                            type="number"
                                            value={asset.tax}
                                            onChange={(e) => handleAllocationChange('pre', idx, 'tax', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-2xs text-slate-200 outline-none focus:border-brand-mint font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[8px] font-mono text-slate-500 block mb-0.5 sm:hidden">Share %</label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="5"
                                            value={asset.share}
                                            onChange={(e) => handleAllocationChange('pre', idx, 'share', e.target.value)}
                                            className="w-full h-1.5 rounded bg-slate-800 appearance-none accent-brand-mint"
                                        />
                                        <span className="text-[9px] font-mono text-slate-400 block text-right mt-0.5">{asset.share}%</span>
                                    </div>
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
                            <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-2.5 items-start sm:items-center bg-slate-950/20 sm:bg-transparent p-3 sm:p-0 rounded-2xl border border-slate-850/50 sm:border-0">
                                <span className="col-span-1 sm:col-span-4 text-xs sm:text-[11px] text-slate-350 sm:text-slate-300 font-semibold block text-left truncate" title={asset.name}>{asset.name}</span>
                                <div className="col-span-1 sm:col-span-8 grid grid-cols-3 gap-2">
                                    <div>
                                        <label className="text-[8px] font-mono text-slate-500 block mb-0.5 sm:hidden">Return %</label>
                                        <input
                                            type="number"
                                            value={asset.return}
                                            onChange={(e) => handleAllocationChange('post', idx, 'return', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-2xs text-slate-200 outline-none focus:border-brand-mint font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[8px] font-mono text-slate-500 block mb-0.5 sm:hidden">Tax %</label>
                                        <input
                                            type="number"
                                            value={asset.tax}
                                            onChange={(e) => handleAllocationChange('post', idx, 'tax', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-2xs text-slate-200 outline-none focus:border-brand-mint font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[8px] font-mono text-slate-500 block mb-0.5 sm:hidden">Share %</label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="5"
                                            value={asset.share}
                                            onChange={(e) => handleAllocationChange('post', idx, 'share', e.target.value)}
                                            className="w-full h-1.5 rounded bg-slate-800 appearance-none accent-brand-mint"
                                        />
                                        <span className="text-[9px] font-mono text-slate-400 block text-right mt-0.5">{asset.share}%</span>
                                    </div>
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

            {/* Bottom Card: Ledger, FIRE & Optimizer */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-inner relative z-10">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-5 flex-wrap gap-3">
                    <div className="flex bg-slate-950 p-1 border border-slate-800/80 rounded-xl">
                        <button
                            onClick={() => setBottomActiveTab('ledger')}
                            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                                bottomActiveTab === 'ledger' 
                                    ? 'bg-brand-mint/15 border border-brand-mint/35 text-brand-mint' 
                                    : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            <FileSpreadsheet className="w-3.5 h-3.5" />
                            <span>Compounding Sheet Ledger</span>
                        </button>
                        <button
                            onClick={() => setBottomActiveTab('fire')}
                            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                                bottomActiveTab === 'fire' 
                                    ? 'bg-brand-mint/15 border border-brand-mint/35 text-brand-mint' 
                                    : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            <Flame className="w-3.5 h-3.5" />
                            <span>FIRE Analytics</span>
                        </button>
                        <button
                            onClick={() => setBottomActiveTab('optimizer')}
                            className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                                bottomActiveTab === 'optimizer' 
                                    ? 'bg-brand-mint/15 border border-brand-mint/35 text-brand-mint' 
                                    : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            <Activity className="w-3.5 h-3.5" />
                            <span>Portfolio Optimizer</span>
                        </button>
                    </div>

                    <span className="text-[10px] text-slate-500 font-mono">
                        {bottomActiveTab === 'ledger' && "Year-by-year cashflow simulation"}
                        {bottomActiveTab === 'fire' && "Financial Independence indicators"}
                        {bottomActiveTab === 'optimizer' && "Allocation risk and tax advisor"}
                    </span>
                </div>

                {bottomActiveTab === 'ledger' && (
                    <div className="overflow-x-auto max-h-96">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 text-slate-500 text-[10px] font-mono uppercase tracking-wider sticky top-0 bg-slate-950 z-10">
                                    <th className="pb-3 pl-3">Age</th>
                                    <th className="pb-3 text-right">Starting Savings</th>
                                    <th className="pb-3 text-right">Expenses (Post-Tax)</th>
                                    <th className="pb-3 text-right">Additional Savings</th>
                                    <th className="pb-3 text-right">Compounded Interest</th>
                                    <th className="pb-3 text-right">Flow (Goals & Debts)</th>
                                    <th className="pb-3 text-right">Ending Savings</th>
                                    <th className="pb-3 pr-3 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/30 text-[11px] font-mono">
                                {simulation.rows.map((row) => (
                                    <tr 
                                        key={row.age} 
                                        className={`hover:bg-slate-900/20 transition-all font-mono text-2xs ${row.status === 'Dead'
                                            ? 'opacity-30 bg-slate-950/20'
                                            : row.warning
                                                ? 'bg-rose-500/5 hover:bg-rose-500/10 text-rose-350'
                                                : row.status === 'Retired'
                                                    ? 'bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-300 font-semibold'
                                                    : 'text-slate-300'
                                        }`}
                                    >
                                        <td className="py-2.5 pl-3 font-bold text-white flex items-center gap-1.5">
                                            <span>{row.age}</span>
                                            {row.age === retirementAge && (
                                                <span className="text-[7px] font-sans font-bold uppercase bg-brand-mint/15 text-brand-mint border border-brand-mint/20 px-1 rounded leading-none">
                                                    Retired
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-2.5 text-right">{row.status === 'Dead' ? '-' : formatCurrency(row.startSavings)}</td>
                                        <td className="py-2.5 text-right text-rose-400">{row.status === 'Retired' ? formatCurrency(row.expenses) : '-'}</td>
                                        <td className="py-2.5 text-right text-emerald-400">{row.status === 'Earning' ? formatCurrency(row.additions) : '-'}</td>
                                        <td className="py-2.5 text-right text-indigo-300">{row.status === 'Dead' ? '-' : `+${formatCurrency(row.interest)}`}</td>
                                        <td className="py-2.5 text-right text-amber-405">
                                            {row.goalExpenses > 0 || row.emiExpenses > 0 || row.debtInflow > 0 || row.debtOutflow > 0 ? (
                                                <div className="flex flex-col items-end">
                                                    {(() => {
                                                        const totalOutflows = row.goalExpenses + row.emiExpenses + row.debtOutflow;
                                                        const totalInflows = row.debtInflow;
                                                        const netFlow = totalInflows - totalOutflows;
                                                        if (netFlow > 0) {
                                                            return <span className="font-bold text-emerald-450">+{formatCurrency(netFlow)}</span>;
                                                        } else if (netFlow < 0) {
                                                            return <span className="font-bold text-amber-450">-{formatCurrency(Math.abs(netFlow))}</span>;
                                                        } else {
                                                            return <span className="font-bold text-slate-500">{formatCurrency(0)}</span>;
                                                        }
                                                    })()}
                                                    <div className="flex gap-1 mt-1 max-w-[200px] flex-wrap justify-end">
                                                        {row.goalsList.map(g => (
                                                            <span key={g.id} className="inline-flex items-center gap-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[8px] px-1 py-0.2 rounded" title={`${g.name} (${g.type === 'downpayment' ? 'Down Payment' : 'Cash Purchase'}, Today's Value: ${formatCurrency(g.cost)})`}>
                                                                {getCategoryIcon(g.category, "w-2.5 h-2.5")}
                                                                <span className="truncate max-w-[60px]">{g.name} {g.type === 'downpayment' ? '(DP)' : '(Cash)'}</span>
                                                            </span>
                                                        ))}
                                                        {row.emiList.map(g => (
                                                            <span key={g.id} className="inline-flex items-center gap-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[8px] px-1 py-0.2 rounded" title={`${g.name} Loan EMI (Monthly: ${formatCurrency(g.monthlyEmi)}, Interest: ${g.loanInterest}%, Term: ${g.loanDuration} yrs)`}>
                                                                {getCategoryIcon(g.category, "w-2.5 h-2.5")}
                                                                <span className="truncate max-w-[60px]">{g.name} (EMI)</span>
                                                            </span>
                                                        ))}
                                                        {row.debtInflowsList.map(d => (
                                                            <span key={d.id} className="inline-flex items-center gap-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] px-1 py-0.2 rounded" title={`Repaid by ${d.name} (Inflow)`}>
                                                                <ArrowUpRight className="w-2.5 h-2.5 text-emerald-400" />
                                                                <span className="truncate max-w-[60px]">{d.name} (Repay)</span>
                                                            </span>
                                                        ))}
                                                        {row.debtOutflowsList.map(d => (
                                                            <span key={d.id} className="inline-flex items-center gap-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-450 text-[8px] px-1 py-0.2 rounded" title={`Settle back to ${d.name} (Outflow)`}>
                                                                <ArrowDownRight className="w-2.5 h-2.5 text-rose-455" />
                                                                <span className="truncate max-w-[60px]">{d.name} (Settle)</span>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-slate-650">-</span>
                                            )}
                                        </td>
                                        <td className="py-2.5 text-right font-bold text-white">{row.status === 'Dead' ? '-' : formatCurrency(row.endSavings)}</td>
                                        <td className="py-2.5 pr-3 text-right">
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                                row.status === 'Dead'
                                                    ? 'bg-slate-950 text-slate-655'
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
                )}

                {bottomActiveTab === 'fire' && (
                    <div className="space-y-6 text-left">
                        {/* FIRE readiness score progress bar */}
                        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">FIRE Readiness Status</span>
                                <span className="text-xs font-mono font-bold text-brand-mint">{fireAnalytics.readinessPct.toFixed(1)}% Completed</span>
                            </div>
                            <div className="w-full h-3 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-linear-to-r from-emerald-500 to-brand-mint rounded-full transition-all duration-500" 
                                    style={{ width: `${fireAnalytics.readinessPct}%` }}
                                />
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2">
                                Ratio of your current savings (₹{formatCurrency(currentSavings)}) relative to your target today (₹{formatCurrency(fireAnalytics.todayFireNumber)}), based on 25x your expected annual retirement expenses (₹{formatCurrency(retirementExpense * 12)}).
                            </p>
                        </div>

                        {/* FIRE statistics cards grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-slate-950/40 border border-slate-800/80 p-4 rounded-2xl flex flex-col justify-between">
                                <span className="text-[8px] font-mono text-slate-550 uppercase tracking-wider block">Baseline FI Number</span>
                                <span className="text-base font-mono font-bold text-white block mt-1">{formatCurrency(fireAnalytics.todayFireNumber)}</span>
                                <span className="text-[9px] text-slate-500 mt-1 block">Safe 25x expense rule</span>
                            </div>
                            <div className="bg-slate-950/40 border border-slate-800/80 p-4 rounded-2xl flex flex-col justify-between">
                                <span className="text-[8px] font-mono text-slate-550 uppercase tracking-wider block">Future FIRE Target</span>
                                <span className="text-base font-mono font-bold text-brand-mint block mt-1">{formatCurrency(fireAnalytics.futureFireNumber)}</span>
                                <span className="text-[9px] text-slate-500 mt-1 block">Inflated target at Age {retirementAge}</span>
                            </div>
                            <div className="bg-slate-950/40 border border-slate-800/80 p-4 rounded-2xl flex flex-col justify-between">
                                <span className="text-[8px] font-mono text-slate-550 uppercase tracking-wider block">FI Achievement Age</span>
                                <span className="text-base font-mono font-bold text-amber-400 block mt-1">
                                    {fireAnalytics.fiAge ? `Age ${fireAnalytics.fiAge}` : "Never"}
                                </span>
                                <span className="text-[9px] text-slate-500 mt-1 block">When interest exceeds expenses</span>
                            </div>
                            <div className="bg-slate-950/40 border border-slate-800/80 p-4 rounded-2xl flex flex-col justify-between">
                                <span className="text-[8px] font-mono text-slate-550 uppercase tracking-wider block">Max Lifetime Nest Egg</span>
                                <span className="text-base font-mono font-bold text-emerald-450 block mt-1">{formatCurrency(fireAnalytics.peakSavings)}</span>
                                <span className="text-[9px] text-slate-500 mt-1 block">Reached at Age {fireAnalytics.peakSavingsAge}</span>
                            </div>
                        </div>

                        {/* Nest Egg inflation impact analysis */}
                        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="min-w-0">
                                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                                    Nest Egg Purchasing Power Analysis
                                </h3>
                                <p className="text-[10px] text-slate-400 mt-1 max-w-[480px]">
                                    At retirement age ({retirementAge}), your nominal net worth is projected to reach <strong>{formatCurrency(fireAnalytics.nestEggAtRetirement)}</strong>. However, due to {inflation}% annual inflation, the real buying power of that amount is equivalent to <strong>{formatCurrency(fireAnalytics.realNestEggValue)}</strong> in today's currency.
                                </p>
                            </div>
                            <div className="bg-slate-900/60 border border-slate-800/60 px-4 py-2 rounded-xl font-mono text-center shrink-0 min-w-[160px]">
                                <span className="text-[8px] text-slate-550 block uppercase">Real Value Today</span>
                                <span className="text-xs font-bold text-emerald-400">{formatCurrency(fireAnalytics.realNestEggValue)}</span>
                            </div>
                        </div>
                    </div>
                )}

                {bottomActiveTab === 'optimizer' && (
                    <div className="space-y-5 text-left">
                        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5">
                            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-brand-mint" />
                                Allocation Tax & Risk Metrics
                            </h3>
                            <div className="space-y-4">
                                {/* Tax warning */}
                                <div className="flex gap-3 items-start">
                                    <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                                        <Info className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="text-[10px]">
                                        <div className="font-bold text-slate-200">Pre-Retirement Tax Exposure ({preSummary.weightedTax.toFixed(1)}%)</div>
                                        <p className="text-slate-455 mt-0.5">
                                            {preSummary.weightedTax > 24
                                                ? "High pre-retirement tax drag. Shifting high fixed-returns shares to capital-gains efficient equity mutual funds can reduce taxation impact on compound interest."
                                                : "Your pre-retirement portfolio is tax-efficient and well diversified."}
                                        </p>
                                    </div>
                                </div>

                                {/* Volatility warning */}
                                {(() => {
                                    const postEquityShare = (postAllocation.find(a => a.name.toLowerCase().includes('midcap'))?.share || 0) + (postAllocation.find(a => a.name.toLowerCase().includes('smallcap'))?.share || 0);
                                    return (
                                        <div className="flex gap-3 items-start">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                                postEquityShare > 25
                                                    ? 'bg-rose-500/10 border border-rose-500/20 text-rose-450'
                                                    : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                                            }`}>
                                                {postEquityShare > 25 ? <AlertTriangle className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                                            </div>
                                            <div className="text-[10px]">
                                                <div className="font-bold text-slate-200">Post-Retirement Volatile Equity Share ({postEquityShare}%)</div>
                                                <p className="text-slate-455 mt-0.5">
                                                    {postEquityShare > 25
                                                        ? "Sequence-of-returns risk! You have over 25% allocated to highly volatile small/midcap equity post-retirement. Rebalance toward Fixed Returns and Large Cap to protect against market crashes."
                                                        : "Your post-retirement portfolio focuses on capital preservation and fixed returns, which is ideal."}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>

                        {/* One-click portfolio optimizer call to action */}
                        <div className="p-5 bg-linear-to-r from-slate-950 to-slate-900/60 border border-slate-800 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h3 className="text-xs font-mono font-bold text-brand-mint uppercase tracking-wider">Automated Portfolio Optimization Advisor</h3>
                                <p className="text-[10px] text-slate-400 mt-1 max-w-[500px]">
                                    Automatically adjust your asset allocation percentages to optimize for pre-retirement tax-efficiency (equity-weighted) and post-retirement capital preservation (fixed-income weighted).
                                </p>
                            </div>
                            <button
                                onClick={handleOptimizePortfolio}
                                className="px-4 py-2 text-xs font-bold bg-brand-mint hover:bg-brand-mint/90 text-slate-950 rounded-xl transition-all shadow-md cursor-pointer uppercase tracking-wider font-mono shrink-0"
                            >
                                Optimize Portfolios
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
