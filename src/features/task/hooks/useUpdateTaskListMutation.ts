import { useMutation } from '@tanstack/react-query';
import { updateTaskList } from '../api/updateTaskList';

type Params = {
  groupId: number;
};

export function useUpdateTaskListMutation(params: Params) {
  return useMutation({
    mutationFn: ({ taskListId, body }: { taskListId: string; body: { name?: string } }) =>
      updateTaskList({ groupId: params.groupId, taskListId }, body),
  });
}
