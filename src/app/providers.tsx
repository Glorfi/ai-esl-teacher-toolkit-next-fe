// app/providers.tsx
'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../shared/ui/theme';
import ReduxProvider from './store-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </ReduxProvider>
  );
}
