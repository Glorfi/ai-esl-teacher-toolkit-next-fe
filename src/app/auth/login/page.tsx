'use client';
import { LoginWidget } from '@/widgets/user';
import { Stack, Text } from '@chakra-ui/react';

const LoginPage = (): JSX.Element => {
  return (
    <Stack minH={'100vh'} alignItems={'center'} justifyContent={'center'}>
      <LoginWidget />
    </Stack>
  );
};

export default LoginPage;
