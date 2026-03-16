import { RecurrenceType } from '../types/recurrence.type';

export interface RecurrenceDto {
  name: string;
  description: string;
  startDate: string;
  frequencyType: RecurrenceType;
  monthDay: number;
}
