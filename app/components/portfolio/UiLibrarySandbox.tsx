'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Search, Component, Terminal, Copy, Check, Sparkles, BookOpen, Layers } from 'lucide-react';
import { getPublicUiToolsData } from '@/app/(admin)/admin/dataActions';

import Highlight from 'react-highlight';

// Import all 33 React components from the code-stack Components library
import BirthdayCard from '@/app/components/code-stack/BirthdayCard';
import BubbleSortAlgorithm from '@/app/components/code-stack/BubbleSortAlgorithm';
import Calculator from '@/app/components/code-stack/Calculator';
import ChoiceConverter from '@/app/components/code-stack/ChoiceConverter';
import ClassDemoComponent from '@/app/components/code-stack/ClassDemoComponent';
import DialogExamples from '@/app/components/code-stack/DialogExamples';
import DoublyLinkedList from '@/app/components/code-stack/DoublyLinkedList';
import EvenNumbersFilter from '@/app/components/code-stack/EvenNumbersFilter';
import FactorialCalculator from '@/app/components/code-stack/FactorialCalculator';
import FibonacciSeries from '@/app/components/code-stack/FibonacciSeries';
import FullExample from '@/app/components/code-stack/FullExample';
import GreenCircleMessage from '@/app/components/code-stack/GreenCircleMessage';
import JSBasicsCard from '@/app/components/code-stack/JSBasicsCard';
import LoginForm from '@/app/components/code-stack/LoginForm';
import LoopType from '@/app/components/code-stack/LoopType';
import MiniWindowControl from '@/app/components/code-stack/MiniWindowControl';
import MultiplicationTable from '@/app/components/code-stack/MultiplicationTable';
import PalindromeChecker from '@/app/components/code-stack/PalindromeChecker';
import ParkingPriceCalculator from '@/app/components/code-stack/ParkingPriceCalculator';
import PythonToReactDemo from '@/app/components/code-stack/PythonToReactDemo';
import QuadraticSolver from '@/app/components/code-stack/QuadraticSolver';
import RedCircleWithMessage from '@/app/components/code-stack/RedCircleWithMessage';
import RotatingSquares from '@/app/components/code-stack/RotatingSquares';
import ScopeDemo from '@/app/components/code-stack/ScopeDemo';
import SortIntegerList from '@/app/components/code-stack/SortIntegerList';
import StringPermutations from '@/app/components/code-stack/StringPermutations';
import StudentList from '@/app/components/code-stack/StudentList';
import StudentRecord from '@/app/components/code-stack/StudentRecord';
import { StyleManipulator } from '@/app/components/code-stack/StyleManipulator';
import SubjectAverageCalculator from '@/app/components/code-stack/SubjectAverageCalculator';
import SumTwoNumbers from '@/app/components/code-stack/SumTwoNumbers';
import SwitchCase from '@/app/components/code-stack/SwitchCase';
import TextTransfer from '@/app/components/code-stack/TextTransfer';


// Component Map for dynamic rendering
const COMPONENT_MAP: { [key: string]: React.ComponentType<any> } = {
    'palindrome-checker': PalindromeChecker,
    'factorial-calculator': FactorialCalculator,
    'parking-price-calculator': ParkingPriceCalculator,
    'bubble-sort-algorithm': BubbleSortAlgorithm,
    'sum-two-numbers': SumTwoNumbers,
    'switch-case': SwitchCase,
    'fibonacci-series': FibonacciSeries,
    'calculator': Calculator,
    'login-form': LoginForm,
    'mini-window-control': MiniWindowControl,
    'dialog-examples': DialogExamples,
    'text-transfer': TextTransfer,
    'style-manipulator': StyleManipulator,
    'js-basics': JSBasicsCard,
    'loops-in-js': LoopType,
    'full-example': FullExample,
    'birthday-card': BirthdayCard,
    'python-to-react-demo': PythonToReactDemo,
    'choice-converter': ChoiceConverter,
    'rotating-squares': RotatingSquares,
    'green-circle-message': GreenCircleMessage,
    'red-circle-with-message': RedCircleWithMessage,
    'quadratic-solver': QuadraticSolver,
    'student-list': StudentList,
    'student-record': StudentRecord,
    'doubly-linked-list': DoublyLinkedList,
    'sort-integer-list': SortIntegerList,
    'subject-average-calculator': SubjectAverageCalculator,
    'string-permutation': StringPermutations,
    'class-demo-simulation': ClassDemoComponent,
    'even-numbers-filter': EvenNumbersFilter,
    'multiplication-table': MultiplicationTable,
    'scope-demo': ScopeDemo
};

