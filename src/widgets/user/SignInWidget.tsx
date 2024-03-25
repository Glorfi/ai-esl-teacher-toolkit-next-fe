import UserAuthCard from '@/entities/user/UserAuthCard';
import { GoToSignUpFooter } from '@/features/user/go-to-signup/GoToSignUpFooter';
import SignInForm from '@/features/user/signin/ui/SignInForm';

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
