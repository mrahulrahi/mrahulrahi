'use client'
import { useState } from 'react';
import { useGradient } from '@/app/context/GradientContext';

const CalculatorWidget = () => {
    const [displayValue, setDisplayValue] = useState('');
    const [expression, setExpression] = useState('');
    const [bracketOpen, setBracketOpen] = useState(true);
    const context = useGradient();
    const gradientStyle = context ? context.gradientStyle : { backgroundImage: 'linear-gradient(to right, #00DC82, #00B159)' };

    const handleButtonClick = (buttonText) => {
        const buttonValue = buttonText.target.innerHTML;
        if (buttonValue === '=') {
            evaluateExpression();
        } else if (buttonValue === 'AC') {
            clear();
        } else if (buttonValue === 'C') {
            backSpace();
        } else if (buttonValue === 'x') {
            setExpression((prevValue) => prevValue + '*');
        } else if (buttonValue === '÷') {
            setExpression((prevValue) => prevValue + '/');
        } else if (buttonValue === 'π') {
            setExpression((prevValue) => prevValue + Math.PI);
        } else if (buttonValue === '%') {
            setExpression((prevValue) => prevValue + '/100');
        } else if (buttonValue === 'x²') {
            setExpression((prevValue) => `Math.pow(${prevValue}, 2)`);
        } else if (buttonValue === '√') {
            setExpression((prevValue) => `Math.sqrt(${prevValue})`);
        } else if (buttonValue === '^') {
            setExpression((prevValue) => prevValue + '**');
        } else if (buttonValue === '!') {
            setExpression((prevValue) => `factorial(${prevValue})`);
        } else if (buttonValue === '()') {
            setExpression((prevValue) => prevValue + (bracketOpen ? '(' : ')'));
            setBracketOpen(!bracketOpen);
        } else {
            setExpression((prevValue) => prevValue + buttonValue);
        }
    };

    const evaluateExpression = () => {
        try {
            const result = eval(expression.replace(/Math\.pow\(([^,]+), 2\)/g, '($1)**2').replace(/Math\.sqrt\(([^)]+)\)/g, 'Math.sqrt($1)').replace(/factorial\(([^)]+)\)/g, 'factorial($1)'));
            setDisplayValue(result.toString());
            setExpression(result.toString());
        } catch (error) {
            setDisplayValue('Syntax Error');
        }
    };

    const clear = () => {
        setDisplayValue('');
        setExpression('');
    };

    const backSpace = () => {
        setExpression((prevValue) => prevValue.slice(0, -1));
    };

    const factorial = (n) => {
        if (isNaN(n) || n < 0) return 0;
        n = Math.floor(n);
        if (n === 0) return 1;
        if (n > 170) return Infinity; // JS max float limit
        return n * factorial(n - 1);
    };

    return (
        <div className="py-3 px-3 md:py-5 md:px-5 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-md w-full">
            <div className="android-frame flex flex-col border-[0.425em] border-slate-800 rounded-[1.875rem] bg-[#151715] max-w-full mx-auto overflow-hidden shadow-inner">
                <div className="output-operation-class w-full" id="output-operation">
                    <input type="text" className="output-screen w-full h-16 text-end border-b border-slate-800 text-[1.25rem] bg-slate-950/60 py-[0.8rem] px-4 text-[#eddbf3] focus:outline-none placeholder:text-[#eddbf3]/40" id="output-id" placeholder='0' value={expression} readOnly />
                </div>
                <div className="input-btn-wrapper pt-4 px-3 pb-4">
                    <div className="mini-algo-function flex justify-evenly text-auto w-full text-[#dfcee5] mb-2.5 gap-2">
                        <button onClick={handleButtonClick} className="button mini-function w-1/5 text-[#dfcee5] bg-[#4f4256]/60 border border-slate-800 rounded-full text-xs font-semibold h-7 active:rounded-lg ease-in cursor-pointer">x²</button>
                        <button onClick={handleButtonClick} className="button mini-function w-1/5 text-[#dfcee5] bg-[#4f4256]/60 border border-slate-800 rounded-full text-xs font-semibold h-7 active:rounded-lg ease-in cursor-pointer">√</button>
                        <button onClick={handleButtonClick} className="button mini-function w-1/5 text-[#dfcee5] bg-[#4f4256]/60 border border-slate-800 rounded-full text-xs font-semibold h-7 active:rounded-lg ease-in cursor-pointer">π</button>
                        <button onClick={handleButtonClick} className="button mini-function w-1/5 text-[#dfcee5] bg-[#4f4256]/60 border border-slate-800 rounded-full text-xs font-semibold h-7 active:rounded-lg ease-in cursor-pointer">^</button>
                        <button onClick={handleButtonClick} className="button mini-function w-1/5 text-[#dfcee5] bg-[#4f4256]/60 border border-slate-800 rounded-full text-xs font-semibold h-7 active:rounded-lg ease-in cursor-pointer">!</button>
                    </div>
                    <div className="input-class w-full grid gap-2 rounded-[0_0_1.49rem_1.49rem] grid-cols-5 items-center justify-items-center text-[#eddbf3]">
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-full text-[#eddbf3] bg-[#262229] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">7</button>
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-full text-[#eddbf3] bg-[#262229] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">8</button>
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-full text-[#eddbf3] bg-[#262229] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">9</button>
                        <button onClick={handleButtonClick} className="button function-btn w-full aspect-square rounded-full text-[#efddf5] bg-[#4f4256] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">%</button>
                        <button onClick={handleButtonClick} className="button Ac-btn w-full aspect-square rounded-full text-[#fcd7da] bg-[#6e353b] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">AC</button>
                        
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-full text-[#eddbf3] bg-[#262229] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">4</button>
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-full text-[#eddbf3] bg-[#262229] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">5</button>
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-full text-[#eddbf3] bg-[#262229] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">6</button>
                        <button onClick={handleButtonClick} className="button function-btn w-full aspect-square rounded-full text-[#efddf5] bg-[#4f4256] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">x</button>
                        <button onClick={handleButtonClick} className="button function-btn w-full aspect-square rounded-full text-[#efddf5] bg-[#4f4256] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">÷</button>
                        
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-full text-[#eddbf3] bg-[#262229] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">1</button>
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-full text-[#eddbf3] bg-[#262229] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">2</button>
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-full text-[#eddbf3] bg-[#262229] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">3</button>
                        <button onClick={handleButtonClick} className="button function-btn w-full aspect-square rounded-full text-[#efddf5] bg-[#4f4256] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">+</button>
                        <button onClick={handleButtonClick} className="button function-btn w-full aspect-square rounded-full text-[#efddf5] bg-[#4f4256] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">-</button>
                        
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-full text-[#eddbf3] bg-[#262229] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">0</button>
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-full text-[#eddbf3] bg-[#262229] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">.</button>
                        <button onClick={handleButtonClick} className="button c-btn w-full aspect-square rounded-full text-[#eddbf3] bg-[#262229] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">C</button>
                        <button onClick={handleButtonClick} className="button function-btn w-full aspect-square rounded-full text-[#efddf5] bg-[#4f4256] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer">()</button>
                        <button onClick={handleButtonClick} className="button equal-btn w-full aspect-square rounded-full text-[#f4d9ff] bg-[#5b3774] border border-slate-800/20 text-center text-xs active:rounded-lg cursor-pointer" style={gradientStyle}>=</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalculatorWidget;