interface UiLibrarySandboxProps {
    isEmbedded?: boolean;
}

export default function UiLibrarySandbox({ isEmbedded = false }: UiLibrarySandboxProps) {
    const [uiComponents, setUiComponents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeComponentId, setActiveComponentId] = useState<string>('');
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
    const [copied, setCopied] = useState(false);
    const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        async function loadPublicData() {
            setLoading(true);
            try {
                const data = await getPublicUiToolsData();
                const visibleComponents = (data.uiComponents || []).filter((c: any) => c.visible);
                setUiComponents(visibleComponents);
                if (visibleComponents.length > 0) {
                    setActiveComponentId(visibleComponents[0].id);
                }
            } catch (err) {
                console.error("Failed to load components data", err);
            } finally {
                setLoading(false);
            }
        }
        loadPublicData();

        return () => {
            if (copyTimeoutRef.current) {
                clearTimeout(copyTimeoutRef.current);
            }
        };
    }, []);

    const activeComponent = uiComponents.find(c => c.id === activeComponentId);
    const SelectedComponent = activeComponent ? COMPONENT_MAP[activeComponent.id] : null;

    // Generate installation code
    const getCodeSnippet = () => {
        if (!activeComponent) return '';
        const name = activeComponent.name.replace(/\s+/g, '');
        return `import ${name} from '@/components/${name}';
 
export default function App() {
  return (
    <div className="container mx-auto p-6">
      <${name} />
    </div>
  );
}`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(getCodeSnippet()).then(() => {
            setCopied(true);
            if (copyTimeoutRef.current) {
                clearTimeout(copyTimeoutRef.current);
            }
            copyTimeoutRef.current = setTimeout(() => {
                setCopied(false);
                copyTimeoutRef.current = null;
            }, 2000);
        });
    };

    const filteredComponents = uiComponents.filter(item =>
        (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className={`text-slate-100 font-sans transition-colors duration-300 ${isEmbedded ? 'w-full py-0 px-0' : 'bg-[#0f172a] min-h-screen py-24 px-4 sm:px-6 lg:px-8'}`}>

                {/* Header Area (only render if not embedded) */}
                {!isEmbedded && (
                    <div className="max-w-7xl mx-auto text-center mb-16 relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-64 h-64 bg-brand-mint/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="inline-flex items-center gap-2 bg-brand-mint/10 text-brand-mint px-4 py-1.5 rounded-full text-xs font-mono mb-4 border border-brand-mint/20">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Spectrum UI Library</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-slate-200 to-slate-400 leading-tight">
                            Custom Component Sandbox
                        </h1>
                        <p className="text-slate-400 max-w-2xl mx-auto mt-4 text-base md:text-lg leading-relaxed">
                            Explore, interact, and integrate beautiful customized React widgets and modular interface elements built for speed and visual excellence.
                        </p>
                    </div>
                )}

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-3 text-slate-400 font-mono">
                        <span className="w-8 h-8 rounded-full border-4 border-slate-700 border-t-brand-mint animate-spin"></span>
                        <span>Assembling playground modules...</span>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto">
                        {uiComponents.length === 0 ? (
                            <div className="text-center py-20 bg-slate-900/50 border border-slate-800 rounded-3xl p-12">
                                <Layers className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-300">No components available</h3>
                                <p className="text-slate-500 mt-2">The administrator hasn't published any components to the UI Library yet.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                                {/* Left panel: List Sidebar */}
                                <div className={`lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col backdrop-blur-md ${isEmbedded ? 'h-125' : 'h-[calc(100vh-250px)] min-h-125'}`}>
                                    <div className="relative mb-4">
                                        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                        <input
                                            type="text"
                                            placeholder="Search components..."
                                            value={searchQuery}
                                            onChange={e => setSearchQuery(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 outline-none focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 text-sm transition-all"
                                        />
                                    </div>

                                    <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                                        {filteredComponents.length > 0 ? (
                                            filteredComponents.map(item => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => {
                                                        setActiveComponentId(item.id);
                                                        setActiveTab('preview');
                                                    }}
                                                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 group cursor-pointer ${activeComponentId === item.id
                                                            ? 'bg-brand-mint/10 border-brand-mint/40 text-white shadow-[0_0_15px_-3px_rgba(79,209,197,0.1)]'
                                                            : 'bg-slate-950/40 border-transparent hover:bg-slate-900/40 hover:border-slate-800 text-slate-400 hover:text-slate-200'
                                                        }`}
                                                >
                                                    <div className={`p-2 rounded-lg transition-colors shrink-0 ${activeComponentId === item.id
                                                            ? 'bg-brand-mint/20 text-brand-mint'
                                                            : 'bg-slate-900 text-slate-500 group-hover:text-slate-300'
                                                        }`}>
                                                        <Component className="w-4 h-4" />
                                                    </div>
                                                    <div className="truncate flex-1">
                                                        <h3 className="text-sm font-semibold truncate leading-normal">{item.name}</h3>
                                                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.description}</p>
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="text-center py-10 text-slate-500 font-mono text-xs">
                                                No matching components
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right panel: Active Preview Workspace */}
                                <div className="lg:col-span-8 space-y-6">
                                    {activeComponent && (
                                        <>
                                            {/* Component Intro Header */}
                                            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                                                        ID: {activeComponent.id}
                                                    </span>
                                                    <h2 className="text-2xl font-bold text-white tracking-wide">{activeComponent.name}</h2>
                                                    <p className="text-xs text-slate-400 max-w-xl leading-relaxed">{activeComponent.description}</p>
                                                </div>

                                                {/* Tab Switcher */}
                                                <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-1 shrink-0 self-start md:self-center">
                                                    <button
                                                        onClick={() => setActiveTab('preview')}
                                                        className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${activeTab === 'preview'
                                                                ? 'bg-slate-900 text-brand-mint shadow'
                                                                : 'text-slate-500 hover:text-slate-300'
                                                            }`}
                                                    >
                                                        <BookOpen className="w-3.5 h-3.5" />
                                                        Playground
                                                    </button>
                                                    <button
                                                        onClick={() => setActiveTab('code')}
                                                        className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${activeTab === 'code'
                                                                ? 'bg-slate-900 text-brand-mint shadow'
                                                                : 'text-slate-500 hover:text-slate-300'
                                                            }`}
                                                    >
                                                        <Terminal className="w-3.5 h-3.5" />
                                                        Integration Code
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Main Workspace Workspace */}
                                            {activeTab === 'preview' ? (
                                                <div className="bg-[#222831] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
                                                    {/* Mini Device Bar */}
                                                    <div className="bg-slate-950/70 border-b border-slate-800 px-5 py-3.5 flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                                                            <span className="text-[10px] font-mono text-slate-500 ml-2">sandbox-shell://{activeComponent.id}</span>
                                                        </div>
                                                        <div className="text-[10px] font-mono text-slate-400 bg-slate-900/60 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-pulse"></span> Live Render
                                                        </div>
                                                    </div>

                                                    {/* Component Render Frame */}
                                                    <div className="p-8 md:p-12 overflow-y-auto max-h-150 text-slate-200">
                                                        {SelectedComponent ? (
                                                            <div className="w-full flex items-center justify-center">
                                                                <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-inner">
                                                                    <SelectedComponent />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="text-center py-12 text-slate-500 font-mono text-xs">
                                                                Unable to load interactive render mapping
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                /* Code Snippet Tab */
                                                <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
                                                    <div className="bg-slate-900/40 px-5 py-3 flex items-center justify-between border-b border-slate-800">
                                                        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                                                            <Terminal className="w-3.5 h-3.5 text-brand-mint" />
                                                            <span>{activeComponent.name.replace(/\s+/g, '')}.tsx</span>
                                                        </div>
                                                        <button
                                                            onClick={handleCopy}
                                                            className="text-xs font-mono text-slate-400 hover:text-brand-mint bg-slate-950 border border-slate-800 hover:border-brand-mint/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                                                        >
                                                            {copied ? (
                                                                <>
                                                                    <Check className="w-3.5 h-3.5 text-brand-mint" />
                                                                    <span className="text-brand-mint">Copied!</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Copy className="w-3.5 h-3.5" />
                                                                    <span>Copy Snippet</span>
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                    <pre className="p-6 md:p-8 overflow-x-auto font-mono text-xs text-brand-mint leading-relaxed">
                                                        <code>{getCodeSnippet()}</code>
                                                    </pre>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-auto gap-4">
                {/* Palindrome Checker */}
                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Palindrome Checker
                        </div>

                        <PalindromeChecker />
                    </div>
                </div>

                {/* Factorial Calculator */}
                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Factorial Calculator
                        </div>

                        <FactorialCalculator />
                    </div>
                </div>

                {/* Parking Price Calculator */}
                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Parking Price Calculator
                        </div>

                        <ParkingPriceCalculator />
                    </div>
                </div>

                {/* Bubble Sort Algorithm */}
                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <BubbleSortAlgorithm />
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Sum of Two Numbers
                        </div>

                        <SumTwoNumbers />
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Switch Case
                        </div>

                        <SwitchCase />
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Fibonacci Series Generator
                        </div>

                        <div>
                            <main className="grid place-items-center">
                                <FibonacciSeries />
                            </main>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Calculator
                        </div>

                        <div>
                            <Calculator />
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Login Form
                        </div>

                        <div>
                            <LoginForm />
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Mini Window & Browser Info
                        </div>

                        <div>
                            <MiniWindowControl />
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Dialog Examples
                        </div>

                        <DialogExamples />
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Text Transfer
                        </div>
                        <TextTransfer />
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Style Manipulator
                        </div>
                        <div className="mb-2">
                            <StyleManipulator />
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            JS Basics
                        </div>

                        <JSBasicsCard />
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Alerts
                        </div>

                        <div className="container flex flex-col gap-4">
                            <p>Alerts are created with the .alert class, followed by a contextual color classes:</p>
                            <div className="alert alert-success">
                                <strong>Success!</strong> This alert box could indicate a successful or positive action.
                            </div>
                            <div className="alert alert-info">
                                <strong>Info!</strong> This alert box could indicate a neutral informative change or action.
                            </div>
                            <div className="alert alert-warning">
                                <strong>Warning!</strong> This alert box could indicate a warning that might need attention.
                            </div>
                            <div className="alert alert-error">
                                <strong>Danger!</strong> This alert box could indicate a dangerous or potentially negative action.
                            </div>
                            <div className="alert alert-success alert-soft">
                                <strong>Success!</strong> Indicates an important action.
                            </div>
                            <div className="alert  alert-info alert-soft">
                                <strong>Info!</strong> Indicates a slightly less important action.
                            </div>
                            <div className="alert alert-warning alert-soft">
                                <strong>Warning!</strong> Dark grey alert.
                            </div>
                            <div className="alert alert-error alert-soft">
                                <strong>Danger!</strong> Light grey alert.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Loops in JS
                        </div>

                        <LoopType />
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Full Example
                        </div>

                        <div>
                            <FullExample />
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Full Example
                        </div>

                        <div>
                            <main className="grid place-items-center">
                                <BirthdayCard />
                            </main>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Full Example
                        </div>

                        <div>
                            <main className="grid place-items-center">
                                <PythonToReactDemo />
                            </main>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Full Example
                        </div>

                        <div>
                            <main className="grid place-items-center">
                                <ChoiceConverter />
                            </main>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Full Example
                        </div>

                        <div>
                            <main className="grid place-items-center">
                                <RotatingSquares />
                            </main>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Full Example
                        </div>

                        <div>
                            <main className="grid place-items-center">
                                <GreenCircleMessage />
                            </main>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Full Example
                        </div>

                        <div>
                            <main className="grid place-items-center">
                                <RedCircleWithMessage />
                            </main>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Quadratic Equation Solver
                        </div>
                        <p className="mb-2">Quadratic equations are in the form <strong>ax² + bx + c = 0</strong></p>

                        <div>
                            <main className="grid place-items-center">
                                <QuadraticSolver />
                            </main>
                        </div>
                    </div>
                </div>

                <div className="w-full md:col-span-2">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <StudentList />
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <StudentRecord />
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Doubly Linked List Operations
                        </div>

                        <div>
                            <main className="grid place-items-center">
                                <DoublyLinkedList />
                            </main>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Sort Integer List
                        </div>

                        <div>
                            <main className="grid place-items-center">
                                <SortIntegerList />
                            </main>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Subject Average Calculator
                        </div>

                        <div>
                            <main className="grid place-items-center">
                                <SubjectAverageCalculator />
                            </main>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            String Permutation Generator
                        </div>

                        <div>
                            <main className="grid place-items-center">
                                <StringPermutations />
                            </main>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                            Class Demo Simulation (C++ → React)
                        </div>

                        <div>
                            <main className="grid place-items-center">
                                <ClassDemoComponent />
                            </main>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <EvenNumbersFilter />
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <MultiplicationTable />
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-8 rounded-xl">
                        <ScopeDemo />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-auto gap-4">
                <div className="w-full">
                    <div className="bg-white/10 p-5 rounded-xl h-full">
                        <h2 className="font-oswald text-[24px] font-bold leading-none mb-4">
                            First Lines
                        </h2>

                        <Highlight className="php rounded-2xl overflow-hidden">
                            {`<?php

echo "hello world! My first php script"."<br>";
echo 15 ."<br>";

?>`}
                        </Highlight>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-5 rounded-xl h-full">
                        <h2 className="font-oswald text-[24px] font-bold leading-none mb-4">
                            Variables
                        </h2>

                        <Highlight className="php rounded-2xl overflow-hidden">
                            {`<?php 

$myName ="Rahi";
echo $myName ."<br>";

$num1 = 6;
$num2 = 4;
$result = $num1+$num2;
echo $result ."<br>";

?>
  `}
                        </Highlight>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-5 rounded-xl h-full">
                        <h2 className="font-oswald text-[24px] font-bold leading-none mb-4">
                            Variables Scope
                        </h2>
                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">Global & Local Variables</h3>

                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`  <?php 

$global = "I am a global variable";
$local = "I am actually golbal";
function printTxt(){

    $local = "I am a local variable";

    GLOBAL $global;
     echo $global ."<br>";
     echo $local ."<br>";
 }

 printTxt()

?>
  `}
                        </Highlight>

                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">Static Variable</h3>
                        <Highlight className="php rounded-2xl overflow-hidden">
                            {`<?php

 function trackNumber(){
     STATIC $number = 0;
     $number++;
     echo $number ."<br>";
 }

 trackNumber();
 trackNumber();
 trackNumber();
 trackNumber();
 trackNumber();
 trackNumber();

?>`}

                        </Highlight>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-5 rounded-xl h-full">
                        <h2 className="font-oswald text-[24px] font-bold leading-none mb-4">
                            Data Types
                        </h2>
                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">String</h3>

                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<?php 

$x = "Hello world!";

echo $x;
echo "<br>";
var_dump($x);

?>
  `}
                        </Highlight>

                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">Integer</h3>
                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<?php

$x = 5985;

echo $x;
echo "<br>";
var_dump($x);

?>`}

                        </Highlight>

                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">Float</h3>
                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<?php

$x = 10.365;

echo $x;
echo "<br>";
var_dump($x);

?>`}

                        </Highlight>

                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">Boolean</h3>
                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<?php

$x = true;
$y = false;

echo $x;
echo $y;
echo "<br>";
var_dump($x);
var_dump($y);

?>`}

                        </Highlight>

                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">Array</h3>
                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<?php

$cars = array("Volvo","BMW","Toyota");
var_dump($cars);

?>`}

                        </Highlight>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-5 rounded-xl h-full">
                        <h2 className="font-oswald text-[24px] font-bold leading-none mb-4">
                            Conditional Statements
                        </h2>
                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">If Statement</h3>

                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<?php

$t = date("H");

if ($t < "20") {
  echo "Have a good day!";
}

?>`}
                        </Highlight>

                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">If...else Statement</h3>
                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<?php

$t = date("H");

if ($t < "20") {
  echo "Have a good day!";
} else {
  echo "Have a good night!";
}

?>`}

                        </Highlight>

                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">If...elseif...else Statement</h3>
                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<?php

$t = date("H");

if ($t < "10") {
  echo "Have a good morning!";
} elseif ($t < "20") {
  echo "Have a good day!";
} else {
  echo "Have a good night!";
}

?>`}

                        </Highlight>

                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">Switch Statement</h3>
                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<?php

$favcolor = "red";

switch ($favcolor) {
  case "red":
    echo "Your favorite color is red!";
    break;
  case "blue":
    echo "Your favorite color is blue!";
    break;
  case "green":
    echo "Your favorite color is green!";
    break;
  default:
    echo "Your favorite color is neither red, blue, nor green!";
}

?>`}

                        </Highlight>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-5 rounded-xl h-full">
                        <h2 className="font-oswald text-[24px] font-bold leading-none mb-4">
                            Loops
                        </h2>
                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">For Loop</h3>

                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<?php

for ($x = 0; $x <= 10; $x++) {
  echo "The number is: $x <br>";
}

?>`}
                        </Highlight>

                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">Foreach Loop</h3>
                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<?php

$colors = array("red", "green", "blue", "yellow");

foreach ($colors as $value) {
  echo "$value <br>";
}

?>`}

                        </Highlight>

                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">While Loop</h3>
                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<?php

$x = 1;

while($x <= 5) {
  echo "The number is: $x <br>";
  $x++;
}

?>`}

                        </Highlight>

                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">Do...while Loop</h3>
                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<?php

$x = 1;

do {
  echo "The number is: $x <br>";
  $x++;
} while ($x <= 5);

?>`}

                        </Highlight>

                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">PHP Break</h3>
                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<?php

