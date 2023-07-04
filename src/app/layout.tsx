import React from 'react';
import './globals.css';
import {Inter, Trirong} from 'next/font/google';
import {Logo} from '@forest-feed/components/kit/Icons/Checkbox/LogoIcon';
import {AssetIcon} from '@forest-feed/components/kit/Icons/AssetIcon';
import {TreeIcon} from '@forest-feed/components/kit/Icons/TreeIcon';
import {Spacer} from '@forest-feed/components/kit/Spacer';
import {text} from 'stream/consumers';

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
        <div className="flex items-center justify-between px-10">
          <Logo />
          <div className="flex items-center">
            <div className="border-2 w-[144px] h-[32px] rounded-full border-white flex items-end justify-end wallet-profile-address">
              {text}
            </div>
            <div className="border-2 w-[42px] h-[42px] rounded-full border-white flex items-end justify-end bg-red">
              <AssetIcon />
            </div>
            <Spacer times={2} />
            <TreeIcon />
          </div>
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
