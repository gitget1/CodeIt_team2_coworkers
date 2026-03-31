import { useState } from 'react';
import { Task } from '../model/entities/task.model';

export function useTaskModal() {
  const [detailTask, setDetailTask] = useState<Task | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);

  return {
    detailTask,
    editTask,
    deleteTask,

    openDetail: (task: Task) => setDetailTask(task),
    openEdit: (task: Task) => setEditTask(task),
    openDelete: (task: Task) => setDeleteTask(task),

    closeDetail: () => setDetailTask(null),
    closeEdit: () => setEditTask(null),
    closeDelete: () => setDeleteTask(null),
  };
}
