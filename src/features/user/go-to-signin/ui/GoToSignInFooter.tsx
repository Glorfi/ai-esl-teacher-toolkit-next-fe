import { APP_PATHS } from '@/shared';
import { Link } from '@chakra-ui/next-js';
import { Text } from '@chakra-ui/react';

export const GoToSignInFooter = (): JSX.Element => {
  return (
    <>
      <Text fontSize={'20px'} color={'highlight'}>
        Already have an account?
      </Text>
      <Link
        href={APP_PATHS.SIGN_IN}
        fontSize={'24px'}
        fontWeight={900}
        color={'secondary.base'}
        // _hover={{ textDecoration: 'none' }}
      >
        Sign in
      </Link>
    </>
  );
};
