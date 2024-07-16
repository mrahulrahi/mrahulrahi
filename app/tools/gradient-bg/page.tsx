'use client'
import React, { useState } from 'react';
import './GradientBG.css'
import Banner from '@/app/components/Banner/Banner';
import ContentContainer from '@/app/components/ContentContainer';


const GradientBG = () => {

    const [color1, setColor1] = useState('#43C6AC');
    const [color2, setColor2] = useState('#F8FFAE');
    const [gradient, setGradient] = useState('');

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, colorSetter: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (arg0: any): void; }) => {
        const newColor = e.target.value;
        colorSetter(newColor);
        updateGradient(newColor, color2);
    };

    const updateGradient = (c1: string, c2: string) => {
        const gradientStyle = `linear-gradient(to right, ${c1}, ${c2})`;
        setGradient(gradientStyle);
    };


    return (
        <div className="gradient-preview" style={{ background: gradient }}>
            <Banner bgImage='../inner-hero-img.jpg'>
                Gradient BG
            </Banner>
            <ContentContainer className="gradient-generator-container">
                <h2>Background Generator</h2>

                <div className="color-pick-group d-inline-flex">
                    <div className="color-pick-card">
                        <input className="color1" type="color" value={color1} onChange={(e) => handleColorChange(e, setColor1)} />
                        <div className="info">
                            <h4 className="mb-0">Color : 1</h4>
                        </div>
                    </div>
                    <div className="color-pick-card">
                        <input className="color2" type="color" value={color2} onChange={(e) => handleColorChange(e, setColor2)} />
                        <div className="info">
                            <h4 className="mb-0">Color : 2</h4>
                        </div>
                    </div>
                </div>
                <h3>Current CSS Background</h3>
                {gradient ?  <h4>{gradient}</h4> : ''}
               
            </ContentContainer>
        </div >
    )
}

export default GradientBG