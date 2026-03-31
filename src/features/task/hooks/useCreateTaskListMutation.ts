import { useMutation } from '@tanstack/react-query';
import { createTaskList } from '../api/createTaskList';

type UseCreateTaskListMutationParams = {
  groupId: number;
};

export function useCreateTaskListMutation(params: UseCreateTaskListMutationParams) {
  return useMutation({
    mutationFn: ({ name }: { name: string }) =>
      createTaskList(
        {
          groupId: params.groupId,
        },
        { name },
      ),
  });
}
