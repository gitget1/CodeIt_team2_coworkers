import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import type { TaskBoard, TaskBoardColumnStatus } from '../model/taskBoard.types';
import { findTaskGroupLocation, parseStatusFromDroppableId } from './taskBoardDnd.utils';

type UseTaskBoardDndParams = {
  board: TaskBoard;
  setBoard: Dispatch<SetStateAction<TaskBoard>>;
};

export function useTaskBoardDnd({ board, setBoard }: UseTaskBoardDndParams) {
  const [activeTaskGroupId, setActiveTaskGroupId] = useState<string | null>(null);
  const [dropIndicatorId, setDropIndicatorId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTaskGroupId(String(event.active.id));
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (!event.over) {
      setDropIndicatorId(null);
      return;
    }

    const overId = String(event.over.id);
    const overStatusFromId = parseStatusFromDroppableId(overId);
    if (overStatusFromId) {
      setDropIndicatorId(`column:${overId}`);
      return;
    }

    const translated = event.active.rect.current.translated;
    const overRect = event.over.rect;
    const activeCenterY = translated ? translated.top + translated.height / 2 : 0;
    const overMiddleY = overRect.top + overRect.height / 2;
    const isBelowHalf = activeCenterY > overMiddleY;

    setDropIndicatorId(`${isBelowHalf ? 'after' : 'before'}:${overId}`);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTaskGroupId(null);
    setDropIndicatorId(null);
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    setBoard((prev) => {
      const columns = prev.columns.map((col) => ({ ...col, taskGroups: [...col.taskGroups] }));
      const loc = findTaskGroupLocation(columns, activeId);
      if (!loc) return prev;

      const activeGroup = loc.taskGroup;
      const overStatusFromId = parseStatusFromDroppableId(overId);
      const overIsColumn = overStatusFromId !== null;

      let overCardStatus: TaskBoardColumnStatus | null = null;
      if (!overIsColumn) {
        const overLoc = findTaskGroupLocation(columns, overId);
        overCardStatus = overLoc?.status ?? null;
      }

      const dropTargetStatus = overIsColumn ? overStatusFromId : overCardStatus;
      if (!dropTargetStatus) return prev;

      const nextTasks =
        dropTargetStatus === 'DONE' ? activeGroup.tasks.map((t) => ({ ...t, completed: true })) : activeGroup.tasks;

      for (const col of columns) {
        col.taskGroups = col.taskGroups.filter((g) => g.id !== activeId);
      }

      const destination = columns.find((c) => c.status === dropTargetStatus);
      if (!destination) return prev;

      let insertIndex = destination.taskGroups.length;
      if (!overIsColumn && overCardStatus === dropTargetStatus) {
        const overIndex = destination.taskGroups.findIndex((g) => g.id === overId);
        if (overIndex !== -1) {
          const translated = active.rect.current.translated;
          const overRect = over.rect;
          const activeCenterY = translated ? translated.top + translated.height / 2 : 0;
          const overMiddleY = overRect.top + overRect.height / 2;
          const isBelowHalf = activeCenterY > overMiddleY;
          insertIndex = overIndex + (isBelowHalf ? 1 : 0);
        }
      }

      destination.taskGroups.splice(insertIndex, 0, { ...activeGroup, tasks: nextTasks });
      return { ...prev, columns };
    });
  };

  const handleDragCancel = () => {
    setActiveTaskGroupId(null);
    setDropIndicatorId(null);
  };

  const activeTaskGroup =
    activeTaskGroupId === null ? null : findTaskGroupLocation(board.columns, activeTaskGroupId)?.taskGroup ?? null;

  return {
    activeTaskGroupId,
    dropIndicatorId,
    activeTaskGroup,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  };
}
