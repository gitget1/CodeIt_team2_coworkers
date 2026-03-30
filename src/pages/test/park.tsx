import GroupSettingMenu from '@/features/task/ui/header/groupSettingMenu';
import Header from '@/features/task/ui/header/header';
import TaskList from '@/features/task/ui/TaskList';
import WeekCalendar from '@/features/task/ui/weekdate/weekDate';

export default function TestTaskPage() {
  return (
    <>
      <div className="flex justify-center py-10">
        <Header right={<GroupSettingMenu role="ADMIN" />} />
      </div>
      <div className="flex justify-center py-10">
        <WeekCalendar initialDate={new Date()} />
      </div>
      <div className="flex justify-center py-10">
        <TaskList groupId={1} taskListId={1} />
      </div>
    </>
  );
}
