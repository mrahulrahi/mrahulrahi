'use client'
import { useState } from "react";

// Equivalent of the `demo` class in JS
class Demo {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  getData(x, y) {
    this.x = x;
    this.y = y;
  }

  putData() {
    return `X: ${this.x}, Y: ${this.y}`;
  }
}

// Inline sum function
const sum = (a, b) => a + b;

export default function ClassDemoComponent() {
  const [numberInput, setNumberInput] = useState("");
  const [userNumber, setUserNumber] = useState(null);
  const [globalB] = useState(40);
  const [results, setResults] = useState([]);

  // Object instances
  const ob1 = new Demo();
  const ob2 = new Demo();
  const ob3 = new Demo();
  const ob4 = new Demo(10, 20);
  const ob5 = new Demo();

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputNum = parseInt(numberInput);

    if (isNaN(inputNum)) {
      alert("Please enter a valid number.");
      return;
    }

    setUserNumber(inputNum);

    // Simulate `getData()` inputs for ob1, ob2, ob5
    ob1.getData(1, 2);
    ob2.getData(3, 4);
    ob5.getData(5, 6);

    const allResults = [
      `Size of int: ${typeof 12}`,
      `Size of float: ${typeof 12.34}`,
      `Size of char: ${typeof 'c'}`,
      `Size of bool: ${typeof true}`,
      `Your Number is: ${inputNum}`,
      `B: ${globalB}`,
      `Sum: ${sum(inputNum, globalB)}`,
      `ob1: ${ob1.putData()}`,
      `ob2: ${ob2.putData()}`,
      `ob3: ${ob3.putData()}`,
      `ob4: ${ob4.putData()}`,
      `ob5: ${ob5.putData()} (after getData)`
    ];

    setResults(allResults);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>

      <form className="grid grid-cols-12" onSubmit={handleSubmit}>
        <div className="col-span-9">
              <label>
          Enter Your Number:{" "}
            </label>
          <input
            type="number"
            value={numberInput}
            className="col-span-4 form-input block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
            onChange={(e) => setNumberInput(e.target.value)}
            required
          />
        </div>
    
      
        <button className="btn btn-warning col-span-3 mt-auto" type="submit" style={{ marginLeft: "1rem" }}>
          Submit
        </button>
      </form>

      {results.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Results:</h3>
          <pre>
            {results.map((res, index) => (
              <div key={index}>{res}</div>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
}
