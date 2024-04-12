'use client';


import { SignInWidget } from '@/widgets/user';
import { Stack } from '@chakra-ui/react';

const SignInPage = (): JSX.Element => {
  return (
    <Stack minH={'100vh'} alignItems={'center'} justifyContent={'center'}>
      <SignInWidget />
    </Stack>
  );
};

export default SignInPage;
