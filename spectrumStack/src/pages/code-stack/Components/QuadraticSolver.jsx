import React, { useState } from 'react';

export default function QuadraticSolver() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [nature, setNature] = useState('');
  const [roots, setRoots] = useState(null);

  const solveQuadratic = () => {
    const A = parseFloat(a);
    const B = parseFloat(b);
    const C = parseFloat(c);

    if (isNaN(A) || isNaN(B) || isNaN(C)) {
      setNature('Please enter valid numbers for a, b, and c.');
      setRoots(null);
      return;
    }

    if (A === 0) {
      setNature('Coefficient a cannot be zero for a quadratic equation.');
      setRoots(null);
      return;
    }

    const discriminant = B * B - 4 * A * C;

    if (discriminant < 0) {
      setNature('Roots are imaginary.');
      setRoots(null);
    } else {
      const sqrtD = Math.sqrt(discriminant);
      const x1 = (-B + sqrtD) / (2 * A);
      const x2 = (-B - sqrtD) / (2 * A);

      // Determine nature of roots
      const isPerfectSquare = Number.isInteger(sqrtD);

      if (discriminant === 0) {
        setNature('Roots are real and equal.');
      } else if (isPerfectSquare) {
        setNature('Roots are real, unequal, and rational.');
      } else {
        setNature('Roots are real, unequal, and irrational.');
      }

      setRoots({ x1, x2 });
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">
        Solve a Quadratic Equation: ax² + bx + c = 0
      </h2>
      <div className="space-y-3 mb-4">
        <input
          type="number"
          placeholder="Enter value of a"
          className="col-span-4 form-input block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
          value={a}
          onChange={(e) => setA(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter value of b"
          className="col-span-4 form-input block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
          value={b}
          onChange={(e) => setB(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter value of c"
          className="col-span-4 form-input block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
          value={c}
          onChange={(e) => setC(e.target.value)}
        />
      </div>
      <button
        onClick={solveQuadratic}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Calculate
      </button>

      {nature && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="font-semibold">{nature}</p>
          {roots && (
            <p className="mt-2">
              The value of x is{' '}
              <strong>{roots.x1.toFixed(4)}</strong> or{' '}
              <strong>{roots.x2.toFixed(4)}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
