import { useState } from 'react';

const MultiplicationTable = () => {
  const [max, setMax] = useState('');
  const [table, setTable] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const handleGenerate = () => {
    const size = parseInt(max);
    if (isNaN(size) || size < 1 || size > 9) {
      alert('Please enter a single digit number (1-9).');
      return;
    }

    const newTable = Array(size)
      .fill(0)
      .map((_, i) =>
        Array(size)
          .fill(0)
          .map((_, j) => (i + 1) * (j + 1))
      );
    setTable(newTable);
    setShowTable(true);
  };

  const handleReset = () => {
    setMax('');
    setTable([]);
    setShowTable(false);
  };

  return (
    <>
      <div className="font-oswald text-[32px] font-bold leading-none mb-6">
        Multiplication Table Generator
      </div>
      <div style={{ fontFamily: 'monospace', padding: '20px' }}>

        {!showTable && (
          <div>
            <label>
              Enter a single digit number (1-9):{' '}
              <input
                type="number"
                max="9"
                min="1"
                value={max}
                className="col-span-4 form-input block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
                onChange={(e) => setMax(e.target.value)}
                style={{ width: '60px', marginRight: '10px' }}
              />
            </label>
            <button className="btn btn-info" onClick={handleGenerate}>Generate Table</button>
          </div>
        )}

        {showTable && (
          <>
            <h3>Multiplication Table of {max}</h3>
            <table style={{ borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black', padding: '4px' }}></th>
                  {table[0].map((_, j) => (
                    <th key={j} style={{ border: '1px solid black', padding: '4px' }}>
                      {j + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.map((row, i) => (
                  <tr key={i}>
                    <th style={{ border: '1px solid black', padding: '4px' }}>{i + 1}</th>
                    {row.map((val, j) => (
                      <td key={j} style={{ border: '1px solid black', padding: '4px' }}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <button onClick={handleReset} style={{ marginTop: '20px' }}>
              Enter Another Number
            </button>
          </>
        )}
      </div>
    </>

  );
};

export default MultiplicationTable;
