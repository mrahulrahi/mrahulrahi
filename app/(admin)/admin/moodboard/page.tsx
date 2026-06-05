'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Chart from 'chart.js/auto';
import {
    Sun,
    Moon,
    CheckCircle,
    Eye,
    Download,
    MousePointer,
    Plus,
    ArrowUp,
    ChevronRight,
    Copy,
    Github,
    Twitter,
    Figma,
    Search,
    Edit3,
    EyeOff,
    LayoutDashboard,
    Briefcase,
    Component as ComponentIcon,
    PenTool,
    Calculator,
    Settings,
    RefreshCw,
    Wallet,
    ArrowUpCircle,
    Calendar,
    Bell,
    Check
} from 'lucide-react';

// Amortization calculation helpers
const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

const calculateEMI = (p: number, r: number, n: number) => {
    const monthlyRate = r / 12 / 100;
    return (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
};

const runAmortization = (principal: number, annualRate: number, tenureYears: number, yearlyIncrease: number, extraEmiPerYear: boolean) => {
    let balance = principal;
    const monthlyRate = annualRate / 12 / 100;
    let currentEmi = calculateEMI(principal, annualRate, tenureYears * 12);
    const initialEmi = currentEmi;
    let totalInterest = 0;
    let totalPaid = 0;
    let month = 0;
    const yearlyData: Array<{ year: number; balance: number }> = [];

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

type ActiveView = 'styleguide' | 'app';
type ActivePage = 'dashboard' | 'portfolio' | 'emi' | 'settings';
type Theme = 'light' | 'dark';

export default function MergedMoodboardPage() {
    // Nav / View State
    const [activeView, setActiveView] = useState<ActiveView>('styleguide');
    const [activePage, setActivePage] = useState<ActivePage>('dashboard');
    const [theme, setTheme] = useState<Theme>('dark');

    // Toast notification
    const [toastMessage, setToastMessage] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);

    // Uncommon / Version Toggles
    const [useTailwindV4Gradient, setUseTailwindV4Gradient] = useState<boolean>(false);

    // Typewriter effect state
    const [typingText, setTypingText] = useState<string>('');
    const words = ["Ready", "Stable", "Optimized", "Growing"];

    // Smart EMI State
    const [loanAmount, setLoanAmount] = useState(5000000);
    const [rate, setRate] = useState(8.5);
    const [tenure, setTenure] = useState(20);
    const [increase, setIncrease] = useState(10);
    const [extraEmi, setExtraEmi] = useState(true);

    // Chart refs
    const dashboardChartRef = useRef<HTMLCanvasElement | null>(null);
    const dashboardChartInstance = useRef<Chart | null>(null);

    const emiChartRef = useRef<HTMLCanvasElement | null>(null);
    const emiChartInstance = useRef<Chart | null>(null);

    const miniChartRef = useRef<HTMLCanvasElement | null>(null);
    const miniChartInstance = useRef<Chart | null>(null);

    // Show toast message
    const triggerToast = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Copy handlers
    const handleCopyText = (text: string, label: string) => {
        navigator.clipboard.writeText(text).then(() => {
            triggerToast(`${label} copied to clipboard`);
        });
    };

    // Toggle theme
    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        if (nextTheme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    };

    // Sync theme on mount
    useEffect(() => {
        const storedTheme = localStorage.getItem('color-theme') as Theme | null;
        if (storedTheme) {
            setTheme(storedTheme);
            if (storedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        } else {
            // default to dark as per styleboards
            document.documentElement.classList.add('dark');
            setTheme('dark');
        }
    }, []);

    // Typewriter effect
    useEffect(() => {
        let isCancelled = false;
        let wordIndex = 0;

        const startTyping = async () => {
            while (!isCancelled) {
                const currentWord = words[wordIndex % words.length];

                // Type characters
                for (let i = 0; i <= currentWord.length; i++) {
                    if (isCancelled) return;
                    setTypingText(currentWord.slice(0, i));
                    await new Promise((res) => setTimeout(res, 150));
                }

                // Wait while complete
                await new Promise((res) => setTimeout(res, 2000));

                // Erase characters
                for (let i = currentWord.length; i >= 0; i--) {
                    if (isCancelled) return;
                    setTypingText(currentWord.slice(0, i));
                    await new Promise((res) => setTimeout(res, 50));
                }

                wordIndex++;
            }
        };

        startTyping();
        return () => {
            isCancelled = true;
        };
    }, []);

    // Memoize EMI Amortization calculations
    const normalEmiData = useMemo(() =>
        runAmortization(loanAmount, rate, tenure, 0, false),
        [loanAmount, rate, tenure]
    );
    const smartEmiData = useMemo(() =>
        runAmortization(loanAmount, rate, tenure, increase, extraEmi),
        [loanAmount, rate, tenure, increase, extraEmi]
    );

    const savedInterest = normalEmiData.totalInterest - smartEmiData.totalInterest;
    const savedTimeMonths = normalEmiData.totalMonths - smartEmiData.totalMonths;
    const totalSavings = normalEmiData.totalPaid - smartEmiData.totalPaid;

    // Render Mini Chart inside UI Lab (Styleguide View)
    useEffect(() => {
        if (activeView !== 'styleguide' || !miniChartRef.current) return;

        const ctx = miniChartRef.current.getContext('2d');
        if (!ctx) return;

        if (miniChartInstance.current) {
            miniChartInstance.current.destroy();
        }

        miniChartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                datasets: [{
                    data: [65, 78, 72, 85, 82, 90, 98],
                    borderColor: '#00DC82',
                    borderWidth: 2,
                    backgroundColor: (context) => {
                        const chartCtx = context.chart.ctx;
                        const gradient = chartCtx.createLinearGradient(0, 0, 0, 100);
                        gradient.addColorStop(0, 'rgba(0, 220, 130, 0.2)');
                        gradient.addColorStop(1, 'rgba(0, 220, 130, 0)');
                        return gradient;
                    },
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                scales: {
                    x: { display: false },
                    y: { display: false, min: 50 }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
            }
        });

        return () => {
            if (miniChartInstance.current) {
                miniChartInstance.current.destroy();
                miniChartInstance.current = null;
            }
        };
    }, [activeView]);

    // Render Dashboard Chart (Admin CMS View)
    useEffect(() => {
        if (activeView !== 'app' || activePage !== 'dashboard' || !dashboardChartRef.current) return;

        const ctx = dashboardChartRef.current.getContext('2d');
        if (!ctx) return;

        if (dashboardChartInstance.current) {
            dashboardChartInstance.current.destroy();
        }

        const isDark = theme === 'dark';
        const gridColor = isDark ? '#27272A' : '#E5E7EB';
        const textColor = isDark ? '#A1A1AA' : '#6B7280';

        dashboardChartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Visitors',
                    data: [120, 190, 300, 500, 220, 300, 450],
                    borderColor: '#00DC82',
                    backgroundColor: (context) => {
                        const chartCtx = context.chart.ctx;
                        const gradient = chartCtx.createLinearGradient(0, 0, 0, 300);
                        gradient.addColorStop(0, 'rgba(0, 220, 130, 0.2)');
                        gradient.addColorStop(1, 'rgba(0, 220, 130, 0)');
                        return gradient;
                    },
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#09090B',
                    pointBorderColor: '#00DC82',
                    pointRadius: 4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false }, ticks: { color: textColor, font: { family: 'JetBrains Mono' } } },
                    y: { grid: { color: gridColor, borderDash: [4, 4] } as any, ticks: { color: textColor, font: { family: 'JetBrains Mono' } } }
                }
            }
        });

        return () => {
            if (dashboardChartInstance.current) {
                dashboardChartInstance.current.destroy();
                dashboardChartInstance.current = null;
            }
        };
    }, [activeView, activePage, theme]);

    // Render EMI Chart (Admin CMS View -> EMI Tool)
    useEffect(() => {
        if (activeView !== 'app' || activePage !== 'emi' || !emiChartRef.current) return;

        const ctx = emiChartRef.current.getContext('2d');
        if (!ctx) return;

        if (emiChartInstance.current) {
            emiChartInstance.current.destroy();
        }

        const maxYear = Math.max(normalEmiData.yearlyData.length, smartEmiData.yearlyData.length);
        const labels = Array.from({ length: maxYear + 1 }, (_, i) => `Yr ${i}`);

        const normPoints = labels.map((_, i) => {
            if (i === 0) return loanAmount;
            const d = normalEmiData.yearlyData.find(x => x.year === i);
            return d ? d.balance : (i > normalEmiData.yearlyData[normalEmiData.yearlyData.length - 1]?.year ? 0 : null);
        });

        const smartPoints = labels.map((_, i) => {
            if (i === 0) return loanAmount;
            const d = smartEmiData.yearlyData.find(x => x.year === i);
            return d ? d.balance : (i > smartEmiData.yearlyData[smartEmiData.yearlyData.length - 1]?.year ? 0 : null);
        });

        const isDark = theme === 'dark';
        const gridColor = isDark ? '#27272A' : '#E5E7EB';
        const textColor = isDark ? '#A1A1AA' : '#6B7280';

        emiChartInstance.current = new Chart(ctx, {
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
                    y: { grid: { color: gridColor, borderDash: [4, 4] } as any, ticks: { color: textColor, font: { family: 'JetBrains Mono' }, callback: (val) => '₹' + (typeof val === 'number' ? val / 100000 : 0) + 'L' } }
                }
            }
        });

        return () => {
            if (emiChartInstance.current) {
                emiChartInstance.current.destroy();
                emiChartInstance.current = null;
            }
        };
    }, [activeView, activePage, normalEmiData, smartEmiData, loanAmount, theme]);

    // Handle Share URL Copy
    const shareLink = () => {
        handleCopyText(window.location.href, "Page URL");
    };


    // 1. Initialize Icons
    lucide.createIcons();

    // 2. Typing Effect Logic
    const words = ["Ready", "Stable", "Optimized", "Growing"];
    let i = 0;
    let timer;

    function typeEffect() {
        const word = words[i % words.length];
        const element = document.getElementById('typing-text');
        let charIndex = 0;

        // Clear previous word
        element.innerText = "";

        function typeChar() {
            if (charIndex < word.length) {
                element.innerText += word.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 150);
            } else {
                setTimeout(eraseWord, 2000);
            }
        }

        function eraseWord() {
            if (element.innerText.length > 0) {
                element.innerText = element.innerText.slice(0, -1);
                setTimeout(eraseWord, 50);
            } else {
                i++;
                typeEffect();
            }
        }

        typeChar();
    }

    // Start typing effect
    document.addEventListener('DOMContentLoaded', typeEffect);

    // 3. Color Copy Logic
    document.querySelectorAll('.palette-card').forEach(card => {
        card.addEventListener('click', function () {
            const color = this.getAttribute('data-color');
            const name = this.getAttribute('data-name');

            navigator.clipboard.writeText(color).then(() => {
                showToast(`${name} (${color}) copied`);
            });
        });
    });

    // 4. Generic Copy Logic for Prompts
    function copyToClipboard(elementId) {
        const text = document.getElementById(elementId).innerText;
        navigator.clipboard.writeText(text).then(() => {
            showToast("Prompt copied to clipboard");
        });
    }

    function copyLink() {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast("Link copied to clipboard");
        });
    }

    // 5. Toast Notification Logic
    function showToast(message) {
        const toast = document.getElementById('toast');
        const msg = document.getElementById('toast-msg');
        msg.innerText = message;

        toast.classList.remove('translate-y-24');

        setTimeout(() => {
            toast.classList.add('translate-y-24');
        }, 3000);
    }

    // 6. Mini Chart (Chart.js) for the 'Stats' card
    const ctx = document.getElementById('miniChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            datasets: [{
                data: [65, 78, 72, 85, 82, 90, 98],
                borderColor: '#00DC82',
                borderWidth: 2,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
                    gradient.addColorStop(0, 'rgba(0, 220, 130, 0.2)');
                    gradient.addColorStop(1, 'rgba(0, 220, 130, 0)');
                    return gradient;
                },
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: {
                x: { display: false },
                y: { display: false, min: 50 }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
        }
    });


    return (
        <>
            <div className="bg-gray-50 text-gray-900 dark:bg-brand-black dark:text-brand-text font-sans antialiased selection:bg-brand-mint selection:text-brand-black transition-colors duration-300 overflow-x-hidden min-h-screen relative z-10">
                {/* Background Grid Pattern */}
                <div className="fixed inset-0 bg-grid-pattern opacity-[0.4] dark:opacity-[0.07] pointer-events-none z-0 bg-grid transition-opacity duration-300"></div>

                {/* Top Navigation Bar */}
                <nav className="fixed top-0 w-full z-50 glass border-b border-gray-200 dark:border-brand-border h-16 flex items-center px-6 lg:px-8 justify-between transition-colors duration-300">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
                        <div className="w-8 h-8 bg-brand-mint/10 border border-brand-mint/30 rounded flex items-center justify-center text-brand-mint font-mono font-bold transition-all duration-300">m</div>
                        <span className="font-display font-bold text-lg tracking-wide text-gray-900 dark:text-brand-text">mrahulrahi</span>
                    </div>

                    {/* Switch View Toggle (Center) */}
                    <div className="flex bg-gray-100 dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-lg p-1">
                        <button
                            onClick={() => setActiveView('styleguide')}
                            className={`px-3 py-1 md:px-4 md:py-1.5 rounded text-xs md:text-sm font-medium transition-all shadow-sm ${activeView === 'styleguide'
                                ? 'bg-white dark:bg-brand-surfaceHighlight text-gray-900 dark:text-white'
                                : 'text-gray-500 dark:text-brand-muted hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            Style Guide
                        </button>
                        <button
                            onClick={() => setActiveView('app')}
                            className={`px-3 py-1 md:px-4 md:py-1.5 rounded text-xs md:text-sm font-medium transition-all shadow-sm ${activeView === 'app'
                                ? 'bg-white dark:bg-brand-surfaceHighlight text-gray-900 dark:text-white'
                                : 'text-gray-500 dark:text-brand-muted hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            Admin CMS
                        </button>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {/* Gradient Spec Toggle (Uncommon features display) */}
                        <div className="hidden lg:flex items-center gap-2 border border-gray-200 dark:border-brand-border rounded px-2.5 py-1 text-[11px] font-mono bg-white/40 dark:bg-brand-surface/40">
                            <span className="text-gray-400">Spec:</span>
                            <button
                                onClick={() => setUseTailwindV4Gradient(!useTailwindV4Gradient)}
                                className={`px-1.5 py-0.5 rounded text-xs font-semibold ${useTailwindV4Gradient ? 'bg-brand-mint text-brand-black' : 'bg-gray-200 dark:bg-brand-surfaceHighlight text-gray-600 dark:text-brand-muted'}`}
                            >
                                {useTailwindV4Gradient ? 'Tailwind v4 (linear)' : 'Tailwind v3 (gradient)'}
                            </button>
                        </div>

                        {/* Theme Switcher */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted hover:text-brand-mint hover:border-brand-mint transition-all"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>

                        <button
                            onClick={shareLink}
                            className="hidden sm:block border border-gray-200 dark:border-brand-border hover:border-brand-mint hover:text-brand-mint text-gray-500 dark:text-brand-muted px-4 py-2 rounded text-xs font-mono transition-all"
                        >
                            Share_Board
                        </button>
                    </div>
                </nav>

                {/* VIEW 1: STYLE GUIDE */}
                {activeView === 'styleguide' && (
                    <main className="relative z-10 pt-24 px-6 lg:px-12 max-w-7xl mx-auto pb-20 space-y-24 animate-fade-in">

                        {/* Sub-navigation Menu */}
                        <div className="flex flex-wrap gap-4 md:gap-8 text-sm font-mono text-gray-500 dark:text-brand-muted border-b border-gray-200 dark:border-brand-border pb-4 mb-8">
                            <a href="#essence" className="hover:text-brand-mint transition-colors">01.Essence</a>
                            <a href="#palette" className="hover:text-brand-mint transition-colors">02.Palette</a>
                            <a href="#typography" className="hover:text-brand-mint transition-colors">03.Type</a>
                            <a href="#ui-lab" className="hover:text-brand-mint transition-colors">04.UI_Lab</a>
                            <a href="#prompts" className="hover:text-brand-mint transition-colors">05.Prompts</a>
                        </div>

                        {/* 1. Essence / Hero Section */}
                        <section id="essence" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-7 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border text-xs font-mono text-brand-mint shadow-sm">
                                    <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse"></span>
                                    v1.0.0 System Online
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight text-gray-900 dark:text-brand-text">
                                    Structured <br />
                                    <span className={`text-transparent bg-clip-text ${useTailwindV4Gradient
                                        ? 'bg-linear-to-r from-brand-mint to-brand-fern'
                                        : 'bg-gradient-to-r from-brand-mint to-brand-fern'
                                        }`}>
                                        Ecology
                                    </span>
                                </h1>
                                <p className="text-gray-600 dark:text-brand-muted text-lg max-w-xl leading-relaxed">
                                    Bridging the gap between raw code structure and organic creativity. A design system for portfolio, UI libraries, and developer tools.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-4">
                                    <span className="px-3 py-1 border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted text-sm font-mono rounded hover:border-brand-mint transition-colors cursor-default">#Systemic</span>
                                    <span className="px-3 py-1 border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted text-sm font-mono rounded hover:border-brand-mint transition-colors cursor-default">#Atomic</span>
                                    <span className="px-3 py-1 border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted text-sm font-mono rounded hover:border-brand-mint transition-colors cursor-default">#Terminal-Inspired</span>
                                    <span className="px-3 py-1 border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted text-sm font-mono rounded hover:border-brand-mint transition-colors cursor-default">#Future-Proof</span>
                                </div>
                            </div>

                            {/* Terminal Mockup */}
                            <div className="lg:col-span-5 h-64 lg:h-80 bg-[#09090B] border border-gray-200 dark:border-brand-border rounded-lg p-6 relative overflow-hidden group shadow-xl">
                                <div className="absolute top-0 left-0 w-full h-6 bg-brand-border/30 flex items-center px-4 gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                </div>
                                <div className="mt-6 font-mono text-sm space-y-2">
                                    <p className="text-brand-muted">$ init <span className="text-brand-mint">mrahulrahi</span></p>
                                    <p className="text-brand-muted">&gt; Loading modules...</p>
                                    <p className="text-brand-muted">&gt; Applying theme: <span className="text-brand-glow font-semibold">Electric Flora</span></p>
                                    <p className="text-brand-muted">&gt; Optimizing grid...</p>
                                    <p className="text-brand-text flex items-center gap-2">
                                        &gt; Status: <span className="text-brand-mint">{typingText}</span>
                                        <span className="cursor-blink w-2 h-4 bg-brand-mint block"></span>
                                    </p>
                                </div>
                                <div className="absolute bottom-4 right-4 w-16 h-16 border-r border-b border-brand-mint/30 rounded-br-xl"></div>
                            </div>
                        </section>

                        {/* 2. Color Palette Section */}
                        <section id="palette" className="space-y-8">
                            <div className="border-l-2 border-brand-mint pl-4">
                                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Electric Flora Palette</h2>
                                <p className="text-gray-600 dark:text-brand-muted mt-2">Monochromatic base with high-voltage green accents. Click a card to copy hex.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                {/* swatches */}
                                <div
                                    onClick={() => handleCopyText("#09090B", "Void Black")}
                                    className="palette-card group relative aspect-square rounded-xl border border-gray-200 dark:border-brand-border bg-brand-black flex flex-col justify-between p-4 cursor-pointer transition-all hover:border-brand-mint hover:shadow-[0_0_20px_rgba(0,220,130,0.1)] overflow-hidden shadow-sm"
                                >
                                    <div className="absolute inset-0 bg-[#09090B]"></div>
                                    <span className="relative z-10 text-xs font-mono bg-brand-black/50 backdrop-blur px-2 py-1 rounded text-white w-max border border-white/10">Main BG</span>
                                    <div className="relative z-10 flex justify-between items-end">
                                        <span className="font-display font-bold text-white">Void Black</span>
                                        <span className="font-mono text-xs text-brand-muted">#09090B</span>
                                    </div>
                                </div>

                                <div
                                    onClick={() => handleCopyText("#18181B", "Graphite")}
                                    className="palette-card group relative aspect-square rounded-xl border border-gray-200 dark:border-brand-border bg-brand-surface flex flex-col justify-between p-4 cursor-pointer transition-all hover:border-brand-mint hover:shadow-[0_0_20px_rgba(0,220,130,0.1)] overflow-hidden shadow-sm"
                                >
                                    <div className="absolute inset-0 bg-[#18181B]"></div>
                                    <span className="relative z-10 text-xs font-mono bg-brand-black/50 backdrop-blur px-2 py-1 rounded text-white w-max border border-white/10">Surface</span>
                                    <div className="relative z-10 flex justify-between items-end">
                                        <span className="font-display font-bold text-white">Graphite</span>
                                        <span className="font-mono text-xs text-brand-muted">#18181B</span>
                                    </div>
                                </div>

                                <div
                                    onClick={() => handleCopyText("#00DC82", "Electric Mint")}
                                    className="palette-card group relative aspect-square rounded-xl border border-gray-200 dark:border-brand-border bg-brand-mint flex flex-col justify-between p-4 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,220,130,0.4)] overflow-hidden shadow-sm"
                                >
                                    <div className="absolute inset-0 bg-[#00DC82]"></div>
                                    <span className="relative z-10 text-xs font-mono bg-black/20 backdrop-blur px-2 py-1 rounded text-black w-max border border-black/10 font-bold">Accent</span>
                                    <div className="relative z-10 flex justify-between items-end text-brand-black">
                                        <span className="font-display font-bold">Electric Mint</span>
                                        <span className="font-mono text-xs font-bold">#00DC82</span>
                                    </div>
                                </div>

                                <div
                                    onClick={() => handleCopyText("#047857", "Deep Fern")}
                                    className="palette-card group relative aspect-square rounded-xl border border-gray-200 dark:border-brand-border bg-brand-fern flex flex-col justify-between p-4 cursor-pointer transition-all hover:border-brand-mint hover:shadow-[0_0_20px_rgba(4,120,87,0.3)] overflow-hidden shadow-sm"
                                >
                                    <div className="absolute inset-0 bg-[#047857]"></div>
                                    <span className="relative z-10 text-xs font-mono bg-black/20 backdrop-blur px-2 py-1 rounded text-white w-max border border-white/10">Secondary</span>
                                    <div className="relative z-10 flex justify-between items-end text-white">
                                        <span className="font-display font-bold">Deep Fern</span>
                                        <span className="font-mono text-xs opacity-80">#047857</span>
                                    </div>
                                </div>

                                <div
                                    onClick={() => handleCopyText("#BBF7D0", "Lime Glow")}
                                    className="palette-card group relative aspect-square rounded-xl border border-gray-200 dark:border-brand-border bg-brand-glow flex flex-col justify-between p-4 cursor-pointer transition-all hover:border-brand-mint hover:shadow-[0_0_20px_rgba(187,247,208,0.3)] overflow-hidden shadow-sm"
                                >
                                    <div className="absolute inset-0 bg-[#BBF7D0]"></div>
                                    <span className="relative z-10 text-xs font-mono bg-brand-black/10 backdrop-blur px-2 py-1 rounded text-brand-black w-max border border-black/5">Highlight</span>
                                    <div className="relative z-10 flex justify-between items-end text-brand-black">
                                        <span className="font-display font-bold">Lime Glow</span>
                                        <span className="font-mono text-xs font-bold">#BBF7D0</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3. Typography System */}
                        <section id="typography" className="space-y-8">
                            <div className="border-l-2 border-brand-mint pl-4">
                                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Typography Stack</h2>
                                <p className="text-gray-600 dark:text-brand-muted mt-2">Balancing technical precision with readability.</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-8 hover:border-brand-muted transition-colors shadow-sm">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-brand-mint font-mono text-sm mb-1">Headings / Display</h3>
                                            <p className="text-2xl font-display font-bold text-gray-900 dark:text-brand-text">Space Grotesk</p>
                                        </div>
                                        <span className="text-gray-400 dark:text-brand-muted font-mono text-xs border border-gray-200 dark:border-brand-border px-2 py-1 rounded">Aa</span>
                                    </div>
                                    <p className="font-display text-4xl font-bold leading-tight mb-4 text-gray-900 dark:text-brand-text">
                                        Technical Brutalism for Modern UI
                                    </p>
                                    <p className="font-display text-gray-500 dark:text-brand-muted text-sm">
                                        ABCDEFGHIJKLMNOPQRSTUVWXYZ <br />
                                        abcdefghijklmnopqrstuvwxyz <br />
                                        0123456789
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-8 hover:border-brand-muted transition-colors shadow-sm">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-brand-mint font-mono text-sm mb-1">Body Copy</h3>
                                            <p className="text-2xl font-sans font-medium text-gray-900 dark:text-brand-text">Inter</p>
                                        </div>
                                        <span className="text-gray-400 dark:text-brand-muted font-mono text-xs border border-gray-200 dark:border-brand-border px-2 py-1 rounded">Aa</span>
                                    </div>
                                    <p className="font-sans text-base leading-relaxed text-gray-600 dark:text-brand-muted mb-4">
                                        The theme bridges the gap between raw code (structure) and organic growth (creativity). It feels engineered but alive. This text is set in Inter for maximum legibility on screens.
                                    </p>
                                    <p className="font-sans text-gray-400 dark:text-brand-muted text-sm opacity-60">
                                        Regular 400 · Medium 500 · SemiBold 600
                                    </p>
                                </div>

                                <div className="col-span-1 lg:col-span-2 bg-[#09090B] border border-gray-200 dark:border-brand-border rounded-xl p-8 hover:border-brand-mint transition-colors shadow-xl">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-brand-mint font-mono text-sm mb-1">Code / Technical</h3>
                                            <p className="text-2xl font-mono text-white">JetBrains Mono</p>
                                        </div>
                                        <span className="text-brand-muted font-mono text-xs border border-brand-border px-2 py-1 rounded">{"{}"}</span>
                                    </div>
                                    <div className="bg-[#1e1e1e] p-4 rounded border-l-2 border-brand-mint font-mono text-sm text-left overflow-x-auto text-white">
                                        <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">BrandIdentity</span> <span className="text-[#56b6c2]">=</span> {"{"}<br />
                                        &nbsp;&nbsp;theme: <span className="text-[#98c379]">'Structured Ecology'</span>,<br />
                                        &nbsp;&nbsp;version: <span className="text-[#d19a66]">1.0</span>,<br />
                                        &nbsp;&nbsp;init: <span className="text-[#c678dd]">function</span>() {"{"}<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#e06c75]">return</span> <span className="text-[#98c379]">"Ready"</span>;<br />
                                        &nbsp;&nbsp;{"}"}<br />
                                        {"};"}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 4. UI Lab Section */}
                        <section id="ui-lab" className="space-y-8">
                            <div className="border-l-2 border-brand-mint pl-4">
                                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">UI Lab</h2>
                                <p className="text-gray-600 dark:text-brand-muted mt-2">Component behavior and the Bento grid system.</p>
                            </div>

                            {/* Bento Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 min-h-[600px] md:h-[600px]">

                                {/* Card 1: Primary Action */}
                                <div className="col-span-1 md:col-span-2 md:row-span-2 bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 relative group overflow-hidden shadow-sm">
                                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                        <ArrowUp className="text-brand-mint rotate-45 w-5 h-5" />
                                    </div>
                                    <h3 className="font-display font-bold text-xl mb-4 text-gray-900 dark:text-brand-text">Interactive Elements</h3>
                                    <div className="flex flex-col gap-4 items-start">
                                        <button className="px-6 py-2 bg-brand-mint text-brand-black font-medium rounded hover:bg-brand-mint/90 transition-colors w-full md:w-auto font-mono text-sm cursor-pointer">
                                            Primary_Action
                                        </button>
                                        <button className="px-6 py-2 bg-transparent border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text font-medium rounded hover:border-brand-mint hover:text-brand-mint transition-colors w-full md:w-auto font-mono text-sm cursor-pointer">
                                            Secondary_Action
                                        </button>
                                        <div className="flex items-center gap-2 group/link cursor-pointer">
                                            <span className="text-brand-mint font-mono text-sm group-hover/link:underline">Read Documentation</span>
                                            <ChevronRight className="w-4 h-4 text-brand-mint transition-transform group-hover/link:translate-x-1" />
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2: Stats (Mini Chart) */}
                                <div className="col-span-1 md:col-span-2 md:row-span-1 glass rounded-xl p-6 flex items-center justify-between border border-gray-200 dark:border-brand-border relative overflow-hidden shadow-sm">
                                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brand-mint/10 blur-2xl rounded-full"></div>
                                    <div>
                                        <p className="text-gray-500 dark:text-brand-muted text-sm font-mono">System Status</p>
                                        <p className="text-3xl font-mono font-bold text-brand-mint">98.4%</p>
                                    </div>
                                    <div className="h-12 w-32 chart-container">
                                        <canvas ref={miniChartRef}></canvas>
                                    </div>
                                </div>

                                {/* Card 3: Command Input */}
                                <div className="col-span-1 md:row-span-1 bg-white dark:bg-brand-black border border-gray-200 dark:border-brand-border rounded-xl p-6 flex flex-col justify-center group hover:border-brand-muted transition-colors shadow-sm">
                                    <label className="text-xs font-mono text-gray-500 dark:text-brand-muted mb-2 group-focus-within:text-brand-mint transition-colors">Command Input</label>
                                    <div className="flex items-center border-b border-gray-200 dark:border-brand-border group-focus-within:border-brand-mint transition-colors py-1">
                                        <span className="text-brand-mint mr-2">&gt;</span>
                                        <input
                                            type="text"
                                            placeholder="Type..."
                                            className="bg-transparent w-full outline-none text-gray-900 dark:text-brand-text font-mono text-sm placeholder-gray-400 dark:placeholder-brand-muted/50 border-0 p-0 focus:ring-0"
                                        />
                                    </div>
                                </div>

                                {/* Card 4: Feature List */}
                                <div className="col-span-1 md:row-span-2 bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 shadow-sm">
                                    <h3 className="font-display font-bold text-lg mb-4 text-gray-900 dark:text-brand-text">Modules</h3>
                                    <ul className="space-y-3">
                                        {["Layout_Grid", "Typography", "Icons", "Animations"].map((mod, idx) => (
                                            <li key={mod} className="flex items-center gap-3 text-sm text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text transition-colors cursor-default">
                                                <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-brand-mint' : idx === 1 ? 'bg-brand-fern' : 'bg-gray-300 dark:bg-brand-border'}`}></div>
                                                <span>{mod}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Card 5: Logo Concepts Visualization */}
                                <div className="col-span-1 md:col-span-2 md:row-span-1 bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 flex items-center justify-around shadow-sm">
                                    {/* Concept A: Monogram Stack */}
                                    <div className="group text-center cursor-default">
                                        <div className="w-12 h-12 border-2 border-brand-mint rounded-lg flex items-center justify-center relative mb-2 mx-auto transition-all group-hover:bg-brand-mint group-hover:text-brand-black text-gray-900 dark:text-white font-display font-bold text-xl">
                                            M
                                            <div className="absolute -right-1 -bottom-1 w-2 h-2 bg-gray-50 dark:bg-brand-black border border-brand-mint"></div>
                                        </div>
                                        <p className="text-[10px] font-mono text-gray-500 dark:text-brand-muted uppercase">Monogram</p>
                                    </div>

                                    {/* Concept B: Terminal Cursor */}
                                    <div className="group text-center cursor-default">
                                        <div className="w-12 h-12 flex items-center justify-center mb-2 mx-auto text-gray-900 dark:text-white font-display font-bold text-2xl">
                                            m<span className="text-brand-mint animate-pulse">_</span>
                                        </div>
                                        <p className="text-[10px] font-mono text-gray-500 dark:text-brand-muted uppercase">Terminal</p>
                                    </div>

                                    {/* Concept C: Bracket Node */}
                                    <div className="group text-center cursor-default">
                                        <div className="w-12 h-12 relative flex items-center justify-center mb-2 mx-auto">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-mint">
                                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                            </svg>
                                        </div>
                                        <p className="text-[10px] font-mono text-gray-500 dark:text-brand-muted uppercase">Node</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 5. Generator Prompts */}
                        <section id="prompts" className="space-y-8">
                            <div className="border-l-2 border-brand-mint pl-4">
                                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Generator Prompts</h2>
                                <p className="text-gray-600 dark:text-brand-muted mt-2">Source material for AI asset generation.</p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    {
                                        file: "UI_Mockup.txt",
                                        id: "prompt-ui",
                                        text: `"High fidelity UI design for a personal portfolio and developer tools website named 'mrahulrahi'. Dark mode aesthetic, matte black background with subtle noise texture. Accent color is electric mint green (#00DC82). Layout uses a bento-grid style. Typography is a mix of geometric sans-serif and coding monospace fonts. Visual elements include floating code snippets, glassmorphism cards, and neon green thin border lines. Tech-minimalist, clean, Dribbble trending, 4k, vector style."`
                                    },
                                    {
                                        file: "Logo_Concept.txt",
                                        id: "prompt-logo",
                                        text: `"Minimalist tech logo for brand 'mrahulrahi'. The logo should combine the letter 'M' with coding symbols like brackets or a terminal cursor. Flat vector design. Color scheme: Neon Green and Dark Grey. Modern, geometric, suitable for a GitHub profile picture or app icon. White background."`
                                    },
                                    {
                                        file: "Brand_Texture.txt",
                                        id: "prompt-texture",
                                        text: `"Abstract 3D background for a developer brand identity. Dark obsidian geometric shapes floating in a void. Illuminated by electric mint green laser lights. Cyberpunk meets clean corporate memphis design. Matte finish, soft shadows, high contrast, 8k resolution."`
                                    }
                                ].map((prompt) => (
                                    <div key={prompt.id} className="bg-[#09090B] border border-gray-200 dark:border-brand-border rounded-lg overflow-hidden shadow-md">
                                        <div className="bg-[#18181B] border-b border-gray-200 dark:border-brand-border px-4 py-2 flex justify-between items-center">
                                            <span className="text-xs font-mono text-gray-400">{prompt.file}</span>
                                            <button
                                                onClick={() => handleCopyText(prompt.text, prompt.file)}
                                                className="text-xs font-mono text-brand-mint hover:text-white flex items-center gap-1.5 cursor-pointer"
                                            >
                                                <Copy className="w-3.5 h-3.5" /> Copy
                                            </button>
                                        </div>
                                        <div className="p-4 font-mono text-sm text-gray-400 leading-relaxed">
                                            {prompt.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Footer */}
                        <footer className="border-t border-gray-200 dark:border-brand-border pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="text-sm text-gray-500 dark:text-brand-muted font-mono">
                                © 2025 mrahulrahi. All systems nominal.
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border flex items-center justify-center hover:border-brand-mint transition-colors cursor-pointer text-gray-400 hover:text-brand-mint">
                                    <Github className="w-4 h-4" />
                                </div>
                                <div className="w-8 h-8 rounded bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border flex items-center justify-center hover:border-brand-mint transition-colors cursor-pointer text-gray-400 hover:text-brand-mint">
                                    <Twitter className="w-4 h-4" />
                                </div>
                                <div className="w-8 h-8 rounded bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border flex items-center justify-center hover:border-brand-mint transition-colors cursor-pointer text-gray-400 hover:text-brand-mint">
                                    <Figma className="w-4 h-4" />
                                </div>
                            </div>
                        </footer>
                    </main>
                )}

                {/* VIEW 2: APP ADMIN (CMS & Dashboard) */}
                {activeView === 'app' && (
                    <div className="fixed inset-0 top-16 z-20 flex bg-gray-50 dark:bg-brand-black transition-opacity duration-300">

                        {/* App Sidebar */}
                        <aside className="w-64 border-r border-gray-200 dark:border-brand-border bg-white dark:bg-brand-surface flex-col flex-shrink-0 hidden md:flex">
                            <div className="p-6">
                                <div className="text-xs font-mono text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-4">Admin Console</div>
                                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-100 dark:bg-brand-surfaceHighlight border border-gray-200 dark:border-brand-border">
                                    <div className="w-8 h-8 rounded bg-brand-mint flex items-center justify-center font-bold text-brand-black">M</div>
                                    <div className="text-sm">
                                        <div className="font-bold text-gray-900 dark:text-brand-text">mrahulrahi</div>
                                        <div className="text-xs text-gray-500 dark:text-brand-muted">Super Admin</div>
                                    </div>
                                </div>
                            </div>

                            <nav className="flex-1 px-4 space-y-1">
                                <button
                                    onClick={() => setActivePage('dashboard')}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${activePage === 'dashboard'
                                        ? 'bg-brand-mint/10 text-brand-mint border-r-2 border-brand-mint'
                                        : 'text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight/50'
                                        }`}
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </button>

                                <div className="pt-4 mt-2 mb-2">
                                    <div className="text-xs font-mono text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-2 px-2">Content Manager</div>
                                    <button
                                        onClick={() => setActivePage('portfolio')}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${activePage === 'portfolio'
                                            ? 'bg-brand-mint/10 text-brand-mint border-r-2 border-brand-mint'
                                            : 'text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight/50'
                                            }`}
                                    >
                                        <Briefcase className="w-4 h-4" />
                                        Portfolio
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-400 dark:text-brand-border/60 cursor-not-allowed">
                                        <ComponentIcon className="w-4 h-4" />
                                        Components
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-400 dark:text-brand-border/60 cursor-not-allowed">
                                        <PenTool className="w-4 h-4" />
                                        Blog & Notes
                                    </button>
                                </div>

                                <div className="pt-4 mt-2 border-t border-gray-200 dark:border-brand-border">
                                    <div className="text-xs font-mono text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-2 px-2">Tools</div>
                                    <button
                                        onClick={() => setActivePage('emi')}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${activePage === 'emi'
                                            ? 'bg-brand-mint/10 text-brand-mint border-r-2 border-brand-mint'
                                            : 'text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight/50'
                                            }`}
                                    >
                                        <Calculator className="w-4 h-4" />
                                        Smart EMI
                                    </button>
                                </div>

                                <div className="pt-4 mt-auto">
                                    <button
                                        onClick={() => setActivePage('settings')}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${activePage === 'settings'
                                            ? 'bg-brand-mint/10 text-brand-mint border-r-2 border-brand-mint'
                                            : 'text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight/50'
                                            }`}
                                    >
                                        <Settings className="w-4 h-4" />
                                        Configuration
                                    </button>
                                </div>
                            </nav>
                        </aside>

                        {/* Main App Area */}
                        <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
                            {/* Breadcrumbs */}
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-brand-muted font-mono mb-6">
                                <span>admin</span>
                                <span>/</span>
                                <span className="text-gray-900 dark:text-brand-text capitalize">{activePage}</span>
                            </div>

                            {/* PAGE 1: DASHBOARD */}
                            {activePage === 'dashboard' && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                                        <div>
                                            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Site Overview</h2>
                                            <p className="text-gray-500 dark:text-brand-muted mt-1">Analytics for mrahulrahi.vercel.app</p>
                                        </div>
                                        <div className="flex gap-2 w-full sm:w-auto">
                                            <a href="https://mrahulrahi.vercel.app/" target="_blank" rel="noreferrer" className="flex-1 sm:flex-initial px-4 py-2 rounded bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border text-sm font-mono flex items-center justify-center gap-2 text-gray-900 dark:text-brand-text hover:border-brand-mint transition-colors">
                                                <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse"></span> View Live
                                            </a>
                                            <button className="flex-1 sm:flex-initial bg-brand-mint hover:bg-brand-fern hover:text-white text-brand-black px-4 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer">
                                                <Plus className="w-4 h-4" /> New Post
                                            </button>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 relative overflow-hidden group shadow-sm">
                                            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                                <Eye className="w-16 h-16 text-brand-mint" />
                                            </div>
                                            <p className="text-sm font-mono text-gray-500 dark:text-brand-muted">Total Views</p>
                                            <p className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text mt-1">142.5k</p>
                                            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-brand-mint">
                                                <ArrowUp className="w-3 h-3" /> 8.4% vs last month
                                            </div>
                                        </div>
                                        <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 relative overflow-hidden group shadow-sm">
                                            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                                <Download className="w-16 h-16 text-brand-fern" />
                                            </div>
                                            <p className="text-sm font-mono text-gray-500 dark:text-brand-muted">Library Downloads</p>
                                            <p className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text mt-1">8.2k</p>
                                            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-brand-mint">
                                                <ArrowUp className="w-3 h-3" /> 12% vs last month
                                            </div>
                                        </div>
                                        <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 relative overflow-hidden group shadow-sm">
                                            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                                <MousePointer className="w-16 h-16 text-brand-glow" />
                                            </div>
                                            <p className="text-sm font-mono text-gray-500 dark:text-brand-muted">Portfolio Clicks</p>
                                            <p className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text mt-1">3,402</p>
                                            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-gray-400">
                                                Avg session: 2m 14s
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Chart */}
                                    <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 shadow-sm">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="font-bold text-gray-900 dark:text-brand-text">Traffic Volume</h3>
                                            <select className="bg-transparent border border-gray-200 dark:border-brand-border text-xs rounded px-2 py-1 text-gray-500 dark:text-brand-muted outline-none">
                                                <option>Last 7 Days</option>
                                                <option>Last 30 Days</option>
                                            </select>
                                        </div>
                                        <div className="w-full h-80 chart-container">
                                            <canvas ref={dashboardChartRef}></canvas>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* PAGE 2: PORTFOLIO MANAGER */}
                            {activePage === 'portfolio' && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                                        <div>
                                            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Portfolio Manager</h2>
                                            <p className="text-gray-500 dark:text-brand-muted mt-1">Manage projects and case studies.</p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                                            <div className="relative flex-1 sm:flex-initial">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type="text"
                                                    placeholder="Search projects..."
                                                    className="pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border text-sm w-full sm:w-64 focus:border-brand-mint outline-none text-gray-900 dark:text-brand-text"
                                                />
                                            </div>
                                            <button className="bg-brand-mint text-brand-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-fern hover:text-white transition-colors cursor-pointer">
                                                Add Project
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {/* Project Card 1 */}
                                        <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl overflow-hidden group hover:border-brand-mint transition-all shadow-sm">
                                            <div className="h-40 bg-gray-150 dark:bg-brand-black/55 relative flex items-center justify-center">
                                                <Eye className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform" />
                                                <div className="absolute top-2 right-2 bg-brand-mint text-brand-black text-[10px] font-bold px-2 py-1 rounded">PUBLISHED</div>
                                            </div>
                                            <div className="p-5">
                                                <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">FinTech Dashboard</h3>
                                                <p className="text-xs font-mono text-brand-mint mt-1">UX / UI Design</p>
                                                <p className="text-sm text-gray-500 dark:text-brand-muted mt-3 h-10 line-clamp-2">A comprehensive dashboard for a banking client focusing on data visualization.</p>
                                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-brand-border flex items-center justify-between">
                                                    <div className="flex gap-2">
                                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted cursor-pointer"><Edit3 className="w-4 h-4" /></button>
                                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted cursor-pointer"><Eye className="w-4 h-4" /></button>
                                                    </div>
                                                    <span className="text-xs text-gray-400 font-mono">Updated 2d ago</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Project Card 2 */}
                                        <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl overflow-hidden group hover:border-brand-mint transition-all shadow-sm">
                                            <div className="h-40 bg-gray-150 dark:bg-brand-black/55 relative flex items-center justify-center">
                                                <EyeOff className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform" />
                                                <div className="absolute top-2 right-2 bg-gray-400 dark:bg-gray-700 text-white text-[10px] font-bold px-2 py-1 rounded">DRAFT</div>
                                            </div>
                                            <div className="p-5">
                                                <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">E-commerce Mobile App</h3>
                                                <p className="text-xs font-mono text-brand-mint mt-1">Product Design</p>
                                                <p className="text-sm text-gray-500 dark:text-brand-muted mt-3 h-10 line-clamp-2">Concept app for a streetwear brand featuring AR try-on.</p>
                                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-brand-border flex items-center justify-between">
                                                    <div className="flex gap-2">
                                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted cursor-pointer"><Edit3 className="w-4 h-4" /></button>
                                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted cursor-pointer"><EyeOff className="w-4 h-4" /></button>
                                                    </div>
                                                    <span className="text-xs text-gray-400 font-mono">Updated 5h ago</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Add New Placeholder */}
                                        <button className="bg-gray-50 dark:bg-brand-surfaceHighlight/30 border border-dashed border-gray-300 dark:border-brand-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-brand-mint hover:bg-brand-mint/5 transition-all group cursor-pointer">
                                            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-brand-surfaceHighlight flex items-center justify-center text-gray-400 group-hover:bg-brand-mint group-hover:text-brand-black transition-colors mb-4">
                                                <Plus className="w-6 h-6" />
                                            </div>
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">Create New Project</h3>
                                            <p className="text-sm text-gray-500 dark:text-brand-muted mt-1">Add a case study to your portfolio</p>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* PAGE 3: SMART EMI */}
                            {activePage === 'emi' && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text flex items-center gap-2">
                                                <RefreshCw className="w-6 h-6 text-brand-mint animate-spin-slow" />
                                                Smart EMI Planner
                                            </h2>
                                            <p className="text-gray-500 dark:text-brand-muted mt-1">Live Tool Preview</p>
                                        </div>
                                        <div className="bg-white dark:bg-brand-surface px-4 py-2 rounded-xl border border-gray-200 dark:border-brand-border flex items-center justify-between sm:justify-start gap-3 shadow-sm">
                                            <div className="text-right">
                                                <p className="text-[10px] text-gray-500 dark:text-brand-muted uppercase font-semibold">Standard EMI</p>
                                                <p className="text-lg font-bold text-gray-700 dark:text-brand-text">{formatCurrency(normalEmiData.initialEmi)}</p>
                                            </div>
                                            <div className="h-8 w-[1px] bg-gray-200 dark:bg-brand-border"></div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-brand-mint uppercase font-semibold">Smart EMI</p>
                                                <p className="text-lg font-bold text-brand-mint">{formatCurrency(smartEmiData.initialEmi)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                        {/* Controls Sidebar */}
                                        <aside className="lg:col-span-4 space-y-6">
                                            <div className="bg-white dark:bg-brand-surface p-6 rounded-xl border border-gray-200 dark:border-brand-border space-y-5 shadow-sm">
                                                <h2 className="text-lg font-semibold text-gray-900 dark:text-brand-text flex items-center gap-2 mb-2">
                                                    <Wallet className="w-5 h-5 text-brand-mint" />
                                                    Loan Details
                                                </h2>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 dark:text-brand-muted mb-1 font-mono">Loan Amount (₹)</label>
                                                    <input
                                                        type="number"
                                                        value={loanAmount}
                                                        onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))}
                                                        className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-600 dark:text-brand-muted mb-1 font-mono">Rate (%)</label>
                                                        <input
                                                            type="number"
                                                            step="0.1"
                                                            value={rate}
                                                            onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
                                                            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-600 dark:text-brand-muted mb-1 font-mono">Tenure (Yrs)</label>
                                                        <input
                                                            type="number"
                                                            value={tenure}
                                                            onChange={(e) => setTenure(Math.max(1, Number(e.target.value)))}
                                                            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono"
                                                        />
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
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="25"
                                                        step="1"
                                                        value={increase}
                                                        onChange={(e) => setIncrease(Number(e.target.value))}
                                                        className="w-full h-2 bg-gray-200 dark:bg-brand-black rounded-lg appearance-none cursor-pointer accent-brand-mint"
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-brand-black rounded-xl border border-gray-200 dark:border-brand-border">
                                                    <div className="flex items-center gap-3">
                                                        <Calendar className="text-gray-400 w-5 h-5" />
                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-900 dark:text-brand-text">13th EMI Strategy</p>
                                                            <p className="text-xs text-gray-500 dark:text-brand-muted font-mono">Pay one extra EMI yearly</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => setExtraEmi(!extraEmi)}
                                                        className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${extraEmi ? 'bg-brand-mint' : 'bg-gray-300 dark:bg-gray-600'}`}
                                                    >
                                                        <div className={`absolute top-1 bg-white dark:bg-brand-black w-4 h-4 rounded-full transition-all ${extraEmi ? 'left-7' : 'left-1'}`}></div>
                                                    </button>
                                                </div>
                                            </div>
                                        </aside>

                                        {/* Results Area */}
                                        <main className="lg:col-span-8 space-y-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                <div className="bg-white dark:bg-brand-surface p-5 rounded-xl border border-gray-200 dark:border-brand-border shadow-sm">
                                                    <p className="text-gray-500 dark:text-brand-muted text-xs font-bold uppercase tracking-wider mb-1">Interest Saved</p>
                                                    <span className="text-2xl font-black text-brand-fern dark:text-brand-mint block">{formatCurrency(savedInterest)}</span>
                                                </div>
                                                <div className="bg-white dark:bg-brand-surface p-5 rounded-xl border border-gray-200 dark:border-brand-border shadow-sm">
                                                    <p className="text-gray-500 dark:text-brand-muted text-xs font-bold uppercase tracking-wider mb-1">Time Saved</p>
                                                    <span className="text-2xl font-black text-blue-600 dark:text-blue-400 block">
                                                        {`${Math.floor(savedTimeMonths / 12)}y ${savedTimeMonths % 12}m`}
                                                    </span>
                                                </div>
                                                <div className="bg-white dark:bg-brand-surface p-5 rounded-xl border border-gray-200 dark:border-brand-border shadow-sm">
                                                    <p className="text-gray-500 dark:text-brand-muted text-xs font-bold uppercase tracking-wider mb-1">Total Savings</p>
                                                    <span className="text-2xl font-black text-gray-900 dark:text-brand-text block">{formatCurrency(totalSavings)}</span>
                                                </div>
                                            </div>

                                            {/* Chart Section */}
                                            <div className="bg-white dark:bg-brand-surface rounded-xl border border-gray-200 dark:border-brand-border p-6 shadow-sm">
                                                <div className="w-full h-80 chart-container">
                                                    <canvas ref={emiChartRef}></canvas>
                                                </div>
                                            </div>
                                        </main>
                                    </div>
                                </div>
                            )}

                            {/* PAGE 4: CONFIGURATION (SETTINGS) */}
                            {activePage === 'settings' && (
                                <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 dark:border-brand-border pb-6">
                                        <div>
                                            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Configuration</h2>
                                            <p className="text-gray-500 dark:text-brand-muted mt-1">Manage admin profile and site metadata.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <section>
                                            <h3 className="text-sm font-bold text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-4">Admin Profile</h3>
                                            <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-sm">
                                                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-mint to-brand-fern flex-shrink-0 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                                                    M
                                                </div>
                                                <div className="flex-1 space-y-4 w-full">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Username</label>
                                                            <input
                                                                type="text"
                                                                value="mrahulrahi"
                                                                disabled
                                                                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-brand-black/50 border border-gray-200 dark:border-brand-border text-gray-400 dark:text-brand-muted outline-none font-mono text-sm cursor-not-allowed"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Email</label>
                                                            <input
                                                                type="email"
                                                                defaultValue="admin@mrahulrahi.com"
                                                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => triggerToast("Profile settings saved (mock)")}
                                                    className="w-full md:w-auto px-4 py-2 bg-brand-mint text-brand-black font-medium rounded hover:bg-brand-fern hover:text-white transition-colors text-sm cursor-pointer"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </section>

                                        <section>
                                            <h3 className="text-sm font-bold text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-4">Site Metadata & SEO</h3>
                                            <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 space-y-4 shadow-sm">
                                                <div>
                                                    <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Site Title</label>
                                                    <input
                                                        type="text"
                                                        defaultValue="mrahulrahi | Portfolio & Tools"
                                                        className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Meta Description</label>
                                                    <textarea
                                                        rows={3}
                                                        defaultValue="Design system, UI libraries, and helpful developer tools by mrahulrahi."
                                                        className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Twitter URL</label>
                                                        <input
                                                            type="text"
                                                            placeholder="https://twitter.com/..."
                                                            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">GitHub URL</label>
                                                        <input
                                                            type="text"
                                                            placeholder="https://github.com/..."
                                                            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => triggerToast("Metadata updated (mock)")}
                                                    className="px-4 py-2 border border-gray-300 dark:border-brand-border text-gray-600 dark:text-brand-muted font-medium rounded hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight transition-colors text-sm cursor-pointer"
                                                >
                                                    Update Meta
                                                </button>
                                            </div>
                                        </section>

                                        <section>
                                            <h3 className="text-sm font-bold text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-4">System Preferences</h3>
                                            <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl overflow-hidden divide-y divide-gray-100 dark:divide-brand-border shadow-sm">
                                                <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-brand-black/30 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 rounded bg-purple-500/10 text-purple-500"><Bell className="w-4 h-4" /></div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900 dark:text-brand-text">Content Notifications</p>
                                                            <p className="text-xs text-gray-500 dark:text-brand-muted font-mono">Notify me when comments are posted.</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            id="notif-toggle"
                                                            defaultChecked
                                                            className="w-4 h-4 text-brand-mint border-gray-300 dark:border-brand-border rounded focus:ring-brand-mint accent-brand-mint"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            )}
                        </main>
                    </div>
                )}

                {/* Notification Toast */}
                <div className={`fixed bottom-8 right-8 bg-white dark:bg-brand-surface border border-brand-mint text-brand-mint px-6 py-3 rounded shadow-2xl transform transition-transform duration-300 flex items-center gap-2 z-[9999] font-mono text-sm ${showToast ? 'translate-y-0' : 'translate-y-24'}`}>
                    <CheckCircle className="w-4 h-4" />
                    <span>{toastMessage}</span>
                </div>
            </div>
            <div className="bg-brand-black text-brand-text font-sans antialiased selection:bg-brand-mint selection:text-brand-black">

                <div className="fixed inset-0 bg-grid-pattern opacity-[0.07] pointer-events-none z-0 bg-grid"></div>

                <nav className="fixed top-0 w-full z-50 glass border-b border-brand-border h-16 flex items-center px-6 lg:px-12 justify-between">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-8 h-8 bg-brand-mint/10 border border-brand-mint/30 rounded flex items-center justify-center text-brand-mint font-mono font-bold group-hover:bg-brand-mint group-hover:text-brand-black transition-all duration-300">m</div>
                        <span className="font-display font-bold text-lg tracking-wide">mrahulrahi</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-mono text-brand-muted">
                        <a href="#essence" className="hover:text-brand-mint transition-colors">01.Essence</a>
                        <a href="#palette" className="hover:text-brand-mint transition-colors">02.Palette</a>
                        <a href="#typography" className="hover:text-brand-mint transition-colors">03.Type</a>
                        <a href="#ui-lab" className="hover:text-brand-mint transition-colors">04.UI_Lab</a>
                        <a href="#prompts" className="hover:text-brand-mint transition-colors">05.Prompts</a>
                    </div>
                    <button onClick={() => copyLink()} className="border border-brand-border hover:border-brand-mint hover:text-brand-mint px-4 py-2 rounded text-xs font-mono transition-all">
                        Share_Board
                    </button>
                </nav>


                <main className="relative z-10 pt-24 px-6 lg:px-12 max-w-7xl mx-auto pb-20 space-y-24">


                    <section id="essence" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-xs font-mono text-brand-mint">
                                <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse"></span>
                                v1.0.0 System Online
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
                                Structured <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-mint to-brand-fern">Ecology</span>
                            </h1>
                            <p className="text-brand-muted text-lg max-w-xl leading-relaxed">
                                Bridging the gap between raw code structure and organic creativity. A design system for portfolio, UI libraries, and developer tools.
                            </p>
                            <div className="flex flex-wrap gap-3 pt-4">
                                <span className="px-3 py-1 border border-brand-border text-brand-muted text-sm font-mono rounded hover:border-brand-mint transition-colors cursor-default">#Systemic</span>
                                <span className="px-3 py-1 border border-brand-border text-brand-muted text-sm font-mono rounded hover:border-brand-mint transition-colors cursor-default">#Atomic</span>
                                <span className="px-3 py-1 border border-brand-border text-brand-muted text-sm font-mono rounded hover:border-brand-mint transition-colors cursor-default">#Terminal-Inspired</span>
                                <span className="px-3 py-1 border border-brand-border text-brand-muted text-sm font-mono rounded hover:border-brand-mint transition-colors cursor-default">#Future-Proof</span>
                            </div>
                        </div>
                        <div className="lg:col-span-5 h-64 lg:h-80 bg-brand-surface border border-brand-border rounded-lg p-6 relative overflow-hidden group">
                            <!-- Terminal Animation -->
                            <div className="absolute top-0 left-0 w-full h-6 bg-brand-border/30 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="mt-6 font-mono text-sm space-y-2">
                                <p className="text-brand-muted">$ init <span className="text-brand-mint">mrahulrahi</span></p>
                                <p className="text-brand-muted">> Loading modules...</p>
                                <p className="text-brand-muted">> Applying theme: <span className="text-brand-glow">Electric Flora</span></p>
                                <p className="text-brand-muted">> Optimizing grid...</p>
                                <p className="text-brand-text flex items-center gap-2">
                        > Status: <span id="typing-text" className="text-brand-mint"></span><span className="cursor-blink w-2 h-4 bg-brand-mint block"></span>
                                </p>
                            </div>
                            <!-- Decorative elements -->
                            <div className="absolute bottom-4 right-4 w-16 h-16 border-r border-b border-brand-mint/30 rounded-br-xl"></div>
                        </div>
                    </section>

                    <!-- 2. Color Palette -->
                    <section id="palette" className="space-y-8">
                        <div className="border-l-2 border-brand-mint pl-4">
                            <h2 className="text-3xl font-display font-bold">Electric Flora Palette</h2>
                            <p className="text-brand-muted mt-2">Monochromatic base with high-voltage green accents. Click to copy.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <!-- Cards generated by JS for easy management -->
                            <div className="palette-card group relative aspect-square rounded-xl border border-brand-border bg-brand-black flex flex-col justify-between p-4 cursor-pointer transition-all hover:border-brand-mint hover:shadow-[0_0_20px_rgba(0,220,130,0.1)] overflow-hidden" data-color="#09090B" data-name="Void Black">
                                <div className="absolute inset-0 bg-[#09090B]"></div>
                                <span className="relative z-10 text-xs font-mono bg-brand-black/50 backdrop-blur px-2 py-1 rounded text-white w-max border border-white/10">Main BG</span>
                                <div className="relative z-10 flex justify-between items-end">
                                    <span className="font-display font-bold text-white">Void Black</span>
                                    <span className="font-mono text-xs text-brand-muted">#09090B</span>
                                </div>
                            </div>

                            <div className="palette-card group relative aspect-square rounded-xl border border-brand-border bg-brand-surface flex flex-col justify-between p-4 cursor-pointer transition-all hover:border-brand-mint hover:shadow-[0_0_20px_rgba(0,220,130,0.1)] overflow-hidden" data-color="#18181B" data-name="Graphite">
                                <div className="absolute inset-0 bg-[#18181B]"></div>
                                <span className="relative z-10 text-xs font-mono bg-brand-black/50 backdrop-blur px-2 py-1 rounded text-white w-max border border-white/10">Surface</span>
                                <div className="relative z-10 flex justify-between items-end">
                                    <span className="font-display font-bold text-white">Graphite</span>
                                    <span className="font-mono text-xs text-brand-muted">#18181B</span>
                                </div>
                            </div>

                            <div className="palette-card group relative aspect-square rounded-xl border border-brand-border bg-brand-mint flex flex-col justify-between p-4 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,220,130,0.4)] overflow-hidden" data-color="#00DC82" data-name="Electric Mint">
                                <div className="absolute inset-0 bg-[#00DC82]"></div>
                                <span className="relative z-10 text-xs font-mono bg-black/20 backdrop-blur px-2 py-1 rounded text-black w-max border border-black/10 font-bold">Accent</span>
                                <div className="relative z-10 flex justify-between items-end text-brand-black">
                                    <span className="font-display font-bold">Electric Mint</span>
                                    <span className="font-mono text-xs font-bold">#00DC82</span>
                                </div>
                            </div>

                            <div className="palette-card group relative aspect-square rounded-xl border border-brand-border bg-brand-fern flex flex-col justify-between p-4 cursor-pointer transition-all hover:border-brand-mint hover:shadow-[0_0_20px_rgba(4,120,87,0.3)] overflow-hidden" data-color="#047857" data-name="Deep Fern">
                                <div className="absolute inset-0 bg-[#047857]"></div>
                                <span className="relative z-10 text-xs font-mono bg-black/20 backdrop-blur px-2 py-1 rounded text-white w-max border border-white/10">Secondary</span>
                                <div className="relative z-10 flex justify-between items-end text-white">
                                    <span className="font-display font-bold">Deep Fern</span>
                                    <span className="font-mono text-xs opacity-80">#047857</span>
                                </div>
                            </div>

                            <div className="palette-card group relative aspect-square rounded-xl border border-brand-border bg-brand-glow flex flex-col justify-between p-4 cursor-pointer transition-all hover:border-brand-mint hover:shadow-[0_0_20px_rgba(187,247,208,0.3)] overflow-hidden" data-color="#BBF7D0" data-name="Lime Glow">
                                <div className="absolute inset-0 bg-[#BBF7D0]"></div>
                                <span className="relative z-10 text-xs font-mono bg-brand-black/10 backdrop-blur px-2 py-1 rounded text-brand-black w-max border border-black/5">Highlight</span>
                                <div className="relative z-10 flex justify-between items-end text-brand-black">
                                    <span className="font-display font-bold">Lime Glow</span>
                                    <span className="font-mono text-xs font-bold">#BBF7D0</span>
                                </div>
                            </div>
                        </div>
                        <!-- Notification toast container -->
                        <div id="toast" className="fixed bottom-8 right-8 bg-brand-surface border border-brand-mint text-brand-mint px-6 py-3 rounded shadow-2xl transform translate-y-24 transition-transform duration-300 flex items-center gap-2 z-50 font-mono text-sm">
                            <i data-lucide="check-circle" className="w-4 h-4"></i>
                            <span id="toast-msg">Copied to clipboard</span>
                        </div>
                    </section>

                    <!-- 3. Typography System -->
                    <section id="typography" className="space-y-8">
                        <div className="border-l-2 border-brand-mint pl-4">
                            <h2 className="text-3xl font-display font-bold">Typography Stack</h2>
                            <p className="text-brand-muted mt-2">Balancing technical precision with readability.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <!-- Display Font -->
                            <div className="bg-brand-surface border border-brand-border rounded-xl p-8 hover:border-brand-muted transition-colors">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-brand-mint font-mono text-sm mb-1">Headings / Display</h3>
                                        <p className="text-2xl font-display font-bold">Space Grotesk</p>
                                    </div>
                                    <span className="text-brand-muted font-mono text-xs border border-brand-border px-2 py-1 rounded">Aa</span>
                                </div>
                                <p className="font-display text-4xl font-bold leading-tight mb-4">
                                    Technical Brutalism for Modern UI
                                </p>
                                <p className="font-display text-brand-muted text-sm">
                                    ABCDEFGHIJKLMNOPQRSTUVWXYZ <br>
                                        abcdefghijklmnopqrstuvwxyz <br>
                                            0123456789
                                        </p>
                                    </div>

                                    <!-- Body Font -->
                                    <div className="bg-brand-surface border border-brand-border rounded-xl p-8 hover:border-brand-muted transition-colors">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h3 className="text-brand-mint font-mono text-sm mb-1">Body Copy</h3>
                                                <p className="text-2xl font-sans font-medium">Inter</p>
                                            </div>
                                            <span className="text-brand-muted font-mono text-xs border border-brand-border px-2 py-1 rounded">Aa</span>
                                        </div>
                                        <p className="font-sans text-base leading-relaxed text-brand-muted mb-4">
                                            The theme bridges the gap between raw code (structure) and organic growth (creativity). It feels engineered but alive. This text is set in Inter for maximum legibility on screens.
                                        </p>
                                        <p className="font-sans text-brand-muted text-sm opacity-60">
                                            Regular 400 · Medium 500 · SemiBold 600
                                        </p>
                                    </div>

                                    <!-- Mono Font -->
                                    <div className="col-span-1 lg:col-span-2 bg-brand-black border border-brand-border rounded-xl p-8 hover:border-brand-mint transition-colors">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h3 className="text-brand-mint font-mono text-sm mb-1">Code / Technical</h3>
                                                <p className="text-2xl font-mono">JetBrains Mono</p>
                                            </div>
                                            <span className="text-brand-muted font-mono text-xs border border-brand-border px-2 py-1 rounded">{ }</span>
                                        </div>
                                        <div className="bg-[#1e1e1e] p-4 rounded border-l-2 border-brand-mint font-mono text-sm overflow-x-auto">
                                            <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">BrandIdentity</span> <span className="text-[#56b6c2]">=</span> {<br>
                                                &nbsp;&nbsp;theme: <span className="text-[#98c379]">'Structured Ecology'</span>,<br>
                                                    &nbsp;&nbsp;version: <span className="text-[#d19a66]">1.0</span>,<br>
                                                        &nbsp;&nbsp;init: <span className="text-[#c678dd]">function</span>() {<br>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#e06c75]">return</span> <span className="text-[#98c379]">"Ready"</span>;<br>
                        &nbsp;&nbsp;}<br>
                        };
                                                                </div>
                                                            </div>
                                                        </div>
        </section>

                                                    <!-- 4. UI Lab (Components) -->
                                                    <section id="ui-lab" className="space-y-8">
                                                        <div className="border-l-2 border-brand-mint pl-4">
                                                            <h2 className="text-3xl font-display font-bold">UI Lab</h2>
                                                            <p className="text-brand-muted mt-2">Component behavior and the Bento grid system.</p>
                                                        </div>

                                                        <!-- Bento Grid Demo -->
                                                        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-3 gap-4 h-[600px]">

                                                            <!-- Card 1: Primary Action -->
                                                            <div className="col-span-1 md:col-span-2 row-span-2 bg-brand-surface border border-brand-border rounded-xl p-6 relative group overflow-hidden">
                                                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                                                    <i data-lucide="arrow-up-right" className="text-brand-mint"></i>
                                                                </div>
                                                                <h3 className="font-display font-bold text-xl mb-4">Interactive Elements</h3>
                                                                <div className="flex flex-col gap-4 items-start">
                                                                    <button className="px-6 py-2 bg-brand-mint text-brand-black font-medium rounded hover:bg-brand-mint/90 transition-colors w-full md:w-auto font-mono text-sm">
                                                                        Primary_Action
                                                                    </button>
                                                                    <button className="px-6 py-2 bg-transparent border border-brand-border text-brand-text font-medium rounded hover:border-brand-mint hover:text-brand-mint transition-colors w-full md:w-auto font-mono text-sm">
                                                                        Secondary_Action
                                                                    </button>
                                                                    <div className="flex items-center gap-2 group/link cursor-pointer">
                                                                        <span className="text-brand-mint font-mono text-sm group-hover/link:underline">Read Documentation</span>
                                                                        <i data-lucide="chevron-right" className="w-4 h-4 text-brand-mint transition-transform group-hover/link:translate-x-1"></i>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <!-- Card 2: Stats (Glassmorphism) -->
                                                            <div className="col-span-1 md:col-span-2 row-span-1 glass rounded-xl p-6 flex items-center justify-between border border-brand-border relative overflow-hidden">
                                                                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brand-mint/10 blur-2xl rounded-full"></div>
                                                                <div>
                                                                    <p className="text-brand-muted text-sm font-mono">System Status</p>
                                                                    <p className="text-3xl font-mono font-bold text-brand-mint">98.4%</p>
                                                                </div>
                                                                <div className="h-12 w-32 chart-container">
                                                                    <canvas id="miniChart"></canvas>
                                                                </div>
                                                            </div>

                                                            
                                                            <div className="col-span-1 row-span-1 bg-brand-black border border-brand-border rounded-xl p-6 flex flex-col justify-center group hover:border-brand-muted transition-colors">
                                                                <label className="text-xs font-mono text-brand-muted mb-2 group-focus-within:text-brand-mint transition-colors">Command Input</label>
                                                                <div className="flex items-center border-b border-brand-border group-focus-within:border-brand-mint transition-colors py-1">
                                                                    <span className="text-brand-mint mr-2">></span>
                                                                    <input type="text" placeholder="Type..." className="bg-transparent w-full outline-none text-brand-text font-mono text-sm placeholder-brand-muted/50" />
                                                                </div>
                                                            </div>

                                                         
                                                            <div className="col-span-1 row-span-2 bg-brand-surface border border-brand-border rounded-xl p-6">
                                                                <h3 className="font-display font-bold text-lg mb-4">Modules</h3>
                                                                <ul className="space-y-3">
                                                                    <li className="flex items-center gap-3 text-sm text-brand-muted hover:text-brand-text transition-colors cursor-default">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-mint"></div>
                                                                        <span>Layout_Grid</span>
                                                                    </li>
                                                                    <li className="flex items-center gap-3 text-sm text-brand-muted hover:text-brand-text transition-colors cursor-default">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-fern"></div>
                                                                        <span>Typography</span>
                                                                    </li>
                                                                    <li className="flex items-center gap-3 text-sm text-brand-muted hover:text-brand-text transition-colors cursor-default">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-border"></div>
                                                                        <span>Icons</span>
                                                                    </li>
                                                                    <li className="flex items-center gap-3 text-sm text-brand-muted hover:text-brand-text transition-colors cursor-default">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-border"></div>
                                                                        <span>Animations</span>
                                                                    </li>
                                                                </ul>
                                                            </div>

                                                            <!-- Card 5: Logo Concepts Visualization -->
                                                            <div className="col-span-1 md:col-span-2 row-span-1 bg-brand-surface border border-brand-border rounded-xl p-6 flex items-center justify-around">
                                                                <!-- Concept A: Monogram Stack -->
                                                                <div className="group text-center">
                                                                    <div className="w-12 h-12 border-2 border-brand-mint rounded-lg flex items-center justify-center relative mb-2 transition-all group-hover:bg-brand-mint group-hover:text-brand-black">
                                                                        <span className="font-display font-bold text-xl leading-none">M</span>
                                                                        <div className="absolute -right-1 -bottom-1 w-2 h-2 bg-brand-black border border-brand-mint"></div>
                                                                    </div>
                                                                    <p className="text-[10px] font-mono text-brand-muted uppercase">Monogram</p>
                                                                </div>

                                                                <!-- Concept B: Terminal Cursor -->
                                                                <div className="group text-center">
                                                                    <div className="w-12 h-12 flex items-center justify-center mb-2">
                                                                        <span className="font-display font-bold text-2xl text-white">m<span className="text-brand-mint animate-pulse">_</span></span>
                                                                    </div>
                                                                    <p className="text-[10px] font-mono text-brand-muted uppercase">Terminal</p>
                                                                </div>

                                                                <!-- Concept C: Bracket Node -->
                                                                <div className="group text-center">
                                                                    <div className="w-12 h-12 relative flex items-center justify-center mb-2">
                                                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-brand-mint">
                                                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                                                        </svg>
                                                                    </div>
                                                                    <p className="text-[10px] font-mono text-brand-muted uppercase">Node</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>

                                                    <!-- 5. Prompts (Tool) -->
                                                    <section id="prompts" className="space-y-8">
                                                        <div className="border-l-2 border-brand-mint pl-4 flex justify-between items-end">
                                                            <div>
                                                                <h2 className="text-3xl font-display font-bold">Generator Prompts</h2>
                                                                <p className="text-brand-muted mt-2">Source material for AI asset generation.</p>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-6">
                                                            <!-- Prompt 1 -->
                                                            <div className="bg-[#0d0d0d] border border-brand-border rounded-lg overflow-hidden">
                                                                <div className="bg-brand-surface border-b border-brand-border px-4 py-2 flex justify-between items-center">
                                                                    <span className="text-xs font-mono text-brand-muted">UI_Mockup.txt</span>
                                                                    <button onclick="copyToClipboard('prompt-ui')" className="text-xs font-mono text-brand-mint hover:text-white flex items-center gap-1">
                                                                        <i data-lucide="copy" className="w-3 h-3"></i> Copy
                                                                    </button>
                                                                </div>
                                                                <div className="p-4 font-mono text-sm text-brand-muted leading-relaxed" id="prompt-ui">
                                                                    "High fidelity UI design for a personal portfolio and developer tools website named 'mrahulrahi'. Dark mode aesthetic, matte black background with subtle noise texture. Accent color is electric mint green (#00DC82). Layout uses a bento-grid style. Typography is a mix of geometric sans-serif and coding monospace fonts. Visual elements include floating code snippets, glassmorphism cards, and neon green thin border lines. Tech-minimalist, clean, Dribbble trending, 4k, vector style."
                                                                </div>
                                                            </div>

                                                            <!-- Prompt 2 -->
                                                            <div className="bg-[#0d0d0d] border border-brand-border rounded-lg overflow-hidden">
                                                                <div className="bg-brand-surface border-b border-brand-border px-4 py-2 flex justify-between items-center">
                                                                    <span className="text-xs font-mono text-brand-muted">Logo_Concept.txt</span>
                                                                    <button onclick="copyToClipboard('prompt-logo')" className="text-xs font-mono text-brand-mint hover:text-white flex items-center gap-1">
                                                                        <i data-lucide="copy" className="w-3 h-3"></i> Copy
                                                                    </button>
                                                                </div>
                                                                <div className="p-4 font-mono text-sm text-brand-muted leading-relaxed" id="prompt-logo">
                                                                    "Minimalist tech logo for brand 'mrahulrahi'. The logo should combine the letter 'M' with coding symbols like brackets or a terminal cursor. Flat vector design. Color scheme: Neon Green and Dark Grey. Modern, geometric, suitable for a GitHub profile picture or app icon. White background."
                                                                </div>
                                                            </div>

                                                            <!-- Prompt 3 -->
                                                            <div className="bg-[#0d0d0d] border border-brand-border rounded-lg overflow-hidden">
                                                                <div className="bg-brand-surface border-b border-brand-border px-4 py-2 flex justify-between items-center">
                                                                    <span className="text-xs font-mono text-brand-muted">Brand_Texture.txt</span>
                                                                    <button onclick="copyToClipboard('prompt-texture')" className="text-xs font-mono text-brand-mint hover:text-white flex items-center gap-1">
                                                                        <i data-lucide="copy" className="w-3 h-3"></i> Copy
                                                                    </button>
                                                                </div>
                                                                <div className="p-4 font-mono text-sm text-brand-muted leading-relaxed" id="prompt-texture">
                                                                    "Abstract 3D background for a developer brand identity. Dark obsidian geometric shapes floating in a void. Illuminated by electric mint green laser lights. Cyberpunk meets clean corporate memphis design. Matte finish, soft shadows, high contrast, 8k resolution."
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>

                                                    <!-- Footer -->
                                                    <footer className="border-t border-brand-border pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-4">
                                                        <div className="text-sm text-brand-muted font-mono">
                                                            © 2025 mrahulrahi. All systems nominal.
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <div className="w-8 h-8 rounded bg-brand-surface border border-brand-border flex items-center justify-center hover:border-brand-mint transition-colors cursor-pointer">
                                                                <i data-lucide="github" className="w-4 h-4 text-brand-muted"></i>
                                                            </div>
                                                            <div className="w-8 h-8 rounded bg-brand-surface border border-brand-border flex items-center justify-center hover:border-brand-mint transition-colors cursor-pointer">
                                                                <i data-lucide="twitter" className="w-4 h-4 text-brand-muted"></i>
                                                            </div>
                                                            <div className="w-8 h-8 rounded bg-brand-surface border border-brand-border flex items-center justify-center hover:border-brand-mint transition-colors cursor-pointer">
                                                                <i data-lucide="figma" className="w-4 h-4 text-brand-muted"></i>
                                                            </div>
                                                        </div>
                                                    </footer>

                                                </main>


                                            </div>
                                            </>
                                        );
}
