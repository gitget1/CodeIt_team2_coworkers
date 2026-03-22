<<<<<<< HEAD
=======
// WeekCalendar.tsx
>>>>>>> 983a5f2 ([COW-62] FEAT - 리스트 페이지 주차별 날짜 UI)
import { useState } from 'react';
import WeekDateHeader from './weekDateHeader';
import WeekDateSelector from './weekDateSelector';

<<<<<<< HEAD
type Props = {
  initialDate: Date;
};

export default function WeekCalendar({ initialDate }: Props) {
  const [date, setDate] = useState(new Date(initialDate));
  const [isOpen, setIsOpen] = useState(false);
=======
export default function WeekCalendar() {
  const [date, setDate] = useState(new Date());
>>>>>>> 983a5f2 ([COW-62] FEAT - 리스트 페이지 주차별 날짜 UI)

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
<<<<<<< HEAD
        isOpen={isOpen}
        onOpenCalendar={() => setIsOpen((prev) => !prev)}
        onSelectDate={(d) => {
          setDate(d);
          setIsOpen(false);
        }}
        onCloseCalendar={() => setIsOpen(false)}
      />
      <WeekDateSelector value={date} onChange={setDate} />
    </div>
  );
}
=======
      />

      <WeekDateSelector
        value={date}
        onChange={setDate}
      />
    </div>
  );
}
>>>>>>> 983a5f2 ([COW-62] FEAT - 리스트 페이지 주차별 날짜 UI)
