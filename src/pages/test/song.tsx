import React from 'react';
import { GlobalLayout } from '@/widgets/layout/GlobalLayout';
import { ProfileForm, AccountInfoForm } from '@/features/user/ui';
import { cn } from '@/shared/lib/cn';

export default function AccountSettingsPage() {
  // TODO: 유저의 정보(이름, 이메일, 프로필 이미지 등) fetch
  return (
    <GlobalLayout>
      <div className="bg-background-secondary flex h-full w-full flex-col items-center overflow-y-auto px-4 py-12 sm:px-6">
        {/* 계정 설정 박스 */}
        <div
          className={cn(
            'bg-background-primary relative rounded-[20px] shadow-sm',
            //모바일 343x566
            'h-141.5 w-85.75 pt-12 pr-5.25 pb-29.25 pl-5.5',
            // 태블릿 550x745
            'md:h-186.25 md:w-137.5 md:px-11.25 md:pt-16.5 md:pb-28.25',
            // PC  940x745
            'xl:h-186.25 xl:w-235 xl:pt-16.5 xl:pr-18.5 xl:pb-[127.5px] xl:pl-14',
          )}
        >
          <h1 className="text-txt-primary absolute top-16.5 left-14 font-['Pretendard'] text-[20px] font-bold">
            계정 설정
          </h1>

          <div className="mx-auto mt-15 flex w-full flex-col items-center md:mt-10">
            <ProfileForm />
            <AccountInfoForm />
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
