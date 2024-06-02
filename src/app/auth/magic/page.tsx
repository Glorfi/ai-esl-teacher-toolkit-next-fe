'use client';
import { MagicAuthResolver } from '@/widgets/user';
import { Stack, Text } from '@chakra-ui/react';

const MagicPage = (): JSX.Element => {
  return (
    <Stack minH={'100vh'} alignItems={'center'} justifyContent={'center'}>
      <MagicAuthResolver />
    </Stack>
  );
};

export default MagicPage;
