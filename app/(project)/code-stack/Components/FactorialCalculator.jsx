import { useState, useEffect } from 'react';

function FactorialCalculator() {
    const [number, setNumber] = useState("");
    const [factorial, setFactorial] = useState(null);
    const [factorialError, setFactorialError] = useState("");

    // Factorial Logic
    useEffect(() => {
        const num = parseInt(number);

        if (isNaN(num)) {
            setFactorial(null);
            setFactorialError("Please enter a valid number.");
        } else if (num < 0) {
            setFactorial(null);
            setFactorialError("Error! Factorial for negative number does not exist.");
        } else {
            setFactorialError("");
            let result = 1;
            for (let i = 1; i <= num; i++) {
                result *= i;
            }
            setFactorial(result);
        }
    }, [number]);

    return (
        <>
            <div className="mb-2">
                <label htmlFor="">Enter a positive integer</label>
                <input
                    type="text"
                    className="form-input mt-1 block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Enter a positive integer"
                />
            </div>

            {factorialError && <p className="text-red-400">{factorialError}</p>}

            {!factorialError && factorial !== null && (
                <p>
                    The factorial of {number} is {factorial}.
                </p>
            )}
        </>
    );
}

export default FactorialCalculator;
