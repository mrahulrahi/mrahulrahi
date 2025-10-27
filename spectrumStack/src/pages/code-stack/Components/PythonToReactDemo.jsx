import { useEffect } from "react";

const PythonToReactDemo = () => {
  useEffect(() => {
    // 1. Print numbers from 5 to 20
    for (let number = 5; number <= 20; number++) {
      console.log(number);
    }

    // 2. Print squares from 0 to 4
    for (let number = 0; number < 5; number++) {
      console.log(number * number);
    }

    // 3. Repeat same square logic again
    for (let number = 0; number < 5; number++) {
      console.log(number * number);
    }

    // 4. Sum of number and last number from previous loop
    let lastNumber = 4; // from previous loop
    for (let num = 5; num <= 10; num++) {
      console.log(num + lastNumber); // 5+4, 6+4, ..., 10+4
    }

    // 5. Count total from 1 to 4
    let count = 0;
    for (let number = 1; number < 5; number++) {
      count += number;
    }
    console.log(count);

    // 6. String length
    const stringLength = (string) => {
      let count = 0;
      for (let letter of string) {
        count++;
      }
      return count;
    };

    console.log(stringLength("hello"));

    // 7. Last letter
    const lastLetter = (string) => string[string.length - 1];
    console.log(lastLetter("hello"));
    console.log(lastLetter("rahul"));

    // 8. Bigger guy
    const biggerGuy = (num1, num2) => (num1 > num2 ? num1 : num2);

    console.log(biggerGuy(55, 43));
    console.log(biggerGuy(55, 77));

    // 9. Biggest of three
    const biggestGuy = (n1, n2, n3) => biggerGuy(biggerGuy(n1, n2), n3);

    console.log(biggestGuy(57, 74, 82));
    console.log(biggestGuy(98, 87, 82));
    console.log(biggestGuy(57, 78, 67));

    // 10. Choice <-> Number
    const choiceToNumber = (choice) => {
      return { Usain: 1, Me: 2, Qazi: 3 }[choice];
    };

    const numberToChoice = (number) => {
      return { 1: "Usain", 2: "Me", 3: "Qazi" }[number];
    };

    console.log(choiceToNumber("Me"));
    console.log(numberToChoice(1));

    // 11. Square numbers in array
    const nums1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const squared = nums1.map((num) => num ** 2);
    console.log(squared);

    // 12. Sum of list
    const nums2 = [1, 5, 2, 6, 3, 28, 27, 54, 3];
    const sum = nums2.reduce((acc, val) => acc + val, 0);
    console.log(sum);
  }, []);

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-2">Console Output</h2>
      <p>Open the browser console to see the output from Python logic.</p>
    </div>
  );
};

export default PythonToReactDemo;
