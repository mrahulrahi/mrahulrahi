import { useState } from 'react';

export default function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('1');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseInt(num1);
    const b = parseInt(num2);

    if (isNaN(a) || isNaN(b)) {
      setResult('Invalid input');
      return;
    }

    if (operator === '1') {
      setResult(a + b);
    } else if (operator === '2') {
      setResult(a * b);
    } else if (operator === '3') {
      setResult(a - b);
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-6">
          <input
            type="number"
            placeholder="Enter Number one"
            className="form-input mt-1 block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
          /></div>

        <div className="col-span-6">
          <input
            type="number"
            placeholder="Enter Number two"
            className="form-input mt-1 block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
          />
        </div>

        <div className="col-span-6">
          <select className="form-select block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50" value={operator} onChange={(e) => setOperator(e.target.value)}>
            <option value="1">+</option>
            <option value="2">*</option>
            <option value="3">-</option>
          </select>
        </div>

        <button className="col-span-6 btn" onClick={calculate}>Click</button>
      </div>

      <p>Answer: <span id="result">{result}</span></p>
    </>
  );
}
