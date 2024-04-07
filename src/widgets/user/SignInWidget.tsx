
import { UserAuthCard } from '@/entities/user';
import { GoToSignUpFooter, SignInForm } from '@/features/user';


const SignInWidget = (): JSX.Element => {
  return (
    <UserAuthCard
      title="Welcome back!"
      authForm={SignInForm}
      authCardFooter={<GoToSignUpFooter />}
    />
  );
};

export default SignInWidget;
