/* eslint-disable*/

import { useState } from 'react';
import Hero from '../../components/Hero.jsx';
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
            <Hero title="Spectrum Stack" subTitle="Free Online Coding Tools" gradientColor={gradientStyle} />
            <div className="spectrum-stack-page-wrapper bg-gradient-2 px-5">
                <div className="content-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 h-full mx-auto">
                                <div className="gradient-generator-container flex items-center py-12 min-h-[calc(100vh-70px)]">
                                    <div className="device-frame relative flex flex-col justify-between w-full h-full bg-[#222831] border-5 border-[rgba(0,0,0,0.5)] rounded-[25px] overflow-hidden pb-[60px]">
                                        <div className="device-head flex items-center justify-between px-4 h-[25px] bg-[rgba(0,0,0,0.5)] pb-[5px]">
                                            {activeTab === 1 && <h4 className="text-lg font-semibold tracking-[0.1em] mb-0 text-[rgba(255,255,255,0.5)] text-center">Quiz App</h4>}
                                            {activeTab === 2 && <h4 className="text-lg font-semibold tracking-[0.1em] mb-0 text-[rgba(255,255,255,0.5)] text-center">Calculator App</h4>}
                                            {activeTab === 3 && <h4 className="text-lg font-semibold tracking-[0.1em] mb-0 text-[rgba(255,255,255,0.5)] text-center">Notes App</h4>}
                                            {activeTab === 4 && <h4 className="text-lg font-semibold tracking-[0.1em] mb-0 text-[rgba(255,255,255,0.5)] text-center">Weather App</h4>}
                                            {activeTab === 5 && <h4 className="text-lg font-semibold tracking-[0.1em] mb-0 text-[rgba(255,255,255,0.5)] text-center">Quote App</h4>}

                                            <ul className="device-head-dots flex items-center justify-end gap-1"><li className="w-2 h-2 rounded-full bg-[rgba(255,255,255,0.5)] shrink-0"></li><li className="w-2 h-2 rounded-full bg-[rgba(255,255,255,0.5)] shrink-0"></li><li className="w-2 h-2 rounded-full bg-[rgba(255,255,255,0.5)] shrink-0"></li></ul>
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


                                        <div className="device-bottom-bar absolute left-0 bottom-0 w-full bg-[rgba(255,255,255,0.2)] p-2.5 rounded-[20px]">
                                            <div className="flex gap-2">
                                                <button onClick={() => setActiveTab(1)} className={`db-btn flex items-center justify-center border-0 py-1.5 px-3 h-10 shrink-0 grow rounded-[10px] ${activeTab === 1 ? "bg-accent text-white rounded-[10px]" : "bg-white text-accent"}`}><FaDiceFour /></button>
                                                <button onClick={() => setActiveTab(2)} className={`db-btn flex items-center justify-center border-0 py-1.5 px-3 h-10 shrink-0 grow rounded-[10px] ${activeTab === 2 ? "bg-accent text-white rounded-[10px]" : "bg-white text-accent"}`}><FaCalculator /></button>
                                                <button onClick={() => setActiveTab(3)} className={`db-btn flex items-center justify-center border-0 py-1.5 px-3 h-10 shrink-0 grow rounded-[10px] ${activeTab === 3 ? "bg-accent text-white rounded-[10px]" : "bg-white text-accent"}`}><FaNoteSticky /></button>
                                                <button onClick={() => setActiveTab(4)} className={`db-btn flex items-center justify-center border-0 py-1.5 px-3 h-10 shrink-0 grow rounded-[10px] ${activeTab === 4 ? "bg-accent text-white rounded-[10px]" : "bg-white text-accent"}`}><FaCloudSun /></button>
                                                <button onClick={() => setActiveTab(5)} className={`db-btn flex items-center justify-center border-0 py-1.5 px-3 h-10 shrink-0 grow rounded-[10px] ${activeTab === 5 ? "bg-accent text-white rounded-[10px]" : "bg-white text-accent"}`}><FaQuoteRight /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={`gradient-selector-box flex items-center h-[360px] fixed top-1/2 left-0 -translate-y-1/2  bg-[rgba(255,255,255,0.2)] z-[9] rounded-[0_20px_20px_0] overflow-hidden backdrop-blur-xs ease-in ${openSideBox ? '-translate-x-0' : '-translate-x-[calc(100%-32px)]'}`}>
                    <div className="gs-inner flex flex-col items-center text-base font-black normal-case tracking-[0.1em] p-5">
                        <h3 className="text-2xl font-black uppercase tracking-[0.5em] text-white">Choose <br /> Colors</h3>
                        <div className="color-pick-group inline-flex gap-[30px]">
                            <div className="color-pick-card flex flex-col bg-[rgb(0,0,0,0.25)] text-[rgba(255,255,255,0.75)] shadow-[1em_1em_1em_rgba(0,0,0,0.1)] rounded-lg overflow-hidden">
                                <input className="color1" type="color" value={color1} onChange={handleColor1Change} />
                                <div className="color-pick-info text-base font-black p-2.5 tracking-normal text-center">
                                    <p>Color : 1</p>
                                </div>
                            </div>
                            <div className="color-pick-card flex flex-col bg-[rgb(0,0,0,0.25)] text-[rgba(255,255,255,0.75)] shadow-[1em_1em_1em_rgba(0,0,0,0.1)] rounded-lg overflow-hidden">
                                <input className="color2" type="color" value={color2} onChange={handleColor2Change} />
                                <div className="color-pick-info text-base font-black p-2.5 tracking-normal text-center">
                                    <p>Color : 2</p>
                                </div>
                            </div>
                        </div>
                        <div className="direction-select w-full mt-4">
                            <label className="form-label" htmlFor="direction">Direction :</label>
                            <select id="direction" className='form-select mt-1 block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50' value={gradientDirection} onChange={handleDirectionChange}>
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


                    <button className="gs-btn h-full text-2xl font-black uppercase tracking-[0.4em] text-black bg-[rgba(255,255,255,0.5)] [writing-mode:vertical-rl] rotate-180 border-0" onClick={() => setOpenSideBox(prev => !prev)}>Gradient Bg</button>

                </div>


            </div >

            {showGradient && <div className="gradient-generator-css flex items-center justify-between gap-2 my-2 mx-2 py-1 px-2  bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.5)] rounded-[20px] leading-none fixed bottom-2.5 backdrop-blur-xs z-[99]">
                <p className="text-center m-0 font-medium text-white"> Current CSS BG : {gradientCSS}</p>
                <button onClick={() => navigator.clipboard.writeText(gradientCSS)} className="btn btn-green min-w-auto pt-1 px-[5px]"><FiCopy /></button>
            </div>}
        </>
    )

}

export default Tools;




