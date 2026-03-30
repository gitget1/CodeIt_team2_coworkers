import { RecurrenceType } from '../types/recurrence.type';

export interface User {
  id: number;
  nickname: string;
  imageUrl?: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  order: number;
  commentCount: number;
  writer: User;
  isCompleted: boolean;
  completedBy?: User;
  completedAt?: string;
  isDeleted: boolean;
  date?: Date;
  recurrence: RecurrenceType;
  recurrenceId?: number;
}

export interface TaskList {
  id: number;
  groupId: number;
  title: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  tasks: Task[];
}