for ($x = 0; $x < 10; $x++) {
  if ($x == 4) {
    break;
  }
  echo "The number is: $x <br>";
}

?>`}

                        </Highlight>

                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">PHP Continue</h3>
                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<?php

for ($x = 0; $x < 10; $x++) {
  if ($x == 4) {
    continue;
  }
  echo "The number is: $x <br>";
}

?>`}

                        </Highlight>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-5 rounded-xl h-full">
                        <h2 className="font-oswald text-[24px] font-bold leading-none mb-4">
                            PHP Functions
                        </h2>

                        <Highlight className="php rounded-2xl overflow-hidden">
                            {`<?php

function familyName($fname, $year) {
  echo "$fname Refsnes. Born in $year <br>";
}

familyName("Hege", "1975");
familyName("Stale", "1978");
familyName("Kai Jim", "1983");

?>`}
                        </Highlight>
                    </div>
                </div>

                <div className="w-full">
                    <div className="bg-white/10 p-5 rounded-xl h-full">
                        <h2 className="font-oswald text-[24px] font-bold leading-none mb-4">
                            PHP Superglobals
                        </h2>
                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">PHP $GLOBALS</h3>

                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<?php

$x = 75;
$y = 25;
 
function addition() {
  $GLOBALS['z'] = $GLOBALS['x'] + $GLOBALS['y'];
}
 
