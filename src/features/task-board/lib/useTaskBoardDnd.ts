import { useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import type { TaskBoard } from '../model/taskBoard.types';
import { applyTaskBoardDragEnd, type TaskBoardDragDroppedPayload } from './applyTaskBoardDragEnd';
import { findTaskGroupLocation, parseStatusFromDroppableId } from './taskBoardDnd.utils';

export type TaskListOrderPersistPayload = {
  nextBoard: TaskBoard;
  movedTaskListId: string;
};

type UseTaskBoardDndParams = {
  board: TaskBoard;
  setBoard: Dispatch<SetStateAction<TaskBoard>>;
  onTaskGroupDropped?: (params: TaskBoardDragDroppedPayload) => void;
  /** 드래그로 옮긴 목록의 순서를 서버 displayIndex에 반영 */
  onTaskListOrderPersist?: (payload: TaskListOrderPersistPayload) => Promise<void> | void;
};

export function useTaskBoardDnd({
  board,
  setBoard,
  onTaskGroupDropped,
  onTaskListOrderPersist,
}: UseTaskBoardDndParams) {
  const boardRef = useRef(board);
  boardRef.current = board;

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
    setActiveTaskGroupId(null);
    setDropIndicatorId(null);

    const { over } = event;
    if (!over) return;

    const result = applyTaskBoardDragEnd(boardRef.current, event);
    if (!result) return;

    setBoard(result.nextBoard);

    void onTaskListOrderPersist?.({
      nextBoard: result.nextBoard,
      movedTaskListId: result.movedTaskListId,
    });

    void onTaskGroupDropped?.(result.droppedPayload);
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
