'use client'
import { useState, useRef } from "react";

export function StyleManipulator() {
    const boxRef = useRef(null);
    const [showFirst, setShowFirst] = useState(true);
    const [style, setStyle] = useState({
        display: 'block',
        width: '80%',
        height: '100%',
        border: '1px solid',
        color: '#fff',
        background: 'green',
    });

    const handleClick = () => {
        setStyle({
            ...style,
            background: 'pink',
            color: 'green',
            width: '300px',

        });
    };

    const A = () => {
        boxRef.current.style.borderRadius = '20px';
    };

    const B = () => {
        boxRef.current.style.background = 'pink';
    };

    const C = () => {
        boxRef.current.style.color = 'green';
    };

    const D = () => {
        boxRef.current.style.textAlign = 'justify';
    };

    const E = () => {
        boxRef.current.style.height = '250px';
        boxRef.current.style.width = '100%';
    };

    const F = () => {
        boxRef.current.style.borderStyle = 'dotted';
    };

    const G = () => {
        boxRef.current.style.textTransform = 'capitalize';
    };

    const H = () => {
        A();
        B();
        C();
        D();
        E();
    };

    const [text, setText] = useState('');

    const copyText = () => {
        const sourceText =
            'SpiderMonkey is the code name for the first JavaScript engine, written by Brendan Eich at Netscape Communications, later released as open-source and currently maintained by the Mozilla Foundation';
        setText(sourceText);
    };

    return (
        <div>
            {showFirst && (
                <div
                    className="p-5"
                    ref={boxRef}
                    style={style}
                >
                    <span>
                        SpiderMonkey is the code name for the first JavaScript engine, written by Brendan Eich at Netscape
                        Communications, later released as open-source and currently maintained by the Mozilla Foundation
                    </span>
                </div>
            )}

            <div className="flex flex-wrap gap-2 mt-5">
                <button className="btn btn-neutral" onClick={A}>Border Radius</button>
                <button className="btn btn-primary" onClick={B}>Background</button>
                <button className="btn btn-secondary" onClick={C}>Text Color</button>
                <button className="btn btn-accent" onClick={D}>Text Align</button>
                <button className="btn btn-info" onClick={E}>Height Width</button>
                <button className="btn btn-success" onClick={F}>Border Style</button>
                <button className="btn btn-warning" onClick={G}>Capitalize</button>
                <button className="btn btn-error" onClick={H}>Toogle All</button>
                <button className="btn btn-success btn-outline" type="button" onClick={handleClick}>Multiple Toogle</button>
                <button className="btn btn-primary btn-dash" type="button" onClick={() => setShowFirst(true)}>Show</button>
                <button className="btn btn-primary btn-soft" type="button" onClick={() => setShowFirst(false)}>Hide</button>
                <button className="btn" type="button" onClick={copyText}>Click to copy text</button>
            </div>

            <p className="w-full min-h-24 mt-5 border p-2">
                {text}
            </p>
        </div>
    );
}
