import { RecurrenceType } from '../../model/types/recurrence.type';

type Time = string;

export type TaskFormValues = {
  title: string;
  dateTime?: {
    date?: Date;
    time?: Time;
  };
  recurrence: RecurrenceType;
  selectedDays: number[];
  description: string;
};

export type ValidTaskFormValues = {
  title: string;
  dateTime: {
    date: Date;
    time: string;
  };
  recurrence: RecurrenceType;
  selectedDays: number[];
  description: string;
};

export const INITIAL_TASK_FORM_VALUES: TaskFormValues = {
  title: '',
  dateTime: {
    date: undefined,
    time: undefined,
  },
  recurrence: 'ONCE',
  selectedDays: [],
  description: '',
};
