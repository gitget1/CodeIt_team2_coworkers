import { useRouter } from 'next/router';
import { TaskPageLayout } from '@/features/task/ui/TaskPageLayout';
import { GlobalLayout } from '@/widgets/layout/GlobalLayout';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';
import { useTaskListDetailQuery } from '@/features/task/hooks/useTaskListDetailQuery';

export default function TaskPage() {
  const router = useRouter();
  const { teamId, taskListId } = router.query;
  const groupIdNum = Number(teamId);
  const taskListIdNum = Number(taskListId);
  const { data: taskList, isLoading } = useTaskListDetailQuery(groupIdNum, taskListIdNum);

  if (!router.isReady) return null;
  if (isLoading) {
    return <Skeleton className="h-10 w-1/3 rounded-lg" />;
  }
  if (!taskList) return null;

  return <TaskPageLayout groupId={groupIdNum} taskList={taskList} />;
}

TaskPage.getLayout = function getLayout(page: React.ReactElement) {
  return <GlobalLayout>{page}</GlobalLayout>;
};
