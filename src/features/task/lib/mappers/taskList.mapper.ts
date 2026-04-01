import { TaskListDto } from '../../model/dto/task.dto';
import { TaskLists } from '../../model/entities/taskList.model';
import { toTask } from './task.mapper';

export function toTaskList(dto: TaskListDto): TaskLists {
  const tasks = dto.tasks.map(toTask);

  const completedCount = tasks.filter((task) => task.completedAt).length;

  return {
    id: dto.id,
    title: dto.name,
    order: dto.displayIndex,
    tasks,

    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),

    totalCount: tasks.length,
    completedCount,
  };
}
