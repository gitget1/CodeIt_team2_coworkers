export function getStartDateTime(date?: Date, time?: string) {
  if (!date) return new Date();

  if (!time) return date;

  const [h, m] = time.split(':').map(Number);

  const result = new Date(date);
  result.setHours(h, m, 0, 0);

  return result;
}
