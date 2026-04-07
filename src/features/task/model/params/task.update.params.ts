import { RecurrenceType } from '../types/recurrence.type';

export type UpdateTaskParams = {
  name?: string;
  description?: string;
  done?: boolean;
};

export type UpdateRecurringParams = {
  name?: string;
  description?: string;
  startDate?: Date;
  frequencyType?: RecurrenceType;
  monthDay?: number;
  weekDays?: number[];
};
