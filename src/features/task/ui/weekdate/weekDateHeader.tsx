import { Button } from '@/shared/ui/Button';
import { IconArrowLeft } from '@/shared/ui/icons/IconArrowLeft';
import { IconArrowRight } from '@/shared/ui/icons/IconArrowRight';
import { IconCalendar } from '@/shared/ui/icons/IconCalendar';

type Props = {
  value: Date;
  onPrev: () => void;
  onNext: () => void;
};

function formatMonth(date: Date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

export default function WeekDateHeader({ value, onNext, onPrev }: Props) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-txt-primary text-lg font-semibold">{formatMonth(value)}</h2>

      <div className="flex items-center gap-2">
        <Button
          className="bg-primary h-4 w-4 rounded-full border border-gray-300 p-0"
          variant="ghost"
          onClick={onPrev}
          aria-label="PrevWeek-Button"
        >
          <IconArrowLeft size={12} />
        </Button>

        <Button
          className="bg-primary h-4 w-4 rounded-full border border-gray-300 p-0"
          variant="ghost"
          onClick={onNext}
          aria-label="NextWeek-Button"
        >
          <IconArrowRight size={12} />
        </Button>

        <Button
          className="bg-secondary h-[24px] w-[24px] rounded-full border border-gray-300 p-0"
          variant="ghost"
          aria-label="CalendarOpen"
        >
          <IconCalendar />
        </Button>
      </div>
    </div>
  );
}
