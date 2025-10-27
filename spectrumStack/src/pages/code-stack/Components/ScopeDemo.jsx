import { useState } from 'react';

const ScopeDemo = () => {
    const [logs, setLogs] = useState([]);
    const [firstGlobalVariable, setFirstGlobalVariable] = useState(5);
    const [secondGlobalVariable, setSecondGlobalVariable] = useState(15);

    const appendLog = (message) => {
        setLogs((prev) => [...prev, message]);
    };

    const customFunction = () => {
        appendLog("this is a new custom function");
    };

    const firstFunction = () => {
        const firstGlobalVariable = 'S'; // local scope shadows global
        const updatedSecond = 20;
        setSecondGlobalVariable(updatedSecond);
        appendLog(
            `The value of the variables in firstFunction() are:\n firstGlobalVariable = ${firstGlobalVariable} and secondGlobalVariable = ${updatedSecond}`
        );
    };

    const secondFunction = () => {
        const secondGlobalVariable = 5.10152; // local scope
        const updatedFirst = 25;
        setFirstGlobalVariable(updatedFirst);
        appendLog(
            `The value of the variables in secondFunction() are:\n firstGlobalVariable = ${updatedFirst} and secondGlobalVariable = ${secondGlobalVariable.toFixed(4)}`
        );
    };

    const handleRun = () => {
        setLogs([]); // reset logs
        setFirstGlobalVariable(5);
        setSecondGlobalVariable(15);

        appendLog("Hello world!");
        customFunction();

        appendLog("Storage classes and scope.");
        setFirstGlobalVariable(10);
        appendLog(`The value of firstGlobalVariable in main() is ${10}`);

        firstFunction();
        appendLog(`The value of firstGlobalVariable in main() is ${10}`);

        secondFunction();
        appendLog(`The value of firstGlobalVariable in main() is ${25}`);
    };

    return (
        <>
            <div className="font-oswald text-[32px] font-bold leading-none mb-6">
                Storage Classes and Scope (C to React)
            </div>
            <div style={{ fontFamily: 'monospace', padding: '20px' }}>
                <button className="btn btn-primary" onClick={handleRun}>Run Program</button>
                <div style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>
                    {logs.map((log, idx) => (
                        <div key={idx}>{log}</div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ScopeDemo;
