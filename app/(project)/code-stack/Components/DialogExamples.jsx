'use client'
import { useState } from 'react'

const DialogExamples = () => {

    const [promptName, setPromptName] = useState('');

    const A = () => {
        const a = 'Manjeet';
        alert(a);
    };

    const B = () => {
        const b = 'Rahi';
        const confirmed = window.confirm(b);
        console.log('Confirm result:', confirmed);
    };

    const C = () => {
        const result = window.confirm('Are You Sure To Alert It.');
        alert(result); // Will alert true or false
    };

    const D = () => {
        const name = window.prompt('Please Enter Your Name');
        if (name) {
            setPromptName(name);
        }
    };

    return (
        <div>
            <div className="flex flex-wrap gap-3">
                <button className="btn btn-success" onClick={A}>Click A (Alert &quot;Manjeet&quot;)</button>
                <button className="btn btn-info" onClick={B}>Click B (Confirm &quot;Rahi&quot;)</button>
                <button className="btn btn-warning" onClick={C}>Click C (Confirm + Alert)</button>
                <button className="btn btn-error" onClick={D}>Click D (Prompt for Name)</button>
            </div>


            {promptName && (
                <p>
                    You entered: <strong>{promptName}</strong>
                </p>
            )}
        </div>
    )
}

export default DialogExamples