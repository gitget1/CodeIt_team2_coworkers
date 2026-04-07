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
          taskList={{
            id: 1,
            groupId: groupIdNum,
            title: '테스트',
            order: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            tasks: [],
          }}
        />
      </GlobalLayout>
    </>
  );
}
