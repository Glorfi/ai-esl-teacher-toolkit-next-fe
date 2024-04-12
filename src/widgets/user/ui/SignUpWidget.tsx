'use client'
import { UserAuthCard } from '@/entities/user';
import { GoToSignInFooter, SignUpForm } from '@/features/user';

export const SignUpWidget = (): JSX.Element => {
  return (
    <UserAuthCard
      title="Create an account!"
      authForm={SignUpForm}
      authCardFooter={<GoToSignInFooter />}
    />
  );
};
