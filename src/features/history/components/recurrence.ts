import { RecurrenceType } from '../../task/model/types/recurrence.type';

export const RECURRENCE_OPTIONS = [
  { label: '한 번', value: 'ONCE' },
  { label: '매 일', value: 'DAILY' },
  { label: '주 반복', value: 'WEEKLY' },
  { label: '월 반복', value: 'MONTHLY' },
] as const;

export const RECURRENCE_LABELS: Record<RecurrenceType, string> = {
  ONCE: '한 번',
  DAILY: '매 일',
  WEEKLY: '주 반복',
  MONTHLY: '월 반복',
};
