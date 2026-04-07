import { format, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatDate(date?: Date | null) {
  if (date === undefined || date === null) {
    return '';
  }

  if (!isValid(date)) {
    throw new Error(`[formatDate] Invalid date object provided: ${date}`);
  }

  return format(date, 'yyyy년 MM월 dd일');
}

export function formatDateWithDay(date?: Date | null) {
  if (date === undefined || date === null) return '';
  if (!isValid(date)) return '';

  return format(date, 'yyyy년 MM월 dd일 (E)', { locale: ko });
}

export function formatTime(date?: Date | null) {
  if (date === undefined || date === null) {
    return '';
  }

  if (!isValid(date)) {
    throw new Error(`[formatTime] Invalid date object provided: ${date}`);
  }

  return format(date, 'HH:mm');
}

export function formatDateTime(date?: Date | null) {
  if (date === undefined || date === null) {
    return '';
  }
  if (!isValid(date)) {
    throw new Error(`[formatDateTime] Invalid date object provided: ${date}`);
  }
  return format(date, 'yyyy-MM-dd HH:mm');
}
