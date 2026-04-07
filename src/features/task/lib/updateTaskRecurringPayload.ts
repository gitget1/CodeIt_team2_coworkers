import { CreateRecurringParams } from '../model/params/task.create.params';
import { RecurrenceType } from '../model/types/recurrence.type';
import { ValidTaskFormValues } from '../ui/create-task/taskForm.types';
import { combineDateTime } from '../ui/create-task/taskForm.utils';

type UpdateRecurringParams = {
  name?: string;
  description?: string;
  startDate?: Date;
  frequencyType?: RecurrenceType;
  monthDay?: number;
  weekDays?: number[];
};
type ValidRecurringFormValue = ValidTaskFormValues & {
  recurrence: Exclude<RecurrenceType, 'ONCE'>;
};

export function toUpdateTaskRecurringPayload(data: ValidRecurringFormValue): UpdateRecurringParams {
  const { date, time } = data.dateTime;
  const startDate = combineDateTime(date, time);

  return {
    name: data.title,
    description: data.description,
    startDate,
    frequencyType: data.recurrence,
    ...(data.recurrence === 'WEEKLY' && {
      weekDays: data.selectedDays,
    }),
    ...(data.recurrence === 'MONTHLY' && {
      monthDay: startDate.getDate(),
    }),
  };
}
