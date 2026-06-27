'use client'
// Workspace update tracking checkpoint
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import ListGroup from "@/app/components/project/ListGroup";
import Counter from "@/app/components/project/Counter";
import ListItemTable from "@/app/components/project/ListItemTable";
import { FaRegHeart, FaHeart, FaRegFaceGrinHearts, FaHeartPulse } from "react-icons/fa6";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] })

// ─── Types ────────────────────────────────────────────────────────────────────

interface EmiState {
    loanAmount: number
    rate: number
    tenure: number
    increase: number
    extraEmi: boolean
}

interface YearlyDataPoint {
    year: number
    balance: number
}

interface AmortizationResult {
    totalMonths: number
    totalInterest: number
    totalPaid: number
    yearlyData: YearlyDataPoint[]
    initialEmi: number
}

type ViewName = 'styleguide' | 'app'
type AppPage = 'dashboard' | 'portfolio' | 'emi' | 'settings'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatCurrency = (val: number): string =>
    new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(val)

const calculateEMI = (p: number, r: number, n: number): number => {
    const monthlyRate = r / 12 / 100
    return (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
}

const runAmortization = (
    principal: number,
    annualRate: number,
    tenureYears: number,
    yearlyIncrease: number,
    extraEmiPerYear: boolean
): AmortizationResult => {
    let balance = principal
    const monthlyRate = annualRate / 12 / 100
    let currentEmi = calculateEMI(principal, annualRate, tenureYears * 12)
    const initialEmi = currentEmi
    let totalInterest = 0
    let totalPaid = 0
    let month = 0
    const yearlyData: YearlyDataPoint[] = []

    while (balance > 1 && month < 600) {
        month++
        const interestForMonth = balance * monthlyRate
        let principalForMonth = currentEmi - interestForMonth
        if (principalForMonth > balance) principalForMonth = balance
        balance -= principalForMonth
        totalInterest += interestForMonth
        totalPaid += principalForMonth + interestForMonth

        if (extraEmiPerYear && month % 12 === 0 && balance > 0) {
            let extraAmt = currentEmi
            if (extraAmt > balance) extraAmt = balance
            balance -= extraAmt
            totalPaid += extraAmt
        }

        if (month % 12 === 0 || balance <= 1) {
            const yearNum = Math.ceil(month / 12)
            yearlyData.push({ year: yearNum, balance: Math.max(0, balance) })
            if (month % 12 === 0) currentEmi = currentEmi * (1 + yearlyIncrease / 100)
        }

        if (balance <= 1) break
    }

    return { totalMonths: month, totalInterest, totalPaid, yearlyData, initialEmi }
}

// ─── Component ────────────────────────────────────────────────────────────────

const StyleGuidePage: React.FC = () => {
    // ── View / nav state ────────────────────────────────────────────────────────
    const [activeView, setActiveView] = useState<ViewName>('styleguide')
    const [activePage, setActivePage] = useState<AppPage>('dashboard')

    // ── Theme ───────────────────────────────────────────────────────────────────
    const [isDark, setIsDark] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('color-theme') !== 'light'
        }
        return true
    })

    useEffect(() => {
        const html = document.documentElement
        if (isDark) {
            html.classList.add('dark')
            localStorage.setItem('color-theme', 'dark')
        } else {
            html.classList.remove('dark')
            localStorage.setItem('color-theme', 'light')
        }
    }, [isDark])

    // ── Toast ───────────────────────────────────────────────────────────────────
    const [toastMsg, setToastMsg] = useState<string>('')
    const [toastVisible, setToastVisible] = useState<boolean>(false)
    const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const showToast = useCallback((message: string): void => {
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
        setToastMsg(message)
        setToastVisible(true)
        toastTimerRef.current = setTimeout(() => setToastVisible(false), 3000)
    }, [])

    // ── Copy helpers ─────────────────────────────────────────────────────────────
    const copyLink = (): void => {
        navigator.clipboard.writeText(window.location.href).then(() => showToast('Link copied to clipboard'))
    }

    const copyToClipboard = (elementId: string): void => {
        const el = document.getElementById(elementId)
        if (!el) return
        navigator.clipboard.writeText(el.innerText).then(() => showToast('Prompt copied to clipboard'))
    }

    const copyColor = (color: string, name: string): void => {
        navigator.clipboard.writeText(color).then(() => showToast(`${name} (${color}) copied`))
    }

    // ── Typing effect ────────────────────────────────────────────────────────────
    const typingRef = useRef<HTMLSpanElement | null>(null)

    useEffect(() => {
        const words = ['Ready', 'Stable', 'Optimized', 'Growing']
        let wordIndex = 0
        let cancelled = false

        const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

        const runTyping = async (): Promise<void> => {
            while (!cancelled) {
                const word = words[wordIndex % words.length]
                const el = typingRef.current
                if (!el) break
                el.innerText = ''

                for (let i = 0; i < word.length && !cancelled; i++) {
                    el.innerText += word.charAt(i)
                    await sleep(150)
                }

                await sleep(2000)

                while (el.innerText.length > 0 && !cancelled) {
                    el.innerText = el.innerText.slice(0, -1)
                    await sleep(50)
                }

                wordIndex++
            }
        }

        runTyping()
        return () => { cancelled = true }
    }, [])

    // ── Charts ────────────────────────────────────────────────────────────────────
    const dashboardChartRef = useRef<HTMLCanvasElement | null>(null)
    const dashboardChartInstance = useRef<any>(null)

    const miniChartRef = useRef<HTMLCanvasElement | null>(null)

    const emiChartRef = useRef<HTMLCanvasElement | null>(null)
    const emiChartInstance = useRef<any>(null)

    // Mini chart (static, rendered once on mount)
    useEffect(() => {
        const Chart = (window as any).Chart
        if (!Chart || !miniChartRef.current) return

        const ctx = miniChartRef.current.getContext('2d')
        if (!ctx) return

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                datasets: [{
                    data: [65, 78, 72, 85, 82, 90, 98],
                    borderColor: '#00DC82',
                    borderWidth: 2,
                    backgroundColor: (context: any) => {
                        const c = context.chart.ctx
                        const gradient = c.createLinearGradient(0, 0, 0, 100)
                        gradient.addColorStop(0, 'rgba(0, 220, 130, 0.2)')
                        gradient.addColorStop(1, 'rgba(0, 220, 130, 0)')
                        return gradient
                    },
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                scales: {
                    x: { display: false },
                    y: { display: false, min: 50 },
                },
                interaction: { intersect: false, mode: 'index' },
            },
        })
    }, [])

    // Dashboard chart (init when app view is opened)
    const initDashboardChart = useCallback((): void => {
        const Chart = (window as any).Chart
        if (!Chart || !dashboardChartRef.current || dashboardChartInstance.current) return

        const ctx = dashboardChartRef.current.getContext('2d')
        if (!ctx) return

        const gridColor = isDark ? '#27272A' : '#E5E7EB'
        const textColor = isDark ? '#A1A1AA' : '#6B7280'

        dashboardChartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Visitors',
                    data: [120, 190, 300, 500, 220, 300, 450],
                    borderColor: '#00DC82',
                    backgroundColor: (context: any) => {
                        const c = context.chart.ctx
                        const gradient = c.createLinearGradient(0, 0, 0, 300)
                        gradient.addColorStop(0, 'rgba(0, 220, 130, 0.2)')
                        gradient.addColorStop(1, 'rgba(0, 220, 130, 0)')
                        return gradient
                    },
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#09090B',
                    pointBorderColor: '#00DC82',
                    pointRadius: 4,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false }, ticks: { color: textColor, font: { family: 'JetBrains Mono' } } },
                    y: { grid: { color: gridColor, borderDash: [4, 4] }, ticks: { color: textColor, font: { family: 'JetBrains Mono' } } },
                },
            },
        })
    }, [isDark])

    // Update chart themes when dark mode changes
    useEffect(() => {
        const gridColor = isDark ? '#27272A' : '#E5E7EB'
        const textColor = isDark ? '#A1A1AA' : '#6B7280'

        const updateChartTheme = (chart: any): void => {
            if (!chart) return
            chart.options.scales.y.grid.color = gridColor
            chart.options.scales.x.ticks.color = textColor
            chart.options.scales.y.ticks.color = textColor
            chart.update()
        }

        updateChartTheme(dashboardChartInstance.current)
        updateChartTheme(emiChartInstance.current)
    }, [isDark])

    // ── EMI state ────────────────────────────────────────────────────────────────
    const [emiState, setEmiState] = useState<EmiState>({
        loanAmount: 5000000,
        rate: 8.5,
        tenure: 20,
        increase: 10,
        extraEmi: true,
    })

    const [emiResults, setEmiResults] = useState({
        standardEmi: 0,
        smartEmi: 0,
        interestSaved: '₹0',
        timeSaved: '0y 0m',
        totalSaved: '₹0',
    })

    const updateEMIChart = useCallback(
        (normalData: YearlyDataPoint[], smartData: YearlyDataPoint[], loanAmount: number): void => {
            const Chart = (window as any).Chart
            if (!Chart || !emiChartRef.current) return

            const ctx = emiChartRef.current.getContext('2d')
            if (!ctx) return

            const maxYear = Math.max(normalData.length, smartData.length)
            const labels = Array.from({ length: maxYear + 1 }, (_, i) => `Yr ${i}`)

            const toPoints = (data: YearlyDataPoint[]) =>
                labels.map((_, i) => {
                    if (i === 0) return loanAmount
                    const d = data.find((x) => x.year === i)
                    return d ? d.balance : i > (data[data.length - 1]?.year ?? 0) ? 0 : null
                })

            const normPoints = toPoints(normalData)
            const smartPoints = toPoints(smartData)

            const gridColor = isDark ? '#27272A' : '#E5E7EB'
            const textColor = isDark ? '#A1A1AA' : '#6B7280'

            if (emiChartInstance.current) {
                emiChartInstance.current.data.labels = labels
                emiChartInstance.current.data.datasets[0].data = normPoints
                emiChartInstance.current.data.datasets[1].data = smartPoints
                emiChartInstance.current.options.scales.x.ticks.color = textColor
                emiChartInstance.current.options.scales.y.ticks.color = textColor
                emiChartInstance.current.options.scales.y.grid.color = gridColor
                emiChartInstance.current.update()
            } else {
                emiChartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels,
                        datasets: [
                            {
                                label: 'Standard Loan',
                                data: normPoints,
                                borderColor: '#9CA3AF',
                                backgroundColor: 'rgba(156, 163, 175, 0.1)',
                                borderWidth: 2,
                                fill: true,
                                tension: 0.4,
                                pointRadius: 0,
                            },
                            {
                                label: 'Smart Plan',
                                data: smartPoints,
                                borderColor: '#00DC82',
                                backgroundColor: 'rgba(0, 220, 130, 0.2)',
                                borderWidth: 2,
                                fill: true,
                                tension: 0.4,
                                pointRadius: 0,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: { mode: 'index', intersect: false },
                        plugins: {
                            legend: { display: true, labels: { color: textColor, font: { family: 'Inter' } } },
                        },
                        scales: {
                            x: { grid: { display: false }, ticks: { color: textColor, font: { family: 'JetBrains Mono' } } },
                            y: {
                                grid: { color: gridColor, borderDash: [4, 4] },
                                ticks: {
                                    color: textColor,
                                    font: { family: 'JetBrains Mono' },
                                    callback: (val: number) => `₹${val / 100000}L`,
                                },
                            },
                        },
                    },
                })
            }
        },
        [isDark]
    )

    const updateEMIView = useCallback(
        (state: EmiState): void => {
            const normal = runAmortization(state.loanAmount, state.rate, state.tenure, 0, false)
            const smart = runAmortization(state.loanAmount, state.rate, state.tenure, state.increase, state.extraEmi)

            const savedInt = normal.totalInterest - smart.totalInterest
            const timeSavedM = normal.totalMonths - smart.totalMonths
            const totalSaved = normal.totalPaid - smart.totalPaid

            setEmiResults({
                standardEmi: normal.initialEmi,
                smartEmi: smart.initialEmi,
                interestSaved: formatCurrency(savedInt),
                timeSaved: `${Math.floor(timeSavedM / 12)}y ${timeSavedM % 12}m`,
                totalSaved: formatCurrency(totalSaved),
            })

            updateEMIChart(normal.yearlyData, smart.yearlyData, state.loanAmount)
        },
        [updateEMIChart]
    )

    // Recalculate whenever EMI state changes
    useEffect(() => {
        if (activePage === 'emi') {
            updateEMIView(emiState)
        }
    }, [emiState, activePage, updateEMIView])

    // ── View switching ────────────────────────────────────────────────────────────
    const handleSwitchView = (view: ViewName): void => {
        setActiveView(view)
        if (view === 'app') initDashboardChart()
    }

    const handleSwitchPage = (page: AppPage): void => {
        setActivePage(page)
        if (page === 'emi') updateEMIView(emiState)
        if (page === 'dashboard') setTimeout(initDashboardChart, 0)
    }

    const breadcrumbMap: Record<AppPage, string> = {
        dashboard: 'Dashboard',
        portfolio: 'Portfolio Manager',
        emi: 'Smart EMI Tool',
        settings: 'Configuration',
    }

    // ── Palette data ──────────────────────────────────────────────────────────────
    const paletteColors: { color: string; name: string; label: string; bg: string; textClass: string }[] = [
        { color: '#09090B', name: 'Void Black', label: 'Main BG', bg: 'bg-brand-black', textClass: 'text-white' },
        { color: '#18181B', name: 'Graphite', label: 'Surface', bg: 'bg-brand-surface', textClass: 'text-white' },
        { color: '#00DC82', name: 'Electric Mint', label: 'Accent', bg: 'bg-brand-mint', textClass: 'text-brand-black' },
        { color: '#047857', name: 'Deep Fern', label: 'Secondary', bg: 'bg-brand-fern', textClass: 'text-white' },
        { color: '#BBF7D0', name: 'Lime Glow', label: 'Highlight', bg: 'bg-brand-glow', textClass: 'text-brand-black' },
    ]

    const [users, setUsers] = useState<any[]>([]);
    const [user, setUser] = useState<any>({});
    let [likeBtn1, setLikedBtn1] = useState({ title: 'Like', icon: <FaRegHeart /> });
    let [likeBtn2, setLikedBtn2] = useState({ title: 'Follow', icon: <SlUserFollow /> });

    // Fetching data when component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' });
            const data = await res.json();
            setUsers(data);
        };

        fetchUsers();
    }, []); // Empty dependency array means this effect runs only once on mount

    const handleSelectUser = (item: any) => {
        console.log("Selected User:", item);
        setUser(item); // Set the selected user
    };

    function handleLikeItem1() {
        setLikedBtn1(
            likeBtn1.title === 'Like'
                ? { title: 'Liked', icon: <FaHeart /> }
                : { title: 'Like', icon: <FaRegHeart /> }
        );
    }

    function handleLikeItem2() {
        setLikedBtn2(
            likeBtn2.title === 'Follow'
                ? { title: 'Unfollow', icon: <SlUserUnfollow /> }
                : { title: 'Follow', icon: <SlUserFollow /> }
        );
    }

    // ── Render ────────────────────────────────────────────────────────────────────
    return (
        <div className={`${inter.className} ${spaceGrotesk.className} ${jetBrainsMono.className}`}>
            <main
                className="bg-gray-50 text-gray-900 dark:bg-brand-black dark:text-brand-text font-sans antialiased selection:bg-brand-mint selection:text-brand-black transition-colors duration-300 overflow-x-hidden">

                {/* <!-- Background Grid Layout --> */}
                <div
                    className="fixed inset-0 bg-grid-pattern opacity-[0.4] dark:opacity-[0.07] pointer-events-none z-0 bg-grid transition-opacity duration-300">
                </div>

                {/* <!-- Top Navigation --> */}
                <nav
                    className="fixed top-0 w-full z-50 glass border-b border-brand-border dark:border-brand-border h-16 flex items-center px-6 lg:px-12 justify-between transition-colors duration-300">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
                        <div
                            className="w-8 h-8 bg-brand-mint/10 border border-brand-mint/30 rounded flex items-center justify-center text-brand-mint font-mono font-bold transition-all duration-300">
                            m</div>
                        <span
                            className="font-display font-bold text-lg tracking-wide text-gray-900 dark:text-brand-text">mrahulrahi</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div
                            className="w-8 h-8 bg-brand-mint/10 border border-brand-mint/30 rounded flex items-center justify-center text-brand-mint font-mono font-bold group-hover:bg-brand-mint group-hover:text-brand-black transition-all duration-300">
                            m</div>
                        <span className="font-display font-bold text-lg tracking-wide">mrahulrahi</span>
                    </div>

                    {/* <!-- View Switcher (Center) --> */}
                    <div
                        className="hidden md:flex bg-gray-100 dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-lg p-1">
                        <button onClick={() => { }} id="btn-styleguide"
                            className="px-4 py-1.5 rounded text-sm font-medium transition-all bg-white dark:bg-brand-surfaceHighlight shadow-sm text-gray-900 dark:text-white">Style
                            Guide</button>
                        <button onClick={() => { }} id="btn-app"
                            className="px-4 py-1.5 rounded text-sm font-medium transition-all text-gray-500 dark:text-brand-muted hover:text-gray-900 dark:hover:text-white">Admin
                            CMS</button>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* <!-- Theme Toggle --> */}
                        <button id="theme-toggle"
                            className="p-2 rounded-full border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted hover:text-brand-mint hover:border-brand-mint transition-all">
                            <i data-lucide="sun" className="w-4 h-4 hidden dark:block"></i>
                            <i data-lucide="moon" className="w-4 h-4 block dark:hidden"></i>
                        </button>

                        <button onClick={() => { }}
                            className="hidden sm:block border border-gray-200 dark:border-brand-border hover:border-brand-mint hover:text-brand-mint text-gray-500 dark:text-brand-muted px-4 py-2 rounded text-xs font-mono transition-all">
                            Share
                        </button>
                    </div>
                    <button onClick={() => { }}
                        className="border border-brand-border hover:border-brand-mint hover:text-brand-mint px-4 py-2 rounded text-xs font-mono transition-all">
                        Share_Board
                    </button>
                </nav>

                {/* <!-- VIEW 1: STYLE GUIDE (Static Brand Assets) --> */}
                <main id="view-styleguide"
                    className="relative z-10 pt-24 px-6 lg:px-12 max-w-8xl mx-auto pb-20 space-y-24 transition-opacity duration-300">

                    <div className="">
                        <div
                            className="flex flex-wrap gap-4 md:gap-8 text-sm font-mono text-gray-500 dark:text-brand-muted border-b border-gray-200 dark:border-brand-border pb-6 mb-6">
                            <a href="#essence" className="hover:text-brand-mint transition-colors">01.Essence</a>
                            <a href="#palette" className="hover:text-brand-mint transition-colors">02.Palette</a>
                            <a href="#typography" className="hover:text-brand-mint transition-colors">03.Type</a>
                            <a href="#ui-lab" className="hover:text-brand-mint transition-colors">04.UI_Lab</a>
                            <a href="#prompts" className="hover:text-brand-mint transition-colors">05.Prompts</a>
                        </div>

                        <div className="hidden md:flex items-center gap-8 text-sm font-mono text-brand-muted">
                            <a href="#essence" className="hover:text-brand-mint transition-colors">01.Essence</a>
                            <a href="#palette" className="hover:text-brand-mint transition-colors">02.Palette</a>
                            <a href="#typography" className="hover:text-brand-mint transition-colors">03.Type</a>
                            <a href="#ui-lab" className="hover:text-brand-mint transition-colors">04.UI_Lab</a>
                            <a href="#prompts" className="hover:text-brand-mint transition-colors">05.Prompts</a>
                        </div>
                    </div>

                    {/* <!-- 1. Hero Section --> */}
                    <section id="essence" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 space-y-6">
                            <div
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border text-xs font-mono text-brand-mint shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse"></span>
                                v1.0.0 System Online
                            </div>
                            <h1
                                className="text-5xl lg:text-7xl font-display font-bold leading-tight text-gray-900 dark:text-brand-text">
                                Structured <br />
                                <span
                                    className="text-transparent bg-clip-text bg-linear-to-r from-brand-mint to-brand-fern">Ecology</span>
                            </h1>
                            <p className="text-gray-600 dark:text-brand-muted text-lg max-w-xl leading-relaxed">
                                Bridging the gap between raw code structure and organic creativity. A design system for portfolio,
                                UI libraries, and developer tools.
                            </p>
                            <div className="flex flex-wrap gap-3 pt-4">
                                <span
                                    className="px-3 py-1 border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted text-sm font-mono rounded hover:border-brand-mint transition-colors cursor-default">#Systemic</span>
                                <span
                                    className="px-3 py-1 border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted text-sm font-mono rounded hover:border-brand-mint transition-colors cursor-default">#Atomic</span>
                                <span
                                    className="px-3 py-1 border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted text-sm font-mono rounded hover:border-brand-mint transition-colors cursor-default">#Terminal-Inspired</span>
                            </div>
                        </div>
                        {/* <!-- Terminal Mockup --> */}
                        <div
                            className="lg:col-span-5 h-64 lg:h-80 bg-brand-black border border-gray-200 dark:border-brand-border rounded-lg p-6 relative overflow-hidden group shadow-xl">
                            <div className="absolute top-0 left-0 w-full h-6 bg-brand-border/30 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="mt-6 font-mono text-sm space-y-2">
                                <p className="text-brand-muted">$ init <span className="text-brand-mint">mrahulrahi</span></p>
                                <p className="text-brand-muted"> &gt; Loading modules...</p>
                                <p className="text-brand-muted"> &gt; Applying theme: <span className="text-brand-glow">Electric Flora</span>
                                </p>
                                <p className="text-brand-text flex items-center gap-2">
                                    &gt; Status: <span id="typing-text" className="text-brand-mint"></span><span
                                        className="cursor-blink w-2 h-4 bg-brand-mint block"></span>
                                </p>
                            </div>
                            <div className="absolute bottom-4 right-4 w-16 h-16 border-r border-b border-brand-mint/30 rounded-br-xl">
                            </div>
                        </div>
                    </section>

                    {/* <!-- 2. Color Palette --> */}
                    <section id="palette" className="space-y-8">
                        <div className="border-l-2 border-brand-mint pl-4">
                            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Electric Flora Palette
                            </h2>
                            <p className="text-gray-600 dark:text-brand-muted mt-2">Monochromatic base with high-voltage green accents.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            {/* <!-- Color Cards --> */}
                            <div className="palette-card group relative aspect-square rounded-xl border border-gray-200 dark:border-brand-border bg-brand-black flex flex-col justify-between p-4 cursor-pointer transition-all hover:border-brand-mint hover:shadow-lg overflow-hidden shadow-sm"
                                data-color="#09090B" data-name="Void Black">
                                <div className="absolute inset-0 bg-brand-black"></div>
                                <span
                                    className="relative z-10 text-xs font-mono bg-brand-black/50 backdrop-blur px-2 py-1 rounded text-white w-max border border-white/10">Main
                                    BG</span>
                                <div className="relative z-10 flex justify-between items-end"><span
                                    className="font-display font-bold text-white">Void Black</span><span
                                        className="font-mono text-xs text-brand-muted">#09090B</span></div>
                            </div>
                            <div className="palette-card group relative aspect-square rounded-xl border border-gray-200 dark:border-brand-border bg-brand-mint flex flex-col justify-between p-4 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg overflow-hidden shadow-sm"
                                data-color="#00DC82" data-name="Electric Mint">
                                <div className="absolute inset-0 bg-brand-mint"></div>
                                <span
                                    className="relative z-10 text-xs font-mono bg-black/20 backdrop-blur px-2 py-1 rounded text-black w-max border border-black/10 font-bold">Accent</span>
                                <div className="relative z-10 flex justify-between items-end text-brand-black"><span
                                    className="font-display font-bold">Electric Mint</span><span
                                        className="font-mono text-xs font-bold">#00DC82</span></div>
                            </div>
                            {/* <!-- (Other colors implied) --> */}
                        </div>
                    </section>

                    {/* <!-- 3. Typography System --> */}
                    <section id="typography" className="space-y-8">
                        <div className="border-l-2 border-brand-mint pl-4">
                            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Typography Stack</h2>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div
                                className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-8 shadow-sm">
                                <h3 className="text-brand-mint font-mono text-sm mb-1">Headings</h3>
                                <p className="text-2xl font-display font-bold text-gray-900 dark:text-brand-text mb-4">Space Grotesk</p>
                                <p className="font-display text-4xl font-bold leading-tight text-gray-900 dark:text-brand-text">
                                    Technical Brutalism</p>
                            </div>
                            <div
                                className="col-span-1 bg-brand-black border border-gray-200 dark:border-brand-border rounded-xl p-8 shadow-xl">
                                <h3 className="text-brand-mint font-mono text-sm mb-1">Code</h3>
                                <p className="text-2xl font-mono text-brand-text mb-4">JetBrains Mono</p>
                                <div className="bg-[#1e1e1e] p-4 rounded border-l-2 border-brand-mint font-mono text-sm text-left"><span
                                    className="text-[#c678dd]">const</span> sys = <span className="text-[#98c379]">'Ready'</span>;</div>
                            </div>
                        </div>
                    </section>

                    {/* <!-- 4. UI Lab Placeholder --> */}
                    <section id="ui-lab" className="py-12 border-t border-gray-200 dark:border-brand-border text-center">
                        <p className="text-gray-500 dark:text-brand-muted font-mono">Switch to "Admin CMS" in the navbar to see the
                            Dashboard.</p>
                    </section>
                </main>

                {/* <!-- VIEW 2: APP ADMIN (CMS & Dashboard) --> */}
                <div id="view-app"
                    className="flex bg-gray-50 dark:bg-brand-black transition-opacity duration-300">

                    {/* <!-- App Sidebar --> */}
                    <aside
                        className="w-64 border-r border-gray-200 dark:border-brand-border bg-white dark:bg-brand-surface flex flex-col md:flex">
                        <div className="p-6">
                            <div className="text-xs font-mono text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-4">Admin
                                Console</div>
                            <div
                                className="flex items-center gap-3 p-2 rounded-lg bg-gray-100 dark:bg-brand-surfaceHighlight border border-gray-200 dark:border-brand-border">
                                <div
                                    className="w-8 h-8 rounded bg-brand-mint flex items-center justify-center font-bold text-brand-black">
                                    M</div>
                                <div className="text-sm">
                                    <div className="font-bold text-gray-900 dark:text-brand-text">mrahulrahi</div>
                                    <div className="text-xs text-gray-500 dark:text-brand-muted">Super Admin</div>
                                </div>
                            </div>
                        </div>

                        <nav className="flex-1 px-4 space-y-1">
                            <button onClick={() => { }} id="nav-dashboard"
                                className="nav-item active w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 dark:text-brand-text">
                                <i data-lucide="layout-dashboard" className="w-4 h-4"></i>
                                Dashboard
                            </button>

                            <div className="pt-4 mt-2 mb-2">
                                <div
                                    className="text-xs font-mono text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-2 px-2">
                                    Content Manager</div>
                                <button onClick={() => { }} id="nav-portfolio"
                                    className="nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text">
                                    <i data-lucide="briefcase" className="w-4 h-4"></i>
                                    Portfolio
                                </button>
                                <button
                                    className="nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text">
                                    <i data-lucide="component" className="w-4 h-4"></i>
                                    Components
                                </button>
                                <button
                                    className="nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text">
                                    <i data-lucide="pen-tool" className="w-4 h-4"></i>
                                    Blog & Notes
                                </button>
                            </div>

                            <div className="pt-4 mt-2 border-t border-gray-200 dark:border-brand-border">
                                <div
                                    className="text-xs font-mono text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-2 px-2">
                                    Tools</div>
                                <button onClick={() => { }} id="nav-emi"
                                    className="nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text">
                                    <i data-lucide="calculator" className="w-4 h-4"></i>
                                    Smart EMI
                                </button>
                            </div>

                            <div className="mt-auto pb-4">
                                <button onClick={() => { }} id="nav-settings"
                                    className="nav-item w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text">
                                    <i data-lucide="settings" className="w-4 h-4"></i>
                                    Configuration
                                </button>
                            </div>
                        </nav>
                    </aside>

                    {/* <!-- Main App Area --> */}
                    <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
                        {/* <!-- Breadcrumbs --> */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-brand-muted font-mono mb-6">
                            <span>admin</span>
                            <span>/</span>
                            <span id="breadcrumb-current" className="text-gray-900 dark:text-brand-text">Dashboard</span>
                        </div>

                        {/* <!-- PAGE 1: DASHBOARD (Overview) --> */}
                        <div id="page-dashboard" className="space-y-6 animate-fade-in">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Site Overview
                                    </h2>
                                    <p className="text-gray-500 dark:text-brand-muted mt-1">Analytics for mrahulrahi.vercel.app</p>
                                </div>
                                <div className="flex gap-2">
                                    <a href="https://mrahulrahi.vercel.app/" target="_blank"
                                        className="px-4 py-2 rounded bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border text-sm font-mono flex items-center gap-2 text-gray-900 dark:text-brand-text hover:border-brand-mint transition-colors">
                                        <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse"></span> View Live Site
                                    </a>
                                    <button
                                        className="bg-brand-mint hover:bg-brand-fern hover:text-white text-brand-black px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2">
                                        <i data-lucide="plus" className="w-4 h-4"></i> New Post
                                    </button>
                                </div>
                            </div>

                            {/* <!-- Stats Grid --> */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div
                                    className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <i data-lucide="eye" className="w-16 h-16 text-brand-mint"></i>
                                    </div>
                                    <p className="text-sm font-mono text-gray-500 dark:text-brand-muted">Total Views</p>
                                    <p className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text mt-1">142.5k</p>
                                    <div className="mt-4 flex items-center gap-2 text-xs font-mono text-brand-mint">
                                        <i data-lucide="arrow-up" className="w-3 h-3"></i> 8.4% vs last month
                                    </div>
                                </div>
                                <div
                                    className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <i data-lucide="download" className="w-16 h-16 text-brand-fern"></i>
                                    </div>
                                    <p className="text-sm font-mono text-gray-500 dark:text-brand-muted">Library Downloads</p>
                                    <p className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text mt-1">8.2k</p>
                                    <div className="mt-4 flex items-center gap-2 text-xs font-mono text-brand-mint">
                                        <i data-lucide="arrow-up" className="w-3 h-3"></i> 12% vs last month
                                    </div>
                                </div>
                                <div
                                    className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <i data-lucide="mouse-pointer" className="w-16 h-16 text-brand-glow"></i>
                                    </div>
                                    <p className="text-sm font-mono text-gray-500 dark:text-brand-muted">Portfolio Clicks</p>
                                    <p className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text mt-1">3,402</p>
                                    <div className="mt-4 flex items-center gap-2 text-xs font-mono text-brand-muted">
                                        Avg session: 2m 14s
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Main Chart --> */}
                            <div
                                className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-gray-900 dark:text-brand-text">Traffic Volume</h3>
                                    <select
                                        className="bg-transparent border border-gray-200 dark:border-brand-border text-xs rounded px-2 py-1 text-gray-500 dark:text-brand-muted outline-none">
                                        <option>Last 7 Days</option>
                                        <option>Last 30 Days</option>
                                    </select>
                                </div>
                                <div className="w-full h-80 chart-container">
                                    <canvas id="mainDashboardChart"></canvas>
                                </div>
                            </div>
                        </div>

                        {/* <!-- PAGE 2: PORTFOLIO MANAGER (Was Modules) --> */}
                        <div id="page-portfolio" className="hidden space-y-6 animate-fade-in">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                                <div>
                                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Portfolio Manager
                                    </h2>
                                    <p className="text-gray-500 dark:text-brand-muted mt-1">Manage projects and case studies.</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <i data-lucide="search"
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"></i>
                                        <input type="text" placeholder="Search projects..."
                                            className="pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border text-sm w-64 focus:border-brand-mint outline-none text-gray-900 dark:text-brand-text" />
                                    </div>
                                    <button
                                        className="bg-brand-mint text-brand-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-fern hover:text-white transition-colors">Add
                                        Project</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* <!-- Project Card 1 --> */}
                                <div
                                    className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl overflow-hidden group hover:border-brand-mint transition-all">
                                    <div className="h-40 bg-gray-200 dark:bg-brand-black/50 relative flex items-center justify-center">
                                        <i data-lucide="image" className="w-8 h-8 text-gray-400"></i>
                                        <div
                                            className="absolute top-2 right-2 bg-brand-mint text-brand-black text-[10px] font-bold px-2 py-1 rounded">
                                            PUBLISHED</div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">FinTech Dashboard</h3>
                                        <p className="text-xs font-mono text-brand-mint mt-1">UX / UI Design</p>
                                        <p className="text-sm text-gray-500 dark:text-brand-muted mt-3 h-10 line-clamp-2">A
                                            comprehensive dashboard for a banking client focusing on data visualization.</p>
                                        <div
                                            className="mt-4 pt-4 border-t border-gray-100 dark:border-brand-border flex items-center justify-between">
                                            <div className="flex gap-2">
                                                <button
                                                    className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted"><i
                                                        data-lucide="edit-3" className="w-4 h-4"></i></button>
                                                <button
                                                    className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted"><i
                                                        data-lucide="eye" className="w-4 h-4"></i></button>
                                            </div>
                                            <span className="text-xs text-gray-400">Updated 2d ago</span>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Project Card 2 --> */}
                                <div
                                    className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl overflow-hidden group hover:border-brand-mint transition-all">
                                    <div className="h-40 bg-gray-200 dark:bg-brand-black/50 relative flex items-center justify-center">
                                        <i data-lucide="image" className="w-8 h-8 text-gray-400"></i>
                                        <div
                                            className="absolute top-2 right-2 bg-gray-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                                            DRAFT</div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">E-commerce Mobile App</h3>
                                        <p className="text-xs font-mono text-brand-mint mt-1">Product Design</p>
                                        <p className="text-sm text-gray-500 dark:text-brand-muted mt-3 h-10 line-clamp-2">Concept app
                                            for a streetwear brand featuring AR try-on.</p>
                                        <div
                                            className="mt-4 pt-4 border-t border-gray-100 dark:border-brand-border flex items-center justify-between">
                                            <div className="flex gap-2">
                                                <button
                                                    className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted"><i
                                                        data-lucide="edit-3" className="w-4 h-4"></i></button>
                                                <button
                                                    className="p-2 hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight rounded text-gray-500 dark:text-brand-muted"><i
                                                        data-lucide="eye-off" className="w-4 h-4"></i></button>
                                            </div>
                                            <span className="text-xs text-gray-400">Updated 5h ago</span>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Add New Placeholder --> */}
                                <button
                                    className="bg-gray-50 dark:bg-brand-surfaceHighlight/30 border border-dashed border-gray-300 dark:border-brand-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-brand-mint hover:bg-brand-mint/5 transition-all group">
                                    <div
                                        className="w-12 h-12 rounded-full bg-gray-200 dark:bg-brand-surfaceHighlight flex items-center justify-center text-gray-400 group-hover:bg-brand-mint group-hover:text-brand-black transition-colors mb-4">
                                        <i data-lucide="plus" className="w-6 h-6"></i>
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-brand-text">Create New Project</h3>
                                    <p className="text-sm text-gray-500 dark:text-brand-muted mt-1">Add a case study to your portfolio
                                    </p>
                                </button>
                            </div>
                        </div>

                        {/* <!-- PAGE 3: SMART EMI (Tool Example) --> */}
                        <div id="page-emi" className="hidden space-y-6 animate-fade-in">
                            {/* <!-- Header --> */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h2
                                        className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text flex items-center gap-2">
                                        <i data-lucide="refresh-cw" className="w-6 h-6 text-brand-mint"></i>
                                        Smart EMI Planner
                                    </h2>
                                    <p className="text-gray-500 dark:text-brand-muted mt-1">Live Tool Preview</p>
                                </div>
                                <div
                                    className="bg-white dark:bg-brand-surface px-4 py-2 rounded-xl border border-gray-200 dark:border-brand-border flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-500 dark:text-brand-muted uppercase font-semibold">Standard
                                            EMI</p>
                                        <p className="text-lg font-bold text-gray-700 dark:text-brand-text" id="disp-standard-emi">₹0
                                        </p>
                                    </div>
                                    <div className="h-8 w-px bg-gray-200 dark:bg-brand-border"></div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-brand-mint uppercase font-semibold">Smart EMI</p>
                                        <p className="text-lg font-bold text-brand-mint" id="disp-smart-emi">₹0</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* <!-- Controls Sidebar --> */}
                                <aside className="lg:col-span-4 space-y-6">
                                    <div
                                        className="bg-white dark:bg-brand-surface p-6 rounded-xl border border-gray-200 dark:border-brand-border space-y-5">
                                        <h2
                                            className="text-lg font-semibold text-gray-900 dark:text-brand-text flex items-center gap-2 mb-2">
                                            <i data-lucide="wallet" className="w-5 h-5 text-brand-mint"></i>
                                            Loan Details
                                        </h2>

                                        <div>
                                            <label
                                                className="block text-sm font-medium text-gray-600 dark:text-brand-muted mb-1 font-mono">Loan
                                                Amount (₹)</label>
                                            <input type="number" id="inp-loan" value="5000000"
                                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    className="block text-sm font-medium text-gray-600 dark:text-brand-muted mb-1 font-mono">Rate
                                                    (%)</label>
                                                <input type="number" id="inp-rate" step="0.1" value="8.5"
                                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono" />
                                            </div>
                                            <div>
                                                <label
                                                    className="block text-sm font-medium text-gray-600 dark:text-brand-muted mb-1 font-mono">Tenure
                                                    (Yrs)</label>
                                                <input type="number" id="inp-tenure" value="20"
                                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono" />
                                            </div>
                                        </div>

                                        <div className="h-px bg-gray-200 dark:bg-brand-border my-4"></div>

                                        <h2
                                            className="text-lg font-semibold text-gray-900 dark:text-brand-text flex items-center gap-2 mb-2">
                                            <i data-lucide="arrow-up-circle" className="w-5 h-5 text-brand-mint"></i>
                                            Smart Modifiers
                                        </h2>

                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <label
                                                    className="block text-sm font-medium text-gray-600 dark:text-brand-muted font-mono">Yearly
                                                    Increase (%)</label>
                                                <span className="text-sm font-bold text-brand-mint font-mono"
                                                    id="disp-increase">10%</span>
                                            </div>
                                            <input type="range" id="inp-increase" min="0" max="25" step="1" value="10"
                                                className="w-full h-2 bg-gray-200 dark:bg-brand-black rounded-lg appearance-none cursor-pointer accent-brand-mint" />
                                        </div>

                                        <div
                                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-brand-black rounded-xl border border-gray-200 dark:border-brand-border">
                                            <div className="flex items-center gap-3">
                                                <i data-lucide="calendar" className="text-gray-400"></i>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-brand-text">13th EMI
                                                        Strategy</p>
                                                    <p className="text-xs text-gray-500 dark:text-brand-muted">Pay one extra EMI yearly
                                                    </p>
                                                </div>
                                            </div>
                                            <button id="btn-toggle-extra"
                                                className="w-12 h-6 rounded-full transition-colors relative bg-brand-mint">
                                                <div id="toggle-circle"
                                                    className="absolute top-1 bg-white dark:bg-brand-black w-4 h-4 rounded-full transition-all left-7">
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </aside>

                                {/* <!-- Results Area --> */}
                                <main className="lg:col-span-8 space-y-6">
                                    {/* <!-- Stats Grid --> */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div
                                            className="bg-white dark:bg-brand-surface p-5 rounded-xl border border-gray-200 dark:border-brand-border">
                                            <p
                                                className="text-gray-500 dark:text-brand-muted text-xs font-bold uppercase tracking-wider mb-1">
                                                Interest Saved</p>
                                            <span className="text-2xl font-black text-brand-fern dark:text-brand-mint block"
                                                id="val-interest-saved">₹0</span>
                                        </div>
                                        <div
                                            className="bg-white dark:bg-brand-surface p-5 rounded-xl border border-gray-200 dark:border-brand-border">
                                            <p
                                                className="text-gray-500 dark:text-brand-muted text-xs font-bold uppercase tracking-wider mb-1">
                                                Time Saved</p>
                                            <span className="text-2xl font-black text-blue-600 dark:text-blue-400 block"
                                                id="val-time-saved">0y 0m</span>
                                        </div>
                                        <div
                                            className="bg-white dark:bg-brand-surface p-5 rounded-xl border border-gray-200 dark:border-brand-border">
                                            <p
                                                className="text-gray-500 dark:text-brand-muted text-xs font-bold uppercase tracking-wider mb-1">
                                                Total Savings</p>
                                            <span className="text-2xl font-black text-gray-900 dark:text-brand-text block"
                                                id="val-total-saved">₹0</span>
                                        </div>
                                    </div>

                                    {/* <!-- Chart Section --> */}
                                    <div
                                        className="bg-white dark:bg-brand-surface rounded-xl border border-gray-200 dark:border-brand-border p-6">
                                        <div className="w-full h-80 chart-container">
                                            <canvas id="emiChart"></canvas>
                                        </div>
                                    </div>
                                </main>
                            </div>
                        </div>

                        {/* <!-- PAGE 4: CONFIGURATION (SETTINGS) --> */}
                        <div id="page-settings" className="hidden space-y-6 animate-fade-in max-w-4xl mx-auto">
                            <div
                                className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200 dark:border-brand-border pb-6">
                                <div>
                                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Configuration
                                    </h2>
                                    <p className="text-gray-500 dark:text-brand-muted mt-1">Manage admin profile and site metadata.</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* <!-- Profile Card --> */}
                                <section>
                                    <h3 className="text-sm font-bold text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-4">
                                        Admin Profile</h3>
                                    <div
                                        className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                                        <div
                                            className="w-20 h-20 rounded-full bg-linear-to-tr from-brand-mint to-brand-fern shrink-0 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                                            M
                                        </div>
                                        <div className="flex-1 space-y-4 w-full">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label
                                                        className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Username</label>
                                                    <input type="text" value="mrahulrahi" disabled
                                                        className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-brand-black/50 border border-gray-200 dark:border-brand-border text-gray-500 dark:text-brand-muted outline-none font-mono text-sm cursor-not-allowed" />
                                                </div>
                                                <div>
                                                    <label
                                                        className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Email</label>
                                                    <input type="email" value="admin@mrahulrahi.com"
                                                        className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm" />
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="px-4 py-2 bg-brand-mint text-brand-black font-medium rounded hover:bg-brand-fern hover:text-white transition-colors text-sm">Save</button>
                                    </div>
                                </section>

                                {/* <!-- Site Metadata (Replaced API Keys) --> */}
                                <section>
                                    <h3 className="text-sm font-bold text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-4">
                                        Site Metadata & SEO</h3>
                                    <div
                                        className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 space-y-4">
                                        <div>
                                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Site
                                                Title</label>
                                            <input type="text" value="mrahulrahi | Portfolio & Tools"
                                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Meta
                                                Description</label>
                                            <textarea rows={3}
                                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm">Design system, UI libraries, and helpful developer tools by mrahulrahi.</textarea>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <label
                                                    className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">Twitter
                                                    URL</label>
                                                <input type="text" placeholder="https://twitter.com/..."
                                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm" />
                                            </div>
                                            <div className="flex-1">
                                                <label
                                                    className="block text-xs font-mono text-gray-500 dark:text-brand-muted mb-1">GitHub
                                                    URL</label>
                                                <input type="text" placeholder="https://github.com/..."
                                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-brand-black border border-gray-200 dark:border-brand-border text-gray-900 dark:text-brand-text focus:border-brand-mint outline-none transition-all font-mono text-sm" />
                                            </div>
                                        </div>
                                        <button
                                            className="px-4 py-2 border border-gray-300 dark:border-brand-border text-gray-600 dark:text-brand-muted font-medium rounded hover:bg-gray-100 dark:hover:bg-brand-surfaceHighlight transition-colors text-sm">Update
                                            Meta</button>
                                    </div>
                                </section>

                                {/* <!-- System Preferences --> */}
                                <section>
                                    <h3 className="text-sm font-bold text-gray-400 dark:text-brand-muted uppercase tracking-wider mb-4">
                                        System Preferences</h3>
                                    <div
                                        className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl overflow-hidden divide-y divide-gray-100 dark:divide-brand-border">
                                        <div
                                            className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-brand-black/30 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded bg-purple-500/10 text-purple-500"><i data-lucide="bell"
                                                    className="w-4 h-4"></i></div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-brand-text">Content
                                                        Notifications</p>
                                                    <p className="text-xs text-gray-500 dark:text-brand-muted">Notify me when comments
                                                        are posted.</p>
                                                </div>
                                            </div>
                                            <div
                                                className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                                <input type="checkbox" name="toggle" id="toggle-notif"
                                                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-brand-mint right-0" />
                                                <label htmlFor="toggle-notif"
                                                    className="toggle-label block overflow-hidden h-5 rounded-full bg-brand-mint cursor-pointer"></label>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </main>
                </div>

                {/* <!-- Notification Toast --> */}
                <div id="toast"
                    className="fixed bottom-8 right-8 bg-white dark:bg-brand-surface border border-brand-mint text-brand-mint px-6 py-3 rounded shadow-2xl transform translate-y-24 transition-transform duration-300 flex items-center gap-2 z-50 font-mono text-sm">
                    <i data-lucide="check-circle" className="w-4 h-4"></i>
                    <span id="toast-msg">Copied to clipboard</span>
                </div>


            </main>

            <main className="bg-brand-black text-brand-text font-sans antialiased selection:bg-brand-mint selection:text-brand-black">

                {/* <!-- Background Grid Layout --> */}
                <div className="fixed inset-0 bg-grid-pattern opacity-[0.07] pointer-events-none z-0 bg-grid"></div>

                {/* <!-- Main Content --> */}
                <div className="relative z-10 pt-24 px-6 lg:px-12 max-w-8xl mx-auto pb-20 space-y-24">

                    {/* <!-- 1. Hero Section --> */}
                    <section id="essence" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 space-y-6">
                            <div
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-xs font-mono text-brand-mint">
                                <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse"></span>
                                v1.0.0 System Online
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
                                Structured <br />
                                <span
                                    className="text-transparent bg-clip-text bg-linear-to-r from-brand-mint to-brand-fern">Ecology</span>
                            </h1>
                            <p className="text-brand-muted text-lg max-w-xl leading-relaxed">
                                Bridging the gap between raw code structure and organic creativity. A design system for portfolio,
                                UI libraries, and developer tools.
                            </p>
                            <div className="flex flex-wrap gap-3 pt-4">
                                <span className="px-3 py-1 border border-brand-border text-brand-muted text-sm font-mono rounded hover:border-brand-mint transition-colors cursor-default">#Systemic</span>
                                <span className="px-3 py-1 border border-brand-border text-brand-muted text-sm font-mono rounded hover:border-brand-mint transition-colors cursor-default">#Atomic</span>
                                <span className="px-3 py-1 border border-brand-border text-brand-muted text-sm font-mono rounded hover:border-brand-mint transition-colors cursor-default">#Terminal-Inspired</span>
                                <span className="px-3 py-1 border border-brand-border text-brand-muted text-sm font-mono rounded hover:border-brand-mint transition-colors cursor-default">#Future-Proof</span>
                            </div>
                        </div>
                        <div
                            className="lg:col-span-5 h-64 lg:h-80 bg-brand-surface border border-brand-border rounded-lg p-6 relative overflow-hidden group">
                            {/* <!-- Terminal Animation --> */}
                            <div className="absolute top-0 left-0 w-full h-6 bg-brand-border/30 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="mt-6 font-mono text-sm space-y-2">
                                <p className="text-brand-muted">$ init <span className="text-brand-mint">mrahulrahi</span></p>
                                <p className="text-brand-muted">&gt; Loading modules...</p>
                                <p className="text-brand-muted">&gt; Applying theme: <span className="text-brand-glow">Electric Flora</span></p>
                                <p className="text-brand-muted">&gt; Optimizing grid...</p>
                                <p className="text-brand-text flex items-center gap-2"> &gt; Status: <span id="typing-text" className="text-brand-mint"></span>
                                    <span className="cursor-blink w-2 h-4 bg-brand-mint block"></span>
                                </p>
                            </div>
                            {/* <!-- Decorative elements --> */}
                            <div className="absolute bottom-4 right-4 w-16 h-16 border-r border-b border-brand-mint/30 rounded-br-xl">
                            </div>
                        </div>
                    </section>

                    {/* <!-- 2. Color Palette --> */}
                    <section id="palette" className="space-y-8">
                        <div className="border-l-2 border-brand-mint pl-4">
                            <h2 className="text-3xl font-display font-bold">Electric Flora Palette</h2>
                            <p className="text-brand-muted mt-2">Monochromatic base with high-voltage green accents. Click to copy.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            {/* <!-- Cards generated by JS for easy management --> */}
                            <div className="palette-card group relative aspect-square rounded-xl border border-brand-border bg-brand-black flex flex-col justify-between p-4 cursor-pointer transition-all hover:border-brand-mint hover:shadow-[0_0_20px_rgba(0,220,130,0.1)] overflow-hidden"
                                data-color="#09090B" data-name="Void Black">
                                <div className="absolute inset-0 bg-brand-black"></div>
                                <span
                                    className="relative z-10 text-xs font-mono bg-brand-black/50 backdrop-blur px-2 py-1 rounded text-white w-max border border-white/10">Main
                                    BG</span>
                                <div className="relative z-10 flex justify-between items-end">
                                    <span className="font-display font-bold text-white">Void Black</span>
                                    <span className="font-mono text-xs text-brand-muted">#09090B</span>
                                </div>
                            </div>

                            <div className="palette-card group relative aspect-square rounded-xl border border-brand-border bg-brand-surface flex flex-col justify-between p-4 cursor-pointer transition-all hover:border-brand-mint hover:shadow-[0_0_20px_rgba(0,220,130,0.1)] overflow-hidden"
                                data-color="#18181B" data-name="Graphite">
                                <div className="absolute inset-0 bg-brand-surface"></div>
                                <span
                                    className="relative z-10 text-xs font-mono bg-brand-black/50 backdrop-blur px-2 py-1 rounded text-white w-max border border-white/10">Surface</span>
                                <div className="relative z-10 flex justify-between items-end">
                                    <span className="font-display font-bold text-white">Graphite</span>
                                    <span className="font-mono text-xs text-brand-muted">#18181B</span>
                                </div>
                            </div>

                            <div className="palette-card group relative aspect-square rounded-xl border border-brand-border bg-brand-mint flex flex-col justify-between p-4 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,220,130,0.4)] overflow-hidden"
                                data-color="#00DC82" data-name="Electric Mint">
                                <div className="absolute inset-0 bg-brand-mint"></div>
                                <span
                                    className="relative z-10 text-xs font-mono bg-black/20 backdrop-blur px-2 py-1 rounded text-black w-max border border-black/10 font-bold">Accent</span>
                                <div className="relative z-10 flex justify-between items-end text-brand-black">
                                    <span className="font-display font-bold">Electric Mint</span>
                                    <span className="font-mono text-xs font-bold">#00DC82</span>
                                </div>
                            </div>

                            <div className="palette-card group relative aspect-square rounded-xl border border-brand-border bg-brand-fern flex flex-col justify-between p-4 cursor-pointer transition-all hover:border-brand-mint hover:shadow-[0_0_20px_rgba(4,120,87,0.3)] overflow-hidden"
                                data-color="#047857" data-name="Deep Fern">
                                <div className="absolute inset-0 bg-brand-fern"></div>
                                <span
                                    className="relative z-10 text-xs font-mono bg-black/20 backdrop-blur px-2 py-1 rounded text-white w-max border border-white/10">Secondary</span>
                                <div className="relative z-10 flex justify-between items-end text-white">
                                    <span className="font-display font-bold">Deep Fern</span>
                                    <span className="font-mono text-xs opacity-80">#047857</span>
                                </div>
                            </div>

                            <div className="palette-card group relative aspect-square rounded-xl border border-brand-border bg-brand-glow flex flex-col justify-between p-4 cursor-pointer transition-all hover:border-brand-mint hover:shadow-[0_0_20px_rgba(187,247,208,0.3)] overflow-hidden"
                                data-color="#BBF7D0" data-name="Lime Glow">
                                <div className="absolute inset-0 bg-brand-glow"></div>
                                <span
                                    className="relative z-10 text-xs font-mono bg-brand-black/10 backdrop-blur px-2 py-1 rounded text-brand-black w-max border border-black/5">Highlight</span>
                                <div className="relative z-10 flex justify-between items-end text-brand-black">
                                    <span className="font-display font-bold">Lime Glow</span>
                                    <span className="font-mono text-xs font-bold">#BBF7D0</span>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Notification toast container --> */}
                        <div id="toast"
                            className="fixed bottom-8 right-8 bg-brand-surface border border-brand-mint text-brand-mint px-6 py-3 rounded shadow-2xl transform translate-y-24 transition-transform duration-300 flex items-center gap-2 z-50 font-mono text-sm">
                            <i data-lucide="check-circle" className="w-4 h-4"></i>
                            <span id="toast-msg">Copied to clipboard</span>
                        </div>
                    </section>

                    {/* <!-- 3. Typography System --> */}
                    <section id="typography" className="space-y-8">
                        <div className="border-l-2 border-brand-mint pl-4">
                            <h2 className="text-3xl font-display font-bold">Typography Stack</h2>
                            <p className="text-brand-muted mt-2">Balancing technical precision with readability.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* <!-- Display Font --> */}
                            <div
                                className="bg-brand-surface border border-brand-border rounded-xl p-8 hover:border-brand-muted transition-colors">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-brand-mint font-mono text-sm mb-1">Headings / Display</h3>
                                        <p className="text-2xl font-display font-bold">Space Grotesk</p>
                                    </div>
                                    <span
                                        className="text-brand-muted font-mono text-xs border border-brand-border px-2 py-1 rounded">Aa</span>
                                </div>
                                <p className="font-display text-4xl font-bold leading-tight mb-4">
                                    Technical Brutalism for Modern UI
                                </p>
                                <p className="font-display text-brand-muted text-sm">
                                    ABCDEFGHIJKLMNOPQRSTUVWXYZ <br />
                                    abcdefghijklmnopqrstuvwxyz <br />
                                    0123456789
                                </p>
                            </div>

                            {/* <!-- Body Font --> */}
                            <div
                                className="bg-brand-surface border border-brand-border rounded-xl p-8 hover:border-brand-muted transition-colors">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-brand-mint font-mono text-sm mb-1">Body Copy</h3>
                                        <p className="text-2xl font-sans font-medium">Inter</p>
                                    </div>
                                    <span
                                        className="text-brand-muted font-mono text-xs border border-brand-border px-2 py-1 rounded">Aa</span>
                                </div>
                                <p className="font-sans text-base leading-relaxed text-brand-muted mb-4">
                                    The theme bridges the gap between raw code (structure) and organic growth (creativity). It feels
                                    engineered but alive. This text is set in Inter for maximum legibility on screens.
                                </p>
                                <p className="font-sans text-brand-muted text-sm opacity-60">
                                    Regular 400 · Medium 500 · SemiBold 600
                                </p>
                            </div>

                            {/* <!-- Mono Font --> */}
                            <div
                                className="col-span-1 lg:col-span-2 bg-brand-black border border-brand-border rounded-xl p-8 hover:border-brand-mint transition-colors">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-brand-mint font-mono text-sm mb-1">Code / Technical</h3>
                                        <p className="text-2xl font-mono">JetBrains Mono</p>
                                    </div>
                                    <span
                                        className="text-brand-muted font-mono text-xs border border-brand-border px-2 py-1 rounded">{ }</span>
                                </div>
                                <div
                                    className="bg-[#1e1e1e] p-4 rounded border-l-2 border-brand-mint font-mono text-sm overflow-x-auto">
                                    <span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">BrandIdentity</span>
                                    <span className="text-[#56b6c2]">=</span> &lbrace; <br />
                                    &nbsp;&nbsp;theme: <span className="text-[#98c379]">'Structured Ecology'</span>,<br />
                                    &nbsp;&nbsp;version: <span className="text-[#d19a66]">1.0</span>,<br />
                                    &nbsp;&nbsp;init: <span className="text-[#c678dd]">function</span>() &lbrace;<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#e06c75]">return</span> <span
                                        className="text-[#98c379]">"Ready"</span>;<br />
                                    &nbsp;&nbsp;&rbrace;<br />
                                    &rbrace;;
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* <!-- 4. UI Lab (Components) --> */}
                    <section id="ui-lab" className="space-y-8">
                        <div className="border-l-2 border-brand-mint pl-4">
                            <h2 className="text-3xl font-display font-bold">UI Lab</h2>
                            <p className="text-brand-muted mt-2">Component behavior and the Bento grid system.</p>
                        </div>

                        {/* <!-- Bento Grid Demo --> */}
                        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-3 gap-4 h-[600px]">

                            {/* <!-- Card 1: Primary Action --> */}
                            <div
                                className="col-span-1 md:col-span-2 row-span-2 bg-brand-surface border border-brand-border rounded-xl p-6 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                    <i data-lucide="arrow-up-right" className="text-brand-mint"></i>
                                </div>
                                <h3 className="font-display font-bold text-xl mb-4">Interactive Elements</h3>
                                <div className="flex flex-col gap-4 items-start">
                                    <button
                                        className="px-6 py-2 bg-brand-mint text-brand-black font-medium rounded hover:bg-brand-mint/90 transition-colors w-full md:w-auto font-mono text-sm">
                                        Primary_Action
                                    </button>
                                    <button
                                        className="px-6 py-2 bg-transparent border border-brand-border text-brand-text font-medium rounded hover:border-brand-mint hover:text-brand-mint transition-colors w-full md:w-auto font-mono text-sm">
                                        Secondary_Action
                                    </button>
                                    <div className="flex items-center gap-2 group/link cursor-pointer">
                                        <span className="text-brand-mint font-mono text-sm group-hover/link:underline">Read
                                            Documentation</span>
                                        <i data-lucide="chevron-right"
                                            className="w-4 h-4 text-brand-mint transition-transform group-hover/link:translate-x-1"></i>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Card 2: Stats (Glassmorphism) --> */}
                            <div
                                className="col-span-1 md:col-span-2 row-span-1 glass rounded-xl p-6 flex items-center justify-between border border-brand-border relative overflow-hidden">
                                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brand-mint/10 blur-2xl rounded-full"></div>
                                <div>
                                    <p className="text-brand-muted text-sm font-mono">System Status</p>
                                    <p className="text-3xl font-mono font-bold text-brand-mint">98.4%</p>
                                </div>
                                <div className="h-12 w-32 chart-container">
                                    <canvas id="miniChart"></canvas>
                                </div>
                            </div>

                            {/* <!-- Card 3: Input Field --> */}
                            <div
                                className="col-span-1 row-span-1 bg-brand-black border border-brand-border rounded-xl p-6 flex flex-col justify-center group hover:border-brand-muted transition-colors">
                                <label
                                    className="text-xs font-mono text-brand-muted mb-2 group-focus-within:text-brand-mint transition-colors">Command
                                    Input</label>
                                <div
                                    className="flex items-center border-b border-brand-border group-focus-within:border-brand-mint transition-colors py-1">
                                    <span className="text-brand-mint mr-2">&gt;</span>
                                    <input type="text" placeholder="Type..."
                                        className="bg-transparent w-full outline-none text-brand-text font-mono text-sm placeholder-brand-muted/50" />
                                </div>
                            </div>

                            {/* <!-- Card 4: Feature List --> */}
                            <div className="col-span-1 row-span-2 bg-brand-surface border border-brand-border rounded-xl p-6">
                                <h3 className="font-display font-bold text-lg mb-4">Modules</h3>
                                <ul className="space-y-3">
                                    <li
                                        className="flex items-center gap-3 text-sm text-brand-muted hover:text-brand-text transition-colors cursor-default">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-mint"></div>
                                        <span>Layout_Grid</span>
                                    </li>
                                    <li
                                        className="flex items-center gap-3 text-sm text-brand-muted hover:text-brand-text transition-colors cursor-default">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-fern"></div>
                                        <span>Typography</span>
                                    </li>
                                    <li
                                        className="flex items-center gap-3 text-sm text-brand-muted hover:text-brand-text transition-colors cursor-default">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-border"></div>
                                        <span>Icons</span>
                                    </li>
                                    <li
                                        className="flex items-center gap-3 text-sm text-brand-muted hover:text-brand-text transition-colors cursor-default">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-border"></div>
                                        <span>Animations</span>
                                    </li>
                                </ul>
                            </div>

                            {/* <!-- Card 5: Logo Concepts Visualization --> */}
                            <div
                                className="col-span-1 md:col-span-2 row-span-1 bg-brand-surface border border-brand-border rounded-xl p-6 flex items-center justify-around">
                                {/* <!-- Concept A: Monogram Stack --> */}
                                <div className="group text-center">
                                    <div
                                        className="w-12 h-12 border-2 border-brand-mint rounded-lg flex items-center justify-center relative mb-2 transition-all group-hover:bg-brand-mint group-hover:text-brand-black">
                                        <span className="font-display font-bold text-xl leading-none">M</span>
                                        <div className="absolute -right-1 -bottom-1 w-2 h-2 bg-brand-black border border-brand-mint">
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-mono text-brand-muted uppercase">Monogram</p>
                                </div>

                                {/* <!-- Concept B: Terminal Cursor --> */}
                                <div className="group text-center">
                                    <div className="w-12 h-12 flex items-center justify-center mb-2">
                                        <span className="font-display font-bold text-2xl text-white">m<span
                                            className="text-brand-mint animate-pulse">_</span></span>
                                    </div>
                                    <p className="text-[10px] font-mono text-brand-muted uppercase">Terminal</p>
                                </div>

                                {/* <!-- Concept C: Bracket Node --> */}
                                <div className="group text-center">
                                    <div className="w-12 h-12 relative flex items-center justify-center mb-2">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-brand-mint">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                    </div>
                                    <p className="text-[10px] font-mono text-brand-muted uppercase">Node</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* <!-- 5. Prompts (Tool) --> */}
                    <section id="prompts" className="space-y-8">
                        <div className="border-l-2 border-brand-mint pl-4 flex justify-between items-end">
                            <div>
                                <h2 className="text-3xl font-display font-bold">Generator Prompts</h2>
                                <p className="text-brand-muted mt-2">Source material for AI asset generation.</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* <!-- Prompt 1 --> */}
                            <div className="bg-[#0d0d0d] border border-brand-border rounded-lg overflow-hidden">
                                <div
                                    className="bg-brand-surface border-b border-brand-border px-4 py-2 flex justify-between items-center">
                                    <span className="text-xs font-mono text-brand-muted">UI_Mockup.txt</span>
                                    <button onClick={() => { copyToClipboard('prompt-ui'); }}
                                        className="text-xs font-mono text-brand-mint hover:text-white flex items-center gap-1">
                                        <i data-lucide="copy" className="w-3 h-3"></i> Copy
                                    </button>
                                </div>
                                <div className="p-4 font-mono text-sm text-brand-muted leading-relaxed" id="prompt-ui">
                                    "High fidelity UI design for a personal portfolio and developer tools website named
                                    'mrahulrahi'. Dark mode aesthetic, matte black background with subtle noise texture. Accent
                                    color is electric mint green (#00DC82). Layout uses a bento-grid style. Typography is a mix of
                                    geometric sans-serif and coding monospace fonts. Visual elements include floating code snippets,
                                    glassmorphism cards, and neon green thin border lines. Tech-minimalist, clean, Dribbble
                                    trending, 4k, vector style."
                                </div>
                            </div>

                            {/* <!-- Prompt 2 --> */}
                            <div className="bg-[#0d0d0d] border border-brand-border rounded-lg overflow-hidden">
                                <div
                                    className="bg-brand-surface border-b border-brand-border px-4 py-2 flex justify-between items-center">
                                    <span className="text-xs font-mono text-brand-muted">Logo_Concept.txt</span>
                                    <button onClick={() => { copyToClipboard('prompt-logo'); }}
                                        className="text-xs font-mono text-brand-mint hover:text-white flex items-center gap-1">
                                        <i data-lucide="copy" className="w-3 h-3"></i> Copy
                                    </button>
                                </div>
                                <div className="p-4 font-mono text-sm text-brand-muted leading-relaxed" id="prompt-logo">
                                    "Minimalist tech logo for brand 'mrahulrahi'. The logo should combine the letter 'M' with coding
                                    symbols like brackets or a terminal cursor. Flat vector design. Color scheme: Neon Green and
                                    Dark Grey. Modern, geometric, suitable for a GitHub profile picture or app icon. White
                                    background."
                                </div>
                            </div>

                            {/* <!-- Prompt 3 --> */}
                            <div className="bg-[#0d0d0d] border border-brand-border rounded-lg overflow-hidden">
                                <div
                                    className="bg-brand-surface border-b border-brand-border px-4 py-2 flex justify-between items-center">
                                    <span className="text-xs font-mono text-brand-muted">Brand_Texture.txt</span>
                                    <button onClick={() => { copyToClipboard('prompt-texture'); }}
                                        className="text-xs font-mono text-brand-mint hover:text-white flex items-center gap-1">
                                        <i data-lucide="copy" className="w-3 h-3"></i> Copy
                                    </button>
                                </div>
                                <div className="p-4 font-mono text-sm text-brand-muted leading-relaxed" id="prompt-texture">
                                    "Abstract 3D background for a developer brand identity. Dark obsidian geometric shapes floating
                                    in a void. Illuminated by electric mint green laser lights. Cyberpunk meets clean corporate
                                    memphis design. Matte finish, soft shadows, high contrast, 8k resolution."
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="pb-10 lg:pb-20">
                        <div className="container-fluid">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-wrap">
                                <div className="lg:col-span-8">
                                    <div className="bg-white/10 p-8 rounded-xl h-full">
                                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">All Button Type</div>
                                        <div className="flex flex-wrap gap-5">
                                            <button className="btn btn-primary btn-sm">Primary SM</button>
                                            <button className="btn btn-primary">Primary</button>
                                            <button className="btn btn-primary btn-lg">Primary LG</button>
                                            <button className="btn btn-secondary btn-sm">Secondary SM</button>
                                            <button className="btn btn-secondary">Secondary</button>
                                            <button className="btn btn-secondary btn-lg">Secondary LG</button>
                                            <button className="btn btn-outline btn-sm">Outline SM</button>
                                            <button className="btn btn-outline">Outline</button>
                                            <button className="btn btn-primary btn-sm">Like <FaRegHeart /></button>
                                            <button className="btn btn-secondary btn-sm">Like <FaHeart /></button>
                                            <button className="btn btn-primary btn-sm">Like <FaRegFaceGrinHearts /></button>
                                            <button className="btn btn-secondary btn-sm">Like <FaHeartPulse /> </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-4">
                                    <div className="flex flex-col gap-5">
                                        <div className="bg-white/10 p-8 rounded-xl">
                                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">Like Button</div>
                                            <div className="flex flex-wrap gap-5">
                                                <button className="btn btn-secondary btn-sm" onClick={handleLikeItem1} >{likeBtn1.title} {likeBtn1.icon} </button>
                                                <button className="btn btn-secondary btn-sm" onClick={handleLikeItem2} >{likeBtn2.title} {likeBtn2.icon} </button>
                                            </div>
                                        </div>

                                        <div className="bg-white/10 p-8 rounded-xl">
                                            <div className="font-oswald text-[32px] font-bold leading-none mb-6">Counter</div>
                                            <div className="flex flex-wrap gap-5">
                                                <Counter />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-12">
                                    <div className="bg-white/10 p-8 rounded-xl">
                                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">List Group</div>
                                        <div className="flex flex-wrap gap-5">
                                            <div className="w-full">
                                                <ListGroup items={users || []} heading="Users" onSelectItem={handleSelectUser} />
                                            </div>
                                            <div className="w-full">
                                                <div className="text-2xl font-bold mb-2">User Table</div>
                                                <ListItemTable data={user} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Footer --> */}
                    <footer
                        className="border-t border-brand-border pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-brand-muted font-mono">
                            © 2025 mrahulrahi. All systems nominal.
                        </div>
                        <div className="flex gap-4">
                            <div
                                className="w-8 h-8 rounded bg-brand-surface border border-brand-border flex items-center justify-center hover:border-brand-mint transition-colors cursor-pointer">
                                <i data-lucide="github" className="w-4 h-4 text-brand-muted"></i>
                            </div>
                            <div
                                className="w-8 h-8 rounded bg-brand-surface border border-brand-border flex items-center justify-center hover:border-brand-mint transition-colors cursor-pointer">
                                <i data-lucide="twitter" className="w-4 h-4 text-brand-muted"></i>
                            </div>
                            <div
                                className="w-8 h-8 rounded bg-brand-surface border border-brand-border flex items-center justify-center hover:border-brand-mint transition-colors cursor-pointer">
                                <i data-lucide="figma" className="w-4 h-4 text-brand-muted"></i>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    )
}

export default StyleGuidePage