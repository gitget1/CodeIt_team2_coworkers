import { combineDateTime } from '../ui/create-task/taskForm.utils';
import { ValidTaskFormValues } from '../ui/create-task/taskForm.types';
import { CreateTaskParams, CreateRecurringParams } from '../model/params/task.create.params';

export function toCreateTaskPayload(
  data: ValidTaskFormValues,
): CreateTaskParams | CreateRecurringParams {
  const { date, time } = data.dateTime;

  const startDate = combineDateTime(date, time);

  const base = {
    name: data.title,
    description: data.description,
    startDate,
  };

  const frequencyType = data.recurrence;

  switch (frequencyType) {
    case 'ONCE':
    case 'DAILY':
      return {
        ...base,
        frequencyType,
      };

    case 'WEEKLY':
      return {
        ...base,
        frequencyType,
        weekDays: data.selectedDays,
      };

    case 'MONTHLY':
      return {
        ...base,
        frequencyType,
        monthDay: startDate.getDate(),
      };

    default:
      throw new Error('Invalid recurrence type');
  }
}
