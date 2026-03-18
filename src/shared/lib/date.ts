import { format, isValid } from 'date-fns';

export function formatDate(date: Date) {
  const parsed = typeof date === 'string' ? new Date(date) : date;
  if (!isValid(parsed)) return '';

  return format(date, 'yyyy-MM-dd');
}

export function formatDateTime(date: Date) {
  const parsed = typeof date === 'string' ? new Date(date) : date;
  if (!isValid(parsed)) return '';
  return format(date, 'yyyy-MM-dd HH:mm');
}
