import { useTaskListQuery } from '../hooks/useTaskListQuery';
import { TaskCommonParams } from '../model/params/task.params';
import TaskItem from './TaskItem';

type Props = TaskCommonParams & {
  date?: string;
};

export default function TaskList({ teamId, groupId, taskListId, date }: Props) {
  const { data, isLoading, isError } = useTaskListQuery({ teamId, groupId, taskListId }, { date });
  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  if (!data?.tasks.length) {
    return <div>할일이 없습니다</div>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {data.tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
