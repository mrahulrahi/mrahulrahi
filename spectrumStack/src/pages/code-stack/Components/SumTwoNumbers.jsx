import { useState } from 'react'

const SumTwoNumbers = () => {

    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [resultSum, setResultSum] = useState(null);

    const CalcSum = () => {
        const a = parseInt(num1, 10);
        const b = parseInt(num2, 10);
        if (isNaN(a) || isNaN(b)) {
            alert('Please enter valid numbers.');
        } else {
            setResultSum(a + b);
        }
    };

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
                <input
                    type="number"
                    className="form-input mt-1 block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
                    placeholder="First number"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                />
            </div>
            <div className="col-span-6">
                <input
                    type="number"
                    className="form-input mt-1 block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
                    placeholder="Second number"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                />
            </div>

            <button className="col-span-12 btn" onClick={CalcSum}>Click</button>
            {resultSum !== null && (
                <p className="col-span-12">Sum: <strong>{resultSum}</strong></p>
            )}
        </div>
    )
}

export default SumTwoNumbers