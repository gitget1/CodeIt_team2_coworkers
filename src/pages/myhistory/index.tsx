import { ReactElement, useState } from 'react';
import { GlobalLayout } from '@/widgets/layout/GlobalLayout';
import { HistoryBoard } from '@/features/history/ui/HistoryBoard';
import { cn } from '@/shared/lib/cn';
import { TeamHeader } from '@/features/history/components/TeamHeader';

export default function MyHistoryPage() {
  // const router = useRouter();
  // const { data: user } = useUserQuery();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  /* TODO: 백엔드 API에서 groupId 필터링 반영 된다면 주석 해제 예정
  const currentGroupId = router.query.groupId as string;

  useEffect(() => {
    if (user?.memberships?.length && !currentGroupId) {
      const firstGroupId = String(user.memberships[0].group.id);
      router.replace(`/myhistory?groupId=${firstGroupId}`, undefined, { shallow: true });
    }
  }, [user, currentGroupId, router]);

  // 팀 변경
  const handleGroupChange = (groupId: string) => {
    setSelectedCategory(null);
    router.push(`/myhistory?groupId=${groupId}`, undefined, { shallow: true });
  };*/

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
            // currentGroupId={currentGroupId} 임시 주석 처리
            // onGroupChange={handleGroupChange}  임시 주석 처리
          />
        </div>

        <div className="flex w-full justify-center">
          <HistoryBoard
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            // currentGroupId={currentGroupId} 임시 주석 처리
          />
        </div>
      </main>
    </div>
  );
}

MyHistoryPage.getLayout = function getLayout(page: ReactElement) {
  return <GlobalLayout>{page}</GlobalLayout>;
};
