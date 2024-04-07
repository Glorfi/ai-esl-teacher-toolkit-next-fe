import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { fonts } from '../shared/ui/fonts';
import { AuthComponent } from '@/components/AuthComponent';

export const metadata: Metadata = {
  title: 'AI ESL Teacher Toolkit',
  description: 'AI ESL Teacher Toolkit is great!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fonts.lato.className}>
        <Providers>
          {children}
          <AuthComponent />
        </Providers>
      </body>
    </html>
  );
}
