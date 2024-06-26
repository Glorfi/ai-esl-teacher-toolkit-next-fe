'use client';

import { SignonWidget } from '@/widgets/user';
import { Stack, Text } from '@chakra-ui/react';

const SignupPage = (): JSX.Element => {
  return (
    <Stack minH={'100vh'} alignItems={'center'} justifyContent={'center'} p={['0 26px', '0']}>
      <SignonWidget type="signup" />
    </Stack>
  );
};

export default SignupPage;
