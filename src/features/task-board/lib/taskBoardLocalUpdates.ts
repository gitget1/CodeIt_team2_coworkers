import type { TaskBoard } from '../model/taskBoard.types';

export function renameTaskGroupInBoard(board: TaskBoard, taskGroupId: string, title: string): TaskBoard {
  return {
    ...board,
    columns: board.columns.map((col) => ({
      ...col,
      taskGroups: col.taskGroups.map((group) =>
        group.id === taskGroupId ? { ...group, name: title } : group,
      ),
    })),
  };
}

export function removeTaskGroupFromBoard(board: TaskBoard, taskGroupId: string): TaskBoard {
  return {
    ...board,
    columns: board.columns.map((col) => ({
      ...col,
      taskGroups: col.taskGroups.filter((group) => group.id !== taskGroupId),
    })),
  };
}
