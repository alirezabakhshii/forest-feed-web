export enum Color {
  lightGreen = 'lightGreen',
  yellow = 'yellow',
  border = 'border',
  primaryGreen = 'primaryGreen',
  primary = 'primary',
  activeGray = 'activeGray',
  secondary = 'secondary',
  red = 'red',
  secondaryGreen = 'secondaryGreen',
  white = 'white',
  green = 'green',
  lightWhite = 'lightWhite',
  primaryBg = 'primaryBg',
}

export type Colors = {
  [key in Color]: string;
};

export const colors: Colors = {
  lightGreen: '#D3E4D0',
  yellow: '#F0E5C8',
  border: '#D0CEC8',
  primaryGreen: '#0CC863',
  primary: '#FEC703',
  activeGray: '#2626260d',
  secondary: '#262626',
  red: '#D78A76',
  secondaryGreen: '#4C9F70',
  white: '#ffffff',
  green: '#5A9D79',
  lightWhite: '#E0E0E0',
  primaryBg: '#faf8f1',
};
