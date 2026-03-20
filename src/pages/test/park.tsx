import { useQuery } from '@tanstack/react-query';
import { getTaskList } from '@/features/task/api/getTaskList';
import { useCreateTaskMutation } from '@/features/task/hooks/useCreateTaskMutation';

export default function TestTaskPage() {
  const { mutateAsync, isPending } = useCreateTaskMutation({
    teamId: 1,
    groupId: 1,
    taskListId: 1,
  });

  const handleCreate = async () => {
    const result = await mutateAsync({
      name: '테스트 할 일',
      groupId: 1,
    });
    if (!result.ok) {
      alert(result.error.message);
      return;
    }
    alert('성공');
  };
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
    <>
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
      </div>

      <div style={{ padding: 20 }}>
        <button onClick={handleCreate} disabled={isPending}>
          생성 테스트
        </button>
      </div>
    </>
  );
}
