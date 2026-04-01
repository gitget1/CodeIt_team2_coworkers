import { TaskList } from './task.model';

export type TaskListStats = TaskList & {
  totalCount: number;
  completedCount: number;
};
