'use client';
import { addExerciseList } from '@/entities/exercise';
import { setUser } from '@/entities/user';
import {
  useLazyGetCurrentUserQuery,
  useMagicAuthMutation,
} from '@/features/user';
import { APP_PATHS } from '@/shared';
import { LSHandler } from '@/shared/hooks/handleLocalStorage';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { Spinner, Text } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const MagicAuthResolver = (): JSX.Element => {
  const queryParams = useSearchParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const emailParam = queryParams.get('email');
  const tokenParam = queryParams.get('token');
  
  const email = emailParam ? emailParam.replace(/ /g, '+') : null;
  const token = tokenParam ? tokenParam.replace(/ /g, '+') : null;
  const router = useRouter();
  const [login, logInResponse] = useMagicAuthMutation();
  const [auth, authResponse] = useLazyGetCurrentUserQuery();
  const [isRendered, setIsRendered] = useState<boolean>(false);

  useEffect(() => {
    !isRendered ? setIsRendered(true) : false;
  }, []);

  useEffect(() => {
    isRendered && email && token ? login({ email, token }) : null;
  }, [isRendered]);

  useEffect(() => {
    if (logInResponse.isSuccess && logInResponse.data) {
      LSHandler.setJwt(logInResponse.data.jwt);
      auth(logInResponse.data.jwt);
    }
  }, [logInResponse]);

  useEffect(() => {
    if (authResponse.isSuccess && authResponse.data) {
      dispatch(setUser(authResponse.data));
      dispatch(addExerciseList(authResponse.data.exercises));
    }
  }, [authResponse]);

  useEffect(() => {
    if (user) {
      router.push(APP_PATHS.DASHBOARD);
    }
  }, [user]);
  return (
    <>
      {!email || !token ? (
        <Text>Token or email is absent in the link</Text>
      ) : null}
      {logInResponse.isLoading || authResponse.isLoading ? (
        <>
          <Spinner
            thickness="4px"
            size={'xl'}
            speed="0.8s"
            emptyColor="gray.200"
            color={'secondary.base'}
            m={'0 auto'}
          />
          <Text>Logging in...</Text>
        </>
      ) : null}
      {logInResponse.isError && (
        <Text color={'error.base'} fontWeight={'bold'}>
          Something went wrong with a token
        </Text>
      )}
    </>
  );
};
