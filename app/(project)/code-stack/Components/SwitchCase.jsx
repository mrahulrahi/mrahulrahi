import { useState } from 'react'

const SwitchCase = () => {

    const [dayNumber, setDayNumber] = useState('');
    const [dayName, setDayName] = useState('');

    const handleDayClick = () => {
        const day = parseInt(dayNumber, 10);

        switch (day) {
            case 1:
                setDayName('Sunday');
                break;
            case 2:
                setDayName('Monday');
                break;
            case 3:
                setDayName('Tuesday');
                break;
            case 4:
                setDayName('Wednesday');
                break;
            case 5:
                setDayName('Thursday');
                break;
            case 6:
                setDayName('Friday');
                break;
            case 7:
                setDayName('Saturday');
                break;
            default:
                setDayName('Wrong Input');
        }
    };

    return (
        <div>
            <div className="grid grid-cols-12 gap-4 mb-4">
                <input
                    type="number"
                    placeholder="Enter Input"
                    className="col-span-8 form-input block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
                    value={dayNumber}
                    onChange={(e) => setDayNumber(e.target.value)}
                />
                <button type="button" className="col-span-4 btn" onClick={handleDayClick}>
                    Click
                </button>
            </div>


            {dayName && <h2 className="mb-0">{dayName}</h2>}
        </div>
    )
}

export default SwitchCase