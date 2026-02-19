import { useState } from "react";

export default function StringPermutations() {
  const [input, setInput] = useState("abcd");
  const [permutations, setPermutations] = useState([]);

  const swap = (strArr, i, j) => {
    const temp = strArr[i];
    strArr[i] = strArr[j];
    strArr[j] = temp;
  };

  const generatePermutations = (str, left, right, result = []) => {
    if (left === right) {
      result.push(str.join(""));
    } else {
      for (let i = left; i <= right; i++) {
        swap(str, left, i);
        generatePermutations(str, left + 1, right, result);
        swap(str, left, i); // backtrack
      }
    }
    return result;
  };

  const handleGenerate = () => {
    const chars = input.split("");
    const perms = generatePermutations(chars, 0, chars.length - 1);
    const uniquePerms = Array.from(new Set(perms)); // remove duplicates
    setPermutations(uniquePerms);
  };

  return (
    <div className="grid grid-cols-8" style={{ padding: "2rem", fontFamily: "monospace" }}>
      <div className="col-span-6">
         <label>
        Enter string:{" "}
      </label>
        <input
          type="text"
          value={input}
          className="form-input block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
          onChange={(e) => setInput(e.target.value)}
          maxLength={8}
        />
      </div>
     
 
      <button className="btn btn-accent col-span-2 mt-auto" onClick={handleGenerate} style={{ marginLeft: "1rem" }}>
        Generate
      </button>

      {permutations.length > 0 && (
        <div style={{ marginTop: "1.5rem" }}>
          <h4>Permutations of `{input}`:</h4>
          <div style={{ whiteSpace: "pre-wrap" }}>
            {permutations.map((perm, index) => (
              <span key={index}>{perm} ` </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
