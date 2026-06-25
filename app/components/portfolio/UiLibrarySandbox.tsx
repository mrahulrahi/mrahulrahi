'use client'

import React, { useState, useEffect } from 'react';
import { Search, Component, Terminal, Copy, Check, Sparkles, BookOpen, Layers } from 'lucide-react';
import { getPublicUiToolsData } from '@/app/(admin)/admin/dataActions';

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
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const filteredComponents = uiComponents.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
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
                            <div className={`lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col backdrop-blur-md ${isEmbedded ? 'h-[500px]' : 'h-[calc(100vh-250px)] min-h-[500px]'}`}>
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
                                                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 group cursor-pointer ${
                                                    activeComponentId === item.id
                                                        ? 'bg-brand-mint/10 border-brand-mint/40 text-white shadow-[0_0_15px_-3px_rgba(79,209,197,0.1)]'
                                                        : 'bg-slate-950/40 border-transparent hover:bg-slate-900/40 hover:border-slate-800 text-slate-400 hover:text-slate-200'
                                                }`}
                                            >
                                                <div className={`p-2 rounded-lg transition-colors shrink-0 ${
                                                    activeComponentId === item.id
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
                                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                                                        activeTab === 'preview'
                                                            ? 'bg-slate-900 text-brand-mint shadow'
                                                            : 'text-slate-500 hover:text-slate-300'
                                                    }`}
                                                >
                                                    <BookOpen className="w-3.5 h-3.5" />
                                                    Playground
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab('code')}
                                                    className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                                                        activeTab === 'code'
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
                                                <div className="p-8 md:p-12 overflow-y-auto max-h-[600px] text-slate-200">
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
    );
}
