import { useRouter } from 'next/router';
import { TaskPageLayout } from '@/features/task/ui/TaskPageLayout';
import { GlobalLayout } from '@/widgets/layout/GlobalLayout';
import { useTaskListDetailQuery } from '@/features/task/hooks/useTaskListDetailQuery';

export default function TaskPage() {
  const router = useRouter();
  const { teamId, taskListId } = router.query;
  const groupIdNum = Number(teamId);
  const taskListIdNum = Number(taskListId);
  const { data: taskList, isLoading } = useTaskListDetailQuery(groupIdNum, taskListIdNum);

  if (!router.isReady) return null;

  return <TaskPageLayout groupId={groupIdNum} taskList={taskList} />;
}

TaskPage.getLayout = function getLayout(page: React.ReactElement) {
  return <GlobalLayout>{page}</GlobalLayout>;
};
