import { RecurrenceType } from '../types/recurrence.type';

type OnceType = Extract<RecurrenceType, 'ONCE'>;
type RecurringType = Exclude<RecurrenceType, 'ONCE'>;

export interface CreateTaskParams {
  name: string;
  description?: string;
  startDate?: Date;
  frequencyType: OnceType;
}

export interface CreateRecurringParams {
  name: string;
  description?: string;
  startDate: Date;
  frequencyType: RecurringType;
  monthDay?: number;
  weekDays?: number[];
}
