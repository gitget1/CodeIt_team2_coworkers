import { ValidTaskFormValues } from '../ui/create-task/taskForm.types';

type UpdateTaskParams = {
  name?: string;
  description?: string;
  done?: boolean;
};

export function toUpdateTaskPayload(data: ValidTaskFormValues): UpdateTaskParams {
  return {
    name: data.title,
    description: data.description,
  };
}
