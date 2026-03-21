import { useTaskListQuery } from '../hooks/useTaskListQuery';
import { TaskCommonParams } from '../model/params/task.params';
import TaskCreateButton from './create-task/TaskCreateButton';
import TaskItem from './TaskItem';

type Props = TaskCommonParams & {
  date?: string;
};

export default function TaskList({ groupId, taskListId, date }: Props) {
  const { data, isLoading, isError } = useTaskListQuery({ groupId, taskListId }, { date });
  const params = { groupId, taskListId };
  if (isLoading) return <div>로딩중...</div>;

  if (isError) return <div>에러 발생</div>;

  if (!data || data.tasks.length === 0) return <div>할일이 없습니다</div>;

  // TODO: 로딩/에러/빈 상태 UI 컴포넌트 분리 예정 (Skeleton 포함)

  return (
    <ul className="flex w-full max-w-[734px] flex-col gap-2">
      <TaskCreateButton params={params} />
      {data.tasks.map((task) => (
        <TaskItem key={task.id} task={task} params={params} />
      ))}
    </ul>
  );
}
