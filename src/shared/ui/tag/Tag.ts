import { tagAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

const grammar = definePartsStyle({
  container: {
    bg: 'secondary.50',
    color: 'secondary.base',
  },
});

const vocabulary = definePartsStyle({
  container: {
    bg: 'violet.50',
    color: 'violet.base',
  },
});

const thick = definePartsStyle({
  container: {
    px: '4',
    py: '2',
    bg: 'blue.400',
  },
});

export const tagTheme = defineMultiStyleConfig({
  variants: {
    vocabulary: vocabulary,
    grammar: grammar,
  },
});
