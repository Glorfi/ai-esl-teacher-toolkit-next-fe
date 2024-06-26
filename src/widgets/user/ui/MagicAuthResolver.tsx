'use client';
import { addExerciseList } from '@/entities/exercise';
import { customError } from '@/shared/constants/customError';
import { setUser } from '@/entities/user';
import {
  useLazyGetCurrentUserQuery,
  useMagicAuthMutation,
} from '@/features/user';
import { APP_PATHS } from '@/shared';
import { LSHandler } from '@/shared/hooks/handleLocalStorage';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { BookIcon } from '@/shared/ui/icons/BookIcon';
import { Link } from '@chakra-ui/next-js';
import { Box, Button, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
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
  const [errorCode, setErrorCode] = useState<
    string | number | null | undefined
  >(null);

  
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

  useEffect(() => {
    if (logInResponse.error) {
      const customError = logInResponse.error as customError;
      setErrorCode(customError.data.code);
    }
  }, [logInResponse.error]);
  return (
    <VStack mt={'calc(100vh / 5)'}>
      <HStack minH={'24px'}>
        <BookIcon color={'primary.base'} />
        <Text
          fontFamily={'alt'}
          textTransform={'uppercase'}
          fontSize={'md'}
          fontWeight={'bold'}
        >
          ESL Teacher ToolKit
        </Text>
      </HStack>
      {!email || !token ? (
        <>
          <Text mt={'86px'} fontSize={['xl', '2xl']} fontWeight={'600'}>
            Token or email is absent in the link
          </Text>
          <Link href={APP_PATHS.SIGN_IN} mt={'36px'}>
            <Button variant={'solid'} colorScheme="primary">
              Back to login
            </Button>
          </Link>
        </>
      ) : null}
      {logInResponse.isLoading || authResponse.isLoading ? (
        <VStack mt={'86px'} w={'100%'}>
          <Spinner
            thickness="4px"
            size={'xl'}
            speed="0.8s"
            emptyColor="gray.200"
            color={'primary.base'}
            m={'0 auto'}
          />
          <Text
            fontSize={['xl', '2xl']}
            fontWeight={'600'}
            textAlign={'center'}
          >
            The page is loading, please wait a couple of seconds...
          </Text>
        </VStack>
      ) : null}
      {logInResponse.isError && (
        <>
          <Text
            mt={'86px'}
            fontSize={['xl', '2xl']}
            fontWeight={'600'}
            textAlign={'center'}
          >
            {errorCode === 400
              ? 'Invalid verification token. Please try again.'
              : 'Something went wrong. Please try again'}
          </Text>
          <Link href={APP_PATHS.SIGN_IN} mt={'36px'}>
            <Button variant={'solid'} colorScheme="primary">
              Back to login
            </Button>
          </Link>
        </>
      )}
    </VStack>
  );
};
