import GroupSettingMenu from '@/features/task/ui/header/groupSettingMenu';
import Header from '@/features/task/ui/header/header';
import WeekCalendar from '@/features/task/ui/weekdate/weekDate';
import { useCallback, useState } from 'react';
import { TaskListSidebar } from './task-lists/TaskListSidebar';
import TasksSection from './TasksSection';
import { TaskListHorizontal } from './task-lists/TaskListHorizontal';
import { useRouter } from 'next/router';
import { useGroupQuery } from '@/features/group/hooks/useGroupQuery';
import type { TaskList } from '@/features/task/model/entities/task.model';
import type { TaskListSidebarItem } from './task-lists/taskListSidebar.types';
import { CreateTaskBoardModal } from '@/features/task-board/ui/CreateTaskBoardModal';
import { EditTaskGroupModal } from '@/features/task-board/ui/EditTaskGroupModal';
import { DeleteTaskGroupModal } from '@/features/task-board/ui/DeleteTaskGroupModal';
import { useTaskListActions } from '@/features/task/hooks/useTaskListActions';

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

function isFiniteNumber(value: number | undefined): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function TaskPageLayout({ groupId, taskList }: Props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const router = useRouter();
  const { data: group } = useGroupQuery(groupId, { enabled: router.isReady });

  const taskListIdFromUrl = Number(router.query.taskListId);
  const currentId: number | undefined = Number.isFinite(taskListIdFromUrl)
    ? taskListIdFromUrl
    : (taskList?.id ?? group?.taskLists?.[0]?.id);

  const currentIdNum = isFiniteNumber(currentId) ? currentId : -1;

  const handleSelectTaskList = useCallback(
    (id: number) => {
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
    },
    [groupId, router],
  );

  const taskListActions = useTaskListActions({
    groupId,
    currentTaskListId: currentIdNum,
    taskLists: group?.taskLists,
    onSelectTaskList: handleSelectTaskList,
  });

  if (!router.isReady) return null;
  if (!isFiniteNumber(currentId)) return null;

  const taskListSidebarItems = group?.taskLists?.map((l) => toTaskListSidebarItem(l)) ?? [];

  const selectedListFromGroup = group?.taskLists?.find((l) => l.id === currentIdNum);
  const selectedListFromDetail =
    taskList && taskList.id === currentIdNum ? toTaskListSidebarItem(taskList) : undefined;
  const selectedList = selectedListFromGroup
    ? toTaskListSidebarItem(selectedListFromGroup)
    : selectedListFromDetail;

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-4 px-4 py-4 sm:gap-6 sm:px-6 sm:py-6">
        <Header right={<GroupSettingMenu role="ADMIN" />} />
        <div className="flex w-full flex-col gap-4 sm:gap-6 lg:flex-row">
          <div className="hidden w-[240px] shrink-0 lg:flex lg:flex-col lg:gap-4">
            <h2 className="text-txt-primary text-lg font-semibold">할 일</h2>

            <div className="border-background-tertiary cursor-pointer rounded-2xl bg-white p-4">
              <TaskListSidebar
                taskLists={taskListSidebarItems}
                selectedId={currentIdNum}
                onSelect={handleSelectTaskList}
                onCreate={taskListActions.openCreateModal}
                onEdit={(id) => taskListActions.openEditModal(id)}
                onDelete={(id) => taskListActions.openDeleteModal(id)}
              />
            </div>
          </div>
          <div className="lg:hidden">
            <TaskListHorizontal
              taskLists={taskListSidebarItems}
              selectedId={currentIdNum}
              onSelect={handleSelectTaskList}
              onCreate={taskListActions.openCreateModal}
              onEdit={(id) => taskListActions.openEditModal(id)}
              onDelete={(id) => taskListActions.openDeleteModal(id)}
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

      <CreateTaskBoardModal
        isOpen={taskListActions.isCreateOpen}
        close={taskListActions.closeCreateModal}
        onSubmit={taskListActions.handleCreateSubmit}
      />

      <EditTaskGroupModal
        isOpen={taskListActions.editing !== null}
        onClose={taskListActions.closeEditModal}
        editedTitle={taskListActions.editedTitle}
        onEditedTitleChange={taskListActions.setEditedTitle}
        onConfirmEdit={taskListActions.handleConfirmEdit}
      />

      <DeleteTaskGroupModal
        isOpen={taskListActions.deletingId !== null}
        onClose={taskListActions.closeDeleteModal}
        onConfirmDelete={taskListActions.handleConfirmDelete}
      />
    </>
  );
}
