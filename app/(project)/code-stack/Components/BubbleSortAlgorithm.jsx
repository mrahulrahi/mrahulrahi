'use client'
import { useState, useRef, useEffect } from "react";

// Generator function for bubble sort with step-by-step output
function* bubbleSortSteps(arr) {
  let n = arr.length;
  const array = [...arr];
  let swapped;

  do {
    swapped = false;
    for (let j = 0; j < n - 1; j++) {
      yield { type: "compare", indices: [j, j + 1], array: [...array] };
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
        yield { type: "swap", indices: [j, j + 1], array: [...array] };
      }
    }
    n -= 1;
  } while (swapped);

  // Always yield the final done step with array
  yield { type: "done", indices: [], array: [...array] };
}

const BubbleSortVisualizer = () => {
  const [arrayInput, setArrayInput] = useState("5 1 4 2 8");
  const [data, setData] = useState([5, 1, 4, 2, 8]);
  const [arrayError, setArrayError] = useState("");
  const [step, setStep] = useState({ type: null, indices: [], array: [5, 1, 4, 2, 8] });
  const [isRunning, setIsRunning] = useState(false);

  const generatorRef = useRef(null);
  const intervalRef = useRef(null);

  // Parse and set array when user input changes
  useEffect(() => {
    if (!arrayInput.trim()) {
      setArrayError("");
      setData([]);
      return;
    }

    const parts = arrayInput.trim().split(/\s+/);
    const numbers = parts.map(Number);

    if (numbers.some(isNaN)) {
      setArrayError("Please enter valid numbers separated by spaces.");
      setData([]);
      return;
    }

    setArrayError("");
    setData(numbers);
    setStep({ type: null, indices: [], array: numbers });
  }, [arrayInput]);

  const nextStep = () => {
    if (!generatorRef.current) return;
    const result = generatorRef.current.next();
    if (!result.done && result.value) {
      setStep(result.value);
      setData(result.value.array);
    } else if (result.done && result.value) {
      // final step
      setStep(result.value);
      setData(result.value.array);
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(nextStep, 500); // speed in ms
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startSorting = () => {
    if (data.length === 0 || arrayError) return;
    generatorRef.current = bubbleSortSteps(data);
    setIsRunning(true);
    nextStep();
  };

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center" }}>
      <div className="font-oswald text-[32px] font-bold leading-none mb-6">
        Bubble Sort Algorithm
      </div>

      {/* Array Input */}
      <div className="mb-4 max-w-md mx-auto">
        <label className="block mb-1">Enter an Array</label>
        <input
          type="text"
          className="form-input mt-1 block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
          value={arrayInput}
          onChange={(e) => setArrayInput(e.target.value)}
          placeholder="Enter numbers separated by space"
        />
        {arrayError && <p className="text-red-400 mt-2">{arrayError}</p>}
      </div>

      {/* Bars Display */}
      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        {data.map((value, idx) => {
          const isHighlighted = step.indices.includes(idx);
          const color =
            step.type === "compare"
              ? "orange"
              : step.type === "swap"
                ? "red"
                : isHighlighted
                  ? "lightgrey"
                  : "darkblue";
          return (
            <div
              key={idx}
              style={{
                width: 40,
                height: 40,
                margin: "0 5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: color,
                borderRadius: "4px",
                fontSize: "1.2em",
                transition: "background-color 0.3s",
              }}
            >
              {value}
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div>
        <button
          className="btn btn-primary"
          onClick={startSorting}
          disabled={isRunning || arrayError}
        >
          Start
        </button>
        <button
          className="btn btn-secondary ml-2"
          onClick={nextStep}
          disabled={isRunning || !generatorRef.current}
        >
          Next Step
        </button>
        <button
          className="btn btn-success ml-2"
          onClick={() => setIsRunning(!isRunning)}
          disabled={!generatorRef.current}
        >
          {isRunning ? "Pause" : "Play"}
        </button>
      </div>

      {/* Step Info */}
      <div style={{ marginTop: "20px" }}>
        <strong>Step Type:</strong> {step.type || "N/A"}
      </div>
      {step.type === "done" && <h3>Sorting Complete!</h3>}
    </div>
  );
};

export default BubbleSortVisualizer;
