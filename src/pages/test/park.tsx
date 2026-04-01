import GroupSettingMenu from '@/features/task/ui/header/groupSettingMenu';
import Header from '@/features/task/ui/header/header';
import { TaskListSidebar } from '@/features/task/ui/task-lists/TaskListSidebar';
import TaskList from '@/features/task/ui/TasksSection';
import WeekCalendar from '@/features/task/ui/weekdate/weekDate';

export default function TestTaskPage() {
  const taskLists = [
    { id: 1, title: '법인 설립', completedCount: 1, totalCount: 5 },
    { id: 2, title: '법인 등기', completedCount: 3, totalCount: 5 },
    { id: 3, title: '정기 주총', completedCount: 4, totalCount: 5 },
  ];

  return (
    <>
      <div className="flex justify-center py-10">
        <Header right={<GroupSettingMenu role="ADMIN" />} />
      </div>

      <div className="flex justify-center py-10">
        <WeekCalendar initialDate={new Date()} />
      </div>

      <div className="flex justify-center">
        <div className="flex w-full max-w-[1200px] gap-6">
          <TaskListSidebar
            taskLists={taskLists}
            onCreate={() => console.log('create')}
            onEdit={(id) => console.log('edit', id)}
            onDelete={(id) => console.log('delete', id)}
          />

          <div className="flex-1">
            <TaskList groupId={1} taskListId={1} />
          </div>
        </div>
      </div>
    </>
  );
}
