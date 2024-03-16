'use client';
import {
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
} from '@/store/main-api/queries/auth';
import { LSHandler } from '@/utils/handleLocalStorage';
import { useEffect, useState } from 'react';

export const AuthComponent = (): JSX.Element => {
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
  return <></>;
};
