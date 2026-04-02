import { ReactElement, useState } from 'react';
import { GlobalLayout } from '@/widgets/layout/GlobalLayout';
import { HistoryBoard } from '@/features/history/ui/HistoryBoard';
import { cn } from '@/shared/lib/cn';
import { TeamHeader } from '@/features/history/components/TeamHeader';
export default function MyHistoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="bg-background-secondary min-h-screen w-full">
      <main
        className={cn(
          'flex w-full flex-col',
          'mx-auto flex w-full max-w-300 flex-col items-center',
          'px-4 pt-5 md:px-6 md:pt-16 xl:pt-22.5',
        )}
      >
        <div className="mb-6 w-full max-w-85.75 md:mb-5.5 md:max-w-155 xl:mb-12 xl:max-w-280">
          <TeamHeader
            selectedCategory={selectedCategory}
            onResetCategory={() => setSelectedCategory(null)}
          />
        </div>

        <div className="flex w-full justify-center">
          <HistoryBoard
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </main>
    </div>
  );
}
MyHistoryPage.getLayout = function getLayout(page: ReactElement) {
  return <GlobalLayout>{page}</GlobalLayout>;
};
