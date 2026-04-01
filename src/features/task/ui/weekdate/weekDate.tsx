import { useState } from 'react';
import WeekDateHeader from './weekDateHeader';
import WeekDateSelector from './weekDateSelector';

type Props = {
  initialDate: Date;
  onSelectDate?: (date: Date) => void;
  groupName: string;
};

export default function WeekCalendar({ initialDate, onSelectDate, groupName }: Props) {
  const [date, setDate] = useState(new Date(initialDate));
  const [isOpen, setIsOpen] = useState(false);

  const handlePrevWeek = () => {
    const prev = new Date(date);
    prev.setDate(prev.getDate() - 7);
    setDate(prev);
    onSelectDate?.(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(date);
    next.setDate(next.getDate() + 7);
    setDate(next);
    onSelectDate?.(next);
  };

  return (
    <div className="flex flex-col gap-4">
      <WeekDateHeader
        value={date}
        groupName={groupName}
        onPrev={handlePrevWeek}
        onNext={handleNextWeek}
        isOpen={isOpen}
        onOpenCalendar={() => setIsOpen((prev) => !prev)}
        onSelectDate={(d) => {
          setDate(d);
          setIsOpen(false);
          onSelectDate?.(d);
        }}
        onCloseCalendar={() => setIsOpen(false)}
      />
      <WeekDateSelector
        value={date}
        onChange={(d) => {
          setDate(d);
          onSelectDate?.(d);
        }}
      />
    </div>
  );
}
