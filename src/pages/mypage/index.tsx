import { GlobalLayout } from '@/widgets/layout/GlobalLayout';
import { ProfileForm, AccountInfoForm } from '@/features/user/ui';
import { cn } from '@/shared/lib/cn';

export default function MyPage() {
  return (
    <>
      <GlobalLayout>
        <div className="bg-background-secondary flex h-full w-full flex-col items-center overflow-y-auto px-4 py-12 sm:px-6">
          {/*계정 설정 박스 */}
          <div
            className={cn(
              'bg-background-primary relative rounded-[20px] shadow-sm',
              // 모바일
              'h-141.5 w-85.75 pt-5.5 pr-5.25 pb-29.25 pl-5.5',
              // 태블릿
              'md:h-186.25 md:w-137.5 md:px-11.25 md:pt-16.5 md:pb-28.25',
              // PC
              'xl:h-186.25 xl:w-235 xl:pt-16.5 xl:pr-18.5 xl:pb-[127.5px] xl:pl-14',
            )}
          >
            <h1 className="text-txt-primary absolute top-[52.5px] left-5.25 text-[20px] font-bold md:top-16.5 md:left-14">
              계정 설정
            </h1>
            <div className="mx-auto mt-15 flex w-full flex-col items-center md:mt-10">
              <ProfileForm />
              <AccountInfoForm />
            </div>
          </div>
        </div>
      </GlobalLayout>
    </>
  );
}
