import { Task } from "./task.model";

export type TaskLists = {
  id: number;
  title: string;
  order: number;
  tasks: Task[];

  createdAt: Date;
  updatedAt: Date;

  totalCount: number;
  completedCount: number;
};