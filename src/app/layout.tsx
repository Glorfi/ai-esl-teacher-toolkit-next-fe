import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { fonts } from '../shared/ui/fonts';
import { AuthComponent } from '@/widgets/user';
import { GoogleAnalytics } from '@next/third-parties/google';

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

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${fonts.lato.variable}`}>
        <Providers>
          {children}
          <AuthComponent />
        </Providers>
        {process.env.NODE_ENV === 'production' ? (
          <>
            <GoogleAnalytics gaId={process.env.NEXT_GA_KEY ?? ''} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              
              ym(97746601, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
              });
            `,
              }}
            />
            <noscript>
              <div>
                <img
                  src="https://mc.yandex.ru/watch/97746601"
                  style={{ position: 'absolute', left: '-9999px' }}
                  alt=""
                />
              </div>
            </noscript>
          </>
        ) : null}
      </body>
    </html>
  );
}
