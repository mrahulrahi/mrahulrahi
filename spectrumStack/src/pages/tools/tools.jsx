/* eslint-disable*/

import { useState } from 'react';
import SimpleHero from '../../components/SimpleHero.jsx';
import { FaDiceFour, FaCalculator, FaNoteSticky, FaCloudSun, FaQuoteRight } from 'react-icons/fa6';
import { FiCopy } from "react-icons/fi";
import QuizApp from './QuizApp.jsx';
import CalculatorApp from './CalculatorApp.jsx';
import NotesApp from './NotesApp.jsx';
import WeatherApp from './WeatherApp.jsx';
import QuoteApp from './QuoteApp.jsx';

const Tools = () => {
    const [openSideBox, setOpenSideBox] = useState(false);
    const [activeTab, setActiveTab] = useState(1);

    const [gradientDirection, setGradientDirection] = useState('to right');
    const [color1, setColor1] = useState('#43C6AC');
    const [color2, setColor2] = useState('#E3EF66');
    const [gradientStyle, setGradientStyle] = useState({ backgroundImage: `linear-gradient(${gradientDirection}, ${color1}, ${color2})` });
    const [gradientCSS, setGradientCSS] = useState('');
    const [showGradient, setShowGradient] = useState(false);

    const getRandomHexColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const getRandomGradient = () => {
        const c1 = getRandomHexColor();
        const c2 = getRandomHexColor();
        const directions = [
            'to right', 'to left', 'to top', 'to bottom',
            'to top right', 'to top left', 'to bottom right', 'to bottom left'
        ];
        const randomIndex = Math.floor(Math.random() * directions.length);
        const direction = directions[randomIndex];

        const gradientValue = `linear-gradient(${direction}, ${c1}, ${c2})`;
        return { direction, c1, c2, gradientValue };
    };

    const changeGradientColor = () => {
        const { direction, c1, c2, gradientValue } = getRandomGradient();
        setGradientStyle({ backgroundImage: gradientValue });
        setGradientCSS(gradientValue);
        setShowGradient(true);
        setTimeout(() => {
            setShowGradient(false);
        }, 5000);
    };

    const handleColor1Change = (e) => {
        const newColor = e.target.value;
        setColor1(newColor);
        updateGradient(newColor, color2);
    };

    const handleColor2Change = (e) => {
        const newColor = e.target.value;
        setColor2(newColor);
        updateGradient(color1, newColor);
    };

    const handleDirectionChange = (e) => {
        const newDirection = e.target.value;
        setGradientDirection(newDirection);
        updateGradient(color1, color2, newDirection);
    };

    const updateGradient = (c1, c2, direction = gradientDirection) => {
        const gradientValue = `linear-gradient(${direction}, ${c1}, ${c2})`;
        setGradientStyle({ backgroundImage: gradientValue });
        setGradientCSS(gradientValue);
        setShowGradient(true);

        setTimeout(() => {
            setShowGradient(false);
        }, 5000);
    };

    return (
        <>
            <SimpleHero title="Spectrum Stack" subTitle="Free Online Coding Tools" gradientColor={gradientStyle} />
            <div className="spectrum-stack-page-wrapper bg-gradient-2 px-5">
                <div className="content-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 h-full mx-auto">
                                <div className="gradient-generator-container flex items-center py-12 min-h-[calc(100vh-70px)]">
                                    <div className="device-frame relative flex flex-col justify-between">
                                        <div className="device-head flex items-center justify-between px-4">
                                            {activeTab === 1 && <h4>Quiz App</h4>}
                                            {activeTab === 2 && <h4>Calculator App</h4>}
                                            {activeTab === 3 && <h4>Notes App</h4>}
                                            {activeTab === 4 && <h4>Weather App</h4>}
                                            {activeTab === 5 && <h4>Quote App</h4>}

                                            <ul className="device-head-dots flex items-center justify-end gap-1"><li></li><li></li><li></li></ul>
                                        </div>
                                        <div className="tab pt-2 px-2 md:px-6 mb-2 h-full overflow-y-auto">
                                            <div className={`tab-pane flex items-center justify-center h-full ${activeTab === 1 ? "relative" : "absolute hidden"}`}>
                                                <QuizApp gradientColor={gradientStyle} />
                                            </div>

                                            <div className={`tab-pane flex items-center justify-center h-full ${activeTab === 2 ? "relative" : "absolute hidden"}`}>
                                                <CalculatorApp />
                                            </div>

                                            <div className={`tab-pane flex items-center justify-center h-full ${activeTab === 3 ? "relative" : "absolute hidden"}`}>
                                                <NotesApp />
                                            </div>

                                            <div className={`tab-pane flex items-center justify-center h-full ${activeTab === 4 ? "relative" : "absolute hidden"}`}>
                                                <WeatherApp gradientColor={gradientStyle} />
                                            </div>

                                            <div className={`tab-pane flex items-center justify-center h-full ${activeTab === 5 ? "relative" : "absolute hidden"}`}>
                                                <QuoteApp gradientColor={gradientStyle} onClick={changeGradientColor} />
                                            </div>
                                        </div>


                                        <div className="device-bottom-bar absolute left-0 bottom-0">
                                            <div className="flex gap-2">
                                                <button onClick={() => setActiveTab(1)} className={`db-btn flex items-center justify-center ${activeTab === 1 ? "active" : ""}`}><FaDiceFour /></button>
                                                <button onClick={() => setActiveTab(2)} className={`db-btn flex items-center justify-center ${activeTab === 2 ? "active" : ""}`}><FaCalculator /></button>
                                                <button onClick={() => setActiveTab(3)} className={`db-btn flex items-center justify-center ${activeTab === 3 ? "active" : ""}`}><FaNoteSticky /></button>
                                                <button onClick={() => setActiveTab(4)} className={`db-btn flex items-center justify-center ${activeTab === 4 ? "active" : ""}`}><FaCloudSun /></button>
                                                <button onClick={() => setActiveTab(5)} className={`db-btn flex items-center justify-center ${activeTab === 5 ? "active" : ""}`}><FaQuoteRight /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={`gradient-selector-box flex items-center ${openSideBox ? 'open' : null}`}>
                    <div className="gs-inner flex flex-col items-center">
                        <h3>Choose <br /> Colors</h3>
                        <div className="color-pick-group inline-flex">
                            <div className="color-pick-card flex flex-col">
                                <input className="color1" type="color" value={color1} onChange={handleColor1Change} />
                                <div className="color-pick-info">
                                    <p>Color : 1</p>
                                </div>
                            </div>
                            <div className="color-pick-card flex flex-col">
                                <input className="color2" type="color" value={color2} onChange={handleColor2Change} />
                                <div className="color-pick-info">
                                    <p>Color : 2</p>
                                </div>
                            </div>
                        </div>
                        <div className="direction-select w-full mt-4">
                            <label className="form-label" htmlFor="direction">Direction :</label>
                            <select id="direction" className='form-select' value={gradientDirection} onChange={handleDirectionChange}>
                                <option value="to-r">To Right</option>
                                <option value="to-l">To Left</option>
                                <option value="to-t">To Top</option>
                                <option value="to-b">To Bottom</option>
                                <option value="to-tr">To Top Right</option>
                                <option value="to-tl">To Top Left</option>
                                <option value="to-br">To Bottom Right</option>
                                <option value="to-bl">To Bottom Left</option>
                            </select>
                        </div>
                    </div>


                    <button className="gs-btn" onClick={() => setOpenSideBox(prev => !prev)}>Gradient Bg</button>

                </div>


            </div >

            {showGradient && <div className="gradient-generator-css flex items-center justify-between gap-2 my-2 mx-2 py-1 px-2">
                <p className="text-center m-0 font-medium text-white"> Current CSS BG : {gradientCSS}</p>
                <button onClick={() => navigator.clipboard.writeText(gradientCSS)} className="btn btn-green btn-min"><FiCopy /></button>
            </div>}
        </>
    )

}

export default Tools;




