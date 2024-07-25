import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { fonts } from '../shared/ui/fonts';
import { AuthComponent } from '@/widgets/user';

export const metadata: Metadata = {
  title: 'AI ESL Teacher Toolkit',
  description:
    'Create customizable English exercises, activities, and worksheets using AI ESL Teacher Toolkit. Tailored for teachers and students of all levels.',
  keywords: [
    'AI English exercises',
    'English teaching materials',
    'esl resources for teachers',
    'esl teaching materials',
    'teaching english as a second language resources',
    'esol teaching materials',
    'esl english teaching resources',
    'english language teaching resources',
    'teaching resources for english teachers',
    'esl resources for teachers free',
    'esl teaching materials free',
    'english teaching materials',
    'teaching materials for english teachers',
    'free english teaching resources',
    'free english materials for teachers',
    'ai tools for teachers',
    'ai teaching tools',
    'chat gpt for teachers'
  ],
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
      </body>
    </html>
  );
}
