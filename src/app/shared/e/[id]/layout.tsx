import type { Metadata } from 'next';
import '../../../globals.css';

export const metadata: Metadata = {
  title: 'AI ESL Teacher Toolkit - Exercise!',
  description: 'AI ESL Teacher Toolkit is great!',
};

export default function sharedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
