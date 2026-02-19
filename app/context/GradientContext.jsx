/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { getRandomGradient } from '../utils/gradientUtils';

const GradientContext = createContext();

export const useGradient = () => {
  const context = useContext(GradientContext);
  if (!context) {
    throw new Error('useGradient must be used within a GradientProvider');
  }
  return context;
};

export const GradientProvider = ({ children }) => {
  // Initialize with random gradient
  const initialGradient = getRandomGradient();

  const [gradientDirection, setGradientDirection] = useState(initialGradient.direction);
  const [color1, setColor1] = useState(initialGradient.c1);
  const [color2, setColor2] = useState(initialGradient.c2);
  const [gradientStyle, setGradientStyle] = useState({
    backgroundImage: initialGradient.gradientValue
  });
  const [gradientCSS, setGradientCSS] = useState(initialGradient.gradientValue);
  const [showGradient, setShowGradient] = useState(false);

  const changeGradientColor = () => {
  const { direction, c1, c2, gradientValue } = getRandomGradient();
    setGradientDirection(direction);
    setColor1(c1);
    setColor2(c2);
    setGradientStyle({ backgroundImage: gradientValue });
    setGradientCSS(gradientValue);
    setShowGradient(true);
    setTimeout(() => {
      setShowGradient(false);
    }, 5000);
  };

  const handleColor1Change = (newColor) => {
    setColor1(newColor);
    updateGradient(newColor, color2);
  };

  const handleColor2Change = (newColor) => {
    setColor2(newColor);
    updateGradient(color1, newColor);
  };

  const handleDirectionChange = (newDirection) => {
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

  const value = {
    gradientDirection,
    color1,
    color2,
    gradientStyle,
    gradientCSS,
    showGradient,
    setShowGradient,
    changeGradientColor,
    handleColor1Change,
    handleColor2Change,
    handleDirectionChange,
    updateGradient
  };

  return (
    <GradientContext.Provider value={value}>
      {children}
    </GradientContext.Provider>
  );
};