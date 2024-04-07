import { UserAuthCard } from '@/entities/user';
import { GoToSignInFooter, SignUpForm } from '@/features/user';


const SignUpWidget = (): JSX.Element => {
  return (
    <UserAuthCard
      title="Create an account!"
      authForm={SignUpForm}
      authCardFooter={<GoToSignInFooter />}
    />
  );
};

export default SignUpWidget;
