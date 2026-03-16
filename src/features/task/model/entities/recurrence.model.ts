import { RecurrenceType } from '../types/recurrence.type';

export interface Recurrence {
  name: string;
  description?: string;
  startDate: Date;
  type: RecurrenceType;
  monthDay?: number;
}
