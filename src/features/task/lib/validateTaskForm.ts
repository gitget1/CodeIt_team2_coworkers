import { TaskFormValues, ValidTaskFormValues } from "../ui/create-task/taskForm.types";

export function isValidTaskFormValues(
  data: TaskFormValues,
): data is ValidTaskFormValues {
  return !!(
    data.dateTime &&
    data.dateTime.date &&
    data.dateTime.time
  );
}