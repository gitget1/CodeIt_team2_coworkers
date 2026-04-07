import { Task, TaskList } from '../../model/entities/task.model';
import type { TaskListSidebarItem } from '../../ui/task-lists/taskListSidebar.types';

export function toTaskListSidebarItem(list: TaskList): TaskListSidebarItem {
  const totalCount = list.tasks.length;
  const completedCount = list.tasks.filter((task) => task.completedAt).length;

  return {
    id: list.id,
    groupId: list.groupId,
    title: list.title,
    totalCount,
    completedCount,
  };
}

export function toTaskListSidebarItems(
  tasks: Task[],
  groupId: number,
): TaskListSidebarItem[] {
  const map = new Map<number, TaskListSidebarItem>();

  tasks.forEach((task) => {
    const listId = task.taskListId;
    if (listId == null) return;

    const existing = map.get(listId);

    if (existing) {
      existing.totalCount += 1;
      if (task.completedAt) existing.completedCount += 1;
      return;
    }

    map.set(listId, {
      id: listId,
      groupId,
      title: task.title,
      totalCount: 1,
      completedCount: task.completedAt ? 1 : 0,
    });
  });

  return Array.from(map.values());
}