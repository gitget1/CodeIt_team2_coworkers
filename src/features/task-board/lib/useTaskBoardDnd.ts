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
  const dropHintRef = useRef<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTaskGroupId(String(event.active.id));
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (!event.over) {
      dropHintRef.current = null;
      setDropIndicatorId(null);
      return;
    }

    const overId = String(event.over.id);
    const overStatusFromId = parseStatusFromDroppableId(overId);
    if (overStatusFromId) {
      const next = `column:${overId}`;
      dropHintRef.current = next;
      setDropIndicatorId(next);
      return;
    }

    const translated = event.active.rect.current.translated;
    const initial = event.active.rect.current.initial;
    const overRect = event.over.rect;
    const deltaY = event.delta?.y ?? 0;
    const activeCenterY = translated
      ? translated.top + translated.height / 2
      : initial
        ? initial.top + initial.height / 2 + deltaY
        : overRect.top + overRect.height / 2;
    const overMiddleY = overRect.top + overRect.height / 2;
    const isBelowHalf = activeCenterY > overMiddleY;

    const next = `${isBelowHalf ? 'after' : 'before'}:${overId}`;
    dropHintRef.current = next;
    setDropIndicatorId(next);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const dropHint = dropHintRef.current;
    dropHintRef.current = null;
    setActiveTaskGroupId(null);
    setDropIndicatorId(null);

    const { over } = event;
    if (!over) return;

    const result = applyTaskBoardDragEnd(boardRef.current, event, { dropHint });
    if (!result) return;

    setBoard(result.nextBoard);

    void onTaskListOrderPersist?.({
      nextBoard: result.nextBoard,
      movedTaskListId: result.movedTaskListId,
    });

    void onTaskGroupDropped?.(result.droppedPayload);
  };

  const handleDragCancel = () => {
    dropHintRef.current = null;
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
