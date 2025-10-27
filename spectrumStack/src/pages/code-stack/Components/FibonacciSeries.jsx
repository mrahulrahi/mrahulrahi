import { useState } from 'react';

const FibonacciSeries = () => {
  const [limit, setLimit] = useState(0);
  const [series, setSeries] = useState([]);

  // Recursive Fibonacci function
  const fibonacci = (n) => {
    if (n === 0) return 0;
    else if (n === 1) return 1;
    else return fibonacci(n - 1) + fibonacci(n - 2);
  };

  // Generate Fibonacci series up to the given limit
  const generateSeries = () => {
    const result = [];
    for (let i = 0; i < limit; i++) {
      result.push(fibonacci(i));
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
          onChange={(e) => setLimit(Number(e.target.value))}
        />
      </div>

      <div className="col-span-6">
        <button
          className="btn btn-primary w-full"
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
