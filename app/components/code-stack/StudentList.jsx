'use client'
import { useState } from 'react';

const StudentList = () => {
  const SIZE = 10;
  const [students, setStudents] = useState(
    Array.from({ length: SIZE }, () => ({ name: '', mark: '' }))
  );
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index, field, value) => {
    setStudents(prev => prev.map((student, i) => i === index ? { ...student, [field]: value } : student));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setStudents(Array.from({ length: SIZE }, () => ({ name: '', mark: '' })));
    setSubmitted(false);
  };

  return (
    <>
      <div className="font-oswald text-[32px] font-bold leading-none mb-6">
        Enter Student Details
      </div>

      {!submitted ? (
        <form className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2" onSubmit={handleSubmit}>
          {students.map((student, index) => (
            <div key={index} className="p-4 border rounded space-y-2">
              <label className="block font-semibold">
                Student {index + 1}
              </label>
              <input
                type="text"
                placeholder="Name"
                className="col-span-4 form-input block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
                value={student.name}
                required
                onChange={(e) =>
                  handleChange(index, 'name', e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Average Mark"
                className="col-span-4 form-input block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
                value={student.mark}
                required
                onChange={(e) =>
                  handleChange(index, 'mark', e.target.value)
                }
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-slate-950 border border-slate-800 hover:border-slate-700 text-white px-4 py-2 rounded-xl hover:bg-slate-900 transition-colors col-span-1 text-sm font-semibold cursor-pointer"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-bold">Students Information</h3>
          <div className="space-y-2 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            {students.map((student, index) => (
              <p key={index} className="text-xs font-mono text-slate-300">
                <span className="text-brand-mint font-semibold">Student {index + 1}:</span> {student.name} &nbsp; | &nbsp;
                <span className="text-slate-500">Mark:</span> {student.mark}
              </p>
            ))}
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

export default StudentList;
