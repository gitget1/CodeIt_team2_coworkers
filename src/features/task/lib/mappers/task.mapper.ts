import { TaskDto, TaskListDto, UserDto } from '../../model/dto/task.dto';
import { Task, TaskList, User } from '../../model/entities/task.model';

export const toUser = (dto: UserDto): User => ({
  id: dto.id,
  nickname: dto.nickname,
  imageUrl: dto.image ?? undefined,
});

export const toTask = (dto: TaskDto): Task => ({
  id: dto.id,
  title: dto.name,
  description: dto.description ?? undefined,
  order: dto.displayIndex,
  commentCount: dto.commentCount,
  writer: toUser(dto.writer),
  completedBy: dto.doneBy?.user ? toUser(dto.doneBy.user) : undefined,
  completedAt: dto.doneAt ?? undefined,
  isDeleted: Boolean(dto.deletedAt),
  date: dto.date ? new Date(dto.date) : undefined,
  recurrence: dto.frequency ?? undefined,
  recurrenceId: dto.recurringId ?? undefined,
});

export const toTaskList = (dto: TaskListDto): TaskList => ({
  id: dto.id,
  groupId: dto.groupId,
  title: dto.name,
  order: dto.displayIndex,
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
  tasks: dto.tasks.map(toTask),
});
