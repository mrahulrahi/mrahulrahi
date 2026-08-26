'use client'
import { useState, useEffect } from 'react'

const LoopType = () => {

    const [oddNumbers] = useState(() => {
        let x = 1;
        const odds = [];
        while (x < 10) {
            odds.push(x);
            x += 2;
        }
        return odds;
    });

    const [numbers] = useState(() => {
        let i = 1;
        const nums = [];
        while (i <= 5) {
            nums.push(i);
            i++;
        }
        return nums;
    });

    const [headings] = useState(() => {
        let x = 8;
        const items = [];
        do {
            items.push('Rahi');
            x--;
        } while (x > 5);
        return items;
    });

    const [table] = useState(() => {
        const tableArr = [];
        for (let x = 1; x <= 10; x++) {
            tableArr.push(5 * x);
        }
        return tableArr;
    });

    const [evens] = useState(() => {
        const evenArr = [];
        for (let x = 2; x <= 10; x += 2) {
            evenArr.push(x);
        }
        return evenArr;
    });

    return (
        <>
            <div>
                <div>
                    <h4>While Loop</h4>
                    <h5>Odd Numers</h5>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {oddNumbers.map((num, index) => (
                            <h6 className="w-max bg-white/10 py-1 px-2 rounded-sm text-lg mb-0" key={index}>{num}</h6>
                        ))}
                    </div>


                    <h5>Number List</h5>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {numbers.map((num) => (
                            <h6 className="w-max bg-white/10 py-1 px-2 rounded-sm text-lg mb-0" key={num}>{num}</h6>
                        ))}
                    </div>


                </div>
                <div>
                    <h4>Do While Loop</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {headings.map((text, index) => (
                            <h6 className="w-max bg-white/10 py-1 px-2 rounded-sm text-lg mb-0" key={index}>{text}</h6>
                        ))}
                    </div>

                </div>
            </div>



            <div>
                <h4>For Loop</h4>
                <h5>5 Times Table:</h5>
                <div className="flex flex-wrap gap-2 mb-4">
                    {table.map((val, index) => (
                        <h6 className="w-max bg-white/10 py-1 px-2 rounded-sm text-lg mb-0" key={`table-${index}`}>{val}</h6>
                    ))}
                </div>


                <h5>Even Numbers:</h5>
                <div className="flex flex-wrap gap-2 mb-4">
                    {evens.map((val, index) => (
                        <h6 className="w-max bg-white/10 py-1 px-2 rounded-sm text-lg mb-0" key={`even-${index}`}>{val}</h6>
                    ))}
                </div>

            </div>


        </>
    )
}

export default LoopType







