export const getRandomHexColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export interface GradientInfo {
  direction: string;
  c1: string;
  c2: string;
  gradientValue: string;
}

export const getRandomGradient = (): GradientInfo => {
  const c1 = getRandomHexColor();
  const c2 = getRandomHexColor();
  const directions: string[] = [
    'to right', 'to left', 'to top', 'to bottom',
    'to top right', 'to top left', 'to bottom right', 'to bottom left'
  ];
  const randomIndex = Math.floor(Math.random() * directions.length);
  const direction = directions[randomIndex];

  const gradientValue = `linear-gradient(${direction}, ${c1}, ${c2})`;
  return { direction, c1, c2, gradientValue };
};
