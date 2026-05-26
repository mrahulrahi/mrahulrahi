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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Student Record</h3>
          <p><strong>Student Name:</strong> {name}</p>
          <p><strong>Student Surname:</strong> {surname}</p>
          <p><strong>Average Mark:</strong> {average.toFixed(2)}</p>
        </div>
      )}
    </>
  );
};

export default StudentRecord;
