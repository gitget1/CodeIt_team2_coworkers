import GroupSettingMenu from '@/features/task/ui/header/groupSettingMenu';
import Header from '@/features/task/ui/header/header';
import WeekCalendar from '@/features/task/ui/weekdate/weekDate';
import { useState } from 'react';
import { TaskListSidebar } from './task-lists/TaskListSidebar';
import TasksSection from './TasksSection';
import { TaskListHorizontal } from './task-lists/TaskListHorizontal';
import { useRouter } from 'next/router';
import { useGroupQuery } from '@/features/group/hooks/useGroupQuery';
import type { TaskList } from '@/features/task/model/entities/task.model';
import type { TaskListSidebarItem } from './task-lists/taskListSidebar.types';

type Props = {
  groupId: number;
  taskList?: TaskList | null;
};

function toTaskListSidebarItem(list: TaskList): TaskListSidebarItem {
  return {
    id: list.id,
    groupId: list.groupId,
    title: list.title,
    totalCount: list.tasks.length,
    completedCount: list.tasks.filter((task) => task.completedAt).length,
  };
}

export function TaskPageLayout({ groupId, taskList }: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const router = useRouter();
  if (!router.isReady) return null;

  const taskListIdFromUrl = Number(router.query.taskListId);
  const { data: group } = useGroupQuery(groupId);

  const currentId: number | undefined =
    Number.isFinite(taskListIdFromUrl)
      ? taskListIdFromUrl
      : taskList?.id ?? group?.taskLists?.[0]?.id;

  if (!Number.isFinite(currentId)) return null;
  const currentIdNum = currentId as number;

  const taskListSidebarItems =
    group?.taskLists?.map((l) => toTaskListSidebarItem(l)) ?? [];

  const selectedListFromGroup = group?.taskLists?.find((l) => l.id === currentIdNum);
  const selectedListFromDetail =
    taskList && taskList.id === currentIdNum ? toTaskListSidebarItem(taskList) : undefined;
  const selectedList =
    selectedListFromGroup ? toTaskListSidebarItem(selectedListFromGroup) : selectedListFromDetail;

  const handleSelectTaskList = (id: number) => {
    router.push(
      {
        pathname: '/[teamId]/task-lists/[taskListId]',
        query: {
          teamId: groupId,
          taskListId: id,
        },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <div className="flex w-full max-w-[1100px] flex-col gap-4 px-4 py-4 sm:gap-6 sm:px-6 sm:py-6 mx-auto">
      <Header right={<GroupSettingMenu role="ADMIN" />} />
      <div className="flex w-full flex-col gap-4 lg:flex-row sm:gap-6">
        <div className="hidden w-[240px] shrink-0 lg:flex lg:flex-col lg:gap-4">
          <h2 className="text-txt-primary text-lg font-semibold">할 일</h2>

          <div className="border-background-tertiary cursor-pointer rounded-2xl bg-white p-4">
            <TaskListSidebar
              taskLists={taskListSidebarItems}
              selectedId={currentIdNum}
              onSelect={handleSelectTaskList}
              onCreate={() => {}}
              onEdit={(id) => console.log('edit', id)}
              onDelete={(id) => console.log('delete', id)}
            />
          </div>
        </div>
        <div className="lg:hidden">
          <TaskListHorizontal
            taskLists={taskListSidebarItems}
            selectedId={currentIdNum}
            onSelect={handleSelectTaskList}
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

          <TasksSection groupId={groupId} taskListId={currentIdNum} date={selectedDate} />
        </div>
      </div>
    </div>
  );
}
