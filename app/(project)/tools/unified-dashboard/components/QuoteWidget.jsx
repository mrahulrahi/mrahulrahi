'use client'
import { useState, useEffect } from 'react';
import { FiShare, FiCopy } from "react-icons/fi";
import { FaQuoteLeft } from 'react-icons/fa';
import { useGradient } from '@/app/context/GradientContext';

const QuoteWidget = () => {
    const [currentQuote, setCurrentQuote] = useState('');
    const [currentAuthor, setCurrentAuthor] = useState('');
    const context = useGradient();
    const gradientStyle = context ? context.gradientStyle : { backgroundImage: 'linear-gradient(to right, #00DC82, #00B159)' };

    const getRandomQuote = async () => {
        try {
            const response = await fetch(
                'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
            );
            if (response.ok) {
                const jsonQuotes = await response.json();
                const randomIndex = Math.floor(Math.random() * jsonQuotes.quotes.length);
                return jsonQuotes.quotes[randomIndex];
            } else {
                console.error('Error fetching quotes:', response.status);
                return null;
            }
        } catch (error) {
            console.error('Error fetching quotes:', error);
            return null;
        }
    };

    const updateQuote = async () => {
        const result = await getRandomQuote();
        if (result) {
            setCurrentQuote(result.quote);
            setCurrentAuthor(result.author);
        } else {
            setCurrentQuote("Believe you can and you're halfway there.");
            setCurrentAuthor("Theodore Roosevelt");
        }
    };

    useEffect(() => {
        updateQuote();
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`"${currentQuote}" - ${currentAuthor}`);
        alert('Quote copied to clipboard!!!');
    };

    const shareQuote = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Quote',
                text: `"${currentQuote}" - ${currentAuthor}`,
            }).catch((error) => console.error('Error sharing', error));
        } else {
            alert('Share feature is not supported in your browser.');
        }
    };

    return (
        <div className="quote-wrapper py-3 px-3 md:py-5 md:px-5 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-md w-full flex flex-col justify-between min-h-[220px]">
            <div className="quote-box flex flex-col mb-4">
                <span className="quote-icon text-brand-mint text-xl mb-2"><FaQuoteLeft /></span>
                <div className="quote-text bg-clip-text text-transparent text-lg font-bold leading-relaxed" style={gradientStyle}>
                    {currentQuote}
                </div>
                <div className="quote-author mt-2 bg-clip-text text-transparent text-xs font-mono font-bold" style={gradientStyle}>
                    - {currentAuthor}
                </div>
            </div>

            <div className="quote-btn-group flex shrink-0 gap-3 pt-3 border-t border-slate-800/40">
                <button className="btn-transparent p-2 border border-slate-800 rounded-xl hover:border-slate-700 text-slate-400 hover:text-white transition-colors" onClick={shareQuote} title="Share this quote">
                    <FiShare className="w-4 h-4" />
                </button>

                <button className="btn-transparent p-2 border border-slate-800 rounded-xl hover:border-slate-700 text-slate-400 hover:text-white transition-colors" onClick={copyToClipboard} title="Copy to clipboard">
                    <FiCopy className="w-4 h-4" />
                </button>

                <button className="btn-transparent lg px-4 py-1.5 border border-slate-800 rounded-xl hover:border-slate-700 ml-auto transition-colors" onClick={updateQuote}>
                    <span className="btn-transparent-text bg-clip-text text-transparent font-bold text-xs" style={gradientStyle}>New quote</span>
                </button>
            </div>
        </div>
    );
};

export default QuoteWidget;
