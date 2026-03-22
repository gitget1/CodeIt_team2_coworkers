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
        <Button className="rounded-full border border-gray-300 bg-primary w-4 h-4 p-0" variant="ghost" onClick={onPrev}>
          <IconArrowLeft size={12} />
        </Button>

        <Button className="rounded-full border border-gray-300 bg-primary w-4 h-4 p-0" variant="ghost" onClick={onNext}>
          <IconArrowRight size={12} />
        </Button>

        <Button className="rounded-full border border-gray-300 bg-secondary w-[24px] h-[24px] p-0" variant="ghost">
          <IconCalendar />
        </Button>
      </div>
    </div>
  );
}
