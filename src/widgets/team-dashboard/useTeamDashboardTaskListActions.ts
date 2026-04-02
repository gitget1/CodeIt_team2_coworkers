import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GROUP_QUERY_KEYS } from '@/features/group/lib/queryKeys';
import { toTaskList } from '@/features/task/lib/mappers/task.mapper';
import type { GroupDetail } from '@/features/group/model/entities/group.model';
import { useCreateTaskListMutation } from '@/features/task/hooks/useCreateTaskListMutation';
import { useUpdateTaskListMutation } from '@/features/task/hooks/useUpdateTaskListMutation';
import { useDeleteTaskListMutation } from '@/features/task/hooks/useDeleteTaskListMutation';
import { updateTask } from '@/features/task/api/updateTask';
import type { TaskBoardColumnStatus } from '@/features/task-board/model/taskBoard.types';
import type { Result } from '@/shared/types/result';
import { invalidateTeamTaskQueries, toNumberId, toNumberIds } from './taskListActionHelpers';

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
    await invalidateTeamTaskQueries(queryClient, groupId);
    toast.success('할 일 목록을 삭제했습니다.');
    // true: 캐시로 보드가 맞춰지므로 TaskBoard 쪽 로컬 제거 생략.
    return true;
  };

  const handleToggleTask = async ({
    taskGroupId,
    taskId,
    checked,
  }: {
    taskGroupId: string;
    taskId: string;
    checked: boolean;
  }) => {
    const taskListId = toNumberId(taskGroupId);
    const taskIdNum = toNumberId(taskId);
    if (taskListId === null) {
      toast.error('할 일 목록 정보를 확인할 수 없습니다.');
      return false;
    }
    if (taskIdNum === null) {
      toast.error('할 일 정보를 확인할 수 없습니다.');
      return false;
    }

    const result = await updateTask({ groupId, taskListId, taskId: taskIdNum }, { done: checked });
    if (!result.ok) {
      toast.error(result.error.message);
      return false;
    }

    await invalidateTeamTaskQueries(queryClient, groupId);
    return true;
  };

  const handleCompleteTaskGroupByDrop = async ({
    taskGroupId,
    taskIds,
  }: {
    taskGroupId: string;
    taskIds: string[];
  }) => {
    const taskListId = toNumberId(taskGroupId);
    if (taskListId === null) {
      toast.error('할 일 목록 정보를 확인할 수 없습니다.');
      return false;
    }

    const numericTaskIds = toNumberIds(taskIds);
    if (numericTaskIds.length === 0) return true;

    const results = await Promise.all(
      numericTaskIds.map((taskId) => updateTask({ groupId, taskListId, taskId }, { done: true })),
    );
    const failed = results.find(
      (result): result is Extract<Result<void>, { ok: false }> => !result.ok,
    );
    if (failed) {
      toast.error(failed.error.message);
      return false;
    }

    await invalidateTeamTaskQueries(queryClient, groupId);
    return true;
  };

  return {
    handleCreateTaskGroup,
    handleUpdateTaskGroup,
    handleDeleteTaskGroup,
    handleToggleTask,
    handleCompleteTaskGroupByDrop,
  };
}
