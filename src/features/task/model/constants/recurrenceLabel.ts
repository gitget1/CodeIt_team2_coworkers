import { RecurrenceType } from '../types/recurrence.type';

export const RECURRENCE_LABEL_MAP: Record<RecurrenceType, string> = {
  ONCE: '한 번',
  DAILY: '매 일',
  WEEKLY: '매 주',
  MONTHLY: '매 달',
};