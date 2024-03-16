import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { fonts } from '../ui/fonts';

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
