import validator from 'validator';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { customError } from '@/shared/constants/customError';
import { ChangeEvent, useEffect, useState } from 'react';

import { useDebounce } from '@/shared/utils/useDebounce';
import { useRouter } from 'next/navigation';
import { APP_PATHS } from '@/shared';
import { useSignUpMutation } from '@/features/user/signup/api/signup';

interface ISignUPForm {
  email: string;
  password: string;
  confirmPassword: string;
}

interface IFormValid {
  isEmailValid: boolean | null;
  isPasswordValid: boolean | null;
  arePasswordsEquals: boolean | null;
}

export const SignUpForm = (): JSX.Element => {
  const [formValues, setFormValues] = useState<ISignUPForm>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isFormValid, setIsFormValid] = useState<IFormValid>({
    isEmailValid: null,
    isPasswordValid: null,
    arePasswordsEquals: null,
  });

  const debounceEmail = useDebounce(formValues.email, 1000);
  const debouncePassword = useDebounce(formValues.password, 1000);
  const debounceConfirmPassword = useDebounce(formValues.confirmPassword, 1000);

  const [signUp, { data, isSuccess, isError, error }] = useSignUpMutation();
  const toast = useToast();
  const router = useRouter();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = formValues;
    signUp({ email, password });
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

  // TO DO: подумать как позже хендлить ошибки чуть более централизовано
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
        title: 'You made an account!',
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });
      router.push(APP_PATHS.SIGN_IN);
    }
  }, [isSuccess]);

  useEffect(() => {
    debounceConfirmPassword.length > 1
      ? setIsFormValid({
          ...isFormValid,
          arePasswordsEquals:
            debounceConfirmPassword === formValues.password ? true : false,
        })
      : setIsFormValid({ ...isFormValid, arePasswordsEquals: null });
  }, [debounceConfirmPassword]);

  return (
    <>
      <Box
        as="form"
        mt={'48px'}
        display={'flex'}
        flexDir={'column'}
        action="none"
        id="signupform"
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
        <FormControl
          minH={'85px'}
          isInvalid={
            isFormValid.arePasswordsEquals === false &&
            formValues.confirmPassword.length != 0
              ? true
              : false
          }
        >
          <Input
            minH={'60px'}
            type="password"
            name="confirmPassword"
            fontSize={'18px'}
            placeholder="Confirm password"
            colorScheme="secondary"
            borderRadius={'20px'}
            _placeholder={{ color: 'secondary.base' }}
            bgColor={'gray.200'}
            onChange={handleInputChange}
            isInvalid={
              isFormValid.arePasswordsEquals === false &&
              formValues.confirmPassword.length != 0
                ? true
                : false
            }
          />
          <FormErrorMessage padding={'0 16px'}>
            Your passwords don't match
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
          Sign up
        </Text>
        <IconButton
          isRound={true}
          aria-label={''}
          type="submit"
          form="signupform"
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
