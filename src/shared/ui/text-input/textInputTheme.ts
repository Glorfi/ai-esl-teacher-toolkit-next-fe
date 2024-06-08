import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const secondary = definePartsStyle({
  field: {
    border: '1px solid',
    borderColor: 'gray.200',
    background: 'transparent',

    _focus: {
      borderColor: 'secondary.base',
      background: 'secondaryOpacity.50',
    },
    _invalid: {
      borderColor: 'error.base',
      background: 'error.50',
      color: 'error.base',
    },
    _dark: {
      borderColor: 'gray.600',
      background: 'gray.800',
    },
  },
});

// const success = {

// }

export const textInputTheme = defineMultiStyleConfig({
  variants: { secondary },
});
