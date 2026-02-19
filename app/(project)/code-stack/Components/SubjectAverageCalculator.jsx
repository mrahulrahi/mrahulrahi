import { useState } from "react";

export default function SubjectAverageCalculator() {
  const [numSubjects, setNumSubjects] = useState("");
  const [marks, setMarks] = useState([]);
  const [step, setStep] = useState(1); // 1 = ask how many, 2 = enter marks
  const [average, setAverage] = useState(null);

  const handleSubjectCountSubmit = (e) => {
    e.preventDefault();
    const count = parseInt(numSubjects);
    if (!isNaN(count) && count > 0) {
      setMarks(Array(count).fill(""));
      setStep(2);
    }
  };

  const handleMarksChange = (index, value) => {
    const updated = [...marks];
    updated[index] = value;
    setMarks(updated);
  };

  const calculateAverage = (e) => {
    e.preventDefault();
    const validMarks = marks.map((mark) => parseInt(mark)).filter((mark) => !isNaN(mark));
    const sum = validMarks.reduce((acc, val) => acc + val, 0);
    const avg = sum / validMarks.length;
    setAverage(avg);
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>

      {step === 1 && (
        <form className="not-last:mb-3" onSubmit={handleSubjectCountSubmit}>

           <label className="inline-block mb-1">
              How many subjects are you working with?{" "}
            </label>
          <div className="grid grid-cols-8 gap-4"> 
           
            <input
              type="number"
              value={numSubjects}
              className="col-span-6 form-input block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
              onChange={(e) => setNumSubjects(e.target.value)}
              required
              min="1"
            />

            <button className="btn btn-secondary col-span-2" type="submit">Next</button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={calculateAverage}>
          <h4>Enter marks for {numSubjects} subjects</h4>
          {marks.map((mark, idx) => (
            <div key={idx} className="not-last:mb-3">
              <label className="mb-2">
                Subject {idx + 1}:{" "}
                    </label>
                <input
                  type="number"
                  value={mark}
                  className="form-input block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
                  onChange={(e) => handleMarksChange(idx, e.target.value)}
                  required
                />
          
            </div>
          ))}
          <br />
          <button type="submit" className="btn btn-accent">Calculate Average</button>
        </form>
      )}

      {average !== null && (
        <div style={{ marginTop: "1rem" }}>
          <h6>
            For the {numSubjects} subjects you entered, the average mark is:{" "}
            {average.toFixed(2)}
          </h6>
        </div>
      )}
    </div>
  );
}
