// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';
import { fonts, textTheme } from './fonts';
import { tagTheme } from './tag/Tag';
import { textInputTheme } from './text-input/textInputTheme';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  white: '#fffefa',
  whiteOpacity: {
    50: 'rgba(255, 254, 250, 0.05)',
    100: 'rgba(255, 254, 250, 0.1)',
    200: 'rgba(255, 254, 250, 0.2)',
    300: 'rgba(255, 254, 250, 0.3)',
    400: 'rgba(255, 254, 250, 0.4)',
    500: 'rgba(255, 254, 250, 0.5)',
    600: 'rgba(255, 254, 250, 1)', // Основной тон
    700: 'rgba(255, 254, 250, 0.7)',
    800: 'rgba(255, 254, 250, 0.8)',
    900: 'rgba(255, 254, 250, 0.9)',
  }, // '#fffefa', //(White)
  primary: {
    base: '#1d345a',
    50: '#e2e5ec',
    100: '#b7bdd2',
    200: '#8c94b6',
    300: '#616b99',
    400: '#3b4a82',
    500: '#1d345a',
    600: '#172b4d',
    700: '#122340',
    800: '#0c1a32',
    900: '#061224',
  }, // (Navy Blue)
  secondary: {
    base: '#0066a2',
    50: '#daf8ff',
    100: '#aee4ff',
    200: '#7ed0ff',
    300: '#4dbdff',
    400: '#23aafe',
    500: '#0066a2', //'#0f90e5',
    600: '#0070b3',
    700: '#005081',
    800: '#003050',
    900: '#001120',
  }, // (Dark Cyan)
  secondaryOpacity: {
    base: 'rgba(0, 102, 162, 1)',
    50: 'rgba(0, 102, 162, 0.1)',
    100: 'rgba(0, 102, 162, 0.2)',
    200: 'rgba(0, 102, 162, 0.3)',
    300: 'rgba(0, 102, 162, 0.4)',
    400: 'rgba(0, 102, 162, 0.5)',
    500: 'rgba(0, 102, 162, 0.6)',
    600: 'rgba(0, 102, 162, 0.7)',
    700: 'rgba(0, 102, 162, 0.8)',
    800: 'rgba(0, 102, 162, 0.9)',
    900: 'rgba(0, 102, 162, 1)',
  },

  // highlight: '#09abd2', //  (Light Cyan)
  highlight: {
    base: '#09abd2',
    50: '#e3f8fb',
    100: '#baeef8',
    200: '#8ae4f5',
    300: '#5adaf2',
    400: '#2ecff0',
    500: '#09abd2',
    600: '#0791b8',
    700: '#05789e',
    800: '#035e83',
    900: '#014469',
  },
  violet: {
    base: '#6355CA',
    50: '#ebe9f8',
    100: '#cdc9f0',
    200: '#aca7e8',
    300: '#8b85df',
    400: '#726bda',
    500: '#6355CA',
    600: '#574bb2',
    700: '#4a4099',
    800: '#3d3581',
    900: '#312b6a',
  },
  greenOpacity: {
    base: 'rgba(0, 157, 19, 1)',
    50: 'rgba(0, 157, 19, 0.1)',
    100: 'rgba(0, 157, 19, 0.2)',
    200: 'rgba(0, 157, 19, 0.3)',
    300: 'rgba(0, 157, 19, 0.4)',
    400: 'rgba(0, 157, 19, 0.5)',
    500: 'rgba(0, 157, 19, 0.6)',
    600: 'rgba(0, 157, 19, 0.7)',
    700: 'rgba(0, 157, 19, 0.8)',
    800: 'rgba(0, 157, 19, 0.9)',
    900: 'rgba(0, 157, 19, 1)',
  },

  error: {
    base: '#D9534F',
    50: '#fde6e5',
    100: '#fabdbb',
    200: '#f89390',
    300: '#f56966',
    400: '#f2403c',
    500: '#D9534F',
    600: '#b43131',
    700: '#8e2828',
    800: '#671e1e',
    900: '#401515',
  },
  graySecondary: '#8C8C8C',
};

const breakboints = {
  breakpoints: {
    base: '0px',
    sm: '480px',
    md: '768px',
    lg: '992px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

const customFonts = {
  heading: 'var(--font-lato)',
  body: fonts.lato.style.fontFamily,
  alt: fonts.inter.style.fontFamily,
};

const components = {
  Text: textTheme,
  Tag: tagTheme,
  Input: textInputTheme,
};

export const theme = extendTheme({
  colors,
  breakboints,
  fonts: customFonts,
  components,
});
