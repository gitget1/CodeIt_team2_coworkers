import { ReactElement } from 'react';
import { GlobalLayout } from '@/widgets/layout/GlobalLayout';
import { HistoryBoard } from '@/features/history/ui/HistoryBoard';
import { cn } from '@/shared/lib/cn';

export default function MyHistoryPage() {
  return (
    <div className="bg-background-secondary min-h-screen w-full">
      {/* TODO: 아직 머지 전이라 추후 팀 헤더 추가 예정*/}
      {/* <Header /> */}
      <main
        className={cn(
          'flex w-full flex-col',
          'pt-5 md:pt-16 xl:pt-[90px]',
          'px-[16px] md:px-[26px] xl:px-0 xl:pl-[85px]',
        )}
      >
        <div className="mb-6 w-full md:mb-5.5 xl:mb-12">{/* <TeamHeader /> */}</div>

        <div className="flex w-full justify-center xl:justify-start">
          <HistoryBoard />
        </div>
      </main>
    </div>
  );
}
MyHistoryPage.getLayout = function getLayout(page: ReactElement) {
  return <GlobalLayout>{page}</GlobalLayout>;
};
