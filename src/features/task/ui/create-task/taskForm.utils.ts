import { set } from 'date-fns';

type Time = string;

export function combineDateTime(date: Date, time: Time): Date {
  const [hours, minutes] = time.split(':').map(Number);

  return set(date, {
    hours,
    minutes,
    seconds: 0,
    milliseconds: 0,
  });
}
