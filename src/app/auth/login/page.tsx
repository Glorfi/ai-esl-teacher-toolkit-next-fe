'use client';

import { SignonWidget } from '@/widgets/user';
import { Stack, Text } from '@chakra-ui/react';

const LoginPage = (): JSX.Element => {
  return (
    <Stack minH={'100vh'} alignItems={'center'} justifyContent={'center'}>
      <SignonWidget type="signin" />
    </Stack>
  );
};

export default LoginPage;
