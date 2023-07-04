import React from 'react';
import './globals.css';
import {Inter, Trirong} from 'next/font/google';
import {Logo} from '@forest-feed/components/kit/Icons/Checkbox/LogoIcon';
import {AssetIcon} from '@forest-feed/components/kit/Icons/AssetIcon';
import {TreeIcon} from '@forest-feed/components/kit/Icons/TreeIcon';
import {Spacer} from '@forest-feed/components/kit/Spacer';
import {text} from 'stream/consumers';
import {AppHeader} from '@forest-feed/components/kit/AppHeader';

const inter = Inter({subsets: ['latin']});

export type RootLayoutProps = {
  text: string;
  children: React.ReactNode;
};

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout(props: RootLayoutProps) {
  const {text, children} = props;
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppHeader text="hello" />
        <div>{children}</div>
      </body>
    </html>
  );
}
