import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { Lato } from 'next/font/google';

const lato = Lato({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lato',
});

export const fonts = {
  lato,
};

export const textTheme = defineStyleConfig({
  baseStyle: {
    color: 'primary',
  },
});
