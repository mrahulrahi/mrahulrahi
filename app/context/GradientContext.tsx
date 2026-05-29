'use client'
import { createContext, useContext, useState } from 'react';
import { getRandomGradient } from '../utils/gradientUtils';

interface GradientContextType {
  gradientDirection: string;
  color1: string;
  color2: string;
  gradientStyle: React.CSSProperties;
  gradientCSS: string;
  showGradient: boolean;
  setShowGradient: React.Dispatch<React.SetStateAction<boolean>>;
  changeGradientColor: () => void;
  handleColor1Change: (newColor: string) => void;
  handleColor2Change: (newColor: string) => void;
  handleDirectionChange: (newDirection: string) => void;
  updateGradient: (c1: string, c2: string, direction?: string) => void;
}

const GradientContext = createContext<GradientContextType | undefined>(undefined);

export const useGradient = (): GradientContextType => {
  const context = useContext(GradientContext);
  if (!context) {
    throw new Error('useGradient must be used within a GradientProvider');
  }
  return context;
};

export const GradientProvider = ({ children  }: { children: React.ReactNode }) => {
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

  const handleColor1Change = (newColor: string) => {
    setColor1(newColor);
    updateGradient(newColor, color2);
  };

  const handleColor2Change = (newColor: string) => {
    setColor2(newColor);
    updateGradient(color1, newColor);
  };

  const handleDirectionChange = (newDirection: string) => {
    setGradientDirection(newDirection);
    updateGradient(color1, color2, newDirection);
  };

  const updateGradient = (c1: string, c2: string, direction = gradientDirection) => {
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