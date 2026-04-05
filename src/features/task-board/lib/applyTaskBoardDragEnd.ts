import type { DragEndEvent } from '@dnd-kit/core';
import type { TaskBoard, TaskBoardColumnStatus } from '../model/taskBoard.types';
import { findTaskGroupLocation, parseStatusFromDroppableId } from './taskBoardDnd.utils';

export type TaskBoardDragDroppedPayload = {
  taskGroupId: string;
  targetStatus: TaskBoardColumnStatus;
  /** 완료 칸 드롭 시 서버에 done:true로 보낼 id */
  taskIdsToComplete: string[];
  /** 할 일 칸 드롭 시 서버에 done:false로 보낼 id */
  taskIdsToUncheck: string[];
};

export type TaskBoardDragEndResult = {
  nextBoard: TaskBoard;
  droppedPayload: TaskBoardDragDroppedPayload;
  movedTaskListId: string;
};

export function applyTaskBoardDragEnd(prev: TaskBoard, event: DragEndEvent): TaskBoardDragEndResult | null {
  const { active, over } = event;
  if (!over) return null;

  const activeId = String(active.id);
  const overId = String(over.id);
  if (activeId === overId) return null;

  const columns = prev.columns.map((col) => ({ ...col, taskGroups: [...col.taskGroups] }));
  const loc = findTaskGroupLocation(columns, activeId);
  if (!loc) return null;

  const sourceStatus = loc.status;
  const activeGroup = loc.taskGroup;
  const overStatusFromId = parseStatusFromDroppableId(overId);
  const overIsColumn = overStatusFromId !== null;

  let overCardStatus: TaskBoardColumnStatus | null = null;
  if (!overIsColumn) {
    const overLoc = findTaskGroupLocation(columns, overId);
    overCardStatus = overLoc?.status ?? null;
  }

  const dropTargetStatus = overIsColumn ? overStatusFromId : overCardStatus;
  if (!dropTargetStatus) return null;

  const taskIdsToComplete =
    dropTargetStatus === 'DONE' ? activeGroup.tasks.filter((task) => !task.completed).map((task) => task.id) : [];

  const reopenAllInTodo = dropTargetStatus === 'TODO' && sourceStatus === 'DONE';
  const taskIdsToUncheck = reopenAllInTodo
    ? activeGroup.tasks.filter((task) => task.completed).map((task) => task.id)
    : [];

  let nextTasks = activeGroup.tasks;
  if (dropTargetStatus === 'DONE') {
    nextTasks = activeGroup.tasks.map((t) => ({ ...t, completed: true }));
  } else if (reopenAllInTodo) {
    nextTasks = activeGroup.tasks.map((t) => ({ ...t, completed: false }));
  }

  for (const col of columns) {
    col.taskGroups = col.taskGroups.filter((g) => g.id !== activeId);
  }

  const destination = columns.find((c) => c.status === dropTargetStatus);
  if (!destination) return null;

  let insertIndex = destination.taskGroups.length;
  if (!overIsColumn && overCardStatus === dropTargetStatus) {
    const overIndex = destination.taskGroups.findIndex((g) => g.id === overId);
    if (overIndex !== -1) {
      const translated = active.rect.current.translated;
      const overRect = over.rect;
      const h = Math.max(overRect.height, 1);
      const activeCenterY = translated ? translated.top + translated.height / 2 : overRect.top;
      const t = (activeCenterY - overRect.top) / h;
      const placeAfter = t > 0.5;
      insertIndex = overIndex + (placeAfter ? 1 : 0);
    }
  }

  destination.taskGroups.splice(insertIndex, 0, { ...activeGroup, tasks: nextTasks });

  const droppedPayload: TaskBoardDragDroppedPayload = {
    taskGroupId: activeId,
    targetStatus: dropTargetStatus,
    taskIdsToComplete,
    taskIdsToUncheck,
  };

  return { nextBoard: { ...prev, columns }, droppedPayload, movedTaskListId: activeId };
}
