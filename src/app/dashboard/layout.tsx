import type { Metadata } from 'next';
import ClientDashboardLayout from './dashboard-cs-layout';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const metadata: Metadata = {
  title: 'AI ESL Teacher Toolkit - Dashboard',
  description: 'AI ESL Teacher Toolkit is great!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientDashboardLayout>{children}</ClientDashboardLayout>;
}
