'use client';
import { SignInForm, SignUpForm } from '@/features/user';
import circle from '../../../assets/signin-elipse.svg';
import { Card, CardBody, Box, Image, Text } from '@chakra-ui/react';

interface UserAuthCardProps {
  title: string;
  authForm: typeof SignInForm | typeof SignUpForm;
  authCardFooter: JSX.Element;
}

export const UserAuthCard = (props: UserAuthCardProps): JSX.Element => {
  const { authForm: AuthForm, authCardFooter, title } = props;

  return (
    <Card
      w={'100%'}
      maxW={['unset', '352px']}
      bgColor={'background'}
      position={'relative'}
    >
      <Image
        src={circle.src}
        maxW={'233px'}
        zIndex={'0'}
        position={'absolute'}
      />
      <CardBody position={'relative'}>
        <Text
          color={'primary'}
          fontSize={'36px'}
          fontWeight={900}
          maxW={'228px'}
          lineHeight={'43px'}
        >
          {title}
        </Text>
        <AuthForm />
        <Box mt={'125px'}>{authCardFooter}</Box>
      </CardBody>
    </Card>
  );
};
