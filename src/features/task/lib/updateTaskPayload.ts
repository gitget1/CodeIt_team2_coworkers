import { ValidTaskFormValues } from '../ui/create-task/taskForm.types';

export function toUpdateTaskPayload(data: ValidTaskFormValues) {
  return {
    name: data.title,
    description: data.description,
  };
}