addition();
echo $z;

?>`}
                        </Highlight>

                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">PHP $_GET</h3>
                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<?php

echo "Study " . $_GET['subject'] . " at " . $_GET['web'];

?>`}

                        </Highlight>

                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">PHP $_POST</h3>
                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
  Name: <input type="text" name="fname">
  <input type="submit">
</form>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // collect value of input field
  $name = $_POST['fname'];
  if (empty($name)) {
    echo "Name is empty";
  } else {
    echo $name;
  }
}
?>`}

                        </Highlight>

                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">PHP $_SERVER</h3>
                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<?php
echo $_SERVER['PHP_SELF'];
echo "<br>";
echo $_SERVER['SERVER_NAME'];
echo "<br>";
echo $_SERVER['HTTP_HOST'];
echo "<br>";
echo $_SERVER['HTTP_REFERER'];
echo "<br>";
echo $_SERVER['HTTP_USER_AGENT'];
echo "<br>";
echo $_SERVER['SCRIPT_NAME'];
?>`}

                        </Highlight>

                        <h3 className="font-oswald text-[18px] font-semibold leading-none mb-4">PHP $_REQUEST</h3>
                        <Highlight className="php rounded-2xl overflow-hidden mb-2">
                            {`<form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
  Name: <input type="text" name="fname">
  <input type="submit">
</form>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // collect value of input field
  $name = $_REQUEST['fname'];
  if (empty($name)) {
    echo "Name is empty";
  } else {
    echo $name;
  }
}
?>`}

                        </Highlight>
                    </div>
                </div>
            </div>
        </>
    );
}
