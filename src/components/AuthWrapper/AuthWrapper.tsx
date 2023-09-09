import React, {useCallback, useMemo} from 'react';

import {useAccount} from 'wagmi';
import {RotatingLines} from 'react-loader-spinner';

import {useWeb3} from '@forest-feed/redux/module/web3/web3.slice';
import {RenderIf} from '@forest-feed/components/common/RenderIf';
import {colors} from 'colors';

import {useAuthLens} from '@forest-feed/hooks/useAuthLens';
import {ConnectToUse} from '@forest-feed/components/AuthWrapper/ConnectToUse';
import {useProfile} from '@forest-feed/redux/module/profile/profile';
import './AuthWrapper.scss';

export type AuthLoaderProps = {
  hideLoader: boolean;
};
export function AuthLoader(props: AuthLoaderProps) {
  const {hideLoader = false} = props;

  return (
    <div className="loader absolute inset-0 z-20">
      <div className="w-full h-full flex items-center justify-center">
        <RotatingLines
          strokeColor={colors.lightGreen}
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={!hideLoader}
        />
      </div>
    </div>
  );
}

export type AuthWrapperProps = React.PropsWithChildren<{
  className?: string;
  disabled?: boolean;
}>;

export function AuthWrapper(props: AuthWrapperProps) {
  const {className, children, disabled} = props;

  const {address, isConnected, isConnecting} = useAccount();
  const {
    web3: {isSupportedNetwork, switching, forestLoading},
  } = useWeb3();

  const {profile: forestProfile} = useProfile();

  const {lensProfile, lensProfileLoading} = useAuthLens();

  const renderLoader = useCallback((loading: boolean, disable?: boolean) => {
    return (
      <RenderIf condition={loading || !!disable}>
        <AuthLoader hideLoader={!loading && !!disable} />
      </RenderIf>
    );
  }, []);

  const loading = useMemo(
    () => isConnecting || switching || lensProfileLoading || forestLoading,
    [forestLoading, isConnecting, lensProfileLoading, switching],
  );

  const canAccessToApp = useMemo(
    () => address && lensProfile && isConnected && isSupportedNetwork && forestProfile,
    [address, forestProfile, isConnected, isSupportedNetwork, lensProfile],
  );

  return (
    <div className={`relative ${className}`}>
      {renderLoader(loading, !!canAccessToApp && disabled)}
      {canAccessToApp ? children : <ConnectToUse />}
    </div>
  );
}
