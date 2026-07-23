'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Code2, Sparkles, Terminal, Copy, Check, Info, Grid, Sliders, ArrowRightLeft } from 'lucide-react';

interface CodeTopic {
    id: string;
    title: string;
    description: string;
    category: 'Algorithms' | 'React Hooks' | 'Tailwind CSS' | 'Data Structures';
    code: string;
    language: string;
}

const TOPICS: CodeTopic[] = [
    {
        id: 'bubble-sort',
        title: 'Bubble Sort Visualizer',
        description: 'An interactive simulation demonstrating how bubble sort iteratively swaps adjacent elements to sort an array. Ideal for learning computational complexity.',
        category: 'Algorithms',
        language: 'typescript',
        code: `function bubbleSort(arr: number[]): number[] {
    const n = arr.length;
    let swapped: boolean;
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
}`
    },
    {
        id: 'debounce-search',
        title: 'Debounce Search Hook',
        description: 'Learn how to throttle server requests using debouncing in React. Delays action execution until user stops typing for a designated period.',
        category: 'React Hooks',
        language: 'typescript',
        code: `import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}`
    },
    {
        id: 'tailwind-grid',
        title: 'Responsive CSS Grid',
        description: 'Interactive playground to understand CSS Grid layouts and Tailwind utility classes. Dynamically adjust column spans, gaps, and responsiveness parameters.',
        category: 'Tailwind CSS',
        language: 'html',
        code: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-slate-900 rounded-3xl border border-slate-800">
    <div class="bg-linear-to-br from-brand-mint/10 to-brand-mint/5 p-6 rounded-2xl border border-brand-mint/20 text-center">Card 1</div>
    <div class="bg-linear-to-br from-brand-mint/10 to-brand-mint/5 p-6 rounded-2xl border border-brand-mint/20 text-center">Card 2</div>
    <div class="bg-linear-to-br from-brand-mint/10 to-brand-mint/5 p-6 rounded-2xl border border-brand-mint/20 text-center">Card 3</div>
    <div class="bg-linear-to-br from-brand-mint/10 to-brand-mint/5 p-6 rounded-2xl border border-brand-mint/20 text-center">Card 4</div>
</div>`
    },
    {
        id: 'linked-list',
        title: 'Doubly Linked List Node',
        description: 'Visualize node insertions and pointer modifications in a Doubly Linked List. Master node-level reference bindings dynamically.',
        category: 'Data Structures',
        language: 'typescript',
        code: `class ListNode<T> {
    public value: T;
    public next: ListNode<T> | null = null;
    public prev: ListNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

class DoublyLinkedList<T> {
    private head: ListNode<T> | null = null;
    private tail: ListNode<T> | null = null;

    public append(value: T): void {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            if (this.tail) this.tail.next = newNode;
            this.tail = newNode;
        }
    }
}`
    }
];

export default function EducationalCodeBlocks() {
    const [selectedTopicId, setSelectedTopicId] = useState<string>('bubble-sort');
    const [copied, setCopied] = useState<boolean>(false);

    // Bubble Sort Visualizer State
    const [array, setArray] = useState<number[]>([45, 22, 89, 12, 67, 34, 50]);
    const [sortingSteps, setSortingSteps] = useState<number[][]>([]);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [speed, setSpeed] = useState<number>(500);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Debounce Visualizer State
    const [searchVal, setSearchVal] = useState<string>('');
    const [debouncedVal, setDebouncedVal] = useState<string>('');
    const [logs, setLogs] = useState<string[]>([]);

    // Tailwind Grid Visualizer State
    const [cols, setCols] = useState<number>(3);
    const [gap, setGap] = useState<string>('gap-6');
    const [align, setAlign] = useState<string>('items-center');

    // Linked List Visualizer State
    const [listNodes, setListNodes] = useState<string[]>(['Head', 'Alpha', 'Beta', 'Tail']);
    const [newNodeVal, setNewNodeVal] = useState<string>('');

    const activeTopic = TOPICS.find(t => t.id === selectedTopicId) || TOPICS[0];

    // Handle Code Copy
    const handleCopy = () => {
        navigator.clipboard.writeText(activeTopic.code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    // Bubble Sort Step Generator
    const generateSortSteps = (arr: number[]) => {
        const steps: number[][] = [[...arr]];
        const temp = [...arr];
        const n = temp.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (temp[j] > temp[j + 1]) {
                    const swap = temp[j];
                    temp[j] = temp[j + 1];
                    temp[j + 1] = swap;
                    steps.push([...temp]);
                }
            }
        }
        setSortingSteps(steps);
        setCurrentStep(0);
    };

    useEffect(() => {
        if (selectedTopicId === 'bubble-sort') {
            generateSortSteps(array);
        }
    }, [selectedTopicId, array]);

    // Sorting Loop
    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(() => {
                setCurrentStep(prev => {
                    if (prev >= sortingSteps.length - 1) {
                        setIsPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, speed);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, sortingSteps, speed]);

    // Debounce Simulation Effect
    useEffect(() => {
        if (selectedTopicId !== 'debounce-search') return;
        if (searchVal) {
            setLogs(prev => [`[TYPING] "${searchVal}" - Setting timer...`, ...prev.slice(0, 10)]);
        }
        const handler = setTimeout(() => {
            if (searchVal) {
                setDebouncedVal(searchVal);
                setLogs(prev => [`[SUCCESS] Debounce trigger fired. Active Term: "${searchVal}"`, ...prev.slice(0, 10)]);
            }
        }, 800);
        return () => clearTimeout(handler);
    }, [searchVal, selectedTopicId]);

    // Reset Sort Visualizer
    const handleResetSort = () => {
        setIsPlaying(false);
        const randomized = Array.from({ length: 7 }, () => Math.floor(Math.random() * 90) + 10);
        setArray(randomized);
    };

    return (
        <div className="bg-slate-950 text-slate-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-10 w-64 h-64 bg-brand-mint/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="inline-flex items-center gap-2 bg-brand-mint/10 text-brand-mint px-4 py-1.5 rounded-full text-xs font-mono mb-4 border border-brand-mint/20">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Interactive Educational Academy</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-wide">
                        Developer Code Academy
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto mt-4 text-sm md:text-base leading-relaxed">
                        Master essential programming concepts, data structures, and CSS mechanics with interactive, live-executing simulations.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Interactive Code Navigation */}
                    <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-5 backdrop-blur-md">
                        <h2 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4 px-1">Concept Matrix</h2>
                        <div className="space-y-2">
                            {TOPICS.map(topic => (
                                <button
                                    key={topic.id}
                                    onClick={() => setSelectedTopicId(topic.id)}
                                    className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-1 group ${
                                        selectedTopicId === topic.id
                                            ? 'bg-brand-mint/10 border-brand-mint/40 text-white shadow-[0_0_15px_-3px_rgba(79,209,197,0.1)]'
                                            : 'bg-slate-950/40 border-transparent hover:bg-slate-900/60 hover:border-slate-800/80 text-slate-400 hover:text-slate-200'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800 uppercase tracking-wider text-slate-500 group-hover:text-slate-400">
                                            {topic.category}
                                        </span>
                                        <Code2 className={`w-4 h-4 ${selectedTopicId === topic.id ? 'text-brand-mint' : 'text-slate-600'}`} />
                                    </div>
                                    <h3 className="text-sm font-bold tracking-wide mt-2">{topic.title}</h3>
                                    <p className="text-[11px] text-slate-500 leading-normal line-clamp-2 mt-1">{topic.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Code Block and Interactive Runner Playground */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Topic Header Card */}
                        <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md">
                            <h2 className="text-2xl font-bold text-white tracking-wide">{activeTopic.title}</h2>
                            <p className="text-xs text-slate-400 leading-relaxed mt-2">{activeTopic.description}</p>
                        </div>

                        {/* Interactive Sandbox & Code Pane Grid */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {/* Visual Simulator Pane */}
                            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl overflow-hidden backdrop-blur-md flex flex-col">
                                <div className="bg-slate-950 border-b border-slate-800 px-5 py-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Sliders className="w-4 h-4 text-brand-mint" />
                                        <span className="text-xs font-mono text-slate-400">Live Simulator</span>
                                    </div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-brand-mint animate-pulse" />
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-center min-h-75">
                                    {/* Bubble Sort Visualizer */}
                                    {activeTopic.id === 'bubble-sort' && (
                                        <div className="space-y-6 w-full">
                                            {/* Array Bars */}
                                            <div className="flex items-end justify-center gap-3 h-40 bg-slate-950/60 rounded-2xl p-4 border border-slate-800/60">
                                                {(sortingSteps[currentStep] || array).map((value, idx) => (
                                                    <div
                                                        key={idx}
                                                        style={{ height: `${value}%` }}
                                                        className="w-8 rounded-t-lg bg-linear-to-t from-brand-fern to-brand-mint text-brand-black text-[9px] font-mono font-bold flex items-end justify-center pb-2 transition-all duration-300 shadow-[0_0_10px_rgba(0,220,130,0.15)]"
                                                    >
                                                        {value}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Simulator Controls */}
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => setIsPlaying(prev => !prev)}
                                                            className="p-2.5 rounded-xl bg-brand-mint hover:bg-brand-glow text-brand-black font-bold transition-all shadow-md flex items-center justify-center cursor-pointer"
                                                        >
                                                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                                        </button>
                                                        <button
                                                            onClick={handleResetSort}
                                                            className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-brand-mint/30 text-slate-400 hover:text-white transition-all cursor-pointer"
                                                            title="Generate Random Array"
                                                        >
                                                            <RotateCcw className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded border border-slate-800">
                                                        STEP {currentStep + 1} / {sortingSteps.length}
                                                    </span>
                                                </div>

                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-[9px] font-mono text-slate-500">
                                                        <span>SPEED CONTROL</span>
                                                        <span>{speed}MS</span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="100"
                                                        max="1000"
                                                        step="100"
                                                        value={speed}
                                                        onChange={e => setSpeed(Number(e.target.value))}
                                                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-mint"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Debounce Search Visualizer */}
                                    {activeTopic.id === 'debounce-search' && (
                                        <div className="space-y-5 w-full">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Type Search Term</label>
                                                <input
                                                    type="text"
                                                    placeholder="Type fast to see debounce lag..."
                                                    value={searchVal}
                                                    onChange={e => setSearchVal(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-brand-mint/50 focus:ring-1 focus:ring-brand-mint/30 text-white outline-none transition-all font-mono text-sm shadow-inner"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-center">
                                                    <div className="text-[8px] font-mono text-slate-500">IMMEDIATE STATE</div>
                                                    <div className="text-sm font-mono font-bold text-white mt-1 h-6 truncate">
                                                        {searchVal || '---'}
                                                    </div>
                                                </div>
                                                <div className="bg-slate-950 p-4 rounded-xl border border-brand-mint/20 text-center">
                                                    <div className="text-[8px] font-mono text-brand-mint/70">DEBOUNCED VALUE (800ms)</div>
                                                    <div className="text-sm font-mono font-bold text-brand-mint mt-1 h-6 truncate">
                                                        {debouncedVal || '---'}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Interactive Hook Logs */}
                                            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/80 max-h-40 overflow-y-auto flex flex-col gap-1.5">
                                                <div className="text-[8px] font-mono text-slate-500 uppercase tracking-wider border-b border-slate-900 pb-1.5 mb-1.5 flex justify-between">
                                                    <span>Engine Logs</span>
                                                    <span className="text-[7px] text-brand-mint">REAL-TIME</span>
                                                </div>
                                                {logs.length > 0 ? (
                                                    logs.map((log, i) => (
                                                        <div key={i} className="text-[10px] font-mono text-slate-400 truncate">
                                                            {log}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-center py-6 text-[10px] font-mono text-slate-600">
                                                        Waiting for operator search input...
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Tailwind Responsive Grid Visualizer */}
                                    {activeTopic.id === 'tailwind-grid' && (
                                        <div className="space-y-5 w-full">
                                            {/* Interactive Controller Grid */}
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="space-y-1">
                                                    <label className="text-[8px] font-mono text-slate-500 uppercase">Columns</label>
                                                    <select
                                                        value={cols}
                                                        onChange={e => setCols(Number(e.target.value))}
                                                        className="w-full bg-slate-950 border border-slate-800 text-xs font-semibold p-2 rounded-lg text-slate-300 outline-none focus:border-brand-mint/40"
                                                    >
                                                        <option value="1">1 Col</option>
                                                        <option value="2">2 Cols</option>
                                                        <option value="3">3 Cols</option>
                                                        <option value="4">4 Cols</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[8px] font-mono text-slate-500 uppercase">Gap</label>
                                                    <select
                                                        value={gap}
                                                        onChange={e => setGap(e.target.value)}
                                                        className="w-full bg-slate-950 border border-slate-800 text-xs font-semibold p-2 rounded-lg text-slate-300 outline-none focus:border-brand-mint/40"
                                                    >
                                                        <option value="gap-2">gap-2 (8px)</option>
                                                        <option value="gap-4">gap-4 (16px)</option>
                                                        <option value="gap-6">gap-6 (24px)</option>
                                                        <option value="gap-8">gap-8 (32px)</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[8px] font-mono text-slate-500 uppercase">Align</label>
                                                    <select
                                                        value={align}
                                                        onChange={e => setAlign(e.target.value)}
                                                        className="w-full bg-slate-950 border border-slate-800 text-xs font-semibold p-2 rounded-lg text-slate-300 outline-none focus:border-brand-mint/40"
                                                    >
                                                        <option value="items-start">items-start</option>
                                                        <option value="items-center">items-center</option>
                                                        <option value="items-end">items-end</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Render Grid Preview Box */}
                                            <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl min-h-36">
                                                <div className={`grid grid-cols-${cols} ${gap} ${align} w-full transition-all duration-300`}>
                                                    {Array.from({ length: cols * 2 }).map((_, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-[9px] font-mono font-bold py-3.5 px-2 rounded-xl text-center shadow-inner hover:scale-105 transition-transform"
                                                        >
                                                            Node {idx + 1}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Generated Tailwind Grid Classes Tag */}
                                            <div className="bg-slate-950 rounded-xl p-3 border border-slate-800/80">
                                                <div className="text-[8px] font-mono text-slate-500 mb-1 uppercase tracking-wider">Tailwind Utility Signature</div>
                                                <code className="text-[10px] font-mono text-brand-mint">{`<div class="grid grid-cols-${cols} ${gap} ${align}">`}</code>
                                            </div>
                                        </div>
                                    )}

                                    {/* Linked List Visualizer */}
                                    {activeTopic.id === 'linked-list' && (
                                        <div className="space-y-6 w-full">
                                            {/* Visual Node Queue */}
                                            <div className="flex items-center flex-wrap gap-2 justify-center py-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 min-h-35">
                                                {listNodes.map((val, idx) => (
                                                    <React.Fragment key={idx}>
                                                        <div className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 flex flex-col items-center gap-1 min-w-17.5 shadow-md relative group hover:border-brand-mint/30 transition-all">
                                                            <span className="text-[9px] font-mono text-slate-500">Node[{idx}]</span>
                                                            <span className="text-xs font-mono font-bold text-white">{val}</span>

                                                            {/* Mini Pointer Overlay */}
                                                            <div className="absolute -bottom-4 hidden group-hover:block bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-[8px] font-mono text-slate-400 z-10 whitespace-nowrap">
                                                                prev: {idx > 0 ? `Node[${idx-1}]` : 'null'}<br />
                                                                next: {idx < listNodes.length - 1 ? `Node[${idx+1}]` : 'null'}
                                                            </div>
                                                        </div>
                                                        {idx < listNodes.length - 1 && (
                                                            <div className="flex flex-col items-center justify-center text-slate-600">
                                                                <ArrowRightLeft className="w-4 h-4 text-brand-mint/60" />
                                                            </div>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </div>

                                            {/* Node Modifier Controls */}
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={newNodeVal}
                                                    onChange={e => setNewNodeVal(e.target.value)}
                                                    placeholder="Enter node label..."
                                                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white outline-none focus:border-brand-mint/40"
                                                />
                                                <button
                                                    onClick={() => {
                                                        if (newNodeVal.trim()) {
                                                            setListNodes(prev => [...prev, newNodeVal.trim()]);
                                                            setNewNodeVal('');
                                                        }
                                                    }}
                                                    className="px-4 py-2 bg-brand-mint hover:bg-brand-glow text-brand-black font-bold font-mono text-xs rounded-xl shadow-md cursor-pointer transition-all shrink-0"
                                                >
                                                    Append Node
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (listNodes.length > 1) {
                                                            setListNodes(prev => prev.slice(0, -1));
                                                        }
                                                    }}
                                                    className="px-4 py-2 bg-slate-950 border border-slate-800 hover:border-red-900/40 text-slate-400 hover:text-red-400 font-bold font-mono text-xs rounded-xl cursor-pointer transition-all shrink-0"
                                                >
                                                    Pop
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Code Snippet Pane */}
                            <div className="bg-slate-950 border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                                <div className="bg-slate-900/40 px-5 py-4 flex items-center justify-between border-b border-slate-800">
                                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                                        <Terminal className="w-3.5 h-3.5 text-brand-mint" />
                                        <span className="uppercase tracking-wider">{activeTopic.language} schema</span>
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
                                                <span>Copy Code</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                                <pre className="p-6 overflow-x-auto font-mono text-[11px] text-brand-mint leading-relaxed flex-1 min-h-75 max-h-112.5">
                                    <code>{activeTopic.code}</code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
