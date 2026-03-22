import TimeField from '@/features/task/dateTimeField/timeField';
import TaskList from '@/features/task/ui/TaskList';

export default function TestTaskPage() {
  return (
    <div className="flex justify-center py-10">
      <TaskList groupId={1} taskListId={1} />
      <TimeField />
    </div>
  );
}
