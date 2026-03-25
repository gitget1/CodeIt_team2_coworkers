import { Button } from '@/shared/ui/Button';
import { IconArrowLeft } from '@/shared/ui/icons/IconArrowLeft';
import { IconArrowRight } from '@/shared/ui/icons/IconArrowRight';
import { IconCalendar } from '@/shared/ui/icons/IconCalendar';
import Calendar from '../../dateTimeField/datePopover';
import { useRef } from 'react';
import useClickOutside from '@/shared/hooks/useClickOutside';

type Props = {
  value: Date;
  onPrev: () => void;
  onNext: () => void;
  onOpenCalendar: () => void;
  isOpen: boolean;
  onSelectDate: (date: Date) => void;
  onCloseCalendar: () => void;
};

function formatMonth(date: Date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

export default function WeekDateHeader({
  value,
  onNext,
  onPrev,
  onOpenCalendar,
  isOpen,
  onSelectDate,
  onCloseCalendar,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    refs: [wrapperRef],
    enabled: isOpen,
    onClickOutside: onCloseCalendar,
  });

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-txt-primary text-lg font-bold">
          test {/* TODO: 그룹 이름으로 교체 예정*/}
        </h2>
      </div>
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
          <div ref={wrapperRef} className="relative">
            <Button
              className="bg-secondary h-[24px] w-[24px] rounded-full border border-gray-300 p-0"
              variant="ghost"
              aria-label="CalendarOpen"
              onClick={onOpenCalendar}
            >
              <IconCalendar />
            </Button>
            {isOpen && (
              <div className="absolute top-8 right-0 z-50">
                <Calendar
                  selected={value}
                  onSelect={(d) => {
                    if (!d) return;
                    onSelectDate(d);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
