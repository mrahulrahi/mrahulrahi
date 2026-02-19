import { useState, useEffect, useRef } from 'react'

const TextTransfer = () => {

    const mtRef = useRef(null); // Reference to <p id="mt">
    const [result, setResult] = useState(''); // State for result text

    // Equivalent of jQuery's $(document).ready()
    useEffect(() => {
        // Get the first <p> inside <body>
        const firstP = document.querySelector('body p');
        if (firstP) {
            console.log(firstP.innerHTML);
        }
        console.log(window);
    }, []);

    const handleClick = () => {
        if (mtRef.current) {
            setResult(mtRef.current.innerText);
        }
    };

    return (
        <div>
            <button className="btn" onClick={handleClick}>Submit</button>

            <p ref={mtRef}>
                <i>
                    <b>manjeet singh</b>
                </i>
            </p>

            <h4>This is a Heading</h4>
            <p>This is a paragraph.</p>

            <p>{result}</p>

            <h1>This is a Heading</h1>
            <p style={{ color: 'red' }}>
                This is a paragraph.
                <span style={{ color: 'green' }}> By : Manjeet Singh</span>
            </p>
        </div>
    )
}

export default TextTransfer