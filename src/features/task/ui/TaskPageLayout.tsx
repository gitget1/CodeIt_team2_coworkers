import GroupSettingMenu from '@/features/task/ui/header/groupSettingMenu';
import Header from '@/features/task/ui/header/header';
import WeekCalendar from '@/features/task/ui/weekdate/weekDate';
import { useState } from 'react';
import TaskList from './TasksSection';

export function TaskPageLayout() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-center py-6">
          <div className="w-full max-w-[1200px]">
            <Header right={<GroupSettingMenu role="ADMIN" />} />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex w-full max-w-[1200px] gap-6">
            <div className="flex w-[280px] flex-col gap-4">
              <h2 className="text-txt-primary text-lg font-semibold">할 일</h2>
              {/* <TaskListSidebar /> 들어갈 자리 */}
              <div className="rounded-2xl bg-white p-4">Sidebar 자리</div>
            </div>

            <div className="flex flex-1 flex-col gap-6">
              <WeekCalendar
                initialDate={selectedDate}
                onSelectDate={setSelectedDate}
                groupName="경영관리팀"
              />
              <TaskList groupId={1} taskListId={1} date={selectedDate} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
