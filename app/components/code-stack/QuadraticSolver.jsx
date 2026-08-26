'use client'
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
      setNature('Roots are imaginary (complex).');
      const realPart = -B / (2 * A);
      const imagPart = Math.sqrt(-discriminant) / (2 * A);
      setRoots({
        x1: `${realPart.toFixed(4)} + ${Math.abs(imagPart).toFixed(4)}i`,
        x2: `${realPart.toFixed(4)} - ${Math.abs(imagPart).toFixed(4)}i`
      });
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

      setRoots({ 
        x1: x1.toFixed(4), 
        x2: x2.toFixed(4) 
      });
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
        className="bg-slate-950 border border-slate-800 hover:border-slate-700 text-white px-4 py-2 rounded-xl hover:bg-slate-900 transition-colors w-full font-semibold text-sm cursor-pointer"
      >
        Calculate
      </button>

      {nature && (
        <div className="mt-4 p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-slate-300">
          <p className="font-semibold text-white">{nature}</p>
          {roots && (
            <p className="mt-2 text-xs font-mono">
              The value of x is{' '}
              <strong className="text-brand-mint">{roots.x1}</strong> or{' '}
              <strong className="text-brand-mint">{roots.x2}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
