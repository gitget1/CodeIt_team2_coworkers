import TimeField from '@/features/task/dateTimeField/timeField';
import TaskList from '@/features/task/ui/TaskList';
import WeekCalendar from '@/features/task/ui/weekdate/weekDate';
import WeekDateSelector from '@/features/task/ui/weekdate/weekDateSelector';
import { useState } from 'react';

export default function TestTaskPage() {
  const [date, setDate] = useState(new Date());
  return (
    <>
      <div className="flex justify-center py-10">
        <TaskList groupId={1} taskListId={1} />
        <WeekCalendar initialDate={new Date()} />
      </div>
    </>
  );
}
