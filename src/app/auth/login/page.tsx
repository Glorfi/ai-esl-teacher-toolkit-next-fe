'use client';

import { SignonWidget } from '@/widgets/user';
import { Stack, Text } from '@chakra-ui/react';

const LoginPage = (): JSX.Element => {
  return (
    <Stack minH={'100vh'} alignItems={'center'} justifyContent={'center'}>
      <Text>Login to your account</Text>
      <SignonWidget />
    </Stack>
  );
};

export default LoginPage;
