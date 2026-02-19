import { useState, useEffect } from 'react';

function PalindromeChecker() {
    const [string, setString] = useState("");
    const [isPalindrome, setIsPalindrome] = useState(null);

    // Palindrome Logic
    useEffect(() => {
        const upperStr = string.toUpperCase();
        const reversedStr = upperStr.split("").reverse().join("");
        setIsPalindrome(upperStr === reversedStr);
    }, [string]);

    return (
        <>
            <div className="mb-2">
                <label htmlFor="">Enter a string</label>
                <input
                    type="text"
                    className="form-input mt-1 block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
                    value={string}
                    onChange={(e) => setString(e.target.value)}
                    placeholder="Enter a string"
                />
            </div>

            {string && (
                <p>
                    Length: {string.length} <br />
                    Reversed: {string.toUpperCase().split("").reverse().join("")} <br />
                    Result:{" "}
                    {isPalindrome
                        ? "Given string is a palindrome."
                        : "Given string is not a palindrome."}
                </p>
            )}
        </>
    );
}

export default PalindromeChecker;
