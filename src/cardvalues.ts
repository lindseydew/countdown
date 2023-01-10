export const LARGE_VALUES = [25, 50, 75, 100];

const oneToTen = Array(10)
  .fill(0)
  .map((_, index) => index + 1);
  
export const LITTLE_VALUES = [...oneToTen, ...oneToTen];
