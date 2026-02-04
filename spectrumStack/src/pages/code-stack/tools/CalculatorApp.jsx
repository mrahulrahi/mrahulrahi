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
        <div className="py-3 px-3 md:py-5 md:px-5">
            <div className="android-frame flex flex-col border-[0.425em] border-black rounded-[1.875rem] bg-[#151715] max-w-[400px] mx-auto">
                <div className="output-operation-class w-full" id="output-operation">
                    <input type="text" className="output-screen w-full h-16 text-end border-black rounded-[1.4rem_1.4rem_1.2rem_1.2rem] text-[1.25rem] bg-[#37303c] py-[0.8rem] px-2 text-[#eddbf3] focus:outline-none placeholder:text-[#eddbf3]" id="output-id" placeholder='0' value={expression} readOnly />
                </div>
                <div className="input-btn-wrapper pt-[30px] px-2.5 pb-5">
                    <div className="mini-algo-function flex justify-evenly text-auto w-full text-[#dfcee5] mb-3 gap-2.5">
                        <button onClick={handleButtonClick} className="button mini-function w-1/4 text-[#dfcee5] bg-[#4f4256] border-black rounded-[31.25rem] text-[1rem] font-semibold h-8 active:rounded-[10%] ease-in">x²</button>
                        <button onClick={handleButtonClick} className="button mini-function w-1/4 text-[#dfcee5] bg-[#4f4256] border-black rounded-[31.25rem] text-[1rem] font-semibold h-8 active:rounded-[10%] ease-in">√</button>
                        <button onClick={handleButtonClick} className="button mini-function w-1/4 text-[#dfcee5] bg-[#4f4256] border-black rounded-[31.25rem] text-[1rem] font-semibold h-8 active:rounded-[10%] ease-in">π</button>
                        <button onClick={handleButtonClick} className="button mini-function w-1/4 text-[#dfcee5] bg-[#4f4256] border-black rounded-[31.25rem] text-[1rem] font-semibold h-8 active:rounded-[10%] ease-in">^</button>
                        <button onClick={handleButtonClick} className="button mini-function w-1/4 text-[#dfcee5] bg-[#4f4256] border-black rounded-[31.25rem] text-[1rem] font-semibold h-8 active:rounded-[10%] ease-in">!</button>
                    </div>
                    <div className="input-class w-full grid gap-2.5 rounded-[0_0_1.49rem_1.49rem] grid-cols-5 grid-rows-4 items-center self-center justify-items-center text-[#eddbf3]">
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-[60%] text-[#eddbf3] bg-[#262229] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">7</button>
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-[60%] text-[#eddbf3] bg-[#262229] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">8</button>
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-[60%] text-[#eddbf3] bg-[#262229] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">9</button>
                        <button onClick={handleButtonClick} className="button function-btn w-full aspect-square rounded-[60%] text-[#efddf5] bg-[#4f4256] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">%</button>
                        <button onClick={handleButtonClick} className="button Ac-btn w-full aspect-square rounded-[60%] text-[#fcd7da] bg-[#6e353b] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">AC</button>
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-[60%] text-[#eddbf3] bg-[#262229] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">4</button>
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-[60%] text-[#eddbf3] bg-[#262229] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">5</button>
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-[60%] text-[#eddbf3] bg-[#262229] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">6</button>
                        <button onClick={handleButtonClick} className="button function-btn w-full aspect-square rounded-[60%] text-[#efddf5] bg-[#4f4256] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">x</button>
                        <button onClick={handleButtonClick} className="button function-btn w-full aspect-square rounded-[60%] text-[#efddf5] bg-[#4f4256] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">÷</button>
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-[60%] text-[#eddbf3] bg-[#262229] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">1</button>
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-[60%] text-[#eddbf3] bg-[#262229] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">2</button>
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-[60%] text-[#eddbf3] bg-[#262229] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">3</button>
                        <button onClick={handleButtonClick} className="button function-btn w-full aspect-square rounded-[60%] text-[#efddf5] bg-[#4f4256] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">+</button>
                        <button onClick={handleButtonClick} className="button function-btn w-full aspect-square rounded-[60%] text-[#efddf5] bg-[#4f4256] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">-</button>
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-[60%] text-[#eddbf3] bg-[#262229] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">0</button>
                        <button onClick={handleButtonClick} className="button number-btn w-full aspect-square rounded-[60%] text-[#eddbf3] bg-[#262229] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">.</button>
                        <button onClick={handleButtonClick} className="button c-btn w-full aspect-square rounded-[60%] text-[#eddbf3] bg-[#262229] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">C</button>
                        <button onClick={handleButtonClick} className="button function-btn w-full aspect-square rounded-[60%] text-[#efddf5] bg-[#4f4256] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">()</button>
                        <button onClick={handleButtonClick} className="button equal-btn w-full aspect-square rounded-[60%] text-[#f4d9ff] bg-[#5b3774] border-black text-center text-[1rem] active:rounded-[20%] active:bg-[#262229] ease-in">=</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalculatorApp