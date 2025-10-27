import { useState } from 'react'
import { FaMinus, FaPlus } from "react-icons/fa";

const Counter = () => {
    const [counter, setCounter] = useState(0)

    return (
        <>
            <ul className="flex items-center justify-center">
                <li><span className="flex items-center h-10 py-2 px-4 text-white bg-first border border-[#CCC] cursor-pointer hover:text-first hover:bg-second rounded-l-sm border-r-0" onClick={() => setCounter(counter === 0 ? counter : counter - 1)}><FaMinus /></span></li>
                <li><span className="flex items-center h-10 py-2 px-4 text-white bg-first border border-[#CCC] cursor-pointer hover:text-first hover:bg-second border-r-0">{counter}</span></li>
                <li><span className="flex items-center h-10 py-2 px-4 text-white bg-first border border-[#CCC] cursor-pointer hover:text-first hover:bg-second rounded-r-sm" onClick={() => setCounter(counter + 1)}><FaPlus /></span></li>
            </ul>
        </>
    )
}

export default Counter