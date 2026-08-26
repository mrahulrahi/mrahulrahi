'use client'
import { useState } from 'react';

const StudentRecord = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [english, setEnglish] = useState('');
  const [maths, setMaths] = useState('');
  const [science, setScience] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const average =
    (parseFloat(english || 0) + parseFloat(maths || 0) + parseFloat(science || 0)) / 3;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setSurname('');
    setEnglish('');
    setMaths('');
    setScience('');
    setSubmitted(false);
  };

  return (
    <>
      <div className="font-oswald text-[32px] font-bold leading-none mb-6">
        Enter Student Record
      </div>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="col-span-4 form-input block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
          />
          <input
            type="text"
            placeholder="Enter Surname"
            value={surname}
            required
            onChange={(e) => setSurname(e.target.value)}
            className="col-span-4 form-input block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
          />
          <input
            type="number"
            placeholder="English Mark"
            value={english}
            required
            onChange={(e) => setEnglish(e.target.value)}
            className="col-span-4 form-input block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
          />
          <input
            type="number"
            placeholder="Maths Mark"
            value={maths}
            required
            onChange={(e) => setMaths(e.target.value)}
            className="col-span-4 form-input block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
          />
          <input
            type="number"
            placeholder="Science Mark"
            value={science}
            required
            onChange={(e) => setScience(e.target.value)}
            className="col-span-4 form-input block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
          />
          <button
            type="submit"
            className="bg-slate-950 border border-slate-800 hover:border-slate-700 text-white px-4 py-2 rounded-xl hover:bg-slate-900 transition-colors text-sm font-semibold cursor-pointer"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-bold">Student Record</h3>
          <div className="space-y-2 bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300">
            <p><strong className="text-slate-500">Student Name:</strong> <span className="text-white">{name}</span></p>
            <p><strong className="text-slate-500">Student Surname:</strong> <span className="text-white">{surname}</span></p>
            <p><strong className="text-slate-500">Average Mark:</strong> <span className="text-brand-mint font-bold">{average.toFixed(2)}</span></p>
          </div>
          <button
            onClick={handleReset}
            className="bg-slate-950 border border-slate-800 hover:border-slate-700 text-white px-4 py-2 rounded-xl hover:bg-slate-900 transition-colors text-sm font-semibold cursor-pointer"
          >
            Start Over
          </button>
        </div>
      )}
    </>
  );
};

export default StudentRecord;
