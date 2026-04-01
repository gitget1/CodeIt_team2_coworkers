import { RecurrenceType } from '../types/recurrence.type';

export type UserDto = {
  id: number;
  nickname: string;
  image?: string | null;
};

export type TaskDto = {
  id: number;
  taskListId?: number | null;
  name: string;
  description?: string | null;
  date?: string | null;
  frequency: RecurrenceType;
  recurringId?: number | null;
  displayIndex: number;
  commentCount: number;
  doneAt?: string | null;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  writer: UserDto;
  doneBy?: {
    user: UserDto;
  } | null;
};

export type TaskListDto = {
  id: number;
  name: string;
  displayIndex: number;
  groupId: number;
  createdAt: string;
  updatedAt: string;
  tasks: TaskDto[];
};

export type UpdateTaskDto = {
  name?: string;
  description?: string;
  done?: boolean;
};

export type UpdateRecurringDto = {
  name?: string;
  description?: string;
  startDate?: string;
  frequencyType: RecurrenceType;
  monthDay?: number;
  weekDays?: number[];
};
