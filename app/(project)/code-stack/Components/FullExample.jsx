import { useEffect, useState } from 'react';

export default function FullExample() {
  const [output, setOutput] = useState([]);

  useEffect(() => {
    const lines = [];

    // Output "hello world"
    lines.push("hello world");

    // Variables and arithmetic
    const age = 22;
    lines.push(age);

    const x = 2;
    const y = 2;
    const a = x + y;
    const b = x - y;
    const c = x * y;
    const d = x / y;

    lines.push(`Sum: ${a}`);
    lines.push(`Difference: ${b}`);
    lines.push(`Product: ${c}`);
    lines.push(`Division: ${d}`);

    // Increment
    let game1 = 2;
    lines.push(`game++: ${game1++}`);
    let game2 = 2;
    lines.push(`game--: ${game2--}`);

    // If/Else
    if (x > y) {
      lines.push("x is greater than y");
    } else {
      lines.push("x is less than or equal to y");
    }

    // Array
    const array_game = ["PUBG", "COD", "DMC", "TOD"];
    array_game.forEach((game) => lines.push(game));

    // Loop (for & do..while)
    for (let r = 1; r <= 10; r++) {
      lines.push("I love U 3000");
    }

    let i = 1;
    do {
      lines.push("I love U 3000");
      i++;
    } while (i <= 10);

    // confirm
    confirm("Do you want to go to the next page?");

    // Function call
    const add = (num1, num2) => {
      const result = num1 + num2;
      lines.push(`Addition Result: ${result}`);
    };

    add(44, 33);

    setOutput(lines);
  }, []);

  return (
    <div style={{ fontFamily: 'monospace' }}>
      <h3>Output</h3>
      <div className="flex flex-wrap gap-2">
        {output.map((item, index) => (
          <span className="w-max bg-white/10 py-1 px-2 rounded-sm" key={index}>{item}</span>
        ))}
      </div>
    </div>
  );
}
