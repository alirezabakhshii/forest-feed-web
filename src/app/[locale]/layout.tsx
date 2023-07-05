import React from 'react';
import {Inter} from 'next/font/google';
import {notFound} from 'next/navigation';
import {NextIntlClientProvider} from 'next-intl';

import {AppHeader} from '@forest-feed/components/kit/AppHeader';
import './globals.css';

const inter = Inter({subsets: ['latin']});

export type RootLayoutProps = {
  params: {locale: string};
  children: React.ReactNode;
};

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function LocaleLayout(props: RootLayoutProps) {
  const {
    params: {locale},
    children,
  } = props;

  let messages;
  try {
    messages = (await import(`../../localization/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-primaryBg`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppHeader walletAddress="0x21212121212121212121212" />
          <div>{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
