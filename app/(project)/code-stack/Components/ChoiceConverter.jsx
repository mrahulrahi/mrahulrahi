import { useEffect, useState } from "react";

const ChoiceConverter = () => {
  const [testResult, setTestResult] = useState("");

  useEffect(() => {
    // Logic functions
    const choiceToNumber = (choice) => {
      return { Usain: 1, Me: 2, Qazi: 3 }[choice];
    };

    const numberToChoice = (number) => {
      return { 1: "Usain", 2: "Me", 3: "Qazi" }[number];
    };

    // Log basic examples
    console.log("choiceToNumber('Me'):", choiceToNumber("Me")); // 2
    console.log("numberToChoice(1):", numberToChoice(1)); // 'Usain'

    // Test functions
    const testChoiceToNumber = () => {
      if (choiceToNumber("Usain") !== 1) throw new Error("Fail Usain");
      if (choiceToNumber("Me") !== 2) throw new Error("Fail Me");
      if (choiceToNumber("Qazi") !== 3) throw new Error("Fail Qazi");
    };

    const testNumberToChoice = () => {
      if (numberToChoice(1) !== "Usain") throw new Error("Fail 1");
      if (numberToChoice(2) !== "Me") throw new Error("Fail 2");
      if (numberToChoice(3) !== "Qazi") throw new Error("Fail 3");
    };

    const testAll = () => {
      try {
        testChoiceToNumber();
        testNumberToChoice();
        setTestResult("✅ All tests passed!");
      } catch (error) {
        setTestResult(`❌ Test failed: ${error.message}`);
      }
    };

    testAll();
  }, []);

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-2">Choice ↔ Number Converter</h2>
      <p>Open your browser console to see the function outputs.</p>
      <div className="mt-4 font-mono text-lg">{testResult}</div>
    </div>
  );
};

export default ChoiceConverter;
