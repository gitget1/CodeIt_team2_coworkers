import { useRouter } from 'next/router';
import { TaskPageLayout } from '@/features/task/ui/TaskPageLayout';
import { GlobalLayout } from '@/widgets/layout/GlobalLayout';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';
import { useTaskListsQuery } from '@/features/task/hooks/useTaskListsQuery';

export default function TaskPage() {
  const router = useRouter();
  const { teamId } = router.query;

  const groupId = Number(teamId);

  const {data: taskLists, isLoading} = useTaskListsQuery(groupId);

  if (!teamId || Number.isNaN(groupId)) return null;
  if (isLoading) return <Skeleton className="h-10 w-1/3 rounded-lg" />;

  return <TaskPageLayout groupId={groupId} taskLists={taskLists}/>;
}
TaskPage.getLayout = function getLayout(page: React.ReactElement) {
  return <GlobalLayout>{page}</GlobalLayout>;
};
