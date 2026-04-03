import GroupSettingMenu from '@/features/task/ui/header/groupSettingMenu';
import Header from '@/features/task/ui/header/header';
import WeekCalendar from '@/features/task/ui/weekdate/weekDate';
import { useEffect, useState } from 'react';
import { TaskListSidebar } from './task-lists/TaskListSidebar';
import { TaskListSidebarItem } from './task-lists/taskListSidebar.types';
import TasksSection from './TasksSection';
import { TaskListHorizontal } from './task-lists/TaskListHorizontal';

type Props = {
  groupId?: number;
  taskLists?: TaskListSidebarItem[];
};

export function TaskPageLayout({ groupId, taskLists = [] }: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTaskListId, setSelectedTaskListId] = useState<number>(taskLists[0]?.id ?? null);
  const selectedList = taskLists.find((l) => l.id === selectedTaskListId) ?? taskLists[0];

  if (!selectedList) return null;

  return (
    <div className="flex flex-col gap-6 px-6 py-6">
      <Header right={<GroupSettingMenu role="ADMIN" />} />
      <div className="flex w-full flex-col gap-6 lg:flex-row">
        <div className="hidden w-[240px] shrink-0 lg:flex lg:flex-col lg:gap-4">
          <h2 className="text-txt-primary text-lg font-semibold">할 일</h2>

          <div className="border-background-tertiary cursor-pointer rounded-2xl bg-white p-4">
            <TaskListSidebar
              taskLists={taskLists}
              selectedId={selectedTaskListId}
              onSelect={setSelectedTaskListId}
              onCreate={() => {}}
              onEdit={(id) => console.log('edit', id)}
              onDelete={(id) => console.log('delete', id)}
            />
          </div>
        </div>
        <div className="lg:hidden">
          <TaskListHorizontal
            taskLists={taskLists}
            selectedId={selectedTaskListId}
            onSelect={setSelectedTaskListId}
            onCreate={() => {}}
            onEdit={(id) => console.log('edit', id)}
            onDelete={(id) => console.log('delete', id)}
          />
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <WeekCalendar
            value={selectedDate}
            onChange={setSelectedDate}
            groupName={selectedList?.title ?? ''}
          />

          <TasksSection
            groupId={selectedList.groupId}
            taskListId={selectedTaskListId}
            date={selectedDate}
          />
        </div>
      </div>
    </div>
  );
}
