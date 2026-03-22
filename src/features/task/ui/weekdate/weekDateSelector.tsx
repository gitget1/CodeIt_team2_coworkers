import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/Button';

type Props = {
  value: Date;
  onChange: (date: Date) => void;
};

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function getWeekDates(baseDate: Date) {
  const start = new Date(baseDate);
  const day = start.getDay();

  start.setDate(start.getDate() - day);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export default function WeekDateSelector({ value, onChange }: Props) {
  const weekDates = getWeekDates(value);

  return (
    <div className="flex items-center gap-2">
      {weekDates.map((date, idx) => {
        const isSelected = date.toDateString() === value.toDateString();
        return (
          <Button
            key={date.toISOString()}
            onClick={() => onChange(date)}
            className={cn(
              'flex h-[68px] w-[95px] flex-col items-center justify-center gap-1 rounded-xl border px-4 py-3 transition',
              isSelected
                ? 'bg-txt-primary text-txt-inverse hover:bg-txt-primary'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
            )}
          >
            <span className={cn('block font-medium text-sm', isSelected ? 'text-txt-inverse' : 'text-txt-default')}>
              {DAYS[idx]}
            </span>
            <span className={cn('block font-semibold text-xl', isSelected ? 'text-txt-inverse' : 'text-txt-primary')}>
              {date.getDate()}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
