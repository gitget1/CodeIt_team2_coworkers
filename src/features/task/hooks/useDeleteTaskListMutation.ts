import { useMutation } from '@tanstack/react-query';
import { deleteTaskList } from '../api/deleteTaskList';

type Params = {
  groupId: number;
};

export function useDeleteTaskListMutation(params: Params) {
  return useMutation({
    mutationFn: ({ taskListId }: { taskListId: string }) =>
      deleteTaskList({ groupId: params.groupId, taskListId }),
  });
}
