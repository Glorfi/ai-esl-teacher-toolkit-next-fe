'use client';

import { useMagicLoginMutation } from '@/features/user';
import { useDebounce } from '@/shared/utils/useDebounce';
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
  Text,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import validator from 'validator';

export const LoginWidget = (): JSX.Element => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const debounceEmail = useDebounce(email, 1000);

  const [sendEmail, { isSuccess, isError, isLoading }] =
    useMagicLoginMutation();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendEmail({ email });
  }

  useEffect(() => {
    debounceEmail.length > 4
      ? setIsEmailValid(validator.isEmail(debounceEmail))
      : setIsEmailValid(null);
  }, [debounceEmail]);

  useEffect(() => {
    isSuccess || isError ? onClose() : null;
  }, [isSuccess, isError]);

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <>
      {isOpen && (
        <Box
          as="form"
          maxW={'400px'}
          action="none"
          id="loginform"
          onSubmit={handleSubmit}
        >
          <FormControl
            minH={'60px'}
            isInvalid={
              isEmailValid === false && email.length != 0 ? true : false
            }
          >
            <Input
              type="email"
              colorScheme="primary"
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={
                isEmailValid === false && email.length != 0 ? true : false
              }
            />
            <FormErrorMessage padding={'0 16px'}>
              Enter Valid Email
            </FormErrorMessage>
          </FormControl>
          <Button
            w={'100%'}
            colorScheme="primary"
            isDisabled={!isEmailValid}
            type="submit"
            form="loginform"
            isLoading={isLoading}
            loadingText="Sending email..."
          >
            Continue with Email
          </Button>
        </Box>
      )}
      {isSuccess && <Text>Email has been sent</Text>}
      {isError && <Text color={'error.base'}>Something went wrong</Text>}
    </>
  );
};
