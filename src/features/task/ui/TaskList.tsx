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
  const taskCount = data?.tasks.length ?? 0;
  if (isLoading) return <div>로딩중...</div>;

  if (isError) return <div>에러 발생</div>;

  // TODO: 로딩/에러/빈 상태 UI 컴포넌트 분리 예정 (Skeleton 포함)

  return (
    <section className="flex w-full max-w-[734px] flex-col gap-2">
      <h2 className="text-txt-primary text-lg font-semibold">
        할 일 목록 <span className="text-txt-secondary">({taskCount}개)</span>
      </h2>

      <ul className="flex w-full flex-col gap-2">
        <TaskCreateButton params={params} />
        {!data || data.tasks.length === 0 ? (
          <li className="text-txt-secondary rounded-lg border border-dashed p-4 text-sm">
            할일이 없습니다
          </li>
        ) : (
          data.tasks.map((task) => <TaskItem key={task.id} task={task} params={params} />)
        )}
      </ul>
    </section>
  );
}
