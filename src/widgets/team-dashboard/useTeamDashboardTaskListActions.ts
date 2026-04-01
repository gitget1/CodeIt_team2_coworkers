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

    // 캐시 기반 렌더가 즉시 반영되므로 로컬 중복 생성은 막는다.
    return false;
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

    // true: 보드 훅에서 모달 닫기·로컬 반영 허용. 캐시로도 동기화되므로 로컬 갱신은 중복일 수 있음.
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
    return true;
  };

  return {
    handleCreateTaskGroup,
    handleUpdateTaskGroup,
    handleDeleteTaskGroup,
  };
}
