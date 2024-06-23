import { selectAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

const secondary = definePartsStyle({
  field: {
    border: '1px solid',
    borderRadius: '8px',
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

export const selectTheme = defineMultiStyleConfig({
  variants: { secondary },
});

// Now we can use the new `brandPrimary` variant
