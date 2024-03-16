'use client';
import {
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
} from '@/store/main-api/queries/auth';
import { LSHandler } from '@/utils/handleLocalStorage';
import { VStack, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [logIn, { data }] = useLazyGetCurrentUserQuery();

  useEffect(() => {
    if (isRendered) {
      const jwt = LSHandler.getJwt();
      logIn(jwt);
    }
  }, [isRendered]);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <>{children}</>;
};
