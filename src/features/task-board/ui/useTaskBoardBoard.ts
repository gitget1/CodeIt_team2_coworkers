import { useCallback, useEffect, useState } from 'react';
import type { TaskBoard } from '../model/taskBoard.types';
import { removeTaskGroupFromBoard, renameTaskGroupInBoard } from '../lib/taskBoardLocalUpdates';

export function useTaskBoardBoard(initialBoard: TaskBoard) {
  const [board, setBoard] = useState<TaskBoard>(initialBoard);

  useEffect(() => {
    setBoard(initialBoard);
  }, [initialBoard]);

  const setCardNameLocal = useCallback((taskGroupId: string, title: string) => {
    setBoard((prev) => renameTaskGroupInBoard(prev, taskGroupId, title));
  }, []);

  const removeCardLocal = useCallback((taskGroupId: string) => {
    setBoard((prev) => removeTaskGroupFromBoard(prev, taskGroupId));
  }, []);

  return { board, setBoard, setCardNameLocal, removeCardLocal };
}
