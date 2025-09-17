'use client'
import React, { useState } from 'react';
import './SpectrumStack.css'
import ContentContainer from '../../components/ContentContainer'
import MouseFollower from '../../components/MouseFollower';
import SimpleHero from '../../components/SimpleHero/SimpleHero';
import { FaDiceFour, FaCalculator, FaNoteSticky, FaCloudSun, FaQuoteRight } from 'react-icons/fa6';
import { FiCopy } from "react-icons/fi";
import QuizApp from './QuizApp';
import CalculatorApp from './CalculatorApp';
import NotesApp from './NotesApp';
import WeatherApp from './WeatherApp';
import QuoteApp from './QuoteApp';

const SpectrumStack = () => {
    const [openSideBox, setOpenSideBox] = useState(false);
    const [activeTab, setActiveTab] = useState(1);

    const [gradientDirection, setGradientDirection] = useState('to right');
    const [color1, setColor1] = useState('#43C6AC');
    const [color2, setColor2] = useState('#E3EF66');
    const [gradientColor, setGradientColor] = useState('');
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
        const color1 = getRandomHexColor();
        const color2 = getRandomHexColor();
        const directions = ['to right', 'to left', 'to top', 'to bottom', 'to top right', 'to top left', 'to bottom right', 'to bottom left'];
        const randomIndex = Math.floor(Math.random() * directions.length);
        const direction = directions[randomIndex];
        return `linear-gradient(${direction}, ${color1} 10%, ${color2} 100%)`;
    };

    const changeGradientColor = () => {
        const gradient = getRandomGradient();
        setGradientColor(gradient);
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, colorSetter: React.Dispatch<React.SetStateAction<string>>) => {
        const newColor = e.target.value;
        colorSetter(newColor);
        updateGradient(newColor, color2);
    };

    const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newDirection = e.target.value;
        setGradientDirection(newDirection);
        updateGradient(color1, color2, newDirection);
    };

    const updateGradient = (c1: string, c2: string, direction: string = gradientDirection) => {
        const gradientStyle = `linear-gradient(${direction}, ${c1}, ${c2})`;
        setGradientColor(gradientStyle);
        setShowGradient(true);

        // Hide gradient after 2 seconds
        setTimeout(() => {
            setShowGradient(false);
        }, 5000);

    };


    return (
        <>

            <div className="spectrum-stack-page-wrapper bg-gradient-2">
                <SimpleHero title="Spectrum Stack App" subTitle="Tools" bgGradient={gradientColor} />

                <ContentContainer className="gradient-generator-container d-flex align-items-center py-5" column='col-lg-8 h-100 mx-auto'>
                    <div className="device-frame position-relative d-flex flex-column justify-content-between">
                        <div className="device-head d-flex align-items-center justify-content-between px-3">
                            {activeTab === 1 && <h4>Quiz App</h4>}
                            {activeTab === 2 && <h4>Calculator App</h4>}
                            {activeTab === 3 && <h4>Notes App</h4>}
                            {activeTab === 4 && <h4>Weather App</h4>}
                            {activeTab === 5 && <h4>Quote App</h4>}

                            <ul className="device-head-dots d-flex align-items-center justify-content-end gap-1"><li></li><li></li><li></li></ul>
                        </div>
                        <div className="tab pt-2">
                            <div className={`tab-pane d-flex align-items-center justify-content-center h-100 ${activeTab === 1 ? "position-relative" : "position-absolute d-none"}`}>
                                <QuizApp gradientColor={gradientColor} />
                            </div>

                            <div className={`tab-pane d-flex align-items-center justify-content-center h-100 ${activeTab === 2 ? "position-relative" : "position-absolute d-none"}`}>
                                <CalculatorApp />
                            </div>

                            <div className={`tab-pane d-flex align-items-center justify-content-center h-100 ${activeTab === 3 ? "position-relative" : "position-absolute d-none"}`}>
                                <NotesApp />
                            </div>

                            <div className={`tab-pane d-flex align-items-center justify-content-center h-100 ${activeTab === 4 ? "position-relative" : "position-absolute d-none"}`}>
                                <WeatherApp gradientColor={gradientColor} />
                            </div>

                            <div className={`tab-pane d-flex align-items-center justify-content-center h-100 ${activeTab === 5 ? "position-relative" : "position-absolute d-none"}`}>
                                <QuoteApp gradientColor={gradientColor} onClick={changeGradientColor} />
                            </div>
                        </div>


                        <div className="device-bottom-bar position-absolute start-0 bottom-0">
                            <div className="d-flex gap-2">
                                <button onClick={() => setActiveTab(1)} className={`db-btn ${activeTab === 1 ? "active" : ""}`}><FaDiceFour /></button>
                                <button onClick={() => setActiveTab(2)} className={`db-btn ${activeTab === 2 ? "active" : ""}`}><FaCalculator /></button>
                                <button onClick={() => setActiveTab(3)} className={`db-btn ${activeTab === 3 ? "active" : ""}`}><FaNoteSticky /></button>
                                <button onClick={() => setActiveTab(4)} className={`db-btn ${activeTab === 4 ? "active" : ""}`}><FaCloudSun /></button>
                                <button onClick={() => setActiveTab(5)} className={`db-btn ${activeTab === 5 ? "active" : ""}`}><FaQuoteRight /></button>
                            </div>
                        </div>
                    </div>
                </ContentContainer>

                <div className={`gradient-selector-box d-flex align-items-center ${openSideBox ? 'open' : null}`}>
                    <div className="gs-inner d-flex flex-column align-items-center">
                        <h3>Choose <br /> Colors</h3>
                        <div className="color-pick-group d-inline-flex">
                            <div className="color-pick-card d-flex flex-column">
                                <input className="color1" type="color" value={color1} onChange={(e) => handleColorChange(e, setColor1)} />
                                <div className="color-pick-info">
                                    <p>Color : 1</p>
                                </div>
                            </div>
                            <div className="color-pick-card d-flex flex-column">
                                <input className="color2" type="color" value={color2} onChange={(e) => handleColorChange(e, setColor2)} />
                                <div className="color-pick-info">
                                    <p>Color : 2</p>
                                </div>
                            </div>
                        </div>
                        <div className="direction-select w-100 mt-3">
                            <label className="form-label" htmlFor="direction">Direction :</label>
                            <select id="direction" className='form-select' value={gradientDirection} onChange={handleDirectionChange}>
                                <option value="to right">To Right</option>
                                <option value="to left">To Left</option>
                                <option value="to top">To Top</option>
                                <option value="to bottom">To Bottom</option>
                                <option value="to top right">To Top Right</option>
                                <option value="to top left">To Top Left</option>
                                <option value="to bottom right">To Bottom Right</option>
                                <option value="to bottom left">To Bottom Left</option>
                            </select>
                        </div>
                    </div>


                    <button className="gs-btn" onClick={() => setOpenSideBox(prev => !prev)}>Gradient Bg</button>

                </div>


            </div >

            {showGradient && <div className="gradient-generator-css d-flex align-items-center justify-content-between gap-2 my-2 mx-2 py-1 px-2">
                <p className="text-center m-0 fw-medium text-white"> Current CSS BG : {gradientColor}</p>
                <button onClick={() => navigator.clipboard.writeText(gradientColor)} className="btn btn-green btn-min"><FiCopy /></button>
            </div>}
            <MouseFollower />
        </>
    )

}

export default SpectrumStack;




