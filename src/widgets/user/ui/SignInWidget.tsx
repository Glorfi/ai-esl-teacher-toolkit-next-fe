'use client'
import { UserAuthCard } from '@/entities/user';
import { GoToSignUpFooter, SignInForm } from '@/features/user';

export const SignInWidget = (): JSX.Element => {
  return (
    <UserAuthCard
      title="Welcome back!"
      authForm={SignInForm}
      authCardFooter={<GoToSignUpFooter />}
    />
  );
};
