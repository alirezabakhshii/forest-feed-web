import React, {useCallback} from 'react';

import {useAccount, useDisconnect} from 'wagmi';
import {ConnectButton} from '@rainbow-me/rainbowkit';
import {useTranslations} from 'use-intl';

import {Logo} from '@forest-feed/components/kit/Icons/LogoIcon';
import {Button, ButtonVariant} from '@forest-feed/components/kit/Button';
import {LensIcon} from '@forest-feed/components/kit/Icons/LensIcon';
import {Spacer} from '@forest-feed/components/common/Spacer';
import {UserWallet} from '@forest-feed/components/layout/UserWallet';
import {SwitchNetwork} from '@forest-feed/components/SwitchNetwork/SwitchNetwork';
import {useAuthLens} from '@forest-feed/hooks/useAuthLens';
import {AppHeaderSkeleton} from '@forest-feed/components/layout/AppHeaderSkeleton';

export function AppHeader() {
  const {address, status} = useAccount();
  const {disconnectAsync} = useDisconnect();
  const {lensProfile, lensLoading, handleLensLogin, handleLensLogout, unknownError} = useAuthLens();

  const t = useTranslations();

  const handleDisconnect = useCallback(async () => {
    await handleLensLogout();
    await disconnectAsync();
  }, [disconnectAsync, handleLensLogout]);

  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
          <Spacer times={2} />
          <p className="font-extrabold text-4xl">{t('forestFeed')}</p>
        </div>
        {['connecting', 'reconnecting'].includes(status) ? (
          <AppHeaderSkeleton />
        ) : address && status === 'connected' ? (
          <div className="flex items-center">
            <SwitchNetwork />
            <Spacer />
            {lensProfile ? (
              <div className="w-40 disabled:bg-primaryGreen flex justify-center items-center rounded-[8px]">
                <p className="text-sm text-green font-extrabold drop-shadow-md">@{lensProfile.handle}</p>
              </div>
            ) : (
              <Button
                className="py-0 text-sm w-40 h-10 disabled:bg-primaryGreen shadow-lg mb-1"
                autoSize={false}
                variant={ButtonVariant.secondary}
                text={t('lens.login')}
                icon={<LensIcon />}
                disabled={lensLoading}
                loading={lensLoading}
                onClick={handleLensLogin}
              />
            )}
            <Spacer />
            <UserWallet walletAddress={address} onDisconnect={handleDisconnect} />
          </div>
        ) : (
          <ConnectButton />
        )}
      </div>
      <div className="flex items-center justify-end mt-1">
        {unknownError ? <p className="text-error text-sm">{t(`lens.errors.${unknownError}`)}</p> : null}
      </div>
    </div>
  );
}
