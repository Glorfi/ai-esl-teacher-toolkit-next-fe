'use client';
import { MagicAuthResolver } from '@/widgets/user';
import { Stack, Text } from '@chakra-ui/react';
import { Suspense } from 'react';

const MagicPage = (): JSX.Element => {
  return (
    <Stack minH={'100vh'} alignItems={'center'} justifyContent={'center'}>
      <Suspense>
        <MagicAuthResolver />
      </Suspense>
    </Stack>
  );
};

export default MagicPage;
