import { useState } from 'react';
import WeekDateHeader from './weekDateHeader';
import WeekDateSelector from './weekDateSelector';

type Props = {
  value: Date;
  onChange?: (date: Date) => void;
  groupName: string;
};

export default function WeekCalendar({ value, onChange, groupName }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePrevMonth = () => {
    const prev = new Date(value);
    prev.setMonth(prev.getMonth() - 1);
    onChange?.(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(value);
    next.setMonth(next.getMonth() + 1);
    onChange?.(next);
  };

  return (
    <div className="flex flex-col gap-4">
      <WeekDateHeader
        value={value}
        groupName={groupName}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
        isOpen={isOpen}
        onOpenCalendar={() => setIsOpen((prev) => !prev)}
        onSelectDate={(d) => {
          setIsOpen(false);
          onChange?.(d);
        }}
        onCloseCalendar={() => setIsOpen(false)}
      />
      <WeekDateSelector
        value={value}
        onChange={(d) => {
          onChange?.(d);
        }}
      />
    </div>
  );
}
