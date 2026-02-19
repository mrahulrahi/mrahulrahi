import { useState, useRef } from 'react';

export default function MiniWindowControl() {
  const windowRef = useRef(null);

  const handleOpen = () => {
    const newWindow = window.open('', '', 'width=500,height=400');
    if (newWindow) {
      newWindow.document.write('<h2>This is my MiniWindow</h2>');
      windowRef.current = newWindow;
    }
  };

  const handleClose = () => {
    if (windowRef.current && !windowRef.current.closed) {
      windowRef.current.close();
    }
  };

  const a = 'Some value here'; // Replace with your intended value

  const handleRedirect = () => {
    window.open('https://www.google.com/', '_self');
  };

  const handleA = () => {
    alert(a);
  };

  const handleB = () => {
    alert(a);
  };

  const [info, setInfo] = useState([]);

  const showNavigatorInfo = () => {
    setInfo([
      `appCodeName: ${navigator.appCodeName}`,
      `appName: ${navigator.appName}`,
      `appVersion: ${navigator.appVersion}`,
      `cookieEnabled: ${navigator.cookieEnabled}`,
      `language: ${navigator.language}`,
      `userAgent: ${navigator.userAgent}`,
      `platform: ${navigator.platform}`,
      `onLine: ${navigator.onLine}`,
    ]);
  };

  const showScreenInfo = () => {
    setInfo([
      `screen.width: ${screen.width}`,
      `screen.height: ${screen.height}`,
      `screen.availWidth: ${screen.availWidth}`,
      `screen.availHeight: ${screen.availHeight}`,
      `screen.colorDepth: ${screen.colorDepth}`,
      `screen.pixelDepth: ${screen.pixelDepth}`,
    ]);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-2">
        <button className="btn" onClick={handleOpen}>Click</button>
        <button className="btn" onClick={handleClose}>Close</button>

        <button className="btn" type="button" onClick={handleRedirect}>Click</button>
        <button className="btn" type="button" onClick={handleA}>A</button>
        <button className="btn" type="button" onClick={handleB}>B</button>

        <button className="btn" onClick={showNavigatorInfo}>Show Navigator Info</button>
        <button className="btn" onClick={showScreenInfo}>Show Screen Info</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {info.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </>
  );
}
