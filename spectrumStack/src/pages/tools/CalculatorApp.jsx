/* eslint-disable*/
import { useState } from 'react';

const CalculatorApp = () => {
    const [displayValue, setDisplayValue] = useState('');
    const [expression, setExpression] = useState('');
    const [bracketOpen, setBracketOpen] = useState(true);

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
        if (n === 0) return 1;
        return n * factorial(n - 1);
    };

    return (
        <div className="android-frame flex flex-col border-[0.425em] border-black rounded-[1.875rem] bg-[#151715] max-w-[400px] mx-auto">
            <div className="output-operation-class w-full" id="output-operation">
                <input type="text" className="output-screen w-full h-[4rem] text-end border-black rounded-[1.4rem_1.4rem_1.2rem_1.2rem] text-[1.25rem] bg-[#37303c] py-[0.8rem] px-[0.5rem] text-[#eddbf3] focus:outline-none placeholder:text-[#eddbf3]" id="output-id" placeholder='0' value={expression} readOnly />
            </div>
            <div className="input-btn-wrapper">
                <div className="mini-algo-function">
                    <button onClick={handleButtonClick} className="button mini-function">x²</button>
                    <button onClick={handleButtonClick} className="button mini-function">√</button>
                    <button onClick={handleButtonClick} className="button mini-function">π</button>
                    <button onClick={handleButtonClick} className="button mini-function">^</button>
                    <button onClick={handleButtonClick} className="button mini-function">!</button>
                </div>
                <div className="input-class">
                    <button onClick={handleButtonClick} className="button number-btn">7</button>
                    <button onClick={handleButtonClick} className="button number-btn">8</button>
                    <button onClick={handleButtonClick} className="button number-btn">9</button>
                    <button onClick={handleButtonClick} className="button function-btn">%</button>
                    <button onClick={handleButtonClick} className="button AC-btn">AC</button>
                    <button onClick={handleButtonClick} className="button number-btn">4</button>
                    <button onClick={handleButtonClick} className="button number-btn">5</button>
                    <button onClick={handleButtonClick} className="button number-btn">6</button>
                    <button onClick={handleButtonClick} className="button function-btn">x</button>
                    <button onClick={handleButtonClick} className="button function-btn">÷</button>
                    <button onClick={handleButtonClick} className="button number-btn">1</button>
                    <button onClick={handleButtonClick} className="button number-btn">2</button>
                    <button onClick={handleButtonClick} className="button number-btn">3</button>
                    <button onClick={handleButtonClick} className="button function-btn">+</button>
                    <button onClick={handleButtonClick} className="button function-btn">-</button>
                    <button onClick={handleButtonClick} className="button number-btn">0</button>
                    <button onClick={handleButtonClick} className="button number-btn">.</button>
                    <button onClick={handleButtonClick} className="button C-btn">C</button>
                    <button onClick={handleButtonClick} className="button function-btn">()</button>
                    <button onClick={handleButtonClick} className="button equal-btn">=</button>
                </div>
            </div>
        </div>
    )
}

export default CalculatorApp