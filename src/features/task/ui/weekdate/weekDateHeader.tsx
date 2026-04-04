import { Button } from '@/shared/ui/Button';
import { IconArrowLeft } from '@/shared/ui/icons/IconArrowLeft';
import { IconArrowRight } from '@/shared/ui/icons/IconArrowRight';
import { IconCalendar } from '@/shared/ui/icons/IconCalendar';
import Calendar from '../../dateTimeField/datePopover';
import { useRef } from 'react';
import useClickOutside from '@/shared/hooks/useClickOutside';

type Props = {
  value: Date;
  groupName: string;
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
  groupName,
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
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
      <div className="min-w-0">
        <h2 className="text-txt-primary truncate text-base font-bold md:text-lg lg:text-xl">{groupName}</h2>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-3">
        <h2 className="text-txt-primary shrink-0 text-sm font-semibold md:text-base lg:text-lg">
          {formatMonth(value)}
        </h2>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            className="bg-primary h-4 w-4 rounded-full border border-gray-300 p-0"
            variant="ghost"
            onClick={onPrev}
            aria-label="이전 달"
          >
            <IconArrowLeft size={12} />
          </Button>

          <Button
            className="bg-primary h-4 w-4 rounded-full border border-gray-300 p-0"
            variant="ghost"
            onClick={onNext}
            aria-label="다음 달"
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
