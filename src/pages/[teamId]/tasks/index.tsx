import { useRouter } from 'next/router';
import { TaskPageLayout } from '@/features/task/ui/TaskPageLayout';
import { GlobalLayout } from '@/widgets/layout/GlobalLayout';

export default function TaskPage() {
  const router = useRouter();
  const { teamId } = router.query;

  const groupId = Number(teamId);

  if (!teamId || Number.isNaN(groupId)) return null;

  return <TaskPageLayout groupId={groupId} />;
}
TaskPage.getLayout = function getLayout(page: React.ReactElement) {
  return <GlobalLayout>{page}</GlobalLayout>;
};
