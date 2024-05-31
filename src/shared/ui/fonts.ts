import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { Lato, Inter } from 'next/font/google';

const lato = Lato({
  weight: ['400', '100', '300', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
});

const inter = Inter({
  // weight: ["400", "100", "200", "500"],
  subsets: ['latin'],
  variable: '--font-inter',
});

export const fonts = {
  lato,
  inter,
};

export const textTheme = defineStyleConfig({
  baseStyle: {
    color: 'primary.base',
  },
});
