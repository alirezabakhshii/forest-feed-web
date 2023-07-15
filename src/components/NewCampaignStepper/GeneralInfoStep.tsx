import React, {useCallback, useState} from 'react';
import {useTranslations} from 'use-intl';

import {TextArea} from '@forest-feed/components/kit/TextArea';
import {Uploader} from '@forest-feed/components/kit/Uploader';
import {Spacer} from '@forest-feed/components/common/Spacer';
import {Button, ButtonVariant} from '@forest-feed/components/kit/Button';
import {Checkbox} from '@forest-feed/components/kit/Icons/Checkbox/Checkbox';

export type GeneralInfoStepProps = {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  isConfirm: boolean;
};

export function GeneralInfoStep(props: GeneralInfoStepProps) {
  const {setActiveStep, isConfirm} = props;

  const [content, setContent] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [userAgreed, setUserAgreed] = useState<boolean>(false);

  const t = useTranslations();

  const handleChangeContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  const handleChangeUploadedFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadedFile(e.target?.files?.[0] || null);
  }, []);

  const handleDropUploadedFile = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    setUploadedFile(e.dataTransfer?.files?.[0] || null);
  }, []);

  const handleChangeUserAgreed = useCallback(() => {
    setUserAgreed(prevState => !prevState);
  }, []);

  return (
    <>
      <TextArea
        label={t(isConfirm ? 'newCampaign.postPreview' : 'newCampaign.content')}
        value={content}
        placeholder={t('newCampaign.placeholder.writePost')}
        onChange={handleChangeContent}
      />
      <Uploader
        preview={isConfirm}
        file={uploadedFile}
        onChange={handleChangeUploadedFile}
        onDrop={handleDropUploadedFile}
      />
      <Spacer times={4} />
      <div className="flex">
        <Checkbox
          text={t('privacyPolicy.agreeAppTermsConditions')}
          checked={userAgreed}
          onChange={handleChangeUserAgreed}
        />
      </div>
      <Spacer times={10} />
      <div className="flex items-end justify-end">
        <Button text={t('learnMore')} />
        <Spacer />
        <Button
          variant={ButtonVariant.secondary}
          text={t('approve')}
          onClick={() => setActiveStep(isConfirm ? 3 : 1)}
        />
      </div>
    </>
  );
}
