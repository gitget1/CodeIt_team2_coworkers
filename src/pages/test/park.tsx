import { TaskPageLayout } from '@/features/task/ui/TaskPageLayout';
import { GlobalLayout } from '@/widgets/layout/GlobalLayout';
import { useRouter } from 'next/router';

export default function TestTaskPage() {
  const router = useRouter();
  const { groupId } = router.query;

  const groupIdNum = Number(groupId);
  return (
    <>
      <GlobalLayout>
        <TaskPageLayout
          groupId={groupIdNum}
          taskLists={[
            { id: 1, title: '테스트', groupId: 123, completedCount: 3, totalCount: 6 },
            { id: 2, title: '테스트2', groupId: 123, completedCount: 1, totalCount: 4 },
            { id: 3, title: '테스트3', groupId: 123, completedCount: 2, totalCount: 5 },
          ]}
        />
      </GlobalLayout>
    </>
  );
}
