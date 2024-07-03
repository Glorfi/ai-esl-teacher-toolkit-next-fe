import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { fonts } from '../shared/ui/fonts';
import { AuthComponent } from '@/widgets/user';
import { GoogleAnalytics } from '@next/third-parties/google';

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
      <body className={`${fonts.lato.variable}`}>
        <Providers>
          {children}
          <AuthComponent />
        </Providers>
        <GoogleAnalytics gaId={process.env.NEXT_GA_KEY ? process.env.NEXT_GA_KEY : ''} />
      </body>
    </html>
  );
}
