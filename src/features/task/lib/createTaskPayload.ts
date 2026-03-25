import { combineDateTime } from '../ui/create-task/taskForm.utils';
import { TaskFormValues } from '../ui/create-task/taskForm.types';
import { CreateTaskParams, CreateRecurringParams } from '../model/params/task.create.params';

export function toCreateTaskPayload(
  data: TaskFormValues,
): CreateTaskParams | CreateRecurringParams {
  if (!data.date || !data.time) {
    throw new Error('날짜와 시간을 모두 입력해주세요.');
  }

  const startDate = combineDateTime(data.date, data.time);

  const base = {
    name: data.title,
    description: data.description,
    startDate,
    frequencyType: data.recurrence,
  } as const;

  switch (data.recurrence) {
    case 'ONCE':
      return base;

    case 'DAILY':
      return base;

    case 'WEEKLY':
      if (!data.selectedDays || data.selectedDays.length === 0) {
        throw new Error('요일을 선택해주세요.');
      }
      return {
        ...base,
        weekDays: data.selectedDays,
      };

    case 'MONTHLY':
      return {
        ...base,
        monthDay: startDate.getDate(),
      };

    default:
      return base;
  }
}
