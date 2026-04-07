import type { User } from './task.model';

export interface TaskComment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  taskId?: number;
  userId?: number;
  user: User;
}
