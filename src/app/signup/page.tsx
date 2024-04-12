'use client';

import { SignUpWidget } from '@/widgets/user';
import { Stack } from '@chakra-ui/react';

const SignUpPage = (): JSX.Element => {
  return (
    <Stack minH={'100vh'} alignItems={'center'} justifyContent={'center'}>
      <SignUpWidget />
    </Stack>
  );
};

export default SignUpPage;
