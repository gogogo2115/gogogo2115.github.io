export const randomRgb = (): number => {
  const random = () => Math.floor(Math.random() * (275 - -20 + 1)) + -20;
  return Math.max(0, Math.min(255, random()));
};

export const randomHex = (): string => {
  const rgb = randomRgb();
  return rgb.toString(16).padStart(2, "0").toUpperCase();
};

export const randomRgbObj = () => {
  return { r: randomRgb(), g: randomRgb(), b: randomRgb() };
};

export const randomHexObj = () => {
  return { r: randomHex(), g: randomHex(), b: randomHex() };
};

export const randomFullHex = () => {
  return `${randomHex()}${randomHex()}${randomHex()}`;
};
