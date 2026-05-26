'use client'
import { useState } from 'react';

export default function SortIntegerList() {
  const [list, setList] = useState([103, 549, 22, 699, 1029, 9, 45, 653, 22, 541, 990, 149, 269, 399]);
  const [sortedList, setSortedList] = useState([]);

  const handleSort = () => {
    // Create a shallow copy to avoid mutating the original array
    const sorted = [...list].sort((a, b) => a - b);
    setSortedList(sorted);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Integer Sort Demo (React Version of C qsort)</h2>

      <div className="mb-4">
        <h3 className="font-semibold">Unsorted List:</h3>
        <p>{list.join(', ')}</p>
      </div>

      <button
        onClick={handleSort}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Sort List
      </button>

      {sortedList.length > 0 && (
        <div>
          <h3 className="font-semibold">Sorted List:</h3>
          <p>{sortedList.join(', ')}</p>
        </div>
      )}
    </div>
  );
}
