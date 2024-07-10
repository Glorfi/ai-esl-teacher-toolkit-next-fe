import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

// define custom styles for funky variant
const variants = {
  landingLight: definePartsStyle({
    container: {
      borderRadius: '16px',
      border: '1px solid  #E2E8F0',
      color: 'primary.base',
      transition: 'all 0.3s ease',
      _hover: {
        backgroundColor: 'secondary.base',
        color: 'white',
      },
      // borderColor: 'secondary.base',
    },
  }),
  landingDark: definePartsStyle({
    container: {
      borderRadius: '16px',
      border: '1px solid  #E2E8F0',
      color: 'white',
      backgroundColor: 'secondary.base',
      transition: 'all 0.3s ease',
      _hover: {
        backgroundColor: 'transparent',
        color: 'primary.base',
      },
      // borderColor: 'secondary.base',
    },
  }),
};

// export variants in the component theme
export const cardTheme = defineMultiStyleConfig({ variants });
