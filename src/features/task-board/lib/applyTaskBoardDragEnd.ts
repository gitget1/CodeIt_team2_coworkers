import type { DragEndEvent } from '@dnd-kit/core';
import type { TaskBoard, TaskBoardColumnStatus, TaskBoardTaskGroup } from '../model/taskBoard.types';
import {
  findTaskGroupLocation,
  isPointerInAfterHalfOfOverRect,
  parseStatusFromDroppableId,
} from './taskBoardDnd.utils';

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

export type ApplyTaskBoardDragEndOptions = {
  /** `handleDragOver`에서 계산한 삽입 힌트(드롭 순간 `translated` rect가 비는 경우 대비) */
  dropHint?: string | null;
};

function insertIndexFromDropHint(
  destinationGroups: TaskBoardTaskGroup[],
  dropHint: string | null | undefined,
): number | null {
  if (!dropHint) return null;
  if (dropHint.startsWith('before:')) {
    const id = dropHint.slice('before:'.length);
    const idx = destinationGroups.findIndex((g) => g.id === id);
    return idx === -1 ? null : idx;
  }
  if (dropHint.startsWith('after:')) {
    const id = dropHint.slice('after:'.length);
    const idx = destinationGroups.findIndex((g) => g.id === id);
    return idx === -1 ? null : idx + 1;
  }
  return null;
}

export function applyTaskBoardDragEnd(
  prev: TaskBoard,
  event: DragEndEvent,
  options?: ApplyTaskBoardDragEndOptions,
): TaskBoardDragEndResult | null {
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
    const fromHint = insertIndexFromDropHint(destination.taskGroups, options?.dropHint);
    if (fromHint !== null) {
      insertIndex = Math.min(fromHint, destination.taskGroups.length);
    } else {
      const overIndex = destination.taskGroups.findIndex((g) => g.id === overId);
      if (overIndex !== -1) {
        const translated = active.rect.current.translated;
        const initial = active.rect.current.initial;
        const overRect = over.rect;
        const deltaY = event.delta?.y ?? 0;
        const activeCenterY = translated
          ? translated.top + translated.height / 2
          : initial
            ? initial.top + initial.height / 2 + deltaY
            : overRect.top + overRect.height / 2;
        const placeAfter = isPointerInAfterHalfOfOverRect(activeCenterY, overRect);
        insertIndex = overIndex + (placeAfter ? 1 : 0);
      }
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
