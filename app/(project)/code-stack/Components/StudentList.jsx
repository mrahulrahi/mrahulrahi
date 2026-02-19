import { useState } from 'react';

const StudentList = () => {
  const SIZE = 10;
  const [students, setStudents] = useState(
    Array.from({ length: SIZE }, () => ({ name: '', mark: '' }))
  );
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index, field, value) => {
    const updated = [...students];
    updated[index][field] = value;
    setStudents(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-1"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Students Information</h3>
          {students.map((student, index) => (
            <p key={index} className="mb-2">
              <strong>Name:</strong> {student.name} &nbsp; | &nbsp;
              <strong>Average Mark:</strong> {student.mark}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default StudentList;
