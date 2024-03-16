import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'AI ESL Teacher Toolkit - Sign Up',
  description: 'AI ESL Teacher Toolkit is great!',
};

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return <>{children}</>;
}
