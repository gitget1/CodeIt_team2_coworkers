import { ValidTaskFormValues } from '../ui/create-task/taskForm.types';
import { combineDateTime } from '../ui/create-task/taskForm.utils';

export function toUpdateTaskRecurringPayload(data: ValidTaskFormValues) {
  const { date, time } = data.dateTime;
  const startDate = combineDateTime(date, time);

  return {
    name: data.title,
    description: data.description,
    startDate,
    frequencyType: data.recurrence,
    weekDays: data.selectedDays,
    monthDay: startDate.getDate(),
  };
}
