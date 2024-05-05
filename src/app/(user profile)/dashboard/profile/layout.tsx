import type { Metadata } from 'next';

import ProfileDashboardLayout from './layout-cs';

export const metadata: Metadata = {
  title: 'AI ESL Teacher Toolkit - Library',
  description: 'AI ESL Teacher Toolkit is great!',
};

export default function LibraryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProfileDashboardLayout>{children}</ProfileDashboardLayout>;
}
