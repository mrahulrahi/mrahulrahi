// Calculator.js
'use client'
import React, { useState } from 'react';
import './Calculator.css'
import Banner from '@/app/components/Banner/Banner';
import ContentContainer from '@/app/components/ContentContainer';


const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('');

    const handleButtonClick = (buttonText: any) => {
        const buttonValue = buttonText.target.innerHTML;
        if (buttonValue === '=') {
            evaluateExpression();
        } else if (buttonValue === 'AC') {
            clear();
        } else if (buttonValue === 'C') {
            backSpace();
        } else if (buttonValue === 'x') {
            multiply();
        } else if (buttonValue === '÷') {
            divide();
        } else if (buttonValue === 'π') {
            pi();
        } else if (buttonValue === '%') {
            percent();
        } else if (buttonValue === 'x²') {
            square();
        } else if (buttonValue === '√') {
            squareRoot();
        } else if (buttonValue === '^') {
            power();
        } else if (buttonValue === '!') {
            factorial();
        } else {
            setDisplayValue((prevValue) => prevValue + buttonValue);
        }
    };

    const evaluateExpression = () => {
        try {
            const result = eval(displayValue);
            setDisplayValue(result.toString());
        } catch (error) {
            setDisplayValue('Syntax Error');
        }
    };

    const clear = () => {
        setDisplayValue('');
    };

    const backSpace = () => {
        setDisplayValue((prevValue) => prevValue.substring(0, prevValue.length - 1));
    };

    const multiply = () => {
        setDisplayValue((prevValue) => prevValue += "*");
    }

    const divide = () => {
        setDisplayValue((prevValue) => prevValue += "/");
    }

    const pi = () => {
        setDisplayValue((prevValue) => prevValue + Math.PI);
    }

    const percent = () => {
        setDisplayValue((prevValue) => prevValue += '/' + 100);

    }

    const square = () => {
        setDisplayValue((prevValue) => String(Math.pow(parseFloat(prevValue), 2)));
    }

    const squareRoot = () => {
        setDisplayValue((prevValue) => String(Math.sqrt(parseFloat(prevValue))));
    }

    const power = () => {
        setDisplayValue((prevValue) => {
            const base = parseFloat(prevValue);
            const exponent = parseFloat('3');

            const result = Math.pow(base, exponent);
            return String(result);
        });
    };

    const factorial = () => {
        setDisplayValue((prevValue) => {
            const value = parseFloat(prevValue);
            let result = 1;

            if (value === 0) {
                result = 1;
            } else if (value < 0) {
                result = 0;
            } else {
                for (let i = value; i > 0; i--) {
                    result *= i;
                }
            }

            return result.toString();
        });
    };


    return (
        <>
            <Banner bgImage='../inner-hero-img.jpg'>Calculator</Banner>
            <ContentContainer className="calculator-container" background='green'>

                <div className="main-class" id="main-container">
                    <div className="android-frame">
                        <div className="output-operation-class" id="output-operation">
                            <input type="text" className="output-screen" id="output-id" placeholder='0' value={displayValue} readOnly />
                        </div>
                        <div className="mini-algo-function">
                            <button onClick={handleButtonClick} className="button mini-function">x²</button>
                            <button onClick={handleButtonClick} className="button mini-function">√</button>
                            <button onClick={handleButtonClick} className="button mini-function">^</button>
                            <button onClick={handleButtonClick} className="button mini-function">!</button>
                        </div>
                        <div className="input-class">
                            <button onClick={handleButtonClick} className="button AC-btn">AC</button>
                            <button onClick={handleButtonClick} className="button function-btn">π</button>
                            <button onClick={handleButtonClick} className="button function-btn">%</button>
                            <button onClick={handleButtonClick} className="button function-btn">÷</button>
                            <button onClick={handleButtonClick} className="button number-btn">7</button>
                            <button onClick={handleButtonClick} className="button number-btn">8</button>
                            <button onClick={handleButtonClick} className="button number-btn">9</button>
                            <button onClick={handleButtonClick} className="button function-btn">x</button>
                            <button onClick={handleButtonClick} className="button number-btn">4</button>
                            <button onClick={handleButtonClick} className="button number-btn">5</button>
                            <button onClick={handleButtonClick} className="button number-btn">6</button>
                            <button onClick={handleButtonClick} className="button function-btn">-</button>
                            <button onClick={handleButtonClick} className="button number-btn">1</button>
                            <button onClick={handleButtonClick} className="button number-btn">2</button>
                            <button onClick={handleButtonClick} className="button number-btn">3</button>
                            <button onClick={handleButtonClick} className="button function-btn">+</button>
                            <button onClick={handleButtonClick} className="button number-btn">0</button>
                            <button onClick={handleButtonClick} className="button number-btn">.</button>
                            <button onClick={handleButtonClick} className="button C-btn">C</button>
                            <button onClick={handleButtonClick} className="button equal-btn">=</button>
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </>

    );
};

export default Calculator;





