import { useCallback, useEffect, useRef, useState } from 'react';
import type { TaskBoard } from '../model/taskBoard.types';
import { removeTaskGroupFromBoard, renameTaskGroupInBoard } from '../lib/taskBoardLocalUpdates';

function getBoardSnapshot(board: TaskBoard) {
  return JSON.stringify(
    board.columns.map((column) => ({
      id: column.id,
      status: column.status,
      taskGroups: column.taskGroups.map((group) => ({
        id: group.id,
        name: group.name,
        tasks: group.tasks.map((task) => ({ id: task.id, completed: task.completed, title: task.title })),
      })),
    })),
  );
}

export function useTaskBoardBoard(initialBoard: TaskBoard) {
  const [board, setBoard] = useState<TaskBoard>(initialBoard);
  const lastInitialSnapshotRef = useRef(getBoardSnapshot(initialBoard));

  useEffect(() => {
    const nextSnapshot = getBoardSnapshot(initialBoard);
    if (lastInitialSnapshotRef.current === nextSnapshot) return;

    lastInitialSnapshotRef.current = nextSnapshot;
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
