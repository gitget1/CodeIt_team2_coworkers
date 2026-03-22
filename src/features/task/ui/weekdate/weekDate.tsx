// WeekCalendar.tsx
import { useState } from 'react';
import WeekDateHeader from './weekDateHeader';
import WeekDateSelector from './weekDateSelector';

export default function WeekCalendar() {
  const [date, setDate] = useState(new Date());

  const handlePrevWeek = () => {
    const prev = new Date(date);
    prev.setDate(prev.getDate() - 7);
    setDate(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(date);
    next.setDate(next.getDate() + 7);
    setDate(next);
  };

  return (
    <div className="flex flex-col gap-4">
      <WeekDateHeader
        value={date}
        onPrev={handlePrevWeek}
        onNext={handleNextWeek}
      />

      <WeekDateSelector
        value={date}
        onChange={setDate}
      />
    </div>
  );
}