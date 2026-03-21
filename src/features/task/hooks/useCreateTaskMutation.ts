import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../api/createTask';
import { TASK_QUERY_KEYS } from '../lib/queryKeys';
import { TaskCommonParams } from '../model/params/task.params';
import { createRecurring } from '../api/createRecurring';
import { RecurrenceType } from '../model/types/recurrence.type';

type UseCreateTaskMutationParams = TaskCommonParams & {
  date?: string;
};

type CreateTaskFormValues = {
  name: string;
  description?: string;
  startDate?: Date;
  frequencyType: RecurrenceType;
  monthDay?: number;
};

export function useCreateTaskMutation(params: UseCreateTaskMutationParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateTaskFormValues) => {
      const path = {
        groupId: params.groupId,
        taskListId: params.taskListId,
      };

      if (body.frequencyType === 'ONCE') {
        return createTask(path, {
          name: body.name,
          description: body.description,
          startDate: body.startDate,
          frequencyType: body.frequencyType,
        });
      }

      return createRecurring(path, {
        name: body.name,
        description: body.description,
        startDate: body.startDate!,
        frequencyType: body.frequencyType,
        monthDay: body.monthDay,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TASK_QUERY_KEYS.lists(params.groupId),
      });
    },
  });
}

// TODO:
// 추후 리팩토링이 필요함 body.startDate!, 확장성 고려로 로직 분리
