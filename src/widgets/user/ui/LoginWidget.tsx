'use client';
import NextLink from 'next/link';
import { useMagicSignOnMutation } from '@/features/user';
import { APP_PATHS } from '@/shared';
import { BookIcon } from '@/shared/ui/icons/BookIcon';
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
  Card,
  CardHeader,
  CardBody,
  HStack,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import validator from 'validator';
import { TextInput } from '@/shared/ui/text-input/TextInput';
import { log } from 'console';
import { useRouter } from 'next/navigation';

interface SignonWidget {
  type: 'signin' | 'signup';
}

export const SignonWidget = (props: SignonWidget): JSX.Element => {
  const { type } = props;
  //  const { isOpen, onClose, onOpen } = useDisclosure();
  const [email, setEmail] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const debounceEmail = useDebounce(email, 1000);
  const router = useRouter();
  const toast = useToast();

  const [sendEmail, { isSuccess, isError, isLoading }] =
    useMagicSignOnMutation();

  function handleTokenInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length <= 6) {
      setToken(e.target.value);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendEmail({ email });
  }

  function handleTokenSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(
      `${APP_PATHS.MAGIC_VERIFICATION}?email=${encodeURIComponent(
        email
      )}&token=${token}`
    );
  }

  const signInWording = {
    title: 'Log in to your account',
    altText: "Don't have an account?",
    confirmation: 'We’ve sent temporary login link to your email ',
  };

  const signUpWording = {
    title: 'Create your account',
    altText: 'Do you have an account? ',
    confirmation:
      'To confirm your registration, follow the link we sent to your email ',
  };

  useEffect(() => {
    debounceEmail.length > 4
      ? setIsEmailValid(validator.isEmail(debounceEmail))
      : setIsEmailValid(null);
  }, [debounceEmail]);

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Something went wrong. Please try again!',
        status: 'error',
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [isError]);

  return (
    <>
      <Card
        maxW={['320px', '462px']}
        minH={['80vh']}
        variant={['unstyled', 'outline']}
        w={'100%'}
      >
        <CardHeader pt={'36px'} display={'flex'} justifyContent={'center'}>
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
        </CardHeader>
        {!isSuccess ? (
          <VStack flex={1} justifyContent={'center'} w={'100%'}>
            <Box
              as="form"
              w={'100%'}
              maxW={'334px'}
              action="none"
              id="loginform"
              onSubmit={handleSubmit}
            >
              <Text
                fontFamily={'alt'}
                w={'100%'}
                textAlign={'center'}
                textTransform={'uppercase'}
                fontSize={'xl'}
                fontWeight={'bold'}
              >
                {type === 'signin' ? signInWording.title : signUpWording.title}
              </Text>
              <FormControl
                mt={'24px'}
                minH={'60px'}
                isInvalid={
                  isEmailValid === false && email.length != 0 ? true : false
                }
              >
                <TextInput
                  type="email"
                  errorMessage="Please enter your email correctly"
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={
                    isEmailValid === false && email.length != 0 ? true : false
                  }
                  focusBorderColor={
                    isEmailValid === false && email.length != 0
                      ? 'error.base'
                      : 'secondary.base'
                  }
                  color={
                    isEmailValid === false && email.length != 0
                      ? 'error.base'
                      : 'secondary.base'
                  }
                />
              </FormControl>
              <Button
                w={'100%'}
                colorScheme="secondary"
                isDisabled={!isEmailValid}
                type="submit"
                form="loginform"
                isLoading={isLoading}
                loadingText="Sending email..."
              >
                Continue with email
              </Button>
              <HStack w={'100%'} justifyContent={'center'} mt={'20px'}>
                <Text color={'graySecondary'}>
                  {type === 'signin'
                    ? signInWording.altText
                    : signUpWording.altText}
                </Text>
                <Link
                  as={NextLink}
                  href={
                    type === 'signin' ? APP_PATHS.SIGN_UP : APP_PATHS.SIGN_IN
                  }
                  _hover={{ textDecoration: 'none' }}
                  color={'primary.base'}
                  fontWeight={'bold'}
                >
                  {type === 'signin' ? 'Sign up' : 'Log in'}
                </Link>
              </HStack>
            </Box>
          </VStack>
        ) : (
          <VStack flex={1} justifyContent={'center'} w={'100%'}>
            <Box
              as="form"
              w={'100%'}
              maxW={'334px'}
              action="none"
              id="tokenform"
              onSubmit={handleTokenSubmit}
            >
              <Text
                fontFamily={'alt'}
                w={'100%'}
                textAlign={'center'}
                textTransform={'uppercase'}
                fontSize={'xl'}
                fontWeight={'bold'}
              >
                Check your email
              </Text>

              <Text
                mt={'24px'}
                w={'100%'}
                textAlign={'center'}
                fontSize={'sm'}
                fontWeight={'400'}
              >
                {type === 'signin'
                  ? signInWording.confirmation
                  : signUpWording.confirmation}
                <Text as={'span'} fontWeight={'bold'}>
                  {email}
                </Text>
              </Text>
              <VStack gap={'24px'} minH={'112px'} mt={'24px'}>
                <Input
                  type="number"
                  maxLength={6}
                  value={token}
                  placeholder="Enter token manually"
                  border="none"
                  textAlign={'center'}
                  onChange={handleTokenInput}
                  color={'secondary.base'}
                />
                {token.length > 0 && (
                  <Button
                    w={'100%'}
                    colorScheme="secondary"
                    isDisabled={token.length < 6}
                    type="submit"
                    form="tokenform"
                    isLoading={isLoading}
                    loadingText="Verifying..."
                  >
                    Continue with token
                  </Button>
                )}
              </VStack>
            </Box>
          </VStack>
        )}
      </Card>
      {/* {isSuccess && <Text>Email has been sent</Text>}
      {isError && <Text color={'error.base'}>Something went wrong</Text>} */}
    </>
  );
};
