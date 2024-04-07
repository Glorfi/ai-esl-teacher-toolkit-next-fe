'use client';
import { addExerciseList } from '@/entities/exercise/model/exercise-list-router';
import { useLazyGetCurrentUserQuery } from '@/features/user/signin/api/auth';
import { RootState } from '@/app/lib/store/store';
import { setUser } from '@/app/lib/store/user/user-router';
import { APP_PATHS } from '@/constants/AppPaths';

import { LSHandler } from '@/utils/handleLocalStorage';
import { trimIdFromPath } from '@/utils/trimIdFromPathname';
import { VStack, Spinner, Text } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IAuthComponentProps {
  isPrivate?: boolean;
}

export const AuthComponent = (props: any): JSX.Element => {
  const { isPrivate } = props;
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.user);
  const [auth, { data, isLoading, isError, isSuccess }] =
    useLazyGetCurrentUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const dispatch = useDispatch();

  const protectedRoutes = [
    APP_PATHS.SIGN_UP,
    APP_PATHS.DASHBOARD,
    APP_PATHS.DASHBOARD_EXERCISE.replace('/:id', ''),
  ];
  const byPassRoute = [APP_PATHS.SHARED_EXERCISE.replace('/:id', '')];

  useEffect(() => {
    // if (byPassRoute.includes(trimIdFromPath(pathname))) {
    //   console.log('You got here');

    //   return;
    // }
    if (isRendered && !userData) {
      auth(LSHandler.getJwt());
    }
  }, [isRendered]);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  useEffect(() => {
    if (data) {
      setIsLoggedIn(true);
      dispatch(setUser(data));
      dispatch(addExerciseList(data.exercises));
    }
  }, [data]);

  useEffect(() => {
    // console.log(1);
    // console.log(pathname);
    // console.log(trimIdFromPath(pathname));

    // console.log(APP_PATHS.DASHBOARD_EXERCISE.replace('/:id', ''));
    //  console.log(pathname.includes(APP_PATHS.DASHBOARD));
    console.log(protectedRoutes.some((route) => pathname.includes(route)));

    console.log(protectedRoutes.includes(pathname));

    if (isError && protectedRoutes.some((route) => pathname.includes(route))) {
      console.log('1');
      router.push(APP_PATHS.SIGN_IN);
    }
  }, [isError]);

  useEffect(() => {
    if (
      isRendered &&
      isError &&
      protectedRoutes.some((route) => pathname.includes(route))
    ) {
      console.log('2');

      router.push(APP_PATHS.SIGN_IN);
    } else {
      return;
    }
  }, [isRendered, isError]);

  if (isLoading) {
    return (
      <VStack
        minH={'100vh'}
        w={'100%'}
        justifyContent={'center'}
        position={'fixed'}
        bgColor={'white'}
        left={0}
        top={0}
      >
        <Spinner
          thickness="4px"
          size={'xl'}
          speed="0.8s"
          emptyColor="gray.200"
          color={'secondary.base'}
          m={'0 auto'}
        />
        <Text>Loading...</Text>
      </VStack>
    );
  }

  return <></>;
};
