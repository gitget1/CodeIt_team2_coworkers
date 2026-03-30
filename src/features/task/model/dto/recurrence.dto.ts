import { RecurrenceType } from '../types/recurrence.type';

export interface RecurrenceDto {
  name: string;
  description?: string | null;
  startDate: string;
  frequencyType: RecurrenceType;
  monthDay?: number;
  weekDays?: number[];
}
