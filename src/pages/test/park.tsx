import TaskList from '@/features/task/ui/TaskList';
import WeekCalendar from '@/features/task/ui/weekdate/weekDate';
import WeekDateSelector from '@/features/task/ui/weekdate/weekDateSelector';
import { useState } from 'react';

export default function TestTaskPage() {
  const [date, setDate] = useState(new Date());
  return (
    <>
<<<<<<< HEAD
=======
      <WeekCalendar initialDate={new Date()} />
>>>>>>> b7a01d0 ([COW-60] FEAT - 할일 생성 날짜 필드 구현)
      <div className="flex justify-center py-10">
        <TaskList groupId={1} taskListId={1} />
        <WeekCalendar initialDate={new Date()} />
      </div>
    </>
  );
}
