'use client';
import {
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
} from '@/store/main-api/queries/auth';
import { RootState } from '@/store/store';
import { setUser } from '@/store/user/user-router';
import { LSHandler } from '@/utils/handleLocalStorage';
import { VStack, Spinner, Text } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const AuthComponent = (): JSX.Element => {
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const userData = useSelector((state: RootState) => state.user);
  const { data, isLoading } = useGetCurrentUserQuery(
    token ? token : skipToken,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isRendered && !userData) {
      setToken(LSHandler.getJwt());
    }
  }, [isRendered]);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);

  if (isLoading) {
    return (
      <VStack
        minH={'100vh'}
        w={'100%'}
        justifyContent={'center'}
        position={'fixed'}
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
