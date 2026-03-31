import { TaskCommonParams } from '../model/params/task.params';
import { Task } from '../model/entities/task.model';
import { useUpdateTaskMutation } from './useUpdateTaskMutation';
import { useUpdateRecurringMutation } from './useUpdateRecurringMutation';
import { TaskFormValues, ValidTaskFormValues } from '../ui/create-task/taskForm.types';
import { isVaildTaskForm } from '../ui/create-task/taskForm.utils';
import { toUpdateTaskRecurringPayload } from '../lib/updateTaskRecurringPayload';
import { toUpdateTaskPayload } from '../lib/updateTaskPayload';
import { RecurrenceType } from '../model/types/recurrence.type';

function isRecurringForm(data: ValidTaskFormValues): data is ValidTaskFormValues & {
  recurrence: Exclude<RecurrenceType, 'ONCE'>;
} {
  return data.recurrence !== 'ONCE';
}

export function useUpdateTaskHandler(params: TaskCommonParams, task: Task, onClose: () => void) {
  const updateTaskMutation = useUpdateTaskMutation(params);
  const updateRecurringMutation = useUpdateRecurringMutation(params);

  const isPending = updateTaskMutation.isPending || updateRecurringMutation.isPending;

  const submit = (data: TaskFormValues) => {
    if (!isVaildTaskForm(data)) return;

    if (task.recurrenceId && isRecurringForm(data)) {
      const recurringPayload = toUpdateTaskRecurringPayload(data);
      const taskPayload = toUpdateTaskPayload(data);

      updateRecurringMutation.mutate(
        {
          recurringId: task.recurrenceId,
          body: recurringPayload,
        },
        {
          onSuccess: (recurringResult) => {
            if (!recurringResult.ok) return;

            updateTaskMutation.mutate(
              {
                taskId: task.id,
                body: taskPayload,
              },
              {
                onSuccess: (taskResult) => {
                  if (!taskResult.ok) return;
                  onClose();
                },
              },
            );
          },
        },
      );
      return;
    }
    const payload = toUpdateTaskPayload(data);
    updateTaskMutation.mutate(
      {
        taskId: task.id,
        body: payload,
      },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onClose();
        },
      },
    );
  };

  return {
    submit,
    isPending,
  };
}
