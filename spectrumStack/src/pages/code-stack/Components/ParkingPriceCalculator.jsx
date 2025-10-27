import { useState, useEffect } from 'react';

function ParkingPriceCalculator() {

    const [parkingTime, setParkingTime] = useState("");
    const [parkingPrice, setParkingPrice] = useState("");
    const [parkingError, setParkingError] = useState("");

    useEffect(() => {
        const time = parseInt(parkingTime);

        if (isNaN(time)) {
            setParkingPrice(null);
            setParkingError("Please enter a valid number.");
        } else if (time <= 0) {
            setParkingPrice(null);
            setParkingError("Error! Time cannot be negative.");
        }
        else if (time > 0 && time <= 60) {
            setParkingError("");
            setParkingPrice(20);
        } else {
            setParkingError("");
            const extraMinutes = time - 60;
            const totalPrice = 20 + extraMinutes * 2;
            setParkingPrice(totalPrice);
        }

    }, [parkingTime]);

    return (
        <>
            <div className="mb-2">
                <label htmlFor="">Enter a Time</label>
                <input
                    type="text"
                    className="form-input mt-1 block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
                    value={parkingTime}
                    onChange={(e) => setParkingTime(e.target.value)}
                    placeholder="Enter Time (minutes)"
                />
            </div>

            {parkingError && <p className="text-red-400">{parkingError}</p>}

            {!parkingError && parkingPrice !== null && (
                <p>
                    Price for  {parkingTime}  minutes :  {parkingPrice} Rupees.
                </p>
            )}
        </>
    );
}

export default ParkingPriceCalculator;
