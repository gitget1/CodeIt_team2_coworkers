import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GROUP_QUERY_KEYS } from '@/features/group/lib/queryKeys';
import { toTaskList } from '@/features/task/lib/mappers/task.mapper';
import type { GroupDetail } from '@/features/group/model/entities/group.model';
import { useCreateTaskListMutation } from '@/features/task/hooks/useCreateTaskListMutation';
import { useUpdateTaskListMutation } from '@/features/task/hooks/useUpdateTaskListMutation';
import { useDeleteTaskListMutation } from '@/features/task/hooks/useDeleteTaskListMutation';
import type { TaskBoardColumnStatus } from '@/features/task-board/model/taskBoard.types';

type Params = {
  groupId: number;
};

export function useTeamDashboardTaskListActions({ groupId }: Params) {
  const queryClient = useQueryClient();
  const detailQueryKey = GROUP_QUERY_KEYS.detail(groupId);
  const { mutateAsync: createTaskList } = useCreateTaskListMutation({ groupId });
  const { mutateAsync: updateTaskList } = useUpdateTaskListMutation({ groupId });
  const { mutateAsync: deleteTaskList } = useDeleteTaskListMutation({ groupId });

  const handleCreateTaskGroup = async ({
    title,
  }: {
    status: TaskBoardColumnStatus;
    title: string;
  }): Promise<boolean> => {
    const result = await createTaskList({ name: title });
    if (!result.ok) {
      toast.error(result.error.message);
      return false;
    }

    queryClient.setQueryData<GroupDetail>(detailQueryKey, (prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        taskLists: [toTaskList(result.data), ...prev.taskLists],
      };
    });

    // true: 생성 성공. TaskBoardView에서 콜백 존재 시 로컬 생성을 건너뛴다.
    return true;
  };

  const handleUpdateTaskGroup = async ({
    taskGroupId,
    title,
  }: {
    taskGroupId: string;
    title: string;
  }): Promise<boolean> => {
    const result = await updateTaskList({
      taskListId: taskGroupId,
      body: { name: title },
    });
    if (!result.ok) {
      toast.error(result.error.message);
      return false;
    }

    queryClient.setQueryData<GroupDetail>(detailQueryKey, (prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        taskLists: prev.taskLists.map((taskList) =>
          String(taskList.id) === taskGroupId ? { ...taskList, title } : taskList,
        ),
      };
    });

    // true: 캐시로 보드가 맞춰지므로 TaskBoard 쪽 로컬 setBoard 갱신 생략.
    return true;
  };

  const handleDeleteTaskGroup = async ({
    taskGroupId,
  }: {
    taskGroupId: string;
  }): Promise<boolean> => {
    const result = await deleteTaskList({ taskListId: taskGroupId });
    if (!result.ok) {
      toast.error(result.error.message);
      return false;
    }

    queryClient.setQueryData<GroupDetail>(detailQueryKey, (prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        taskLists: prev.taskLists.filter((taskList) => String(taskList.id) !== taskGroupId),
      };
    });
    toast.success('할 일 목록을 삭제했습니다.');
    // true: 캐시로 보드가 맞춰지므로 TaskBoard 쪽 로컬 제거 생략.
    return true;
  };

  return {
    handleCreateTaskGroup,
    handleUpdateTaskGroup,
    handleDeleteTaskGroup,
  };
}
