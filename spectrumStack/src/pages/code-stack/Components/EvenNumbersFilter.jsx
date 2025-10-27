import { useState } from 'react';

const EvenNumbersFilter = () => {
  const [inputValues, setInputValues] = useState(Array(10).fill(''));
  const [filteredEvens, setFilteredEvens] = useState([]);

  const handleChange = (index, value) => {
    const updated = [...inputValues];
    updated[index] = value;
    setInputValues(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numbers = inputValues.map(val => Number(val));
    const evens = numbers.filter(num => !isNaN(num) && num % 2 === 0);
    setFilteredEvens(evens);
  };

  return (
    <>
      <div className="font-oswald text-[32px] font-bold leading-none mb-6">
        Enter 10 Numbers
      </div>
      <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {inputValues.map((val, idx) => (
              <input
                key={idx}
                type="number"
                value={val}
                className="col-span-4 form-input block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
                onChange={(e) => handleChange(idx, e.target.value)}
                placeholder={`#${idx + 1}`}
                style={{ width: '60px', padding: '5px' }}
                required
              />
            ))}
          </div>
          <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }}>
            Filter Even Numbers
          </button>
        </form>

        {filteredEvens.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <strong>Even Numbers:</strong>
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
              {filteredEvens.map((num, idx) => (
                <span key={idx}>{num}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>

  );
};

export default EvenNumbersFilter;
