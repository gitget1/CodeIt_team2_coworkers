import { findTaskGroupLocation } from './taskBoardDnd.utils';
import type {
  TaskBoard,
  TaskBoardColumnStatus,
  TaskBoardTaskGroup,
} from '../model/taskBoard.types';

export function applyTaskToggleToBoard(
  prev: TaskBoard,
  taskGroupId: string,
  taskId: string,
  checked: boolean,
): TaskBoard {
  const columns = prev.columns.map((col) => ({ ...col, taskGroups: [...col.taskGroups] }));
  const loc = findTaskGroupLocation(columns, taskGroupId);
  if (!loc) return prev;

  const { status: fromStatus } = loc;
  const updatedTasks = loc.taskGroup.tasks.map((t) => (t.id === taskId ? { ...t, completed: checked } : t));
  const nextGroup: TaskBoardTaskGroup = { ...loc.taskGroup, tasks: updatedTasks };
  const allCompleted = nextGroup.tasks.length > 0 && nextGroup.tasks.every((t) => t.completed);
  const derivedStatus: TaskBoardColumnStatus = allCompleted ? 'DONE' : 'IN_PROGRESS';

  for (const col of columns) {
    col.taskGroups = col.taskGroups.filter((g) => g.id !== taskGroupId);
  }

  const destination = columns.find((c) => c.status === derivedStatus);
  if (!destination) return prev;

  const insertIndex = derivedStatus === fromStatus ? loc.index : 0;
  destination.taskGroups.splice(insertIndex, 0, nextGroup);

  return { ...prev, columns };
}
