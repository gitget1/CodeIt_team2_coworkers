import type { UserDto } from './task.dto';

export interface TaskCommentDto {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  taskId: number;
  userId: number;
  user: UserDto;
}

export interface CreateTaskCommentBodyDto {
  content: string;
}

export interface UpdateTaskCommentBodyDto {
  content: string;
}
