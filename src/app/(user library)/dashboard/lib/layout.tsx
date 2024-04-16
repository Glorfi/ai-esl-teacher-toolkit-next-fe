import type { Metadata } from 'next';

import LibraryDashboardLayout from './layout-cs';

export const metadata: Metadata = {
  title: 'AI ESL Teacher Toolkit - Library',
  description: 'AI ESL Teacher Toolkit is great!',
};

export default function LibraryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LibraryDashboardLayout>{children}</LibraryDashboardLayout>;
}
