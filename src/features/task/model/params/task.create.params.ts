import { RecurrenceType } from '../types/recurrence.type';

export interface CreateTaskParams {
  name: string;
  description?: string;
  startDate?: Date;
}

export interface CreateRecurringParams {
  name: string;
  description?: string;
  startDate: Date;
  frequencyType: RecurrenceType;
  monthDay?: number;
}
