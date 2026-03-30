import { CreateTaskParams } from '../model/params/task.create.params';
import { ValidTaskFormValues } from '../ui/create-task/taskForm.types';
import { combineDateTime } from '../ui/create-task/taskForm.utils';

type UpdateTaskParams = CreateTaskParams;

export function toUpdateTaskPayload(data: ValidTaskFormValues): UpdateTaskParams {
  const { date, time } = data.dateTime;
  const startDate = combineDateTime(date, time);
  return {
    name: data.title,
    description: data.description,
    startDate,
    frequencyType: 'ONCE',
  };
}
