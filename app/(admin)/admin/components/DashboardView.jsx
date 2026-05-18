import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Eye, Download, MousePointer, Plus, ArrowUp } from 'lucide-react';

const DashboardView = ({ theme }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;
        
        const ctx = chartRef.current.getContext('2d');
        const isDark = theme === 'dark';
        const gridColor = isDark ? '#27272A' : '#E5E7EB';
        const textColor = isDark ? '#A1A1AA' : '#6B7280';

        if (chartInstanceRef.current) {
            chartInstanceRef.current.options.scales.y.grid.color = gridColor;
            chartInstanceRef.current.options.scales.x.ticks.color = textColor;
            chartInstanceRef.current.options.scales.y.ticks.color = textColor;
            chartInstanceRef.current.update();
        } else {
            chartInstanceRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Visitors',
                        data: [120, 190, 300, 500, 220, 300, 450],
                        borderColor: '#00DC82',
                        backgroundColor: (context) => {
                            const ctx = context.chart.ctx;
                            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
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
                        y: { grid: { color: gridColor, borderDash: [4, 4] }, ticks: { color: textColor, font: { family: 'JetBrains Mono' } } }
                    }
                }
            });
        }
    }, [theme]);

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
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text">Site Overview</h2>
                    <p className="text-gray-500 dark:text-brand-muted mt-1">Analytics for mrahulrahi.vercel.app</p>
                </div>
                <div className="flex gap-2">
                    <a href="https://mrahulrahi.vercel.app/" target="_blank" rel="noreferrer" className="px-4 py-2 rounded bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border text-sm font-mono flex items-center gap-2 text-gray-900 dark:text-brand-text hover:border-brand-mint transition-colors">
                        <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse"></span> View Live Site
                    </a>
                    <button className="bg-brand-mint hover:bg-brand-fern hover:text-white text-brand-black px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" /> New Post
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Eye className="w-16 h-16 text-brand-mint" />
                    </div>
                    <p className="text-sm font-mono text-gray-500 dark:text-brand-muted">Total Views</p>
                    <p className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text mt-1">142.5k</p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-mono text-brand-mint">
                        <ArrowUp className="w-3 h-3" /> 8.4% vs last month
                    </div>
                </div>
                <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Download className="w-16 h-16 text-brand-fern" />
                    </div>
                    <p className="text-sm font-mono text-gray-500 dark:text-brand-muted">Library Downloads</p>
                    <p className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text mt-1">8.2k</p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-mono text-brand-mint">
                        <ArrowUp className="w-3 h-3" /> 12% vs last month
                    </div>
                </div>
                <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <MousePointer className="w-16 h-16 text-brand-glow" />
                    </div>
                    <p className="text-sm font-mono text-gray-500 dark:text-brand-muted">Portfolio Clicks</p>
                    <p className="text-3xl font-display font-bold text-gray-900 dark:text-brand-text mt-1">3,402</p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-mono text-brand-muted">
                        Avg session: 2m 14s
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-brand-surface border border-gray-200 dark:border-brand-border rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-900 dark:text-brand-text">Traffic Volume</h3>
                    <select className="bg-transparent border border-gray-200 dark:border-brand-border text-xs rounded px-2 py-1 text-gray-500 dark:text-brand-muted outline-none">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                    </select>
                </div>
                <div className="w-full h-80 chart-container">
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
