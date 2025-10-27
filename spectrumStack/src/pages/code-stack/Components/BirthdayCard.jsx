import { useRef, useEffect } from "react";

const BirthdayCard = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = 500;
    const height = 500;

    // Hi‑DPI / Retina support
    const scale = window.devicePixelRatio || 1;
    canvas.width = width * scale;
    canvas.height = height * scale;
    ctx.scale(scale, scale);

    // Turtle coords → Canvas coords
    const toCanvas = ([x, y]) => [width / 2 + x, height / 2 - y];

    const drawLine = (from, to, color, lineWidth = 6) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      const [fx, fy] = toCanvas(from);
      const [tx, ty] = toCanvas(to);
      ctx.moveTo(fx, fy);
      ctx.lineTo(tx, ty);
      ctx.stroke();
    };

    // Background
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, width, height);

    // Decorative lines
    drawLine([-190, -180], [190, -180], "yellow");
    drawLine([-160, -150], [160, -150], "purple");
    drawLine([-130, -120], [130, -120], "teal");

    // Cake
    const [cakeX, cakeY] = toCanvas([-74, -50]);
    ctx.fillStyle = "white";
    ctx.fillRect(cakeX, cakeY, 125, 60);

    // Candles
    const candleXs = [-60, -40, -20, 0, 20];
    const candleColors = ["aquamarine", "yellow", "green", "pink", "blue"];
    candleXs.forEach((x, i) => drawLine([x, -40], [x, -20], candleColors[i], 3));

    // Text
    ctx.fillStyle = "grey";
    ctx.font = "24px bold sans-serif";
    ctx.fillText("to Me❣️", ...toCanvas([-110, 35]));
    ctx.fillText("Happy Birthday!", ...toCanvas([-110, 65]));
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', borderRadius: 8 }}
    />
  );
};

export default BirthdayCard;
