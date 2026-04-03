import { TaskListDto } from '../../model/dto/task.dto';
import { TaskListStats } from '../../model/entities/taskList.model';
import { toTask } from './task.mapper';

export function toTaskList(dto: TaskListDto): TaskListStats {
  const tasks = dto.tasks.map((taskDto) => toTask(taskDto, dto.id));

  const completedCount = tasks.filter((task) => task.completedAt).length;

  return {
    id: dto.id,
    title: dto.name,
    groupId: dto.groupId,
    order: dto.displayIndex,
    tasks,

    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),

    totalCount: tasks.length,
    completedCount,
  };
}
