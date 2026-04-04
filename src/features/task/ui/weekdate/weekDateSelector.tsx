import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/Button';

type Props = {
  value: Date;
  onChange: (date: Date) => void;
};

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function getWeekDatesAroundSelected(baseDate: Date) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + (i - 3));
    return d;
  });
}

export default function WeekDateSelector({ value, onChange }: Props) {
  const weekDates = getWeekDatesAroundSelected(value);

  return (
    <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
      {weekDates.map((date) => {
        const isSelected = date.toDateString() === value.toDateString();
        return (
          <Button
            key={date.getTime()}
            onClick={() => onChange(date)}
            className={cn(
              'flex h-[68px] w-[95px] shrink-0 flex-col items-center justify-center gap-1 rounded-xl border px-4 py-3 transition',
              isSelected
                ? 'bg-txt-primary text-txt-inverse hover:bg-txt-primary'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
            )}
          >
            <span className={cn('block font-medium text-sm', isSelected ? 'text-txt-inverse' : 'text-txt-default')}>
              {DAYS[date.getDay()]}
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
