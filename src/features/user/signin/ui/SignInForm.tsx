import { APP_PATHS } from '@/shared';
import { customError } from '@/shared/constants/customError';

import { LSHandler } from '@/shared/hooks/handleLocalStorage';
import { useDebounce } from '@/shared/utils/useDebounce';
import {
  useToast,
  FormControl,
  Input,
  FormErrorMessage,
  Box,
  HStack,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useLazyGetCurrentUserQuery } from '@/features/user/signin/api/auth';
import { useSignInMutation } from '../api/signin';
import { setUser } from '@/entities/user';
import { addExerciseList } from '@/entities/exercise';
import { useAppSelector } from '@/shared/hooks/hooks';

interface ISignInForm {
  email: string;
  password: string;
}

interface IFormValid {
  isEmailValid: boolean | null;
  isPasswordValid: boolean | null;
}

export const SignInForm = (): JSX.Element => {
  const [formValues, setFormValues] = useState<ISignInForm>({
    email: '',
    password: '',
  });

  const [isFormValid, setIsFormValid] = useState<IFormValid>({
    isEmailValid: null,
    isPasswordValid: null,
  });

  const [getUser, { data: userData }] = useLazyGetCurrentUserQuery();

  const debounceEmail = useDebounce(formValues.email, 1000);
  const debouncePassword = useDebounce(formValues.password, 1000);

  const [signIn, { data, isSuccess, isError, error }] = useSignInMutation();
  const toast = useToast();

  const router = useRouter();
  const dispatch = useDispatch();
  const reduxUser = useAppSelector((state) => state.user);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = formValues;
    signIn({ email, password });
  }

  useEffect(() => {
    debounceEmail.length > 4
      ? setIsFormValid({
          ...isFormValid,
          isEmailValid: validator.isEmail(debounceEmail),
        })
      : setIsFormValid({
          ...isFormValid,
          isEmailValid: null,
        });
  }, [debounceEmail]);

  useEffect(() => {
    debouncePassword.length > 1
      ? setIsFormValid({
          ...isFormValid,
          isPasswordValid: validator.isLength(debouncePassword, {
            min: 4,
            max: 10,
          }),
        })
      : setIsFormValid({
          ...isFormValid,
          isPasswordValid: null,
        });
  }, [debouncePassword]);

  useEffect(() => {
    if (data) {
      LSHandler.setJwt(data.jwt);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      const customError = error as customError;
      const { code, message } = customError.data;
      toast({
        title: message,
        status: 'error',
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [error]);

  useEffect(() => {
    if (data && isSuccess) {
      toast({
        title: `You're logged in! Redirecting...`,
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });
      getUser(data.jwt);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (userData) {
      // console.log(userData);
      dispatch(setUser(userData));
      dispatch(addExerciseList(userData.exercises));
      //  router.push(APP_PATHS.DASHBOARD);
    }
  }, [userData]);

  useEffect(() => {
    if (reduxUser) {
      router.push(APP_PATHS.DASHBOARD);
    }
  }, [reduxUser]);
  return (
    <>
      <Box
        as="form"
        mt={'48px'}
        display={'flex'}
        flexDir={'column'}
        action="none"
        id="signinform"
        onSubmit={handleSubmit}
      >
        <FormControl
          minH={'88px'}
          isInvalid={
            isFormValid.isEmailValid === false && formValues.email.length != 0
              ? true
              : false
          }
        >
          <Input
            minH={'60px'}
            type="email"
            name="email"
            fontSize={'18px'}
            placeholder="Email"
            colorScheme="secondary"
            borderRadius={'20px'}
            _placeholder={{ color: 'secondary.base' }}
            bgColor={'gray.200'}
            color={'primary.base'}
            onChange={handleInputChange}
            isInvalid={isFormValid.isEmailValid === false ? true : false}
          />
          <FormErrorMessage padding={'0 16px'}>
            Enter Valid Email
          </FormErrorMessage>
        </FormControl>
        <FormControl
          minH={'85px'}
          isInvalid={
            isFormValid.isPasswordValid === false &&
            formValues.password.length != 0
              ? true
              : false
          }
        >
          <Input
            minH={'60px'}
            type="password"
            name="password"
            fontSize={'18px'}
            placeholder="Password"
            colorScheme="secondary"
            borderRadius={'20px'}
            _placeholder={{ color: 'secondary.base' }}
            bgColor={'gray.200'}
            onChange={handleInputChange}
            isInvalid={
              isFormValid.isPasswordValid === false &&
              formValues.password.length != 0
                ? true
                : false
            }
          />
          <FormErrorMessage padding={'0 16px'}>
            Your password must contain 4-10 symbols
          </FormErrorMessage>
        </FormControl>
      </Box>
      <HStack mt={'20px'} justifyContent={'space-between'}>
        <Text
          color="secondary.base"
          fontSize={'32px'}
          fontWeight={900}
          lineHeight={'43px'}
        >
          Sign in
        </Text>
        <IconButton
          isRound={true}
          aria-label={''}
          type="submit"
          form="signinform"
          bgColor={'secondary.base'}
          colorScheme="secondary"
          icon={<ArrowForwardIcon w={'24px'} h={'30px'} />}
          minW={'64px'}
          minH={'64px'}
          isDisabled={!Object.values(isFormValid).every((key) => key === true)}
        />
      </HStack>
    </>
  );
};
