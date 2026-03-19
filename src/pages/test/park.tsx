import { useQuery } from '@tanstack/react-query';
import { getTaskList } from '@/features/task/api/getTaskList';
import TaskList from '@/features/task/ui/TaskList';

export default function TestTaskPage() {
  const { data: taskList } = useQuery({
    queryKey: ['taskList'],
    queryFn: () =>
      getTaskList({
        teamId: 1,
        groupId: 1,
        taskListId: 1,
      }),
  });

  // 로딩 처리
  if (!taskList) return <div>로딩중...</div>;

  return (
    <div>
      <h1>{taskList.title}</h1>

      {taskList.tasks
        .filter((task) => !task.isDeleted)
        .map((task) => (
          <div key={task.id}>
            <p>{task.title}</p>
            <p>{task.description}</p>
          </div>
        ))}
      <div>
        <TaskList teamId={1} groupId={1} taskListId={1} date="2026-03-19" />
      </div>
    </div>
  );
}
