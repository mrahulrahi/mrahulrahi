'use client'
import { useState } from 'react';

const FibonacciSeries = () => {
  const [limit, setLimit] = useState('');
  const [series, setSeries] = useState([]);

  // Generate Fibonacci series up to the given limit using optimized linear pass
  const generateSeries = () => {
    const n = parseInt(limit);
    if (isNaN(n) || n <= 0) {
      setSeries([]);
      return;
    }

    // Guard maximum limits to prevent integer precision overflow
    const maxLimit = Math.min(n, 50);
    const result = [];
    if (maxLimit >= 1) result.push(0);
    if (maxLimit >= 2) result.push(1);

    for (let i = 2; i < maxLimit; i++) {
      result.push(result[i - 1] + result[i - 2]);
    }
    setSeries(result);
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-6">
        <input
          type="number"
          className="form-input block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
          placeholder="Enter limit"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
      </div>

      <div className="col-span-6">
        <button
          className="bg-slate-950 border border-slate-800 hover:border-slate-700 text-white px-4 py-2 rounded-xl hover:bg-slate-900 transition-colors w-full font-semibold text-sm cursor-pointer"
          onClick={generateSeries}
        >
          Generate
        </button>
      </div>


      {series.length > 0 && (
        <div className="col-span-12 mt-4">
          <h3 className="text-2xl font-semibold">Fibonacci Series:</h3>
          <div className="w-full flex flex-wrap gap-2">
            {series.map((num, index) => (
              <span className="w-max bg-white/10 py-1 px-2 rounded-sm" key={index}>{num}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FibonacciSeries;
