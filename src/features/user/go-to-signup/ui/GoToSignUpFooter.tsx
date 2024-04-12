import { APP_PATHS } from '@/shared/constants/AppPaths';
import { Link } from '@chakra-ui/next-js';
import { Text } from '@chakra-ui/react';

export const GoToSignUpFooter = (): JSX.Element => {
  return (
    <>
      <Text fontSize={'20px'} color={'highlight'}>
        Don't have an account?
      </Text>
      <Link
        href={APP_PATHS.SIGN_UP}
        fontSize={'24px'}
        fontWeight={900}
        color={'secondary.base'}
      >
        Sign up
      </Link>
    </>
  );
};
