import UserAuthCard from '@/entities/user/UserAuthCard';
import { GoToSignInFooter } from '@/features/user/go-to-signin/GoToSignInFooter';
import SignUpForm from '@/features/user/signup/ui/SignUpForm';

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
