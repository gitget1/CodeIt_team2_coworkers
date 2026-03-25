type Time = string;

export type TaskFormValues = {
  title: string;
  description: string;
  date?: Date | undefined;
  time?: Time | undefined;
  recurrence: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  selectedDays: number[];
};

export const INITIAL_TASK_FORM_VALUES: TaskFormValues = {
  title: '',
  description: '',
  date: undefined,
  time: undefined,
  recurrence: 'ONCE',
  selectedDays: [],
};
