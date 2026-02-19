import { useState } from 'react';
import { FiCopy } from "react-icons/fi";
import { useGradient } from '../context/GradientContext';

const GradientSelector = () => {
    const [openSideBox, setOpenSideBox] = useState(false);

    const {
        gradientDirection,
        color1,
        color2,
        gradientCSS,
        showGradient,
        handleColor1Change,
        handleColor2Change,
        handleDirectionChange,
    } = useGradient();

    return (
        <>
            <div className={`gradient-selector-box flex items-center h-[300px] fixed top-1/2 left-0 -translate-y-1/2 bg-[rgba(255,255,255,0.2)] z-9 rounded-[0_20px_20px_0] overflow-hidden backdrop-blur-xs transition ease-in ${openSideBox ? 'translate-x-0' : '-translate-x-[calc(100%-30px)]'}`}>
                <div className="gs-inner flex flex-col items-center text-base font-black normal-case tracking-widest p-5 gap-4">
                    <h3 className="font-raleway text-xl font-black uppercase tracking-[0.5em] text-white mb-0">Choose <br /> Colors</h3>
                    <div className="color-pick-group inline-flex gap-5">
                        <div className="color-pick-card flex flex-col bg-[rgb(0,0,0,0.25)] text-[rgba(255,255,255,0.75)] shadow-[1em_1em_1em_rgba(0,0,0,0.1)] rounded-lg overflow-hidden">
                            <input
                                className="color1 w-full h-15 cursor-pointer border-0"
                                type="color"
                                value={color1}
                                onChange={(e) => handleColor1Change(e.target.value)}
                            />
                            <div className="color-pick-info text-sm font-black p-2.5 tracking-normal text-center">
                                <p>Color : 1</p>
                            </div>
                        </div>
                        <div className="color-pick-card flex flex-col bg-[rgb(0,0,0,0.25)] text-[rgba(255,255,255,0.75)] shadow-[1em_1em_1em_rgba(0,0,0,0.1)] rounded-lg overflow-hidden">
                            <input
                                className="color2 w-full h-15 cursor-pointer border-0"
                                type="color"
                                value={color2}
                                onChange={(e) => handleColor2Change(e.target.value)}
                            />
                            <div className="color-pick-info text-sm font-black p-2.5 tracking-normal text-center">
                                <p>Color : 2</p>
                            </div>
                        </div>
                    </div>
                    <div className="direction-select w-full">
                        <label className="form-label font-raleway text-white" htmlFor="direction">Direction :</label>
                        <select
                            id="direction"
                            className='form-select mt-1 block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white placeholder:text-white/50'
                            value={gradientDirection}
                            onChange={(e) => handleDirectionChange(e.target.value)}
                        >
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

                <button
                    className="gs-btn w-7.5 h-full font-raleway text-xl font-black uppercase tracking-[0.5em] text-black bg-[rgba(255,255,255,0.5)] [writing-mode:vertical-rl] rotate-180 border-0 z-999 cursor-pointer hover:bg-[rgba(255,255,255,0.7)] transition-colors"
                    onClick={() => setOpenSideBox(prev => !prev)}
                >
                    Gradient BG
                </button>
            </div>

            {showGradient && (
                <div className="gradient-generator-css flex items-center justify-between gap-2 my-1 mx-2 py-1 px-2 bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.5)] rounded-[20px] leading-none fixed bottom-2.5 backdrop-blur-xs z-999">
                    <p className="text-center m-0 font-medium text-white">Current CSS BG: {gradientCSS}</p>
                    <button
                        onClick={() => navigator.clipboard.writeText(gradientCSS)}
                        className="btn btn-accent text-xs h-5 pt-0.5 px-2 flex items-center justify-center cursor-pointer rounded-full"
                    >
                        <FiCopy />
                    </button>
                </div>
            )}
        </>
    );
};

export default GradientSelector;