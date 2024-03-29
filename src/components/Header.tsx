'use client';
// import { Link as ReactRouterLink } from 'react-router-dom';
import { Button, ButtonGroup, HStack } from '@chakra-ui/react';
import { APP_PATHS } from '../constants/AppPaths';
//import { MobileMenuMain } from './MobileMenuMain';
import { useContext, useEffect, useState } from 'react';
import { Link } from '@chakra-ui/next-js';
import { AuthProvider } from '@/app/auth-provider';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { MobileMenuMain } from './MobileMenuMain';
import { useGetCurrentUserQuery } from '@/store/main-api/queries/auth';
import { LSHandler } from '@/utils/handleLocalStorage';
import { skipToken } from '@reduxjs/toolkit/query/react';

export const Header = (): JSX.Element => {
  const userData = useSelector((state: RootState) => state.user);
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const { isLoading, isSuccess, isError } = useGetCurrentUserQuery(
    token ? token : skipToken,
    // {
    //   refetchOnMountOrArgChange: true,
    // }
  );

  useEffect(() => {
    setIsRendered(true);
    setToken(LSHandler.getJwt());
  }, []);

  return (
    <HStack
      as={'header'}
      justifyContent={'space-between'}
      w={'100%'}
      margin={'16px 0 0 0'}
      color={'highlight.base'}
      minHeight={'40px'}
     visibility={!isRendered ? 'hidden' : 'visible'}
     opacity={isLoading ? '0' : '1'}
      transition={'all 1s ease-in'}
    >
      <ButtonGroup display={['none', 'inline-flex']}>
        <Link
          href={APP_PATHS.MAIN}
          color={'secondary.base'}
          border={'1px solid transparent'}
          _hover={{ textDecoration: 'none', borderBottom: '1px solid' }}
        >
          Home
        </Link>
        <Link
          href={APP_PATHS.DASHBOARD}
          color={'secondary.base'}
          border={'1px solid transparent'}
          _hover={{ textDecoration: 'none', borderBottom: '1px solid' }}
        >
          Dashboard
        </Link>
        <Link
          href={'#'}
          color={'secondary.base'}
          border={'1px solid transparent'}
          _hover={{ textDecoration: 'none', borderBottom: '1px solid' }}
        >
          Profile
        </Link>
      </ButtonGroup>
      <MobileMenuMain />
      {!userData ? (
        <ButtonGroup alignItems={'center'}>
          <Link
            href={APP_PATHS.SIGN_IN}
            color={'secondary.base'}
            border={'1px solid transparent'}
            _hover={{ textDecoration: 'none', borderBottom: '1px solid' }}
          >
            Sign In
          </Link>
          <Link href={APP_PATHS.SIGN_UP}>
            <Button
              variant={'ghost'}
              colorScheme="secondary"
              borderRadius={'40px'}
            >
              SIGN UP
            </Button>
          </Link>
        </ButtonGroup>
      ) : null}
    </HStack>
  );
};
