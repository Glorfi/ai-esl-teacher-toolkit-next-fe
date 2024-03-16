import type { Metadata } from 'next';
import '../globals.css';
import { useGetCurrentUserQuery } from '@/store/main-api/queries/auth';
import { LSHandler } from '@/utils/handleLocalStorage';

export const metadata: Metadata = {
  title: 'AI ESL Teacher Toolkit - Sign In',
  description: 'AI ESL Teacher Toolkit is great!',
};

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
